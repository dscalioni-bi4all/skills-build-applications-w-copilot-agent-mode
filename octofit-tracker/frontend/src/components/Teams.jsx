import { useEffect, useState } from 'react';
import { toArray } from '../api';
import CollectionState from './CollectionState';

// Falls back to localhost so an unset VITE_CODESPACE_NAME never yields "https://undefined-8000...".
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

function Teams() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetch(apiUrl, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        return response.json();
      })
      .then((payload) => setItems(toArray(payload)))
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <section>
      <h2 className="mb-3">Teams</h2>
      <CollectionState error={error} loading={loading} count={items.length}>
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th scope="col">Team</th>
              <th scope="col">Members</th>
            </tr>
          </thead>
          <tbody>
            {items.map((team) => (
              <tr key={team._id}>
                <td>{team.name}</td>
                <td>{team.members?.length ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CollectionState>
    </section>
  );
}

export default Teams;
