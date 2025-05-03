export default class NotFoundPage {
  async render() {
    return `
        <section class="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-white">
          <div class="max-w-xl">
            <h1 class="text-6xl font-extrabold text-black mb-4">404</h1>
            <p class="text-xl text-gray-700 mb-6">Oops! Halaman tidak ditemukan.</p>
            <a href="#/" class="inline-block bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition">
              Kembali ke Beranda
            </a>
          </div>
        </section>
      `;
  }

  async afterRender() {
    // Tidak ada interaksi khusus
  }
}
