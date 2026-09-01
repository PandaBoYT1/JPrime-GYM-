/* =====================================================
   JPrime Gimnasio - Panel de administración
   Login + edición de horario, galería, planes y
   suplementos, guardando en localStorage.
   ===================================================== */
(function () {
  var J = window.JPRIME;
  var $ = function (s, ctx) { return (ctx || document).querySelector(s); };
  var $$ = function (s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); };

  var loginView = $("#loginView");
  var appView = $("#appView");
  var toastEl = $("#toast");
  var toastTimer;

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 2200);
  }
  function esc(v) { return (v == null ? "" : String(v)).replace(/"/g, "&quot;"); }

  /* ---------- Sesión ---------- */
  function isLogged() {
    try { return localStorage.getItem(J.KEYS.sesion) === "true"; } catch (e) { return false; }
  }
  function showApp() {
    loginView.style.display = "none";
    appView.classList.add("active");
    renderAll();
  }
  function showLogin() {
    appView.classList.remove("active");
    loginView.style.display = "flex";
  }

  $("#loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var u = $("#usuario").value.trim();
    var c = $("#clave").value;
    if (u === J.ADMIN.usuario && c === J.ADMIN.clave) {
      try { localStorage.setItem(J.KEYS.sesion, "true"); } catch (err) {}
      $("#loginError").textContent = "";
      showApp();
    } else {
      $("#loginError").textContent = "Usuario o contraseña incorrectos.";
    }
  });

  $("#logoutBtn").addEventListener("click", function () {
    try { localStorage.removeItem(J.KEYS.sesion); } catch (e) {}
    location.reload();
  });

  /* ---------- Tabs ---------- */
  $$(".tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      $$(".tab").forEach(function (t) { t.classList.remove("active"); });
      $$(".panel").forEach(function (p) { p.classList.remove("active"); });
      tab.classList.add("active");
      $('.panel[data-panel="' + tab.getAttribute("data-tab") + '"]').classList.add("active");
    });
  });

  /* ---------- Compresión de imágenes ---------- */
  function fileToCompressedDataURL(file, maxW, quality) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () {
        var img = new Image();
        img.onload = function () {
          var scale = Math.min(1, maxW / img.width);
          var w = Math.round(img.width * scale);
          var h = Math.round(img.height * scale);
          var canvas = document.createElement("canvas");
          canvas.width = w; canvas.height = h;
          canvas.getContext("2d").drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL("image/jpeg", quality || 0.82));
        };
        img.onerror = reject;
        img.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function saveOrWarn(key, value) {
    var ok = J.save(key, value);
    if (!ok) {
      alert("No se pudo guardar: el almacenamiento del navegador está lleno. " +
            "Las imágenes muy grandes ocupan mucho espacio; intenta con fotos más livianas.");
    }
    return ok;
  }

  /* ---------- Estado de edición en memoria ---------- */
  var work = {};
  function loadWork() {
    var d = J.getData();
    work.horario = d.horario;
    work.galeria = d.galeria;
    work.planes = d.planes;
    work.suplementos = d.suplementos;
  }

  /* ---------- HORARIO ---------- */
  function renderHorario() {
    $("#apertura").value = work.horario.apertura;
    $("#cierre").value = work.horario.cierre;
    updateHorarioPreview();
  }
  function updateHorarioPreview() {
    $("#horarioPreview").textContent = J.horarioTexto({ apertura: $("#apertura").value, cierre: $("#cierre").value });
  }
  $("#apertura").addEventListener("input", updateHorarioPreview);
  $("#cierre").addEventListener("input", updateHorarioPreview);
  $("#saveHorario").addEventListener("click", function () {
    var h = { apertura: $("#apertura").value.trim() || "5:00", cierre: $("#cierre").value.trim() || "23:00" };
    if (saveOrWarn(J.KEYS.horario, h)) { work.horario = h; toast("Horario guardado ✓"); }
  });

  /* ---------- GALERÍA ---------- */
  function renderGaleria() {
    var list = $("#galList");
    list.innerHTML = work.galeria.map(function (g, i) {
      return '' +
        '<div class="thumb" data-i="' + i + '">' +
          '<img class="thumb__img" src="' + esc(g.img) + '" alt="Foto ' + (i + 1) + '" />' +
          '<div class="thumb__body">' +
            '<div class="field" style="margin-bottom:10px"><label>Descripción</label>' +
              '<input type="text" class="gal-cap" value="' + esc(g.caption) + '" /></div>' +
            '<label class="btn btn--ghost btn--sm file-btn" style="width:100%">Cambiar foto' +
              '<input type="file" accept="image/*" class="gal-file" /></label>' +
          "</div>" +
        "</div>";
    }).join("");

    $$(".gal-file", list).forEach(function (input) {
      input.addEventListener("change", function () {
        var i = parseInt(input.closest(".thumb").getAttribute("data-i"), 10);
        var file = input.files[0];
        if (!file) return;
        fileToCompressedDataURL(file, 900, 0.82).then(function (durl) {
          work.galeria[i].img = durl;
          $(".thumb__img", input.closest(".thumb")).src = durl;
          toast("Foto lista (recuerda Guardar)");
        });
      });
    });
    $$(".gal-cap", list).forEach(function (input) {
      input.addEventListener("input", function () {
        var i = parseInt(input.closest(".thumb").getAttribute("data-i"), 10);
        work.galeria[i].caption = input.value;
      });
    });
  }
  $("#saveGaleria").addEventListener("click", function () {
    if (saveOrWarn(J.KEYS.galeria, work.galeria)) toast("Galería guardada ✓");
  });

  /* ---------- PLANES ---------- */
  function renderPlanes() {
    var list = $("#planList");
    list.innerHTML = work.planes.map(function (p, i) {
      return '' +
        '<div class="card" data-i="' + i + '">' +
          '<div class="row">' +
            '<div class="field"><label>Nombre</label><input class="pl-nombre" type="text" value="' + esc(p.nombre) + '" /></div>' +
            '<div class="field"><label>Precio (S/ por mes)</label><input class="pl-precio" type="number" value="' + esc(p.precio) + '" /></div>' +
          "</div>" +
          '<div class="field"><label>Descripción corta</label><input class="pl-desc" type="text" value="' + esc(p.desc) + '" /></div>' +
          '<div class="row">' +
            '<div class="field"><label>¿Destacado? (Más popular)</label>' +
              '<select class="pl-dest" style="width:100%;padding:12px 14px;background:#0a0c0b;color:var(--text);border:1px solid var(--border);border-radius:8px">' +
                '<option value="no"' + (!p.destacado ? " selected" : "") + '>No</option>' +
                '<option value="si"' + (p.destacado ? " selected" : "") + '>Sí</option>' +
              "</select></div>" +
            '<div class="field"><label>Etiqueta destacado</label><input class="pl-badge" type="text" value="' + esc(p.badge || "") + '" placeholder="Más popular" /></div>' +
          "</div>" +
          '<div class="field"><label>Beneficios (uno por línea)</label>' +
            '<textarea class="pl-feats" rows="5">' + esc(p.features.join("\n")) + "</textarea></div>" +
        "</div>";
    }).join("");
  }
  function collectPlanes() {
    return $$("#planList .card").map(function (card, i) {
      var base = work.planes[i] || {};
      var dest = $(".pl-dest", card).value === "si";
      return {
        id: base.id || $(".pl-nombre", card).value.trim().toLowerCase(),
        nombre: $(".pl-nombre", card).value.trim(),
        precio: parseInt($(".pl-precio", card).value, 10) || 0,
        desc: $(".pl-desc", card).value.trim(),
        destacado: dest,
        badge: $(".pl-badge", card).value.trim(),
        features: $(".pl-feats", card).value.split("\n").map(function (s) { return s.trim(); }).filter(Boolean)
      };
    });
  }
  $("#savePlanes").addEventListener("click", function () {
    var planes = collectPlanes();
    if (saveOrWarn(J.KEYS.planes, planes)) { work.planes = planes; toast("Planes guardados ✓"); }
  });

  /* ---------- SUPLEMENTOS ---------- */
  function renderSuplementos() {
    var list = $("#supList");
    list.innerHTML = work.suplementos.map(function (s, i) {
      var media = s.img
        ? '<img class="thumb__img" src="' + esc(s.img) + '" style="height:120px;border-radius:8px" />'
        : '<div class="thumb__img" style="height:120px;border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--muted)">Sin foto</div>';
      return '' +
        '<div class="card" data-i="' + i + '">' +
          '<div class="row">' +
            '<div>' + media +
              '<label class="btn btn--ghost btn--sm file-btn" style="width:100%;margin-top:10px">Subir/Cambiar foto' +
                '<input type="file" accept="image/*" class="sup-file" /></label>' +
            "</div>" +
            '<div>' +
              '<div class="field"><label>Nombre</label><input class="sup-nombre" type="text" value="' + esc(s.nombre) + '" /></div>' +
              '<div class="field"><label>Descripción</label><input class="sup-desc" type="text" value="' + esc(s.desc) + '" /></div>' +
              '<div class="field"><label>Precio (S/)</label><input class="sup-precio" type="number" value="' + esc(s.precio) + '" /></div>' +
            "</div>" +
          "</div>" +
          '<div class="field"><label>Mensaje de WhatsApp (opcional; personalízalo)</label>' +
            '<textarea class="sup-msg" rows="2" placeholder="Si lo dejas vacío se usa un mensaje automático con el nombre y precio.">' + esc(s.mensaje || "") + "</textarea></div>" +
          '<button class="btn btn--danger btn--sm sup-del">Eliminar producto</button>' +
        "</div>";
    }).join("");

    $$(".sup-file", list).forEach(function (input) {
      input.addEventListener("change", function () {
        var i = parseInt(input.closest(".card").getAttribute("data-i"), 10);
        var file = input.files[0];
        if (!file) return;
        fileToCompressedDataURL(file, 700, 0.82).then(function (durl) {
          work.suplementos[i].img = durl;
          renderSuplementos();
          toast("Foto lista (recuerda Guardar)");
        });
      });
    });
    $$(".sup-del", list).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var i = parseInt(btn.closest(".card").getAttribute("data-i"), 10);
        collectSupsInto();
        work.suplementos.splice(i, 1);
        renderSuplementos();
      });
    });
  }
  function collectSupsInto() {
    $$("#supList .card").forEach(function (card, i) {
      if (!work.suplementos[i]) work.suplementos[i] = {};
      work.suplementos[i].nombre = $(".sup-nombre", card).value.trim();
      work.suplementos[i].desc = $(".sup-desc", card).value.trim();
      work.suplementos[i].precio = parseInt($(".sup-precio", card).value, 10) || 0;
      work.suplementos[i].mensaje = $(".sup-msg", card).value.trim();
      // img already stored in work on upload
    });
  }
  $("#addSup").addEventListener("click", function () {
    collectSupsInto();
    work.suplementos.push({ nombre: "Nuevo producto", desc: "", precio: 0, img: "", mensaje: "" });
    renderSuplementos();
  });
  $("#saveSups").addEventListener("click", function () {
    collectSupsInto();
    if (saveOrWarn(J.KEYS.suplementos, work.suplementos)) toast("Suplementos guardados ✓");
  });

  /* ---------- Restaurar por defecto ---------- */
  $$("[data-reset]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var key = btn.getAttribute("data-reset");
      if (!confirm("¿Restaurar los valores por defecto de esta sección? Se perderán tus cambios guardados aquí.")) return;
      J.reset(J.KEYS[key]);
      loadWork();
      renderAll();
      toast("Restaurado ✓");
    });
  });

  function renderAll() {
    loadWork();
    renderHorario();
    renderGaleria();
    renderPlanes();
    renderSuplementos();
  }

  /* ---------- Init ---------- */
  if (isLogged()) showApp(); else showLogin();
})();
