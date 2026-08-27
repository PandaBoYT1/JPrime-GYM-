/* ===== JPrime GYM - Interactividad ===== */
document.addEventListener('DOMContentLoaded', function () {
  var header = document.getElementById('header');
  var navToggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');

  // Header con fondo al hacer scroll
  function onScroll() {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Menú móvil
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      navToggle.classList.toggle('open');
    });
    // Cerrar el menú al hacer clic en un enlace
    nav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        navToggle.classList.remove('open');
      });
    });
  }

  // Año dinámico en el footer
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Animación de aparición al hacer scroll
  var revealEls = document.querySelectorAll('.card, .plan, .section__head, .schedule, .contact__info, .contact__form');
  revealEls.forEach(function (el) { el.classList.add('reveal'); });

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

  // Validación del formulario de contacto
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');

  function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name;
      var email = form.email;
      var valid = true;

      [name, email].forEach(function (input) { input.classList.remove('invalid'); });

      if (!name.value.trim()) { name.classList.add('invalid'); valid = false; }
      if (!isEmail(email.value.trim())) { email.classList.add('invalid'); valid = false; }

      if (!valid) {
        status.textContent = 'Por favor completa tu nombre y un email válido.';
        status.className = 'form__status error';
        return;
      }

      status.textContent = '¡Gracias, ' + name.value.trim() + '! Te contactaremos muy pronto.';
      status.className = 'form__status ok';
      form.reset();
    });
  }
});
