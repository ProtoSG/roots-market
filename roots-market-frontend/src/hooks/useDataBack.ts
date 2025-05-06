import { useCallback, useEffect, useState } from "react";
import { loadFromLocalStorage } from "../utils/localStorageActions";
const api = import.meta.env.VITE_BACKEND_URL;

interface Props<T, Raw> {
  url: string;
  jsonAdapter: (json: Raw) => T;
}

export const useDataBack = <T, Raw>({ url, jsonAdapter }: Props<T, Raw>) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchDataEvent = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = loadFromLocalStorage("jwt_token", "");
      const response = await fetch(`${api}${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const json: Raw[] = await response.json();
      const dataAdap: T[] = Array.isArray(json)
        ? json.map(jsonAdapter)
        : [jsonAdapter(json)];

      setData(dataAdap);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [url, jsonAdapter]);

  useEffect(() => {
    fetchDataEvent();
  }, [fetchDataEvent]);

  return { data, loading, error, fetchData: fetchDataEvent };
};
