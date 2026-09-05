/**
 * Convierte los videos del hero a la versión que se sirve en la web.
 *
 * Necesita ffmpeg (`brew install ffmpeg`). Se corre a mano al añadir o cambiar
 * un clip: `node scripts/optimizar-videos.mjs`.
 *
 * Qué hace y por qué:
 *
 * · **Baja a 1280 px de ancho.** Los originales vienen en 2560x1440. A tamaño
 *   completo el video se ve igual detrás de un degradado y un titular, y pesa
 *   cinco veces más.
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

/** En orden de reproducción. El primero es el que carga con la página. */
const CLIPS = ["hero-1", "hero-2"];

const existe = (f) => access(f).then(() => true, () => false);
await mkdir(DESTINO, { recursive: true });

for (const nombre of CLIPS) {
  const entrada = `${ORIGEN}/${nombre}.mp4`;
  if (!(await existe(entrada))) {
    console.log(`· se omite ${nombre} (falta ${entrada})`);
    continue;
  }
  const salida = `${DESTINO}/${nombre}.mp4`;
  execFileSync("ffmpeg", [
    "-y", "-v", "error", "-i", entrada,
    "-an",
    "-vf", "scale=1280:-2",
    "-c:v", "libx264", "-profile:v", "high", "-crf", "30", "-preset", "slow",
    "-movflags", "+faststart",
    salida,
  ]);
  const antes = statSync(entrada).size, despues = statSync(salida).size;
  console.log(
    `OK ${salida} — ${(antes / 1048576).toFixed(1)} MB -> ${(despues / 1024).toFixed(0)} KB`,
  );
}

// Póster: un fotograma del primer clip, medio segundo dentro para saltarse el
// posible negro inicial.
const primero = `${ORIGEN}/${CLIPS[0]}.mp4`;
if (await existe(primero)) {
  execFileSync("ffmpeg", [
    "-y", "-v", "error", "-ss", "0.5", "-i", primero,
    "-frames:v", "1", "-vf", "scale=1280:-2", "/tmp/poster-hero.png",
  ]);
  const p = await sharp("/tmp/poster-hero.png")
    .webp({ quality: 72 })
    .toFile(`${DESTINO}/hero-poster.webp`);
  console.log(`OK ${DESTINO}/hero-poster.webp — ${(p.size / 1024).toFixed(0)} KB`);
}
