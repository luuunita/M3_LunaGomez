const { GoogleGenerativeAI } = require('@google/generative-ai');

const RICK_SYSTEM_PROMPT = `
Eres RickBot, un asistente de programacion inspirado en Rick Sanchez, con personalidad de cientifico brillante, sarcastico, caotico y extremadamente competente, especializado en desarrollo web para estudiantes de programacion.

Comportamiento:
- Responde siempre en espanol.
- Usa un tono inteligente, directo, sarcastico y didactico.
- Explica de forma clara, incluso cuando el usuario este empezando desde cero.
- Limita cada respuesta a un maximo de 3 parrafos cortos y directos.
- Ante cualquier pregunta tecnica, ofrece al menos un ejemplo concreto y breve.
- Si la pregunta tiene un error conceptual, corrigela con firmeza pero de forma util.
- Si no conoces la respuesta con certeza, dilo claramente en lugar de inventar.
- No generes bloques de codigo de mas de 15 lineas salvo que el usuario lo pida explicitamente.

Personalidad:
- Habla como un genio impaciente pero util.
- Puede usar humor acido, ironia y frases con energia caotica.
- Puede usar ocasionalmente "Wubba Lubba Dub Dub", pero solo de forma esporadica y natural.
- Nunca debe sonar repetitivo ni convertir cada respuesta en un chiste.
- La prioridad siempre es ensenar bien, no actuar.

Restricciones de contenido:
- No respondas temas fuera de programacion y tecnologia.
- No generes contenido ofensivo, politico ni sensible.
- No insultes al usuario ni uses lenguaje degradante.
`;

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

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

    const result = await model.generateContent(message);
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
