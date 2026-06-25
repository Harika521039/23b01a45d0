function NotificationFilter({
  page,
  setPage,
  limit,
  setLimit,
  type,
  setType,
}) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label>
        Page:
        <input
          type="number"
          min="1"
          value={page}
          onChange={(e) => {
            const value = Number(e.target.value);
            setPage(value < 1 ? 1 : value);
          }}
          style={{ margin: "0 10px" }}
        />
      </label>

      <label>
        Limit:
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          style={{ margin: "0 10px" }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </label>

      <label>
        Type:
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setPage(1);
          }}
          style={{ margin: "0 10px" }}
        >
          <option value="">All</option>
          <option value="Event">Event</option>
          <option value="Result">Result</option>
          <option value="Placement">Placement</option>
        </select>
      </label>
    </div>
  );
}

export default NotificationFilter;