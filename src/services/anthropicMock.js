const MOCK_RESPONSES = [
  "Wubba Lubba Dub Dub... ya recibí tu mensaje. Vamos a revisar ese desastre técnico.",
  "Interesante. Eso suena a un problema de renderizado o de estado mal controlado.",
  "No está tan mal como parece. Muéstrame el archivo clave y lo depuramos paso a paso.",
  "Eso debería funcionar... a menos que hayas roto la navegación, el DOM o ambas cosas."
];

function pickResponse () {
    return MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
}

function delay(ms) {
    return new Promise((resolve => setTimeout(resolve, ms)));
} 

function make200Response(payload) {
   const inputTokens = payload.messages.reduce(
     (acc, message) => acc + Math.ceil((message.content || "").length / 4),
     0
    );

    const outputText = pickResponse();

    const outputTokens = Math.ceil(outputText.length / 4);

    return {
        ok: true,
        status: 200,
        retryAfter: null,
        data: {
            id: `msg_mock_${Date.now()}`,
            type: "message",
            role: "assistant",
            model: payload.model,
            content: [
                {
                    type: "text",
                    text: outputText,
                },
            ],
            stop_reason: "end_turn",
            usage: {
                input_tokens: inputTokens,
                output_tokens: outputTokens,
            },
        },
    };
}

export async function mockAnthropicRequest(payload) {
     await delay(3000);

     return make200Response(payload);
    
    }