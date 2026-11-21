// شوشي فِت: الصفحة والصور بتشتغل بلا نت بعد أول فتحة (الشبكة أولاً، والنسخة المحفوظة احتياط)
const C = "sf-v1";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin || u.pathname.endsWith(".mp4")) return;
  e.respondWith(fetch(e.request).then((r) => {
    if (r.ok && r.status === 200) { const copy = r.clone(); caches.open(C).then((c) => c.put(e.request, copy)); }
    return r;
  }).catch(() => caches.match(e.request)));
});
