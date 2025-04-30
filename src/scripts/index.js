import '../styles/styles.css';
import App from './pages/app';
import Navbar from './components/navbar';
import { subscribeNotification } from './notification';

document.addEventListener('DOMContentLoaded', async () => {
  const skipLink = document.querySelector('.skip-link');
  const mainContent = document.getElementById('main-content');

  skipLink?.addEventListener('click', (event) => {
    event.preventDefault(); // Cegah reload
    mainContent?.setAttribute('tabindex', '-1'); // Buat bisa fokus
    mainContent?.focus(); // Fokuskan
    mainContent?.scrollIntoView({ behavior: 'smooth' }); // Scroll smooth
  });
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered');

      const token = localStorage.getItem('token');

      if (token && Notification.permission === 'granted') {
        await subscribeNotification();
        console.log('Web Push subscribed');
      }

      if (token && Notification.permission === 'default') {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          await subscribeNotification();
        }
      }
    } catch (err) {
      console.error('Service Worker registration failed:', err);
    }
  }

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
