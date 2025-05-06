const api = 'http://localhost:4000/api';

interface Props<T, Raw>{
  url: string
  jsonAdapter: (raw: Raw) => T
}

export async function fetchData<T, Raw>({
  url,
  jsonAdapter
}: Props<T, Raw>): Promise<T[]> {
  const response = await fetch(`${api}/${url}`)
  
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`)
  }

  const json = await response.json()

  const data = Array.isArray(json)
    ? json.map(jsonAdapter)
    : [jsonAdapter(json)]

  return data
}
