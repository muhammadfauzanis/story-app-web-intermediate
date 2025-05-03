self.addEventListener('push', function (event) {
  let data = {
    title: 'Notifikasi',
    options: {
      body: 'Ada aktivitas baru!',
    },
  };

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      console.error('Gagal parsing notifikasi:', e);
    }
  }

  event.waitUntil(self.registration.showNotification(data.title, data.options));
});
