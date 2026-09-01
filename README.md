# JPrime Gimnasio 🏋️

Sitio web oficial de **JPrime Gimnasio** — un gimnasio moderno. Landing page con disciplinas, horarios de clases, planes de membresía, galería y contacto.

## Estructura

```
JPrime-GYM-/
├── index.html            # Página principal
├── admin.html            # Panel de administrador (login + edición)
├── css/
│   ├── styles.css        # Estilos base (colores, layout, componentes, responsivo)
│   └── animaciones.css   # Keyframes, entrada al hacer scroll y micro-interacciones
└── js/
    ├── datos.js          # Datos por defecto + helpers de localStorage (compartido)
    ├── render.js         # Pinta planes, suplementos, galería y horario en el sitio
    ├── admin.js          # Lógica del panel de administrador
    ├── main.js           # Menú móvil, año dinámico y validación del formulario
    └── animaciones.js    # Observer de scroll que revela las secciones (.reveal)
```

## Cómo verlo

Abre `index.html` en tu navegador. También puedes servirlo localmente:

```bash
# con Python
python -m http.server 8000
# luego abre http://localhost:8000
```

## Panel de administrador

El dueño puede editar la galería, el horario de atención, los planes y la tienda
de suplementos desde `admin.html` (enlace discreto "Admin" en el pie de página).

- **Usuario:** `admin`  ·  **Contraseña:** `jprime2025`
  (se cambian en `js/datos.js`, objeto `ADMIN`).

⚠️ **Importante — persistencia:** los cambios del panel se guardan con
`localStorage`, es decir **solo en el navegador/PC donde se editan**. Sirven para
que el dueño arme el contenido y lo vea en su equipo, pero **no se sincronizan** con
los demás visitantes ni entre dispositivos. Para que los cambios sean permanentes y
visibles para todos se necesita un **backend/base de datos** (por ejemplo Firebase,
Supabase o un pequeño servidor). Ese paso queda pendiente si se requiere edición
"en vivo" para todo el público.

## Tecnologías

- HTML5 semántico
- CSS3 (Grid, Flexbox, variables, responsive)
- JavaScript (sin dependencias)

---
Hecho para JPrime GYM.
