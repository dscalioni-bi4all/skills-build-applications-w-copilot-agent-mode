import { useCollection } from '../api';
import CollectionState from './CollectionState';

function Teams() {
  const { items, error, loading } = useCollection('teams');

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
