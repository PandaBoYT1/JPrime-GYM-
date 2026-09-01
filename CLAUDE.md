Después de cada cambio, hacer git add, git commit con mensaje descriptivo y git push a origin main.

---

# 📋 INSTRUCCIONES DE MODIFICACIÓN — JPrime Gimnasio

A continuación se detallan todos los cambios que deben implementarse en el sitio web. El proyecto es HTML + CSS + JS puro (sin frameworks). Los archivos principales son `index.html`, `css/styles.css`, `css/animaciones.css` y `js/main.js`.

---

## 1. SECCIÓN "CLASES Y HORARIOS" → CAMBIAR A "ÁREAS Y EQUIPAMIENTO"

**El gimnasio NO tiene clases programadas.** Tiene áreas con distintos tipos de máquinas con acceso libre.

### Qué cambiar:
- Renombrar la sección: el título `h2` debe decir **"Áreas y Equipamiento"** y el `eyebrow` debe decir **"Instalaciones"**.
- Eliminar completamente la tabla de horarios (`<table class="schedule">` y su `<div class="table-wrap">`).
- Los 8 artículos de disciplinas (`.discipline`) deben mantenerse pero adaptarse: ahora representan **tipos de área/máquinas**, no clases. Actualizar textos así:

| Icono | Título | Descripción |
|-------|--------|-------------|
| MS | Musculación | Mancuernas, barras olímpicas, multipower y máquinas de peso libre. |
| FN | Funcional | TRX, battle ropes, kettlebells y cajones pliométricos. |
| CT | CrossTraining | Racks, argollas, sacos y zona de WOD completa. |
| SP | Spinning | Bicicletas de ciclo indoor con medidor de potencia. |
| BX | Boxeo | Sacos, guantes, peras de velocidad y ring de práctica. |
| HT | HIIT & Cardio | Cintas, elípticas, remos y bikes de aire. |
| YG | Yoga & Stretching | Colchonetas, bloques, rodillos y zona de movilidad. |
| GAP | Glúteos & Core | Máquinas de abducción, hip thrust, cables y abdominales. |

- Agregar debajo de los artículos un bloque de horario general del gimnasio (NO de clases):

```html
<div class="schedule-general reveal">
  <div class="schedule-general__icon">🕐</div>
  <div>
    <h3>Horario de atención</h3>
    <p><strong>Lunes a Sábado</strong> · 5:00 am – 11:00 pm</p>
    <p class="schedule-general__note">Acceso libre a todas las áreas durante el horario de atención.</p>
  </div>
</div>
```

Estilizar `.schedule-general` con fondo oscuro sutil, borde izquierdo amarillo (`#FFD700` o el color primario del sitio), padding generoso, border-radius, y centrado en el contenedor. Que quede vistoso.

---

## 2. BOTONES: MÁS VISTOSOS Y REUBICADOS

### Mejoras visuales a los botones:
- Los botones `.btn--primary` deben tener un **gradiente llamativo** (por ejemplo: `background: linear-gradient(135deg, #FFD700, #FFA500)`) con texto oscuro, sombra tipo `box-shadow: 0 4px 20px rgba(255,200,0,0.4)` y efecto hover que eleve el botón (`transform: translateY(-2px)` + sombra más intensa).
- Los botones `.btn--ghost` deben tener borde sólido del color primario y en hover rellenar con el gradiente.
- Agregar `letter-spacing: 0.05em` y `font-weight: 700` a todos los botones para mayor impacto visual.
- Los botones de los planes (`.plan__btn`) deben ser más grandes: `padding: 14px 32px` y ancho completo (`width: 100%`).

### Reubicar botones en el Hero:
- El bloque `.hero__actions` debe tener los dos botones alineados al centro en mobile y a la izquierda en desktop.
- El botón "Empieza tu prueba gratis" (`.btn--primary`) debe ser notablemente más grande que "Ver áreas" (`.btn--ghost`). Ajustar con `font-size` y padding.
- Cambiar el texto del segundo botón de "Ver clases" a **"Ver áreas"** y apuntar a `#clases`.

---

## 3. WHATSAPP AL SELECCIONAR UN PLAN

Cuando el usuario haga clic en cualquier botón de plan (`.plan__btn`), en lugar de ir a `#contacto`, debe **abrirse WhatsApp** con un mensaje personalizado según el plan elegido.

### Número de WhatsApp del gimnasio:
**+51 999 999 999** ← PLACEHOLDER: reemplazar con el número real del dueño cuando lo proporcione. Usar formato para wa.me: `51999999999`.

### Mensajes por plan (codificados para URL):

- **Plan Básico:** `Hola! Me interesa el Plan Básico de S/99/mes en JPrime Gimnasio. ¿Pueden darme más información para inscribirme?`
- **Plan Pro:** `Hola! Me interesa el Plan Pro de S/159/mes en JPrime Gimnasio. ¿Pueden darme más información para inscribirme?`
- **Plan Elite:** `Hola! Me interesa el Plan Elite de S/259/mes en JPrime Gimnasio. ¿Pueden darme más información para inscribirme?`

### Implementación en JS (`js/main.js`):
- Agregar una función `abrirWhatsApp(plan, precio, mensaje)` que construya la URL `https://wa.me/51999999999?text=...` y la abra con `window.open(url, '_blank')`.
- En el HTML, cambiar los `<a href="#contacto">` de los planes por `<button class="btn ... plan__btn" onclick="abrirWhatsApp(...)">`.
- O mejor: dejar los `<a>` pero con `href="javascript:void(0)"` y `data-plan`, `data-precio`, `data-msg` attributes, y capturar el evento en JS con `addEventListener`.

