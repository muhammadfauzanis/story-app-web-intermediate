import { getStoryDetail } from '../../../data/api';
import { saveStory } from '../../../utils/indexeddb';

export default class StoryDetailPresenter {
  async init() {
    this.#loadStoryDetail();
  }

  async #loadStoryDetail() {
    const container = document.getElementById('story-detail');
    const token = localStorage.getItem('token');

    if (!token) {
      container.innerHTML = `<p class="text-center text-red-500">Anda harus login untuk melihat cerita.</p>`;
      return;
    }

    const id = window.location.hash.split('/')[2];

    try {
      const { story } = await getStoryDetail(id);

      const createdAt = new Date(story.createdAt).toLocaleString('id-ID', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });

      container.innerHTML = `
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <img src="${story.photoUrl}" alt="Foto ${
        story.name
      }" class="w-full h-72 object-cover">
          <div class="p-6 space-y-4">
            <h2 class="text-2xl font-bold">${story.name}</h2>
            <p class="text-sm text-gray-500">Diposting pada ${createdAt}</p>
            <p class="text-base text-gray-800 whitespace-pre-line">${
              story.description
            }</p>
            ${
              story.lat && story.lon
                ? `<p class="text-sm text-gray-600 mt-4">Lokasi: (${story.lat}, ${story.lon})</p>`
                : ''
            }
            <button id="save-story-btn" class="mt-6 bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
              Simpan Cerita
            </button>
          </div>
        </div>
      `;

      document
        .getElementById('save-story-btn')
        ?.addEventListener('click', async () => {
          try {
            await saveStory(story);
            alert('Cerita berhasil disimpan untuk offline!');
          } catch (err) {
            console.error(err);
            alert('Gagal menyimpan cerita.');
          }
        });
    } catch (error) {
      console.error(error);
      container.innerHTML = `<p class="text-red-500 text-center">Gagal memuat cerita. Pastikan ID valid dan token aktif.</p>`;
    }
  }
}
