import { describe, it, expect } from 'vitest';
import {
  isValidMessage,
  formatBotReply,
  capitalize,
  countCharacters
} from './utils.js';

describe('isValidMessage', () => {
  it('debería retornar true para mensajes válidos', () => {
    expect(isValidMessage('Hola Rick')).toBe(true);
  });

  it('debería retornar false para mensajes vacíos', () => {
    expect(isValidMessage('')).toBe(false);
  });

  it('debería retornar false para mensajes con solo espacios', () => {
    expect(isValidMessage('   ')).toBe(false);
  });
});

describe('formatBotReply', () => {
  it('debería limpiar espacios al inicio y final', () => {
    expect(formatBotReply('  Hola, soy Rick.  ')).toBe('Hola, soy Rick.');
  });

  it('debería manejar respuestas vacías', () => {
    expect(formatBotReply('')).toBe('No se recibió respuesta de Rick.');
  });
});

describe('capitalize', () => {
  it('debería capitalizar la primera letra', () => {
    expect(capitalize('hola')).toBe('Hola');
  });

  it('debería retornar string vacío para entrada vacía', () => {
    expect(capitalize('')).toBe('');
  });
});

describe('countCharacters', () => {
  it('debería contar caracteres sin espacios', () => {
    expect(countCharacters('hola mundo')).toBe(9);
  });

  it('debería retornar 0 para null', () => {
    expect(countCharacters(null)).toBe(0);
  });
});
