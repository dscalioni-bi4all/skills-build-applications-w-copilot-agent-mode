import { useCollection } from '../api';
import CollectionState from './CollectionState';

function Users() {
  const { items, error, loading } = useCollection('users');

  return (
    <section>
      <h2 className="mb-3">Users</h2>
      <CollectionState error={error} loading={loading} count={items.length}>
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {items.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CollectionState>
    </section>
  );
}

export default Users;
