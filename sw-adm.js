/* Painel do Dono: avisos no celular a cada pagamento (Firebase Cloud Messaging). Não guarda as páginas: o Painel sempre abre da internet. */
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('push', e => {
  let d = {}; try { d = e.data ? e.data.json() : {}; } catch (er) { d = { data: { titulo: 'NEXUM', corpo: e.data ? e.data.text() : '' } }; }
  const x = d.data || {}, n = d.notification || {};
  e.waitUntil(self.registration.showNotification(x.titulo || n.title || 'NEXUM · Painel do Dono', { body: x.corpo || n.body || '', icon: 'https://rh.nexumdp.com.br/icon-192.png', badge: 'https://rh.nexumdp.com.br/icon-192.png', data: { url: x.url || './' }, tag: x.tag || 'nx-adm', renotify: true }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close(); const url = new URL((e.notification.data && e.notification.data.url) || './', self.registration.scope).href;
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(l => { const c = l.find(x => x.url.startsWith(self.registration.scope)); if (c) { c.focus(); return; } return clients.openWindow(url); }));
});
