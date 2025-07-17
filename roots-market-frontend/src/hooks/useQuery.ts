import { use, useCallback, useReducer } from "react"
import { promiseCache } from "../utils/cache"

interface Props<T> {
  fn: () => Promise<T>
  key: string
}

export function useQuery<T>({fn, key}: Props<T>): {data: T, invalidate: () => void} {
 const [, forceUpdate] = useReducer(x => x + 1, 0)
  
  const invalidate = useCallback(() => {
    promiseCache.delete(key)
    forceUpdate()
  }, [key])

  if (!promiseCache.has(key)) {
    promiseCache.set(key, fn())
  }

  const promise = promiseCache.get(key) as Promise<T>
  const data = use(promise)

  return {data, invalidate}
}
