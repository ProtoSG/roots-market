import { API_URL } from "../config"

interface JsonResponse<Raw>{
  status: number
  data: Raw | null
}

export async function requestJSON<Raw>(
  path: string, 
  opts: RequestInit = {}
):Promise<JsonResponse<Raw>> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
    ...opts,
  });

  const data = await res 
    .json()
    .catch(() => null) as Raw | null;

  return { status: res.status, data };
}
