import { getAllStories } from '../../data/api';

export default class StoryListPage {
  async render() {
    return `
      <section class="min-h-screen px-6 py-10 bg-gray-50">
        <h2 class="text-2xl font-bold mb-6 pt-10">Cerita Pengguna</h2>
        <div id="story-list" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        </div>
      </section>
    `;
  }

  async afterRender() {
    const container = document.getElementById('story-list');
    const token = localStorage.getItem('token');

    if (!token) {
      container.innerHTML = `<p class="text-center text-red-500">Anda harus login untuk melihat cerita.</p>`;
      return;
    }

    try {
      const { listStory } = await getAllStories();

      if (!listStory.length) {
        container.innerHTML = `<p class="text-center text-gray-500">Belum ada cerita.</p>`;
        return;
      }

      container.innerHTML = listStory
        .map(
          (story) => `
          <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            <img src="${story.photoUrl}" alt="Cerita dari ${story.name}" class="h-48 w-full object-cover">
            <div class="p-4 flex flex-col justify-between flex-1">
              <div>
                <h3 class="text-lg font-semibold mb-1">${story.name}</h3>
                <p class="text-sm text-gray-600 line-clamp-3">${story.description}</p>
              </div>
              <a href="#/stories/${story.id}" class="mt-4 text-sm text-black font-semibold hover:underline self-start">
                Lihat Detail →
              </a>
            </div>
          </div>
        `
        )
        .join('');
    } catch (err) {
      console.error(err);
      container.innerHTML = `<p class="text-red-500 text-center">Gagal memuat cerita. Pastikan Anda sudah login.</p>`;
    }
  }
}
