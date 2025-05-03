import NotFoundPage from '../pages/not-found-page';
import routes from '../routes/routes';
import { getActiveRoute } from '../routes/url-parser';

class App {
  #content;
  #drawerButton;
  #navigationDrawer;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;

    this.#setupDrawer();
  }

  #setupDrawer() {
    this.#drawerButton.addEventListener('click', () => {
      this.#navigationDrawer.classList.toggle('open');
    });

    document.body.addEventListener('click', (event) => {
      const isOutsideDrawer =
        !this.#navigationDrawer.contains(event.target) &&
        !this.#drawerButton.contains(event.target);

      if (isOutsideDrawer) {
        this.#navigationDrawer.classList.remove('open');
      }
    });

    this.#navigationDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        this.#navigationDrawer.classList.remove('open');
      });
    });
  }

  async renderPage() {
    const url = getActiveRoute();
    const PageClass = routes[url] || NotFoundPage;
    const page = new PageClass();

    const renderContent = async () => {
      this.#content.innerHTML = await page.render();
      await page.afterRender();
    };

    if (document.startViewTransition) {
      document.startViewTransition(() => renderContent());
    } else {
      await renderContent();
    }
  }
}

export default App;
