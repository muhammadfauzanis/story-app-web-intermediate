import { postStory } from '../../../data/api';

export default class AddStoryPresenter {
  #stream = null;

  async init() {
    this.#setupMap();
    this.#setupCamera();
    this.#setupForm();
    this.#handleHashChange();
  }

  #setupMap() {
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
  }

  async #setupCamera() {
    const video = document.getElementById('camera');
    const captureButton = document.getElementById('capture');
    const canvas = document.getElementById('snapshot');

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
  }

  #setupForm() {
    const form = document.getElementById('add-story-form');
    const button = document.getElementById('submit-story');

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
        this.#stopCamera();
      }
    });
  }

  #createFileList(file) {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    return dataTransfer.files;
  }

  #handleHashChange() {
    window.addEventListener(
      'hashchange',
      () => {
        this.#stopCamera();
      },
      { once: true }
    );
  }

  #stopCamera() {
    if (this.#stream) {
      this.#stream.getTracks().forEach((track) => track.stop());
      this.#stream = null;
    }
  }
}
