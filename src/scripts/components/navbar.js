const links = [
  { name: 'Cerita Mu', link: '#/stories' },
  { name: 'Tambah Cerita', link: '#/add-story' },
];

const Navbar = {
  async render() {
    const token = localStorage.getItem('token');
    const buttonText = token ? 'Dashboard' : 'Login';
    const buttonLink = token ? '#/dashboard' : '#/login';

    return `
      <nav class="fixed top-0 left-0 w-full bg-white shadow-sm z-50 px-6 md:px-10 lg:px-20 xl:px-28 py-4 flex justify-between items-center">
        <a href="#/" class="text-xl font-bold italic text-black">Tempat Curhatmu</a>

        <div class="hidden md:block bg-gray-100 px-5 py-2 rounded-full">
          <ul class="flex gap-x-6 text-sm font-medium text-black">
            ${links
              .map(
                (link) =>
                  `<li><a href="${link.link}" class="hover:font-bold transition">${link.name}</a></li>`
              )
              .join('')}
          </ul>
        </div>

        <div class="flex items-center gap-x-4">
          ${
            token
              ? `<button id="logout-btn" class="hidden md:block bg-black text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition cursor-pointer">
                    Logout
                </button>`
              : `<a href="#/login" class="hidden md:block bg-black text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition">
                    Login
                </a>`
          }
          <button id="hamburger-toggle" class="block md:hidden text-2xl cursor-pointer">☰</button>
        </div>
      </nav>

      <div id="mobile-drawer" class="fixed inset-0 z-40 hidden bg-white flex flex-col items-center justify-center space-y-6 px-6 min-h-screen transition duration-300 ">
        <ul class="flex flex-col gap-y-6 text-lg text-center font-semibold cursor-pointer">
          ${links
            .map(
              (link) => `
            <li>
              <a href="${link.link}" class="hover:underline hover:text-black transition cursor-pointer" onclick="document.getElementById('mobile-drawer').classList.add('hidden') ">
                ${link.name}
              </a>
            </li>
          `
            )
            .join('')}
        </ul>
        ${
          token
            ? `<button id="mobile-logout" class="bg-black text-white px-6 py-3 rounded-lg text-base hover:bg-red-600 transition">Logout</button>`
            : `<a href="#/login" class="bg-black text-white px-6 py-3 rounded-lg text-base hover:bg-gray-800 transition">Login</a>`
        }
        <button id="drawer-close" class="text-3xl text-gray-500 hover:text-black mt-8 cursor-pointer">✕</button>
      </div>
    `;
  },

  async afterRender() {
    const logoutBtn = document.getElementById('logout-btn');
    const mobileLogout = document.getElementById('mobile-logout');
    const hamburger = document.getElementById('hamburger-toggle');
    const drawer = document.getElementById('mobile-drawer');
    const close = document.getElementById('drawer-close');

    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        alert('Berhasil logout!');
        window.location.hash = '#/login';
        window.location.reload();
      });
    }

    if (mobileLogout) {
      mobileLogout.addEventListener('click', () => {
        localStorage.removeItem('token');
        alert('Berhasil logout!');
        window.location.hash = '#/login';
        window.location.reload();
      });
    }

    hamburger?.addEventListener('click', () => {
      drawer?.classList.remove('hidden');
    });

    close?.addEventListener('click', () => {
      drawer?.classList.add('hidden');
    });
  },
};

export default Navbar;
