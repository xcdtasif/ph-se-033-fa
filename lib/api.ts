import { useAuthStore } from "@/store/authStore";

const API_BASE = "/api/backend";

async function refreshToken() {
  const res = await fetch(`${API_BASE}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });
  return res.ok;
}

async function fetchWithAuth<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = useAuthStore.getState().accessToken;

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 401) {
    const refreshed = await refreshToken();
    if (refreshed) return fetchWithAuth(path, options);
    useAuthStore.getState().logout();
    return Promise.reject({ message: "Session expired" });
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw {
      message: data.message ?? "Request failed",
      errors: data.errors,
      statusCode: res.status,
    };
  }
  return data;
}

export const api = {
  get: <T>(path: string) => fetchWithAuth<T>(path),
  post: <T>(path: string, body: unknown) =>
    fetchWithAuth<T>(path, { method: "POST", body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    fetchWithAuth<T>(path, { method: "PUT", body: JSON.stringify(body) }),
  patch: <T>(path: string, body: unknown) =>
    fetchWithAuth<T>(path, { method: "PATCH", body: JSON.stringify(body) }),
  delete: <T>(path: string) => fetchWithAuth<T>(path, { method: "DELETE" }),
};
