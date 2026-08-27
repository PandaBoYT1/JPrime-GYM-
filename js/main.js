/* ===== JPrime Gimnasio - Interactividad principal ===== */
document.addEventListener('DOMContentLoaded', function () {
  var navToggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');

  // Menú móvil
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      navToggle.classList.toggle('open');
    });
    nav.querySelectorAll('.nav__link, .nav__cta').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        navToggle.classList.remove('open');
      });
    });
  }

  // Año dinámico en el footer
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

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
