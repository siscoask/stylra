/* Stylra V4 — Service Worker */
const CACHE = 'stylra-v4.2';
const FONT_CACHE = 'stylra-fonts-v1';
const OFFLINE = 'offline.html';
const MAX_FONT_CACHE = 50 * 1024 * 1024;
const PRECACHE = [
  'app.html', 'landing.html', 'offline.html', '404.html', 'manifest.json',
  'css/app.css', 'css/landing.css', 'js/transforms.js',
  'icons/favicon-simple.svg', 'icons/icon-192.png', 'icons/icon-512.png',
  'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE.map(u => new Request(u, {cache:'reload'})))).then(() => self.skipWaiting()).catch(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE && k !== FONT_CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (!url.protocol.startsWith('http')) return;
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(cacheFontFirst(req));
    return;
  }
  if (req.headers.get('Accept')?.includes('text/html')) {
    e.respondWith(networkFirst(req));
    return;
  }
  e.respondWith(cacheFirst(req));
});

async function cacheFirst(req, cacheName = CACHE) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  if (cached) return cached;
  try { 
    const r = await fetch(req); 
    if (r.ok) cache.put(req, r.clone()); 
    return r; 
  }
  catch { return cached || new Response('Offline', { status: 503 }); }
}

async function cacheFontFirst(req) {
  const cache = await caches.open(FONT_CACHE);
  const cached = await cache.match(req);
  if (cached) return cached;
  try {
    const r = await fetch(req);
    if (r.ok) {
      const size = r.headers.get('content-length') || 0;
      if (parseInt(size) < MAX_FONT_CACHE) {
        cache.put(req, r.clone());
      }
    }
    return r;
  }
  catch { return cached || new Response('Offline', { status: 503 }); }
}

async function networkFirst(req) {
  try { 
    const r = await fetch(req); 
    if (r.ok) (await caches.open(CACHE)).put(req, r.clone()); 
    return r; 
  }
  catch { 
    return (await caches.match(req)) || (await caches.match(OFFLINE)) || (await caches.match('404.html')); 
  }
}

self.addEventListener('message', e => { if (e.data?.type === 'SKIP_WAITING') self.skipWaiting(); });
