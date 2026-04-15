const state = {
  status: 'idle',
  messages: [
    {
      role: 'assistant',
      author: 'Rick',
      text: 'Bien, abriste el portal. Intenta no romper el continuo espacio-tiempo mientras hablamos.'
    }
  ],
  error: null
};

export function getState() {
  return state;
}

export function setState(updates) {
  Object.assign(state, updates);
}
