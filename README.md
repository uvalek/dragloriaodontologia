# Landing — Dra. Gloria Portillo Atempa

Página del consultorio dental de la Dra. Gloria Portillo Atempa (Zacatelco, Tlaxcala).
Objetivo único: que el visitante escriba por WhatsApp para agendar.

Construida sobre el diseño aprobado en Claude Design
(`Dra Gloria PortilloV2.html`, en la carpeta de arriba).

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
| `node scripts/optimizar-imagenes.mjs` | Reconvierte la foto a WebP |
| `node scripts/optimizar-videos.mjs` | Reconvierte los videos del hero (necesita ffmpeg) |

## Dónde tocar cada cosa

**Casi todo lo que vas a querer cambiar está en un solo archivo: `lib/contenido.ts`.**

| Quiero cambiar… | Archivo |
|---|---|
| Teléfono, WhatsApp, mensaje precargado | `lib/contenido.ts` → `contacto` |
| Dirección, cédula, horarios | `lib/contenido.ts` → `consultorio`, `horarios` |
| Textos de cualquier sección | `lib/contenido.ts` |
| Agregar o quitar un tratamiento | `lib/contenido.ts` → `servicios` (la rejilla se reacomoda sola) |
| Reseñas | `lib/contenido.ts` → `resenas` |
| Títulos y certificaciones | `lib/contenido.ts` → `formacion` |
| Colores y tipografías | `app/globals.css` |
| Título y descripción para Google | `app/layout.tsx` → `metadata` |
| Ficha del negocio para Google | `lib/datos-negocio.ts` |

Cada tratamiento puede llevar foto. Se pone en `servicios[].imagen`; con
`null` la tarjeta se dibuja igual, con el fondo rosa liso.

## Estructura

```
app/
  layout.tsx        Fuente, metadatos SEO, ficha JSON-LD, analítica
  page.tsx          Ordena las 7 secciones
  globals.css       Tokens del diseño, botones y animaciones
  icon.svg          Favicon
  sitemap.ts        Mapa del sitio
  robots.ts
components/
  Hero.tsx          Primera pantalla: video, nav y titular
  MenuMovil.tsx     Menú desplegable (el único componente de cliente del hero)
  Intro.tsx         Presentación de la doctora y las tres cifras
  Tratamientos.tsx  Las seis tarjetas
  Resenas.tsx       Reseñas de Google
  PorQue.tsx        Las cuatro razones
  Formacion.tsx     Títulos y certificaciones
  Ubicacion.tsx     Dirección, horario y mapa
  PieDePagina.tsx   Contacto repetido
  EnlaceWhatsApp.tsx  Enlace que registra el clic
  AnimarAlEntrar.tsx  Observador de las animaciones
lib/
  contenido.ts      Todo el texto
  datos-negocio.ts  Datos estructurados para Google
  sitio.ts          URL pública
public/
  img/              Fotos en WebP
  img/titulos/      Títulos escaneados
  video/            Video del hero + su póster
originales/         Archivos pesados sin optimizar (no se versiona)
```

## Añadir o cambiar un video del hero

1. Deja el archivo en `originales/` como `hero-1.mp4`, `hero-2.mp4`, etc. El
   número es el orden en que se ven.
2. Si agregas uno nuevo, añádelo a la lista `CLIPS` de
   `scripts/optimizar-videos.mjs` **y** a la de `components/VideoHero.tsx`.
3. Corre `node scripts/optimizar-videos.mjs` (necesita ffmpeg).

Cómo está montado y qué conviene no romper:

- **Solo el primer clip se descarga al abrir la página.** Los demás arrancan con
  `preload="none"` y no se piden hasta que el clip anterior va por la mitad
  **y** la página ha terminado de cargar. Esa segunda condición no es un
  adorno: con un primer clip de 2.5 s, "a mitad" cae en el segundo 1.25, cuando
  el navegador aún está trayendo las fuentes, y el video se colaba en la cola.
- **Cada clip tiene dos versiones**: 1920 px para escritorio y 1280 px para
  celular, elegidas con `media` en los `<source>`. En una pantalla de 390 px,
  1920 es tres veces más información de la que cabe, y la mayoría de las
  visitas llegan por WhatsApp desde el celular. El celular descarga 566 KB de
  video donde el escritorio descarga 1412 KB.
- **Cada clip es un `<video>` propio, superpuesto.** Cambiar el `src` de uno
  solo dejaría el hueco en negro mientras el navegador abre el archivo
  siguiente.
- **Sin JavaScript se ve el primer clip en bucle**, que es lo que había antes de
  encadenarlos. El `loop` viene en el HTML y el componente se lo quita al tomar
  el control.
- **Con "reducir movimiento" no se reproduce nada**: se queda el póster fijo.
- **Mira el contraste del titular** sobre el clip nuevo. El texto blanco se
  apoya en un degradado oscuro; si el video es muy claro por abajo, el titular
  deja de leerse. Los dos actuales dan 11:1 y 7.6:1, con el mínimo en 3:1.

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

Todos los colores viven en `app/globals.css`, dentro de `@theme`. Ningún
componente lleva un color escrito a mano.

| Token | Uso |
|---|---|
| `--color-bg` | blanco, fondo de casi toda la página |
| `--color-text` | vino `#3a1020`: titulares y cuerpo |
| `--color-suave` | malva `#6e4a5a`: párrafos de apoyo |
| `--color-acento` | rosa `#b4325e`: bordes, números, enlaces |
| `--color-rosa-pal` | fondo de las tarjetas |
| `--color-negro-hero` | fondo tras el video |

