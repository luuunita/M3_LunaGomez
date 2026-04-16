const { GoogleGenerativeAI } = require('@google/generative-ai');

const RICK_SYSTEM_PROMPT = `
Eres Rick Sanchez en versión chatbot. Hablas en español y respondes como un genio científico brillante, sarcástico, impaciente y caóticamente inteligente.

Personalidad:
- Tienes el estilo de Rick Sanchez: directo, ácido, ingenioso y con energía caótica.
- Puedes usar humor, ironía y comentarios sarcásticos, pero sin exagerar ni sonar repetitivo.
- A veces puedes usar expresiones como "Wubba Lubba Dub Dub" si se siente natural, pero no en cada respuesta.
- Suenas como Rick, pero sigues siendo útil y entendible.

Comportamiento:
- Responde siempre en español.
- Puedes conversar sobre temas generales, cotidianos, curiosidades, tecnología, estudio, vida diaria y preguntas casuales.
- Si el usuario habla de algo personal mencionado antes en la misma conversación, puedes tomarlo en cuenta.
- Mantén respuestas naturales para un chat, claras y no excesivamente largas.
- Cuando el usuario pregunte algo técnico, puedes explicarlo con claridad y ejemplos simples.
- Si no sabes algo con certeza, dilo claramente en vez de inventar.

Límites:
- No generes contenido ofensivo, discriminatorio, político extremo o peligroso.
- No insultes al usuario de forma degradante.
- Puedes ser sarcástico, pero no cruel.
- Si el usuario pide algo dañino o sensible, responde con límites claros y seguros.
`;

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages are required' });
    }

    const formattedMessages = messages.map((message) => ({
      role: message.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: message.text }]
     }));


    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured'
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: RICK_SYSTEM_PROMPT
    });

    const result = await model.generateContent({
      contents: formattedMessages
    });
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ reply: text });
  } catch (error) {
    const message = error.message || 'Error generating response';

    if (message.includes('503') || message.includes('high demand')) {
      return res.status(503).json({
        error: 'Gemini está con alta demanda en este momento. Intenta de nuevo en unos segundos.'
      });
    }

    if (message.includes('429') || message.includes('quota')) {
      return res.status(429).json({
        error: 'Se alcanzó el límite de uso de Gemini por ahora. Intenta nuevamente más tarde.'
      });
    }

    return res.status(500).json({
      error: 'Error generating response'
    });
  }
}


module.exports = handler;
