import RegisterPresenter from './register-presenter';

export default class RegisterPage {
  #presenter = null;

  async render() {
    return `
      <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div class="w-full max-w-md bg-white shadow-xl rounded-xl overflow-hidden">
          <div class="flex flex-col items-center py-10 px-6 space-y-6">
            <h1 class="font-bold text-4xl">
              Register
            </h1>
            <p class="text-sm text-gray-600 text-center">
              Sudah memiliki akun?
              <a href="#/login" class="text-black font-semibold hover:underline">Login di sini</a>
            </p>

            <form id="register-form" class="w-full space-y-6">
              <div class="space-y-4">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                  <input type="text" id="name" placeholder="Walter White"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none" required />
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" id="email" placeholder="m@example.com"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none" required />
                </div>
                <div>
                  <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input type="password" id="password" placeholder="••••••••"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none" required />
                </div>
              </div>

              <div id="submit-container">
                <button type="submit" id="submit-button"
                  class="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:bg-gray-300">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  async afterRender() {
    this.#presenter = new RegisterPresenter({ view: this });
    this.#setupForm();
  }

  #setupForm() {
    const form = document.getElementById('register-form');
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();

      const data = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value,
      };

      await this.#presenter.register(data);
    });
  }

  showLoading() {
    document.getElementById('submit-container').innerHTML = `
      <button class="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold" disabled>
        Loading...
      </button>
    `;
  }

  hideLoading() {
    document.getElementById('submit-container').innerHTML = `
      <button id="submit-button" type="submit"
        class="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
        Register
      </button>
    `;
    this.#setupForm(); // attach ulang listener
  }

  registerSuccess(message) {
    alert(message);
    window.location.hash = '#/login';
  }

  registerFailed(message) {
    alert(message);
  }
}
