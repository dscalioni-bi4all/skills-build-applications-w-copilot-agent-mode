function CollectionState({ loading, error, count, children }) {
  if (loading) {
    return <p className="text-secondary">Loading…</p>;
  }

  if (error) {
    return <div className="alert alert-danger">Could not load data: {error}</div>;
  }

  if (count === 0) {
    return <div className="alert alert-info">No records yet. Run the backend seed script to add sample data.</div>;
  }

  return children;
}

export default CollectionState;
