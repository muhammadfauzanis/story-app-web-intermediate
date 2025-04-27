import { getAllStories } from '../../../data/api';

export default class StoryListPresenter {
  async init() {
    this.#loadStories();
  }

  async #loadStories() {
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

      this.#renderStoryCards(listStory);
      this.#renderMap(listStory);
    } catch (error) {
      console.error(error);
      container.innerHTML = `<p class="text-red-500 text-center">Gagal memuat cerita.</p>`;
    }
  }

  #renderStoryCards(listStory) {
    const container = document.getElementById('story-list');
    container.innerHTML = listStory
      .map((story) => {
        const createdAtFormatted = new Date(story.createdAt).toLocaleDateString(
          'id-ID',
          {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }
        );

        return `
          <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            <img src="${story.photoUrl}" alt="Cerita dari ${story.name}" class="h-48 w-full object-cover">
            <div class="p-4 flex flex-col justify-between flex-1">
              <div>
                <h3 class="text-lg font-semibold mb-1">${story.name}</h3>
                <p class="text-xs text-gray-400 mb-2">${createdAtFormatted}</p>
                <p class="text-sm text-gray-600 line-clamp-3">${story.description}</p>
              </div>
              <a href="#/stories/${story.id}" class="mt-4 text-sm text-black font-semibold hover:underline self-start">
                Lihat Detail →
              </a>
            </div>
          </div>
        `;
      })
      .join('');
  }

  #renderMap(listStory) {
    const map = L.map('story-map').setView([-2.5, 117.5], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    listStory.forEach((story) => {
      if (story.lat && story.lon) {
        const marker = L.marker([story.lat, story.lon]).addTo(map);
        marker.bindPopup(`
          <strong>${story.name}</strong><br>
          ${story.description.slice(0, 60)}...
          <br><a href="#/stories/${
            story.id
          }" class="text-blue-600 underline">Lihat detail</a>
        `);
      }
    });
  }
}
