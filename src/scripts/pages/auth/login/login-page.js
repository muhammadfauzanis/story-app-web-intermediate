import LoginPresenter from './login-presenter';

export default class LoginPage {
  #presenter = null;

  async render() {
    return `
      <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div class="w-full max-w-md bg-white shadow-xl rounded-xl overflow-hidden">
          <div class="flex flex-col items-center py-10 px-6 space-y-6">
            <h1 class="font-bold text-4xl">Login</h1>
            <p class="text-sm text-gray-600 text-center">
              Belum memiliki akun?
              <a href="#/register" class="text-black font-semibold hover:underline">Register di sini</a>
            </p>

            <form id="login-form" class="w-full space-y-6">
              <div class="space-y-4">
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" id="email" placeholder="m@example.com"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    required />
                </div>
                <div>
                  <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input type="password" id="password" placeholder="••••••••"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    required />
                </div>
              </div>

              <div id="submit-container">
                <button id="login-button" type="submit"
                  class="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  async afterRender() {
    this.#presenter = new LoginPresenter({ view: this });
    this.#setupForm();
  }

  #setupForm() {
    const form = document.getElementById('login-form');
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();

      const data = {
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value,
      };

      await this.#presenter.login(data);
    });
  }

  showLoading() {
    document.getElementById('submit-container').innerHTML = `
      <button class="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold cursor-not-allowed" disabled>
        Loading...
      </button>
    `;
  }

  hideLoading() {
    document.getElementById('submit-container').innerHTML = `
      <button id="login-button" type="submit"
        class="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
        Login
      </button>
    `;
    this.#setupForm(); // Re-attach event listener karena tombol baru dibuat
  }

  loginSuccess(message) {
    alert(message);
    window.location.hash = '#/';
  }

  loginFailed(message) {
    alert(message);
  }
}
