import { useMemo, useState } from "react";
import useNotifications from "../hooks/useNotifications";
import NotificationFilter from "../components/NotificationFilter";

function getTypeWeight(type) {
  if (type === "Placement") return 3;
  if (type === "Result") return 2;
  if (type === "Event") return 1;
  return 0;
}

function NotificationsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [type, setType] = useState("");

  const { notifications, loading } = useNotifications(page, limit, type);

  const priorityNotifications = useMemo(() => {
    return [...notifications]
      .sort((a, b) => {
        const typeDiff = getTypeWeight(b.Type) - getTypeWeight(a.Type);
        if (typeDiff !== 0) return typeDiff;
        return new Date(b.Timestamp) - new Date(a.Timestamp);
      })
      .slice(0, 10);
  }, [notifications]);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading notifications...</p>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Campus Notifications</h1>

      <NotificationFilter
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        type={type}
        setType={setType}
      />

      <h2>Top Priority Notifications</h2>
      {priorityNotifications.length === 0 ? (
        <p>No priority notifications found.</p>
      ) : (
        priorityNotifications.map((item) => (
          <div
            key={item.ID}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "10px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <p><strong>Type:</strong> {item.Type}</p>
            <p><strong>Message:</strong> {item.Message}</p>
            <p><strong>Timestamp:</strong> {item.Timestamp}</p>
          </div>
        ))
      )}

      <h2>All Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        notifications.map((item) => (
          <div
            key={item.ID}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "10px",
            }}
          >
            <p><strong>Type:</strong> {item.Type}</p>
            <p><strong>Message:</strong> {item.Message}</p>
            <p><strong>Timestamp:</strong> {item.Timestamp}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default NotificationsPage;