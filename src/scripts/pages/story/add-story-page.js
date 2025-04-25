import { postStory } from '../../data/api';

export default class AddStoryPage {
  #stream = null;

  async render() {
    return `
      <section class="min-h-screen bg-gray-50 flex justify-center items-center px-4 py-10 pt-24">
        <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl">
          <h2 class="text-2xl font-bold mb-2">Tambah Cerita</h2>
          <p class="text-sm text-gray-500 mb-6">Bagikan pengalamanmu hari ini.</p>

          <form id="add-story-form" class="space-y-5">
            <div>
              <label for="description" class="block text-sm font-medium mb-1">Isi Cerita</label>
              <textarea id="description" required rows="5" placeholder="Tulis cerita kamu..."
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"></textarea>
            </div>

            <div>
              <label for="photo" class="block text-sm font-medium mb-1">Unggah Gambar</label>
              <input type="file" id="photo" accept="image/*" required
                class="w-full file:bg-black file:text-white file:px-4 file:py-2 file:rounded-lg file:border-0 hover:file:bg-gray-800 text-sm text-gray-500" />
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium mb-1">Ambil Gambar dengan Kamera</label>
              <video id="camera" autoplay class="rounded-lg w-full h-64 object-cover border border-gray-300"></video>
              <button type="button" id="capture" class="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
                Ambil Foto
              </button>
              <canvas id="snapshot" class="hidden"></canvas>
            </div>

            <div class="flex gap-4">
              <input type="number" step="any" id="lat" placeholder="Latitude (opsional)"
                class="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-black focus:outline-none" />
              <input type="number" step="any" id="lon" placeholder="Longitude (opsional)"
                class="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-black focus:outline-none" />
            </div>

            <div id="map" class="h-64 w-full rounded-lg border border-gray-300"></div>

            <button type="submit"
              id="submit-story"
              class="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
              Kirim Cerita
            </button>
          </form>
        </div>
      </section>
    `;
  }

  async afterRender() {
    const form = document.getElementById('add-story-form');
    const button = document.getElementById('submit-story');

    const map = L.map('map').setView([-6.2, 106.8166], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    let marker;
    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      document.getElementById('lat').value = lat.toFixed(6);
      document.getElementById('lon').value = lng.toFixed(6);

      if (marker) {
        marker.setLatLng([lat, lng]);
      } else {
        marker = L.marker([lat, lng]).addTo(map);
      }
    });

    const video = document.getElementById('camera');
    const canvas = document.getElementById('snapshot');
    const captureButton = document.getElementById('capture');

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        this.#stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        video.srcObject = this.#stream;
      } catch (err) {
        console.warn('Kamera tidak tersedia:', err);
      }
    }

    captureButton.addEventListener('click', () => {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        const file = new File([blob], 'captured-photo.jpg', {
          type: 'image/jpeg',
        });
        document.getElementById('photo').files = this.#createFileList(file);
        alert('Gambar dari kamera telah diambil!');
      }, 'image/jpeg');
    });

    form?.addEventListener('submit', async (e) => {
      e.preventDefault();

      const description = document.getElementById('description').value.trim();
      const photo = document.getElementById('photo').files[0];
      const lat = document.getElementById('lat').value || null;
      const lon = document.getElementById('lon').value || null;

      if (!description || !photo) {
        alert('Deskripsi dan gambar wajib diisi!');
        return;
      }

      button.disabled = true;
      button.textContent = 'Mengirim...';

      try {
        await postStory({ description, photo, lat, lon });
        alert('Cerita berhasil dikirim!');
        window.location.hash = '#/stories';
      } catch (error) {
        alert(`Gagal mengirim cerita: ${error.message}`);
      } finally {
        button.disabled = false;
        button.textContent = 'Kirim Cerita';
        this.#stopCamera(); // Stop kamera setelah submit
      }
    });

    window.addEventListener(
      'hashchange',
      () => {
        this.#stopCamera();
      },
      { once: true }
    );
  }

  #createFileList(file) {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    return dataTransfer.files;
  }

  #stopCamera() {
    if (this.#stream) {
      this.#stream.getTracks().forEach((track) => track.stop());
      this.#stream = null;
    }
  }
}
