import { API_URL } from "../config"

export async function requestJSON<T>(
  path: string, 
  opts: RequestInit = {}
):Promise<{status: number, data: T | null}> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
    ...opts,
  });
  const data = await res.json().catch(() => null);
  return { status: res.status, data };
}
