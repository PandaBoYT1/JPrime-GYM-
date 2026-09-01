/* =====================================================
   JPrime Gimnasio - Modelo de datos compartido
   Define los datos por defecto y los helpers de
   almacenamiento (localStorage). Lo usan tanto la
   página principal (render) como el panel admin.
   ===================================================== */
window.JPRIME = (function () {
  var WA = "51981229622"; // Número de WhatsApp del gimnasio

  var DEFAULTS = {
    horario: { apertura: "5:00", cierre: "23:00" }, // Lun–Sáb
    planes: [
      {
        id: "basico", nombre: "Básico", destacado: false, badge: "",
        desc: "Ideal para empezar tu rutina.", precio: 99,
        features: [
          "Acceso a sala de musculación",
          "Horario de 5:00 a 23:00 (Lun–Sáb)",
          "Casillero incluido",
          "App de rutinas"
        ]
      },
      {
        id: "pro", nombre: "Pro", destacado: true, badge: "Más popular",
        desc: "La opción favorita de nuestros socios.", precio: 159,
        features: [
          "Todo lo del plan Básico",
          "Todas las clases grupales",
          "Acceso 24/7",
          "1 sesión con entrenador / mes",
          "Evaluación física trimestral"
        ]
      },
      {
        id: "elite", nombre: "Elite", destacado: false, badge: "",
        desc: "Máximo rendimiento y acompañamiento.", precio: 259,
        features: [
          "Todo lo del plan Pro",
          "Entrenador personal semanal",
          "Plan nutricional personalizado",
          "Acceso a zona VIP y spa",
          "Invitado gratis 2 veces / mes"
        ]
      }
    ],
    galeria: [
      { img: "assets/gym-1.png", caption: "Nuestra comunidad" },
      { img: "assets/gym-2.png", caption: "Coaches certificados" },
      { img: "assets/gym-3.png", caption: "Máquinas de última generación" },
      { img: "assets/gym-4.png", caption: "Entrenamiento funcional" }
    ],
    suplementos: [
      { nombre: "Proteína Whey Gold", desc: "2.27 kg · Chocolate", precio: 180, img: "", mensaje: "" },
      { nombre: "Creatina Monohidrato", desc: "500 g · Sin sabor", precio: 80, img: "", mensaje: "" },
      { nombre: "Pre-Workout Extremo", desc: "300 g · Tropical", precio: 120, img: "", mensaje: "" }
    ]
  };

  var KEYS = {
    horario: "jprime_horario",
    planes: "jprime_planes",
    galeria: "jprime_galeria",
    suplementos: "jprime_suplementos",
    sesion: "jprime_admin_session"
  };

  // Credenciales del dueño (puede cambiarlas aquí)
  var ADMIN = { usuario: "admin", clave: "jprime2025" };

  function clone(v) { return JSON.parse(JSON.stringify(v)); }

  function load(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : clone(fallback);
    } catch (e) { return clone(fallback); }
  }

  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch (e) { return false; }
  }

  function reset(key) {
    try { localStorage.removeItem(key); } catch (e) {}
  }

  function getData() {
    return {
      horario: load(KEYS.horario, DEFAULTS.horario),
      planes: load(KEYS.planes, DEFAULTS.planes),
      galeria: load(KEYS.galeria, DEFAULTS.galeria),
      suplementos: load(KEYS.suplementos, DEFAULTS.suplementos)
    };
  }

  function waLink(mensaje) {
    return "https://wa.me/" + WA + "?text=" + encodeURIComponent(mensaje);
  }

  // Mensaje emocionante y con info para cada plan
  function mensajePlan(p) {
    var extras = (p.features && p.features.length)
      ? " Me llaman la atención beneficios como: " + p.features.slice(0, 3).join(", ") + "."
      : "";
    return "¡Hola JPrime! 🔥💪 Estoy con toda la motivación para empezar a entrenar y quiero unirme al Plan "
      + p.nombre + " (S/ " + p.precio + " al mes)." + extras
      + " ¿Cómo hago para inscribirme hoy mismo? 🚀";
  }

  // Mensaje para un suplemento (usa el personalizado del dueño si existe)
  function mensajeSuplemento(s) {
    if (s.mensaje && s.mensaje.trim()) return s.mensaje;
    return "¡Hola JPrime! 💪 Quiero comprar el suplemento " + s.nombre
      + " (S/ " + s.precio + "). ¿Está disponible y cómo lo adquiero?";
  }

  function horarioTexto(h) {
    return "Lun–Sáb " + h.apertura + " – " + h.cierre;
  }

  return {
    WA: WA, DEFAULTS: DEFAULTS, KEYS: KEYS, ADMIN: ADMIN,
    load: load, save: save, reset: reset, getData: getData, clone: clone,
    waLink: waLink, mensajePlan: mensajePlan, mensajeSuplemento: mensajeSuplemento,
    horarioTexto: horarioTexto
  };
})();
