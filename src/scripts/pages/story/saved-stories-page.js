import { getAllSavedStories, deleteStory } from '../../utils/indexeddb';

export default class SavedStoriesPage {
  async render() {
    return `
      <section class="min-h-screen px-6 py-10 bg-gray-50">
        <h2 class="text-2xl font-bold mb-6 pt-10">Cerita Tersimpan (Offline)</h2>
        <div id="saved-stories" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"></div>
      </section>
    `;
  }

  async afterRender() {
    const container = document.getElementById('saved-stories');
    const stories = await getAllSavedStories();

    if (!stories.length) {
      container.innerHTML = `<p class="text-center text-gray-500">Tidak ada cerita tersimpan.</p>`;
      return;
    }

    container.innerHTML = stories
      .map(
        (story) => `
      <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col relative">
        <img src="${story.photoUrl}" alt="${story.name}" class="h-48 w-full object-cover">
        <div class="p-4 flex flex-col flex-1">
          <h3 class="text-lg font-semibold mb-1">${story.name}</h3>
          <p class="text-sm text-gray-600 mb-2">${story.description}</p>
          <button data-id="${story.id}" class="delete-btn text-sm text-red-500 hover:underline self-start mt-auto">Hapus</button>
        </div>
      </div>
    `
      )
      .join('');

    container.querySelectorAll('.delete-btn').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const id = e.target.getAttribute('data-id');
        await deleteStory(id);
        this.afterRender();
      });
    });
  }
}
