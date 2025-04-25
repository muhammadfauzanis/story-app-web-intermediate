import { loginUser } from '../../data/api';

export default class LoginPage {
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
                  <input
                    type="email"
                    id="email"
                    placeholder="m@example.com"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                id="login-button"
                class="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition cursor-pointer disabled:bg-gray-300"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  async afterRender() {
    const form = document.getElementById('login-form');
    const button = document.getElementById('login-button');

    form?.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;

      button.disabled = true;
      button.textContent = 'Loading...';

      try {
        const result = await loginUser({ email, password });

        const { token } = result.loginResult;
        localStorage.setItem('token', token);

        alert('Login berhasil!');
        window.location.hash = '#/';
      } catch (error) {
        alert(`Login gagal: ${error.message}`);
      } finally {
        button.disabled = false;
        button.textContent = 'Login';
      }
    });
  }
}
