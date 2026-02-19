export async function sendMessage(message) {
  const response = await fetch(`${import.meta.env.VITE_HOST_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch response");
  }

  const data = await response.json();
  return data.reply;
}
