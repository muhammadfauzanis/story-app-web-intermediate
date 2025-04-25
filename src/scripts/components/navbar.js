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
        <!-- Logo -->
        <a href="#/" class="text-xl font-bold italic text-black">Tempat Curhatmu</a>

        <!-- Desktop Menu -->
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

        <!-- Right -->
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
          <button id="hamburger-toggle" class="block md:hidden text-2xl">☰</button>
        </div>


        <!-- Mobile Drawer (optional if you use mobile menu toggle) -->
      </nav>
    `;
  },

  async afterRender() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        alert('Berhasil logout!');
        window.location.hash = '#/login';
        window.location.reload();
      });
    }
  },
};

export default Navbar;
