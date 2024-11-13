// public/custom-sw.js

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

if (workbox) {
  console.log('Workbox is loaded');

  // Precaching static assets (this will cache files in the build)
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

  // Cache network requests for API responses, images, etc.
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'document' || request.destination === 'script' || request.destination === 'style',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'dynamic-resources',
    })
  );

  // Cache images
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
      cacheName: 'image-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50, // Limit cache size
          maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for a month
        }),
      ],
    })
  );
} else {
  console.log('Workbox could not be loaded.');
}
