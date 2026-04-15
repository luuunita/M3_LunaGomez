async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockReply = `Recibí tu mensaje: "${message}". Esta es una respuesta simulada para pruebas. La integración con Gemini aún no está activa.`;

    return res.status(200).json({ reply: mockReply });
  } catch (error) {
    return res.status(500).json({
      error: 'Error generating response'
    });
  }
}

module.exports = handler;
