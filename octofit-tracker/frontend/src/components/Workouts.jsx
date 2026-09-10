import { useCollection } from '../api';
import CollectionState from './CollectionState';

function Workouts() {
  const { items, error, loading } = useCollection('workouts');

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
