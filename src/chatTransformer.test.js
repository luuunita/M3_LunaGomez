import { describe, it, expect } from 'vitest';
import { transformChatResponse } from './chatTransformer.js';

describe('transformChatResponse', () => {
  it('debería manejar respuestas exitosas', () => {
    const apiResponse = { reply: 'Hola, humano.' };
    const result = transformChatResponse(apiResponse);

    expect(result.success).toBe(true);
    expect(result.reply).toBe('Hola, humano.');
    expect(result.errorMessage).toBe(null);
  });

  it('debería limpiar espacios extra en la respuesta', () => {
    const apiResponse = { reply: '   Hola, humano.   ' };
    const result = transformChatResponse(apiResponse);

    expect(result.success).toBe(true);
    expect(result.reply).toBe('Hola, humano.');
    expect(result.errorMessage).toBe(null);
  });

  it('debería manejar errores de la API', () => {
    const apiResponse = { error: 'Error generating response' };
    const result = transformChatResponse(apiResponse);

    expect(result.success).toBe(false);
    expect(result.reply).toBe(null);
    expect(result.errorMessage).toBe('Error generating response');
  });

  it('debería manejar respuestas sin reply', () => {
    const apiResponse = {};
    const result = transformChatResponse(apiResponse);

    expect(result.success).toBe(false);
    expect(result.reply).toBe(null);
    expect(result.errorMessage).toBe('No se recibió respuesta del asistente');
  });

  it('debería manejar respuestas vacías', () => {
    const apiResponse = { reply: '   ' };
    const result = transformChatResponse(apiResponse);

    expect(result.success).toBe(false);
    expect(result.reply).toBe(null);
    expect(result.errorMessage).toBe('La respuesta llegó vacía');
  });
});
