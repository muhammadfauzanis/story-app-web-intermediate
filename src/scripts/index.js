import '../styles/styles.css';
import App from './pages/app';
import Navbar from './components/navbar';

document.addEventListener('DOMContentLoaded', async () => {
  // Render Navbar ke container
  const navbarContainer = document.getElementById('navbar-container');
  navbarContainer.innerHTML = await Navbar.render();
  await Navbar.afterRender();

  const app = new App({
    content: document.querySelector('#main-content'),
    drawerButton: document.getElementById('hamburger-toggle'),
    navigationDrawer: document.getElementById('mobile-drawer'),
  });

  await app.renderPage();
  window.addEventListener('hashchange', async () => {
    await app.renderPage();
  });
});
