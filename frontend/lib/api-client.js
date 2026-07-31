export class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ApiError";
  }
}

export async function apiClient(endpoint, options = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("df_auth_token") : null;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://dentalflow-backend.vercel.app/api/v1";

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const url = `${baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, {
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
