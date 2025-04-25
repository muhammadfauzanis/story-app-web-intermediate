self.addEventListener('push', function (event) {
  const data = event.data.json();

  const title = data.title || 'Notifikasi Baru';
  const options = data.options || {};

  event.waitUntil(self.registration.showNotification(title, options));
});
