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

## Cambiar una foto

1. Deja el archivo nuevo en `originales/` (esa carpeta no se versiona: solo
   guarda los archivos pesados sin optimizar).
2. Apunta a él en `scripts/optimizar-imagenes.mjs`.
3. Corre `node scripts/optimizar-imagenes.mjs`. Genera el WebP en `public/img/`
   —de ~2 MB a ~80 KB— y, si es la foto del hero, regenera además la imagen de
   Open Graph.
4. Borra `.next` antes de volver a mirar: si el nombre del archivo no cambia,
   el servidor sigue sirviendo la versión anterior desde su caché y parece que
   el reemplazo no funcionó.

Dos cosas que conviene revisar al cambiar la foto del hero:

- **El recorte de la imagen de Open Graph.** Es la miniatura que ve quien
  recibe el enlace por WhatsApp. Sale de una banda apaisada de una foto
  vertical, así que basta con que la cara esté unos centímetros más abajo para
  que el recorte corte la sonrisa. Se ajusta con `RECORTE_Y` en el script, y hay
  que mirar el resultado.
- **El texto alternativo** en `lib/contenido.ts`, que describe la foto para
  quien no puede verla y para Google.

## Paleta

Todos los colores viven en `app/globals.css`, dentro de `@theme`. Cambiar la
paleta entera es cambiar esos valores: ningún componente lleva un color escrito
a mano.

| Token | Uso |
|---|---|
| `--color-bg` | fondo rosa blanquecino de toda la página |
| `--color-banda` | barra de datos (rosa pálido) |
| `--color-rosa-suave` | fondo de la sección de reseñas |
| `--color-vino` | CTA final y pie — el único bloque oscuro |
| `--color-accent` | rosa principal: bordes, iconos, foco |
| `--color-accent-700` | rosa oscuro de kickers y enlaces |
| `--color-accent-300` | rosa claro, para texto sobre el vino |

El criterio de la paleta es que **la página sea clara y el único bloque oscuro
sea el del final**, donde está el botón de WhatsApp. Si esa banda se aclara
también, el llamado a la acción pierde el contraste que lo hace destacar.

Al elegir tonos hay un mínimo que respetar: 4.5:1 de contraste entre texto y
fondo (3:1 en las cifras grandes). Es lo que separa un rosa que se ve bonito en
una paleta de uno que no se lee en el celular de un paciente de 60 años. Para
comprobarlo, cualquier medidor de contraste WCAG sirve; Lighthouse lo audita
solo (`npx lighthouse http://localhost:3000 --only-categories=accessibility`).

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

## Dos ramas: `main` y `rediseno`

El sitio en vivo sale **solo** de `main`. Los cambios en curso se trabajan en
`rediseno`, que tiene su propia dirección para revisarlos sin tocar lo que ve
el paciente.

| Rama | Dirección | Qué es |
|---|---|---|
| `main` | `dragloriaportillo.vercel.app` | el sitio real, el que se comparte |
| `rediseno` | `dragloriaportillo-git-rediseno-aleks-projects-2fe2ebd7.vercel.app` | el borrador |

La dirección de `rediseno` es fija: siempre muestra el último commit de esa
rama, así que se puede mandar una vez y volver a abrirla tras cada cambio.

Vercel crea el borrador solo, con cada `git push` a `rediseno`. Tarda entre uno
y dos minutos.

### Aprobar los cambios

Cuando el borrador ya guste, se pasa a `main`:

```bash
git checkout main && git merge rediseno && git push origin main
```

Eso publica en la dirección real. Después se puede seguir usando la misma rama
para la siguiente tanda de cambios.

### Detalles que conviene saber

- **Un `push` sin commits nuevos no genera borrador.** Vercel identifica los
  despliegues por commit: si la rama apunta a uno que ya publicó, lo reutiliza y
  no crea dirección nueva. Hace falta al menos un commit propio en la rama.
- **La etiqueta canónica del borrador apunta a producción**, porque sale de
  `VERCEL_PROJECT_PRODUCTION_URL`. Es lo correcto: evita que Google indexe el
  borrador como si fuera una página aparte y le reste posiciones a la real.
- **Las visitas al borrador no se separan en Analytics.** Si hay que medir algo
  de verdad, se mide en producción.

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
