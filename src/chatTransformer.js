export function transformChatResponse(apiResponse) {
  if (apiResponse?.error) {
    return {
      success: false,
      reply: null,
      errorMessage: apiResponse.error
    };
  }

  if (!apiResponse?.reply) {
    return {
      success: false,
      reply: null,
      errorMessage: 'No se recibió respuesta del asistente'
    };
  }

  const cleanedReply = apiResponse.reply.trim();

  if (cleanedReply.length === 0) {
    return {
      success: false,
      reply: null,
      errorMessage: 'La respuesta llegó vacía'
    };
  }

  return {
    success: true,
    reply: cleanedReply,
    errorMessage: null
  };
}
