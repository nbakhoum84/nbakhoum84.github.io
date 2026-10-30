// Sizes the home-nader app iframe (#hn-app-frame) on home-nader.com/app. Loaded by the HTML block on that page (site-snippet/app-embed.html in nbakhoum84/mytest).
(function () {
  if (window.__hnResize) return;
  window.__hnResize = 1;
  var O = 'https://nbakhoum84.github.io';
  function fr() { return document.getElementById('hn-app-frame'); }
  function view() {
    var f = fr();
    if (!f || !f.contentWindow) return;
    var r = f.getBoundingClientRect(), n = 0, e = document.elementFromPoint(innerWidth / 2, 4);
    for (; e && e !== document.body; e = e.parentElement) {
      var p = getComputedStyle(e).position;
      if (p === 'fixed' || p === 'sticky') { n = e.getBoundingClientRect().bottom; break; }
    }
    f.contentWindow.postMessage({ type: 'hn-view', top: Math.max(0, n - r.top) }, O);
  }
  var fr0 = fr(); if (fr0) fr0.addEventListener('load', view);
  for (var i = 1; i <= 20; i++) setTimeout(view, i * 400);
  addEventListener('scroll', view, { passive: true });
  addEventListener('resize', view);
  addEventListener('message', function (e) {
    var f = fr();
    if (!f || e.origin !== O || e.source !== f.contentWindow || !e.data) return;
    var d = e.data;
    if (d.type === 'hn-app-height' && d.height > 0) { f.style.height = Math.ceil(d.height) + 'px'; view(); }
    if (d.type === 'hn-app-ready') view();
    if (d.type === 'hn-app-top') { var r = f.getBoundingClientRect(); if (r.top < 0) scrollTo({ top: pageYOffset + r.top - 80 }); }
  });
  view();
})();
