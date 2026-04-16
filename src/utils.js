export function isValidMessage(message) {
  if (!message) return false;
  const trimmed = message.trim();
  return trimmed.length >= 1 && trimmed.length <= 500;
}

export function formatBotReply(reply) {
  if (!reply || reply.trim().length === 0) {
    return 'No se recibió respuesta de Rick.';
  }

  return reply.trim();
}

export function capitalize(text) {
  if (!text || text.length === 0) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function countCharacters(text) {
  if (!text) return 0;
  return text.replace(/\s/g, '').length;
}
