import { useEffect, useState } from 'react';

// Falls back to localhost so an unset VITE_CODESPACE_NAME never yields "https://undefined-8000...".
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

// The API may return a bare array or a paginated envelope.
export function toArray(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  return [];
}

export function useCollection(resource) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${apiBaseUrl}/${resource}/`, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        setItems(toArray(await response.json()));
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message);
        }
      } finally {
        setLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, [resource]);

  return { items, error, loading };
}
