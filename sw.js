//Install the Service Worker and cache the assets
let staticCacheName = 'rr-cache-v1';
let contentToBeCached = [
'/',
'index.html',
'restaurant.html',
'css/styles.css',
'css/media-queries.css',
'js/main.js',
'js/dbhelper.js',
'js/restaurant_info.js',
'img/1.jpg',
'img/2.jpg',
'img/3.jpg',
'img/4.jpg',
'img/5.jpg',
'img/6.jpg',
'img/7.jpg',
'img/8.jpg',
'img/9.jpg',
'img/10.jpg',
'js/sw_register.js',
'data/restaurants.json'
];
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(staticCacheName).then(function(cache) {
			return cache.addAll(contentToBeCached);
		})
	);
});

//Service Worker intercepts the requests made to the network and returns cached version of the assets
self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			if (response) return response;
			return fetch(event.request);
		})
	);
});

//Service Worker updates the static cache
self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					return cacheName.startsWith('rr-cache-') &&
							cacheName != staticCacheName;
				}).map(cacheName => {
					return cache.delete(cacheName);
				})
			);
		})
	);
});




