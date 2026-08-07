export class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ApiError";
  }
}

export function getApiBaseUrl() {
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }
  if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
    return "http://localhost:5000/api/v1";
  }
  return "https://dentalflow-backend.vercel.app/api/v1";
}

/**
 * Universal Secured Fetch Interceptor
 * Intercepts HTTP 401 & 403 responses globally.
 * Clears cookies and forces instant redirect to /login when authentication is missing or invalid.
 */
export async function fetchWithAuth(url, options = {}) {
  const defaultHeaders = {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache",
    ...options.headers,
  };

  const fullUrl = url.startsWith("http") ? url : `${getApiBaseUrl()}${url.startsWith("/") ? url : `/${url}`}`;

  const res = await fetch(fullUrl, {
    credentials: "include",
    cache: "no-store",
    ...options,
    headers: defaultHeaders,
  });

  if (res.status === 401 || res.status === 403) {
    if (typeof window !== "undefined" && window.location.pathname.startsWith("/dashboard")) {
      const baseUrl = getApiBaseUrl();
      fetch(`${baseUrl}/auth/logout`, { method: "POST", credentials: "include" }).catch(() => {});
      window.location.href = "/login";
    }
    const data = await res.json().catch(() => ({}));
    throw new ApiError(data.message || "Unauthorized access: Session expired or invalid", res.status);
  }

  return res;
}

export async function apiClient(endpoint, options = {}) {
  const response = await fetchWithAuth(endpoint, options);
  const data = await response.json();

  if (!response.ok || (data && data.success === false)) {
    throw new ApiError(data.message || "An error occurred", response.status);
  }

  return data;
}
