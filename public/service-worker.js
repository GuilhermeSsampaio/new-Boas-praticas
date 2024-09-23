importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js",
);

// Precaching de arquivos essenciais
workbox.precaching.precacheAndRoute([
  // Precaching das páginas principais
  { url: "/", revision: "1" }, // Página inicial
  { url: "/edicao-completa", revision: "1" },
  { url: "/autores", revision: "1" }, // Exemplo de página "sobre"

  // Precaching dos arquivos estáticos gerados no build
  { url: "/_next/static/chunks/pages/index.js", revision: "1" },
  { url: "/_next/static/chunks/pages/edicao-completa.js", revision: "1" },
  { url: "/_next/static/chunks/pages/autores.js", revision: "1" },

  // Manifests e outros recursos
  { url: "/manifest.json", revision: "1" },
  { url: "/favicon.ico", revision: "1" },

  // Recursos de mídia
  // { url: "/logo.png", revision: "1" },
]);

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

// Rota para a API de capítulos
workbox.routing.registerRoute(
  new RegExp("https://api-cartilha.squareweb.app/api/capitulos?populate=*"),
  new workbox.strategies.NetworkFirst({
    cacheName: "api-capitulos-cache",
  }),
);

// Rota para a API de autores
workbox.routing.registerRoute(
  new RegExp("https://api-cartilha.squareweb.app/api/autors?populate=*"),
  new workbox.strategies.NetworkFirst({
    cacheName: "api-autores-cache",
  }),
);

self.addEventListener("fetch", (event) => {
  if (
    event.request.url.includes("/api/capitulos") ||
    event.request.url.includes("/api/autors")
  ) {
    const promiseChain = fetch(event.request.clone()).catch(() => {
      return self.registration.sync.register("syncData");
    });
    event.waitUntil(promiseChain);
  }
});

self.addEventListener("sync", (event) => {
  if (event.tag === "syncData") {
    event.waitUntil(syncData());
  }
});

function syncData() {
  return workbox.precaching.cleanupOutdatedCaches().then(() => {
    return workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
  });
}

// Rotas para arquivos estáticos
workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif|ico|css)$/,
  new workbox.strategies.CacheFirst({
    cacheName: "static-cache",
  }),
);

// Rota para o arquivo de manifest
workbox.routing.registerRoute(
  /manifest.json$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "manifest-cache",
  }),
);

// Rota para outras rotas (página principal, etc.)
workbox.routing.registerRoute(
  ({ url }) => url.origin === self.location.origin,
  new workbox.strategies.StaleWhileRevalidate(),
);

// Fallback para páginas offline
workbox.routing.setCatchHandler(({ event }) => {
  if (event.request.destination === "document") {
    return caches.match("/offline");
  }
  return Response.error();
});

// Atualização do Service Worker
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [
    "static-cache",
    "api-capitulos-cache",
    "api-autores-cache",
    "manifest-cache",
  ];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});
