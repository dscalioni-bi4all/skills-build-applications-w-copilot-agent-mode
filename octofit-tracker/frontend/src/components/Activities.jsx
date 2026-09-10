import { useCollection } from '../api';
import CollectionState from './CollectionState';

function Activities() {
  const { items, error, loading } = useCollection('activities');

  return (
    <section>
      <h2 className="mb-3">Activities</h2>
      <CollectionState error={error} loading={loading} count={items.length}>
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th scope="col">Type</th>
              <th scope="col">Duration (min)</th>
              <th scope="col">Points</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {items.map((activity) => (
              <tr key={activity._id}>
                <td>{activity.type}</td>
                <td>{activity.durationMinutes}</td>
                <td>{activity.points}</td>
                <td>
                  {activity.performedAt
                    ? new Date(activity.performedAt).toLocaleDateString()
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CollectionState>
    </section>
  );
}

export default Activities;
