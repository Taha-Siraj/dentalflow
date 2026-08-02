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

export async function apiClient(endpoint, options = {}) {
  const baseUrl = getApiBaseUrl();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const url = `${baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, {
      credentials: "include",
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok || (data && data.success === false)) {
      throw new ApiError(data.message || "An error occurred", response.status);
    }

    return data;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    console.warn("API request fallback error:", err.message);
    throw err;
  }
}
