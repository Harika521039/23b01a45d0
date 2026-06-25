import { BASE_URL, ACCESS_TOKEN } from "../config";

export async function Log(stack, level, pkg, message) {
  try {
    await fetch(`${BASE_URL}/logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message,
      }),
    });
  } catch (error) {
    console.log("Logger failed");
  }
}