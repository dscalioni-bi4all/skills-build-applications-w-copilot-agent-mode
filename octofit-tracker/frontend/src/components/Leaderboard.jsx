import { useCollection } from '../api';
import CollectionState from './CollectionState';

function Leaderboard() {
  const { items, error, loading } = useCollection('leaderboard');

  return (
    <section>
      <h2 className="mb-3">Leaderboard</h2>
      <CollectionState error={error} loading={loading} count={items.length}>
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Team</th>
              <th scope="col">Points</th>
            </tr>
          </thead>
          <tbody>
            {items.map((entry, index) => (
              <tr key={entry._id}>
                <td>{index + 1}</td>
                <td>{entry.team?.name ?? 'Unknown team'}</td>
                <td>{entry.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CollectionState>
    </section>
  );
}

export default Leaderboard;
