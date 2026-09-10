import { useEffect, useState } from 'react';
import { toArray } from '../api';
import CollectionState from './CollectionState';

// Falls back to localhost so an unset VITE_CODESPACE_NAME never yields "https://undefined-8000...".
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

function Workouts() {
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
      <h2 className="mb-3">Suggested Workouts</h2>
      <CollectionState error={error} loading={loading} count={items.length}>
        <div className="row g-3">
          {items.map((workout) => (
            <div className="col-md-6" key={workout._id}>
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title h5">{workout.name}</h3>
                  <p className="card-text">{workout.description}</p>
                  <span className="badge text-bg-secondary me-2">{workout.difficulty}</span>
                  <span className="badge text-bg-light">{workout.targetMinutes} min</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CollectionState>
    </section>
  );
}

export default Workouts;
