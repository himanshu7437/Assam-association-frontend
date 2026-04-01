export async function submitContactForm(data: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
  const res = await fetch("/api/contact", {
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