---

## 4. NUEVA SECCIÓN: SUPLEMENTOS EN VENTA

Agregar una nueva sección **después de la sección de planes** y **antes de la galería**, con ID `#suplementos`.

### Estructura HTML:
```html
<section class="section" id="suplementos">
  <div class="container">
    <div class="section__head reveal">
      <p class="section__eyebrow">Tienda</p>
      <h2 class="section__title">Suplementos en Venta</h2>
      <p class="section__subtitle">Productos de calidad para potenciar tu rendimiento.</p>
    </div>
    <div class="grid grid--3 supplements" id="supplementsGrid">
      <!-- Los productos se renderizan dinámicamente desde JS -->
    </div>
  </div>
</section>
```

### Productos iniciales (placeholder hasta que el admin los cargue):
Crear un array en JS con 3 suplementos de ejemplo:
```js
const suplementos = [
  { id: 1, nombre: "Proteína Whey Gold", precio: 180, descripcion: "2.27 kg · Chocolate", imagen: "" },
  { id: 2, nombre: "Creatina Monohidrato", precio: 80, descripcion: "500 g · Sin sabor", imagen: "" },
  { id: 3, nombre: "Pre-Workout Extremo", precio: 120, descripcion: "300 g · Tropical", imagen: "" }
];
```

### Tarjeta de suplemento:
Cada producto debe mostrarse como una tarjeta con:
- Imagen (o placeholder gris con icono si no hay imagen)
- Nombre del producto en negrita
- Descripción pequeña
- Precio en soles: `S/ 180`
- Botón "Consultar por WhatsApp" que abra un mensaje tipo: `Hola! Me interesa el suplemento [nombre] (S/[precio]) disponible en JPrime Gimnasio.`

### Estilos CSS (`.supplement-card`):
- Fondo oscuro con borde sutil, border-radius 12px
- Imagen con `object-fit: cover`, altura fija ~200px, ancho 100%
- Efecto hover con `transform: translateY(-4px)` y sombra

Agregar `#suplementos` al menú de navegación entre "Planes" y "Galería":
```html
<li><a href="#suplementos" class="nav__link">Tienda</a></li>
```

---

## 5. PANEL DE ADMINISTRADOR

Crear un panel de administración protegido por contraseña para que el dueño pueda gestionar el sitio.

### Acceso:
- Agregar al pie del nav (o en el footer, muy discreto) un enlace `<a href="admin.html">Admin</a>` con clase para que sea casi invisible (pequeño, gris, sin llamar la atención).
- Crear el archivo `admin.html` en la raíz del proyecto.

### Contraseña inicial:
- **`jprime2025`** (el dueño puede cambiarla directamente en el JS).
- Guardar sesión en `localStorage` con clave `jprime_admin_session`. Si existe y vale `"true"`, saltar el login.
- Botón "Cerrar sesión" que elimine el item de localStorage y recargue.

### Secciones del panel (pestañas o acordeones):

#### 5.1 Horarios del gimnasio
- Formulario con campos: Hora apertura (lunes–sábado), Hora cierre (lunes–sábado).
- Guardar en `localStorage` clave `jprime_horarios`. Al cargar el `index.html`, leer ese localStorage y sobreescribir el texto del bloque `.schedule-general` si existe.

#### 5.2 Galería de fotos
- Mostrar las 4 imágenes actuales (gym-1.png a gym-4.png) como miniaturas.
- Botón "Cambiar foto" por cada imagen → input file → al seleccionar, leer como base64 con FileReader y guardar en localStorage (`jprime_galeria_1`, `jprime_galeria_2`, etc.).
- Al cargar `index.html`, leer cada clave de localStorage y si existe, reemplazar el `src` de las imágenes de galería correspondientes.
- Botón "Restaurar originales" que borre esas claves.

#### 5.3 Suplementos en venta
- Tabla/listado de los suplementos actuales con botones "Editar" y "Eliminar".
- Formulario para agregar nuevo suplemento: nombre, descripción, precio, imagen (upload → base64).
- Guardar el array completo de suplementos en localStorage (`jprime_suplementos`).
- Al cargar `index.html`, si existe `jprime_suplementos` en localStorage, usar ese array en lugar del de ejemplo.

### Diseño del panel admin:
- Paleta coherente con el sitio (oscura, con amarillo como acento).
- Sidebar izquierdo con las 3 secciones o tabs horizontales.
- Responsive.
- Header con el logo de JPrime y el botón "Cerrar sesión".

---

## 6. AJUSTES GENERALES

- Actualizar el nav: el orden de items debe ser `Inicio | Áreas | Planes | Tienda | Galería | Contacto`.
- Revisar que el link "Ver clases" del hero apunte a `#clases` (que ahora es Áreas).
- El stat `30+ Clases semanales` del hero debe cambiarse a `10+ Áreas equipadas`.
- En el footer o sección contacto, asegurarse de que el horario mostrado diga: **Lunes a Sábado, 5:00 am – 11:00 pm**.

---

## RESUMEN DE ARCHIVOS A CREAR/MODIFICAR

| Archivo | Acción |
|--------|--------|
| `index.html` | Modificar secciones clases, planes, hero, nav, galería; agregar sección suplementos |
| `css/styles.css` | Mejorar botones, agregar estilos `.schedule-general`, `.supplement-card` |
| `js/main.js` | Agregar función WhatsApp, renderizado de suplementos desde localStorage |
| `admin.html` | Crear desde cero — panel de administrador completo |

---

**Número WhatsApp real del gimnasio:** ⚠️ PENDIENTE — el dueño lo confirmará. Por ahora usar `51999999999` como placeholder.

