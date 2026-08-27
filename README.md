# JPrime Gimnasio 🏋️

Sitio web oficial de **JPrime Gimnasio** — un gimnasio moderno. Landing page con disciplinas, horarios de clases, planes de membresía, galería y contacto.

## Estructura

```
JPrime-GYM-/
├── index.html            # Página principal
├── css/
│   ├── styles.css        # Estilos base (colores, layout, componentes, responsivo)
│   └── animaciones.css   # Toda la lógica visual animada: keyframes, entrada de
│                          # elementos al hacer scroll y micro-interacciones hover
└── js/
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

## Tecnologías

- HTML5 semántico
- CSS3 (Grid, Flexbox, variables, responsive)
- JavaScript (sin dependencias)

---
Hecho para JPrime GYM.
