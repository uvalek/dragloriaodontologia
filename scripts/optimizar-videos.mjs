/**
 * Convierte los videos del hero a la versión que se sirve en la web.
 *
 * Necesita ffmpeg (`brew install ffmpeg`). Se corre a mano al añadir o cambiar
 * un clip: `node scripts/optimizar-videos.mjs`.
 *
 * Qué hace y por qué:
 *
 * · **Baja a 1920 px de ancho.** Los originales vienen en 2560x1440, que no
 *   aporta nada detrás de un degradado, pero quedarse en 1280 sí se notaba:
 *   estirado en una pantalla de 1920 el video se veía emborronado.
 * · **Quita la pista de audio.** Los clips van silenciados y en bucle, así que
 *   el audio es peso que nadie va a oír.
 * · **`+faststart`** mueve el índice al principio del archivo: sin eso el
 *   navegador tiene que descargar el final antes de poder empezar a reproducir.
 * · **Genera el póster** del primer clip, que es lo que se ve mientras el video
 *   llega y lo que Google cronometra como LCP.
 */
import { execFileSync } from "node:child_process";
import { access, mkdir } from "node:fs/promises";
import { statSync } from "node:fs";
import sharp from "sharp";

const ORIGEN = "originales";
const DESTINO = "public/video";

/**
 * Los clips, en orden de reproducción. El primero es el único que se descarga
 * al abrir la página, así que es donde el peso importa.
 *
 * · `segundos` recorta el clip desde el principio. Acortar el primero es lo que
 *   deja sitio para subirle la calidad sin que la página pese más.
 * · `crf` es la compresión: más bajo, mejor imagen y más peso. El segundo clip
 *   aguanta un valor más alto porque se descarga después, cuando la página ya
 *   está cargada.
 */
const CLIPS = [
  { nombre: "hero-1", segundos: 2.5, crf: 30 },
  { nombre: "hero-2", segundos: null, crf: 32 },
];

/**
 * Dos versiones de cada clip.
 *
 * En un celular de 390 px de ancho, un video de 1920 px es tres veces más
 * información de la que la pantalla puede mostrar, y la mayoría de las visitas
 * llegan por WhatsApp desde el celular, con datos que alguien paga. La versión
 * de escritorio es la que gana con la resolución alta, porque ahí el video se
 * estira a pantalla completa y el pixelado sí se nota.
 */
const VERSIONES = [
  { sufijo: "", ancho: 1920, ajusteCrf: 0 },
  { sufijo: "-movil", ancho: 1280, ajusteCrf: 2 },
];

const existe = (f) => access(f).then(() => true, () => false);
await mkdir(DESTINO, { recursive: true });

for (const { nombre, segundos, crf } of CLIPS) {
  const entrada = `${ORIGEN}/${nombre}.mp4`;
  if (!(await existe(entrada))) {
    console.log(`· se omite ${nombre} (falta ${entrada})`);
    continue;
  }
  for (const { sufijo, ancho, ajusteCrf } of VERSIONES) {
    const salida = `${DESTINO}/${nombre}${sufijo}.mp4`;
    execFileSync("ffmpeg", [
      "-y", "-v", "error",
      ...(segundos ? ["-ss", "0", "-t", String(segundos)] : []),
      "-i", entrada,
      "-an",
      "-vf", `scale=${ancho}:-2`,
      "-c:v", "libx264", "-profile:v", "high",
      "-crf", String(crf + ajusteCrf), "-preset", "slow",
      "-movflags", "+faststart",
      salida,
    ]);
    const antes = statSync(entrada).size, despues = statSync(salida).size;
    console.log(
      `OK ${salida} — ${(antes / 1048576).toFixed(1)} MB -> ${(despues / 1024).toFixed(0)} KB`,
    );
  }
}

// Póster: un fotograma del primer clip, medio segundo dentro para saltarse el
// posible negro inicial.
//
// Va a 1280 px y no a 1920 como el video: es lo que Google cronometra como LCP,
// se ve un instante antes de que arranque el video, y a pantalla completa la
// diferencia no se aprecia. A 1920 pesaba el doble por nada.
const primero = `${ORIGEN}/${CLIPS[0].nombre}.mp4`;
if (await existe(primero)) {
  execFileSync("ffmpeg", [
    "-y", "-v", "error", "-ss", "0.5", "-i", primero,
    "-frames:v", "1", "-vf", "scale=1280:-2", "/tmp/poster-hero.png",
  ]);
  const p = await sharp("/tmp/poster-hero.png")
    .webp({ quality: 62 })
    .toFile(`${DESTINO}/hero-poster.webp`);
  console.log(`OK ${DESTINO}/hero-poster.webp — ${(p.size / 1024).toFixed(0)} KB`);
}