Al elegir tonos hay un mínimo que respetar: 4.5:1 de contraste entre texto y
fondo (3:1 en gráficos y cifras grandes). Es lo que separa un color que se ve
bonito en una paleta de uno que no se lee en el celular de un paciente de 60
años. Lighthouse lo audita solo:

```bash
npx lighthouse http://localhost:3000 --only-categories=accessibility
```

## Animaciones

Se controlan con un atributo en el HTML, no con código en cada componente:

```jsx
<h2 data-animar style={{ "--retraso": "90ms" }}>…</h2>
```

| Atributo | Efecto | Cuándo usarlo |
|---|---|---|
| `data-animar` | Sube y aparece | Casi todo |
| `data-animar="aparecer"` | Solo desvanecido | Mapa y bloques que no deben moverse |
| `data-animar="zoom"` | Entra creciendo desde el 94 % | Cifras y tarjetas |
| `data-animar="zoom-out"` | Entra encogiendo desde el 106 % | Fotos que se asientan en su marco |
| `data-animar="lateral"` | Entra desde la izquierda | Filas de horario, listas |
| `data-entrada` | Anima al cargar, sin esperar al JavaScript | Solo el hero |
| `data-entrada="escala"` | Solo escala, nunca opacidad | El video del hero |

Además hay tres clases:

| Clase | Efecto |
|---|---|
| `.linea-recorte` | El texto sube desde detrás de un recorte, línea por línea |
| `.subrayado` | Una línea rosa se dibuja de izquierda a derecha bajo el título |
| `.foto-zoom` | La foto se acerca despacio al entrar |

Y `<Contador>` para los números que suben (25, 4.6, 20).

`--retraso` escalona los elementos de una misma fila.

Reglas que conviene no romper:

- Solo se anima `opacity` y `transform`. Cualquier otra propiedad obliga al
  navegador a recalcular el layout y la página da tirones al hacer scroll.
- El video del hero anima **sin opacidad**. Es lo primero que se ve, y arrancar
  invisible retrasaría la métrica de velocidad que mide Google.
- El diseño original disparaba las animaciones al cargar la página, lo que hace
  que las secciones de abajo terminen de animar antes de que nadie las vea.
  Aquí se disparan al entrar en pantalla (`components/AnimarAlEntrar.tsx`).
- Si el visitante activó "reducir movimiento" en su sistema, todo se muestra de
  golpe. No es un detalle estético: para algunas personas el movimiento en
  pantalla produce mareo.
- Sin JavaScript la página se ve completa igual, gracias a la regla dentro de
  `<noscript>` en `app/layout.tsx`.
- **Los contadores no inventan el número.** El valor final se genera en el
  servidor y está en el HTML desde el primer momento; la animación solo lo
  sustituye mientras dura. Google lee "25", no "0". Y el hueco se reserva de
  antemano con `minWidth` en `ch`, porque al pasar de "0" a "25" el texto
  cambia de ancho y empujaría lo que tiene al lado.
- **La cédula profesional no cuenta.** Es un folio, no una cantidad: verlo
  correr hacia 2 740 104 sugiere una cifra que no significa nada.
- **El video del hero lleva dos capas.** El contenedor hace la entrada, una
  vez; el video hace la deriva lenta, en bucle. Las dos animaciones mueven
  `transform`, y sobre el mismo elemento la segunda pisaría a la primera.
- **El recorte de línea necesita aire.** `.linea-recorte` lleva un
  `padding-bottom` compensado con margen negativo: las tildes y la cola de la
  "g" se salen de la caja del texto, y sin ese margen el recorte las decapita.

## Notas técnicas

- Todo se genera como HTML estático. Los únicos componentes de cliente son
  `EnlaceWhatsApp` (registra el clic en analítica), `AnimarAlEntrar` (el
  observador de las animaciones) y `MenuMovil` (el desplegable del hero).
- El responsive se resuelve casi entero con rejillas `auto-fit` y `clamp()`,
  que se adaptan solas. La única media query es la de `.solo-escritorio` /
  `.solo-movil`, para el menú. El diseño original decidía eso con banderas de
  JavaScript; en CSS se resuelve antes de pintar y sin el salto que se ve
  cuando el layout cambia después de hidratar.
- **Los videos del hero** se encadenan: termina uno y entra el siguiente con un
  fundido, y al final vuelve al primero (`components/VideoHero.tsx`). Van
  `muted` y `playsInline` —lo único que permite a iOS reproducirlos solos— y el
  primero lleva póster, que es lo que se ve mientras llega.
- Las fuentes se auto-hospedan con `next/font`; no se piden a Google.
- El mapa es un iframe con `loading="lazy"` y no necesita clave de API.

## Dos ramas: `main` y `rediseno`

El sitio en vivo sale **solo** de `main`. Los cambios en curso se trabajan en
`rediseno`, que tiene su propia dirección para revisarlos sin tocar lo que ve
el paciente.

| Rama | Dirección | Qué es |
|---|---|---|
| `main` | `gloriaportillo.com` | el sitio real, el que se comparte |
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

### El dominio

El sitio vive en **https://gloriaportillo.com**. El dominio está registrado en
Hostinger, que conserva el DNS (así el correo del dominio no depende de Vercel),
y apunta a Vercel con dos registros:

| Tipo | Nombre | Valor |
|---|---|---|
| `A` | `@` | `216.198.79.1` |
| `CNAME` | `www` | `918a034529c7adb4.vercel-dns-017.com` |

`www` existe solo para redirigir al dominio corto. El certificado HTTPS lo
renueva Vercel solo.

La URL pública está en `lib/sitio.ts`, en un único sitio. Si algún día cambia el
dominio, se toca ahí (o se define `NEXT_PUBLIC_SITIO` en Vercel, que manda sobre
el valor del código).
