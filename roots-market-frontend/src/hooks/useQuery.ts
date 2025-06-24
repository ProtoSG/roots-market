import { use } from "react"
import { promiseCache } from "../utils/cache"

interface Props<T> {
  fn: () => Promise<T>
  key: string
}

export function useQuery<T>({fn, key}: Props<T>): T {
  if (!promiseCache.has(key)) {
    promiseCache.set(key, fn())
  }

  const promise = promiseCache.get(key) as Promise<T>
  return use(promise)
}
