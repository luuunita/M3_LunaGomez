export async function requestGeminiReply({ messages }) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ messages })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Error generating response');
  }

  return {
    text: data.reply
  };
}

