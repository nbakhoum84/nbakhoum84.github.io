// Sizes the home-nader app iframe (#hn-app-frame) on home-nader.com/app. Loaded by the HTML block on that page (site-snippet/app-embed.html in nbakhoum84/mytest).
(function () {
if (window.__hnResize) return;
window.__hnResize = 1;
var O = 'https://nbakhoum84.github.io', last = -1, raf = 0, inset = 0, insetAt = 0;
function fr() { return document.getElementById('hn-app-frame'); }
function post(m) { var f = fr(); if (f && f.contentWindow) f.contentWindow.postMessage(m, O); }
// How far down the app the visible area starts (below the site's sticky header). Cached, because measuring it forces a layout.
function headerInset() {
var now = Date.now();
if (now - insetAt < 1500) return inset;
insetAt = now; inset = 0;
for (var e = document.elementFromPoint(innerWidth / 2, 4); e && e !== document.body; e = e.parentElement) {
var p = getComputedStyle(e).position;
if (p === 'fixed' || p === 'sticky') { inset = e.getBoundingClientRect().bottom; break; }
}
return inset;
}
function view() {
raf = 0;
var f = fr();
if (!f) return;
var top = Math.max(0, Math.round(headerInset() - f.getBoundingClientRect().top));
if (top !== last) { last = top; post({ type: 'hn-view', top: top }); }
}
function sched() { if (!raf) raf = requestAnimationFrame(view); }
addEventListener('scroll', sched, { passive: true });
addEventListener('resize', sched);
addEventListener('message', function (e) {
var f = fr();
if (!f || e.origin !== O || e.source !== f.contentWindow || !e.data) return;
var d = e.data;
if (d.type === 'hn-app-height' && d.height > 0) { var h = Math.ceil(d.height) + 'px'; if (f.style.height !== h) f.style.height = h; last = -1; sched(); }
if (d.type === 'hn-app-ready') { last = -1; sched(); }
if (d.type === 'hn-app-top') { var r = f.getBoundingClientRect(); if (r.top < 0) scrollTo({ top: pageYOffset + r.top - 80 }); }
});
// The page is a single-page app, so the frame can appear at any time: attach to it as soon as it exists, then ask the app for its height a few times.
setInterval(function () {
var f = fr();
if (f && !f._hn) { f._hn = 1; f.addEventListener('load', ping); for (var i = 0; i <= 8; i++) setTimeout(ping, i * 500); }
}, 500);
function ping() { last = -1; post({ type: 'hn-ping' }); sched(); }
})();
