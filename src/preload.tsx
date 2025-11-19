// Lightweight preload helper: keep "preloading" class on <body> until window 'load' or timeout.
// Also swaps <img data-src="..."> -> src to lazy-init heavy images after initial paint.

(function () {
  // start in preloading mode
  document.body.classList.add('preloading');

  function liftPreload() {
    if (!document.body.classList.contains('preloading')) return;
    // small delay so first paint happens smoothly
    setTimeout(() => {
      // swap deferred images
      document.querySelectorAll<HTMLImageElement>('img[data-src]').forEach(img => {
        const src = img.getAttribute('data-src');
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
          img.style.visibility = '';
          img.style.opacity = '';
        }
      });
      // swap deferred background elements (.defer-bg[data-bg])
      document.querySelectorAll<HTMLElement>('.defer-bg[data-bg]').forEach(el => {
        const bg = el.getAttribute('data-bg');
        if (bg) {
          el.style.backgroundImage = `url(${bg})`;
          el.removeAttribute('data-bg');
          el.classList.remove('defer-bg');
        }
      });

      // remove preloading mode
      document.body.classList.remove('preloading');
    }, 250); // tweak delay if needed
  }

  // remove preloading once all resources finished loading
  window.addEventListener('load', liftPreload, { once: true });

  // safety fallback: remove after 2500ms in case load event is delayed
  setTimeout(liftPreload, 2500);
})();