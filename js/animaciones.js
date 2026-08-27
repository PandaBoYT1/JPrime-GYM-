/* =====================================================
   JPrime Gimnasio - Animaciones
   Controla la aparición de elementos al hacer scroll.
   Las animaciones de entrada del hero (floatUp, pulseGlow)
   son puramente CSS y se disparan al cargar la página
   (ver css/animaciones.css).
   ===================================================== */
document.addEventListener('DOMContentLoaded', function () {
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }
});
