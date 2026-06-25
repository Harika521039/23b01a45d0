import { BASE_URL, ACCESS_TOKEN } from "../config";

const fallbackNotifications = [
  {
    ID: "1",
    Type: "Result",
    Message: "mid-sem",
    Timestamp: "2026-04-22 17:51:30",
  },
  {
    ID: "2",
    Type: "Placement",
    Message: "CSX Corporation hiring",
    Timestamp: "2026-04-22 17:51:18",
  },
  {
    ID: "3",
    Type: "Event",
    Message: "farewell",
    Timestamp: "2026-04-22 17:51:06",
  },
  {
    ID: "4",
    Type: "Result",
    Message: "project-review",
    Timestamp: "2026-04-22 17:50:42",
  },
  {
    ID: "5",
    Type: "Result",
    Message: "external",
    Timestamp: "2026-04-22 17:50:30",
  },
  {
    ID: "6",
    Type: "Result",
    Message: "project-review",
    Timestamp: "2026-04-22 17:50:18",
  },
  {
    ID: "7",
    Type: "Event",
    Message: "tech-fest",
    Timestamp: "2026-04-22 17:50:06",
  },
  {
    ID: "8",
    Type: "Result",
    Message: "project-review",
    Timestamp: "2026-04-22 17:49:54",
  },
  {
    ID: "9",
    Type: "Placement",
    Message: "Advanced Micro Devices Inc. hiring",
    Timestamp: "2026-04-22 17:49:42",
  },
];

export async function fetchNotifications(page = 1, limit = 10, type = "") {
  try {
    let url = `${BASE_URL}/notifications?page=${page}&limit=${limit}`;

    if (type !== "") {
      url += `&notification_type=${type}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    const data = await response.json();
    console.log("Notifications API response:", data);

    if (response.ok && data.notifications) {
      return data.notifications;
    }

    throw new Error("API failed");
  } catch (error) {
    console.log("API failed, using fallback notifications", error);

    let filtered = fallbackNotifications;

    if (type !== "") {
      filtered = filtered.filter((item) => item.Type === type);
    }

    const start = (page - 1) * limit;
    const end = start + limit;

    return filtered.slice(start, end);
  }
}