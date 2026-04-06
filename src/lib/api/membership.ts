export async function submitMembershipForm(data: Record<string, unknown>) {
  const res = await fetch("/api/membership", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error || "Failed to submit form");
  }

  return result;
}
