import { requestAnthropicReply } from '../src/services/anthropicApi.js';
import { getState, setState } from '../src/state.js';

export function renderChat() {
  const app = document.querySelector('#app');
  const state = getState();

  app.innerHTML = `
    <section class="view view--chat">
      <section class="chat-shell">
        <header class="chat-header">
          <div>
            <p class="eyebrow">Canal activo</p>
            <h1>Rick Sanchez</h1>
          </div>
          <span class="status-pill">En línea</span>
        </header>

        <main class="chat-messages" id="chat-messages">
          ${renderMessages(state)}
        </main>

        <form class="chat-input" id="chat-form" action="#" method="post">
          <label class="sr-only" for="message-input">Escribe tu mensaje</label>
          <textarea
            id="message-input"
            rows="1"
            placeholder="Escribe algo para Rick..."
          ></textarea>

          <button
            class="button button--primary"
            type="submit"
            ${state.status === 'loading' ? 'disabled' : ''}
          >
            ${state.status === 'loading' ? 'Enviando...' : 'Enviar'}
          </button>
        </form>

        <footer class="chat-footer">
          <p class="${state.status === 'error' ? 'chat-status chat-status--error' : 'chat-status'}">
            ${
              state.status === 'error'
                ? state.error
                : state.status === 'loading'
                ? 'Rick está pensando su respuesta...'
                : 'Rick responderá manteniendo el contexto durante esta sesión.'
            }
          </p>
        </footer>
      </section>
    </section>
  `;

  setupChatEvents();
  scrollChatToBottom();
}

function renderMessages(state) {
  const messagesHtml = state.messages
    .map((message) => {
      const messageClass =
        message.role === 'assistant'
          ? 'message message--assistant'
          : 'message message--user';

      return `
        <article class="${messageClass}">
          <p class="message__author">${message.author}</p>
          <p>${message.text}</p>
        </article>
      `;
    })
    .join('');

  const loadingHtml =
    state.status === 'loading'
      ? `
        <article class="message message--assistant message--loading">
          <p class="message__author">Rick</p>
          <p>Pensando...</p>
        </article>
      `
      : '';

  return messagesHtml + loadingHtml;
}

function setupChatEvents() {
  const form = document.querySelector('#chat-form');
  const input = document.querySelector('#message-input');

  if (!form || !input) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const text = input.value.trim();
    if (!text) return;

    await handleSendMessage(text);
    input.value = '';
  });

  input.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();

      const text = input.value.trim();
      if (!text) return;

      await handleSendMessage(text);
      input.value = '';
    }
  });
}

function toAnthropicMessages(messages) {
  return messages.map((message) => ({
    role: message.role,
    content: message.text
  }));
}

async function handleSendMessage(text) {
  const cleanText = text.trim();
  if (!cleanText) return;

  const state = getState();

  const updatedMessages = [
    ...state.messages,
    {
      role: 'user',
      author: 'Tú',
      text: cleanText
    }
  ];

  setState({
    status: 'loading',
    messages: updatedMessages,
    error: null
  });

  renderChat();

  try {
    const reply = await requestAnthropicReply({
      messages: toAnthropicMessages(updatedMessages)
    });

    setState({
      status: 'success',
      messages: [
        ...updatedMessages,
        {
          role: 'assistant',
          author: 'Rick',
          text: reply.text
        }
      ],
      error: null
    });
  } catch (error) {

    setState({
      status: 'error',
      messages: updatedMessages,
      error: 'Ocurrió un error al obtener la respuesta.'
    });
  }

  renderChat();
}

function scrollChatToBottom() {
  const messagesContainer = document.querySelector('#chat-messages');
  if (!messagesContainer) return;

  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
