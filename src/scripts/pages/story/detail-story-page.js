import { getStoryDetail } from '../../data/api';

export default class StoryDetailPage {
  async render() {
    return `
      <section class="min-h-screen px-6 py-10 bg-gray-50">
        <div id="story-detail" class="max-w-3xl mx-auto">
          <p class="text-center text-gray-500">Memuat cerita...</p>
        </div>
      </section>
    `;
  }

  async afterRender() {
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
          </div>
        </div>
      `;
    } catch (err) {
      console.error(err);
      container.innerHTML = `<p class="text-red-500 text-center">Gagal memuat cerita. Pastikan ID valid dan token aktif.</p>`;
    }
  }
}
