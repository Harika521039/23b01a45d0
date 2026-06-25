import { useEffect, useState } from "react";
import { fetchNotifications } from "../api/notifications";
import { Log } from "../utils/logger";

export default function useNotifications(page, limit, type) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNotifications() {
      setLoading(true);
      await Log("frontend", "info", "hook", "Loading notifications in hook");

      const data = await fetchNotifications(page, limit, type);
      setNotifications(data);

      await Log("frontend", "info", "hook", "Notifications stored in state");
      setLoading(false);
    }

    loadNotifications();
  }, [page, limit, type]);

  return { notifications, loading };
}