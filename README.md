# Landing — Dra. Gloria Portillo Atempa

Página del consultorio dental de la Dra. Gloria Portillo Atempa (Zacatelco, Tlaxcala).
Objetivo único: que el visitante escriba por WhatsApp para agendar.

Construida sobre el diseño aprobado en Claude Design
(`Landing page consultorio dental Tlaxcala.zip`, en la carpeta de arriba).

## Cómo correrla

```bash
npm install
npm run dev      # http://localhost:3000
```

Otros comandos:

| Comando | Qué hace |
|---|---|
| `npm run build` | Compila para producción |
| `npm start` | Sirve el build compilado |
| `npm run lint` | Revisa el código |
| `node scripts/optimizar-imagenes.mjs` | Reconvierte las fotos a WebP (solo si se cambian las originales) |

## Dónde tocar cada cosa

**Casi todo lo que vas a querer cambiar está en un solo archivo: `lib/contenido.ts`.**

| Quiero cambiar… | Archivo |
|---|---|
| Teléfono, WhatsApp, mensaje precargado | `lib/contenido.ts` → `contacto` |
| Dirección, cédula, horarios | `lib/contenido.ts` → `consultorio`, `horarios` |
| Textos de cualquier sección | `lib/contenido.ts` |
| Agregar o quitar un tratamiento | `lib/contenido.ts` → `servicios` (la rejilla se reacomoda sola) |
| Reseñas | `lib/contenido.ts` → `resenas` |
| Colores y tipografías | `app/globals.css` |
| Título y descripción para Google | `app/layout.tsx` → `metadata` |
| Ficha del negocio para Google | `lib/datos-negocio.ts` |

Si agregas un servicio nuevo necesitas también un icono: se declara en
`components/IconoServicio.tsx` y se referencia por nombre desde `contenido.ts`.

## Estructura

```
app/
  layout.tsx        Fuentes, metadatos SEO, ficha JSON-LD, analítica
  page.tsx          Ordena las 8 secciones
  globals.css       Tokens del diseño y clases .btn / .card / .plate
  icon.svg          Favicon
  sitemap.ts        Mapa del sitio
  robots.ts
components/         Una sección = un componente
lib/
  contenido.ts      Todo el texto
  datos-negocio.ts  Datos estructurados para Google
public/img/         Fotos en WebP
```

## Animaciones

Se controlan con un atributo en el HTML, no con código en cada componente:

```jsx
<h2 data-animar="subir" style={{ "--retraso": "90ms" }}>…</h2>
```

| Valor | Efecto | Cuándo usarlo |
|---|---|---|
| `subir` | Aparece desplazándose hacia arriba | Títulos, párrafos, tarjetas |
| `aparecer` | Solo desvanecido | Fotos, mapa, filas de tabla |
| `crecer` | Aparece creciendo desde el 94 % | Cifras grandes |
| `estrellas` | Las cinco estrellas se encienden en cadena | Solo `<Estrellas animar />` |

`--retraso` escalona los elementos de una misma fila. `data-entrada` es la
variante del hero, que anima con CSS puro sin esperar al JavaScript.

Reglas que conviene no romper:

- Solo se anima `opacity` y `transform`. Cualquier otra propiedad provoca que
  el navegador recalcule el layout y la página dé tirones al hacer scroll.
- La foto del hero anima **sin opacidad** (`data-entrada="escala"`). Es el
  elemento que Google cronometra como LCP: si arrancara invisible, la métrica
  de velocidad empeoraría.
- Si el visitante activó "reducir movimiento" en su sistema, todo se muestra de
  golpe. No es un detalle estético: para algunas personas el movimiento en
  pantalla produce mareo.
- Sin JavaScript la página se ve completa igual, gracias a la regla dentro de
  `<noscript>` en `app/layout.tsx`.

## Notas técnicas

- Todo se genera como HTML estático. Los únicos componentes de cliente son
  `EnlaceWhatsApp` (registra el clic en analítica), `AnimarAlEntrar` (el
  observador de las animaciones) y `Contador` (los números que suben).
- El responsive no usa media queries: el diseño está armado con rejillas
  `auto-fit` y `clamp()`, que se adaptan solas. Si agregas una sección nueva,
  sigue ese mismo patrón en vez de meter breakpoints.
- Las fuentes se auto-hospedan con `next/font`; no se piden a Google.
- El mapa es un iframe con `loading="lazy"` y no necesita clave de API.

## Despliegue en Vercel

El proyecto está en la raíz del repositorio, así que Vercel lo detecta solo. Al
importarlo no hay que cambiar nada: framework Next.js, comandos por defecto y
**cero variables de entorno**.

Después del primer despliegue, activar **Web Analytics** en la pestaña Analytics
del proyecto. Sin eso el evento `clic_whatsapp` no se registra en ningún lado.

### Cuando haya dominio propio

La URL del sitio (canónica, Open Graph, sitemap y robots) se resuelve sola desde
`VERCEL_PROJECT_PRODUCTION_URL`, así que no hay nada escrito a mano. Al conectar
un dominio, agregar en Vercel la variable:

```
NEXT_PUBLIC_SITIO = https://eldominio.com
```

y volver a desplegar. Ver `lib/sitio.ts`.
