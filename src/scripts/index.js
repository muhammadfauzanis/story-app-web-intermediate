import '../styles/styles.css';
import App from './pages/app';
import Navbar from './components/navbar';
import { subscribeNotification } from './utils/notification';

document.addEventListener('DOMContentLoaded', async () => {
  const skipLink = document.querySelector('.skip-link');
  const mainContent = document.getElementById('main-content');

  if (skipLink && mainContent) {
    skipLink.addEventListener('click', (event) => {
      event.preventDefault();
      mainContent.setAttribute('tabindex', '-1');
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('✅ Service Worker registered');

      const token = localStorage.getItem('token');

      if (token) {
        const permission = Notification.permission;

        if (permission === 'granted') {
          await subscribeNotification();
          console.log('✅ Web Push subscribed');
        }

        if (permission === 'default') {
          const newPermission = await Notification.requestPermission();
          if (newPermission === 'granted') {
            await subscribeNotification();
            console.log('✅ Web Push subscribed (after permission)');
          }
        }
      }
    } catch (err) {
      console.error('❌ Service Worker registration failed:', err);
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
