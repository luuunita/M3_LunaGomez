export function renderHome() {
  const app = document.querySelector('#app');

  app.innerHTML = `
    <section class="view view--home">
      <div class="hero">
        <div class="hero__left">
          <div class="hero__media">
            <img
              src="/assets/Rick.jpg"
              alt="Rick Sanchez"
              class="hero__image"
            >
          </div>

          <div class="hero__content">
            <p class="eyebrow">Bienvenido al portal</p>
            <p class="hero__copy">
              Sumérgete en una conversación existencial con el científico más
              caótico de todos los universos.
            </p>
          </div>
        </div>

        <div class="hero__right">
          <h1>Habla con Rick sin salir del multiverso.</h1>

          <div class="hero__actions">
            <a class="button button--primary" href="/chat" data-link>
              Abrir chat
            </a>
            <a class="button button--ghost" href="/about" data-link>
              Conocer más
            </a>
          </div>
        </div>
      </div>

      <section class="feature-grid">
        <article class="feature-card">
          <h2>Respuestas con actitud</h2>
          <p>Rick responde con su estilo sarcástico, brillante e impredecible.</p>
        </article>

        <article class="feature-card">
          <h2>Conversación continua</h2>
          <p>Puedes seguir hablando sin perder el hilo de la charla durante tu sesión.</p>
        </article>

        <article class="feature-card">
          <h2>Una experiencia divertida</h2>
          <p>Explora una interfaz inspirada en Rick and Morty y disfruta una charla fuera de lo común.</p>
        </article>
      </section>
    </section>
  `;
}
