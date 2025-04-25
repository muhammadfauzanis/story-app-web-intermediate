export default class HomePage {
  async render() {
    return `
      <section class="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-white">
        <div class="max-w-2xl">
          <h1 class="text-4xl sm:text-5xl font-bold mb-4 text-black leading-tight">
            Selamat Datang di <span class="italic">Tempat Curhatmu</span>
          </h1>
          <p class="text-gray-600 text-lg mb-8">
            Bagikan pengalamanmu, dengarkan kisah orang lain, dan temukan makna di setiap cerita.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#/stories" class="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition">
              Lihat Cerita
            </a>
            <a href="#/add-story" class="border border-black text-black px-6 py-3 rounded-full font-semibold hover:bg-black hover:text-white transition">
              Tambah Cerita
            </a>
          </div>

         
        </div>
      </section>
    `;
  }

  async afterRender() {}
}
