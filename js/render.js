/* =====================================================
   JPrime Gimnasio - Render dinámico de la página
   Lee los datos (defaults + localStorage) y pinta los
   planes, suplementos, la galería y el horario de
   atención. Se ejecuta ANTES que animaciones.js para
   que el observer de scroll capture los .reveal nuevos.
   ===================================================== */
(function () {
  var J = window.JPRIME;
  if (!J) return;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function render() {
    var data = J.getData();

    // ---- Disciplinas (clases) ----
    var discGrid = document.getElementById("disciplinesGrid");
    if (discGrid) {
      discGrid.innerHTML = data.disciplinas.map(function (d, i) {
        return '' +
          '<article class="discipline reveal" data-delay="' + (i + 1) + '">' +
            '<div class="discipline__icon">' + esc(d.icono) + "</div>" +
            '<h3 class="discipline__title">' + esc(d.titulo) + "</h3>" +
            '<p class="discipline__text">' + esc(d.texto) + "</p>" +
          "</article>";
      }).join("");
    }

    // ---- Horario de clases (tabla) ----
    var schedWrap = document.getElementById("scheduleWrap");
    if (schedWrap) {
      var hc = data.horarioClases;
      var head = "<tr><th>Hora</th>" + hc.dias.map(function (d) { return "<th>" + esc(d) + "</th>"; }).join("") + "</tr>";
      var body = hc.filas.map(function (f) {
        var cells = f.clases.map(function (c) { return "<td>" + esc(c) + "</td>"; }).join("");
        return "<tr><td>" + esc(f.hora) + "</td>" + cells + "</tr>";
      }).join("");
      schedWrap.innerHTML = '<table class="schedule"><thead>' + head + "</thead><tbody>" + body + "</tbody></table>";
    }

    // ---- Planes ----
    var plansGrid = document.getElementById("plansGrid");
    if (plansGrid) {
      plansGrid.innerHTML = data.planes.map(function (p, i) {
        var badge = p.destacado && p.badge
          ? '<span class="plan__badge">' + esc(p.badge) + "</span>" : "";
        var feats = p.features.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("");
        var btnClass = p.destacado ? "btn--primary" : "btn--ghost";
        var href = J.waLink(J.mensajePlan(p));
        return '' +
          '<article class="plan reveal' + (p.destacado ? " plan--featured" : "") + '" data-delay="' + (i + 1) + '">' +
            badge +
            '<h3 class="plan__name">' + esc(p.nombre) + "</h3>" +
            '<p class="plan__desc">' + esc(p.desc) + "</p>" +
            '<p class="plan__price"><span>S/</span>' + esc(p.precio) + "<small>/mes</small></p>" +
            '<ul class="plan__features">' + feats + "</ul>" +
            '<a href="' + href + '" target="_blank" rel="noopener" class="btn ' + btnClass + ' plan__btn">Elegir ' + esc(p.nombre.toLowerCase()) + "</a>" +
          "</article>";
      }).join("");
    }

    // ---- Suplementos ----
    var supsGrid = document.getElementById("supsGrid");
    if (supsGrid) {
      supsGrid.innerHTML = data.suplementos.map(function (s, i) {
        var media = s.img
          ? '<div class="supplement__img" data-sup="' + i + '" role="button" tabindex="0" title="Ver detalle" style="background-image:url(\'' + s.img.replace(/'/g, "%27") + '\')"></div>'
          : '<div class="supplement__img supplement__img--empty" data-sup="' + i + '" role="button" tabindex="0" title="Ver detalle"><span>Sin foto</span></div>';
        var href = J.waLink(J.mensajeSuplemento(s));
        return '' +
          '<article class="supplement reveal" data-delay="' + (i + 1) + '">' +
            media +
            '<div class="supplement__body">' +
              '<h3 class="supplement__name">' + esc(s.nombre) + "</h3>" +
              '<p class="supplement__desc">' + esc(s.desc) + "</p>" +
              '<p class="supplement__price">S/ ' + esc(s.precio) + "</p>" +
              '<a href="' + href + '" target="_blank" rel="noopener" class="btn btn--primary supplement__btn">Consultar por WhatsApp</a>' +
            "</div>" +
          "</article>";
      }).join("");

      // Abrir modal al hacer clic en la foto del suplemento
      Array.prototype.forEach.call(supsGrid.querySelectorAll("[data-sup]"), function (el) {
        function open() { openSupModal(data.suplementos[parseInt(el.getAttribute("data-sup"), 10)]); }
        el.addEventListener("click", open);
        el.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
        });
      });
    }

    // ---- Galería (hidratar src + caption) ----
    var figs = document.querySelectorAll("[data-gal]");
    figs.forEach(function (fig) {
      var idx = parseInt(fig.getAttribute("data-gal"), 10);
      var g = data.galeria[idx];
      if (!g) return;
      var img = fig.querySelector("img");
      var cap = fig.querySelector("figcaption");
      if (img && g.img) img.src = g.img;
      if (cap && g.caption != null) cap.textContent = g.caption;
    });

    // ---- Horario de atención ----
    var hEls = document.querySelectorAll("[data-horario]");
    var texto = J.horarioTexto(data.horario);
    hEls.forEach(function (el) { el.textContent = texto; });
  }

  /* ---- Modal de suplemento ---- */
  var modal = document.getElementById("supModal");

  function closeSupModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function openSupModal(s) {
    if (!modal || !s) return;
    var imgWrap = document.getElementById("supModalImg");
    imgWrap.className = "modal__img";
    if (s.img) {
      imgWrap.innerHTML = '<img src="' + s.img.replace(/"/g, "&quot;") + '" alt="' + esc(s.nombre) + '" />';
    } else {
      imgWrap.classList.add("modal__img--empty");
      imgWrap.innerHTML = "<span>Sin foto disponible</span>";
    }
    document.getElementById("supModalName").textContent = s.nombre;
    document.getElementById("supModalDesc").textContent = s.desc || "";
    document.getElementById("supModalPrice").textContent = "S/ " + s.precio;
    document.getElementById("supModalBtn").href = J.waLink(J.mensajeSuplemento(s));
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  if (modal) {
    modal.querySelectorAll("[data-close]").forEach(function (el) {
      el.addEventListener("click", closeSupModal);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeSupModal();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
