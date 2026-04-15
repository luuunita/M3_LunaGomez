export function renderAbout() {
  const app = document.querySelector('#app');

  app.innerHTML = `
    <section class="view view--about">
      <div class="about-copy">
        <p class="eyebrow">Sobre la experiencia</p>
        <h1>Un chat inspirado en Rick and Morty.</h1>
        <p>
          Esta aplicación te permite conversar con Rick Sanchez en una interfaz
          pensada para que la experiencia sea dinámica, clara y entretenida.
        </p>
      </div>

      <section class="about-details">
        <article class="detail-card">
          <h2>¿Qué puedes hacer aquí?</h2>
          <p>
            Hablar con Rick, hacer preguntas y mantener una conversación con su
            estilo sarcástico e inteligente.
          </p>
        </article>

        <article class="detail-card">
          <h2>Personaje</h2>
          <p>
            El chat está basado en Rick Sanchez, un personaje conocido por su
            humor sarcástico, su genio científico y su personalidad impredecible.
          </p>
        </article>

        <article class="detail-card">
          <h2>Tecnologías usadas</h2>
          <p>
            HTML, CSS, JavaScript, History API, Fetch, Vitest y Vercel.
          </p>
        </article>
      </section>
    </section>
  `;
}
