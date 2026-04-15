import { router } from './router.js';
import { setupLinkInterception } from './navigation.js';

function setupNavToggle() {
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (!navToggle || !siteNav) return;

  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';

    navToggle.setAttribute('aria-expanded', String(!isExpanded));
    siteNav.classList.toggle('site-nav--open');
  });

    siteNav.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;

    siteNav.classList.remove('site-nav--open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
}

window.addEventListener('popstate', () => {
  router();
});

setupLinkInterception();
setupNavToggle();
router();
