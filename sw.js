// Offline cache for the Bali 2027 app. Shell files are precached; place photos, fonts, Leaflet and Firebase scripts are cached as they are fetched.
const V = 'bali-20261031-024954'; const SHELL = ["./", "index.html", "manifest.webmanifest", "basemap.json", "seed.json", "icon-192.png", "icon-512.png", "icon-180.png", "img/batur.jpg", "img/campuhan.jpg", "img/kelingking.jpg", "img/kuta.jpg", "img/tanahlot.jpg", "img/tegalalang.jpg", "img/tirtaempul.jpg", "img/uluwatu.jpg", "thumbs/i02.jpg", "thumbs/i03.jpg", "thumbs/i04.jpg", "thumbs/i05.jpg", "thumbs/i06.jpg", "thumbs/i09.jpg", "thumbs/i11.jpg", "thumbs/i12.jpg", "thumbs/i13.jpg", "thumbs/i14.jpg", "thumbs/i16.jpg", "thumbs/i23.jpg", "thumbs/s01.jpg", "thumbs/s02.jpg", "thumbs/s05.jpg", "thumbs/s06.jpg", "thumbs/s07.jpg", "thumbs/s08.jpg", "thumbs/s09.jpg", "thumbs/s10.jpg", "thumbs/s11.jpg", "thumbs/s12.jpg", "thumbs/s13.jpg", "thumbs/s15.jpg", "thumbs/s16.jpg", "thumbs/s19.jpg", "thumbs/s21.jpg", "thumbs/s23.jpg", "thumbs/s24.jpg"];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url); if (e.request.method !== 'GET') return;
  if (u.hostname.includes('firestore') || u.hostname.includes('open-meteo')) return;
  const nav = e.request.mode === 'navigate' || u.pathname.endsWith('/index.html') || u.pathname.endsWith('/');
  if (nav) { e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(V).then(x => x.put(e.request, c)); return r; }).catch(() => caches.match(e.request).then(r => r || caches.match('./')))); return; }
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(r => { if (r.ok && (u.origin === location.origin || /gstatic|googleapis|cdnjs/.test(u.hostname))) { const c = r.clone(); caches.open(V).then(x => x.put(e.request, c)); } return r; })));
});
