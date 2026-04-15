export async function requestAnthropicReply({ message }) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Error generating response');
  }

  return {
    text: data.reply
  };
}
