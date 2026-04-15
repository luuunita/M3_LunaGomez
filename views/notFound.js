export function renderNotFound() {
  const app = document.querySelector('#app');

  app.innerHTML = `
    <section class="view view--not-found">
      <div class="about-copy">
        <p class="eyebrow">Error de navegación</p>
        <h1>404 - Página no encontrada</h1>
        <p>
          La ruta <strong>${window.location.pathname}</strong> no existe dentro
          de este portal.
        </p>
        <p>
          <a class="button button--primary" href="/home">Volver al inicio</a>
        </p>
      </div>
    </section>
  `;
}
