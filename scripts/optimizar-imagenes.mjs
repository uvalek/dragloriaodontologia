/**
 * Convierte la foto original de la doctora a los WebP que usa el sitio.
 *
 * Se corre a mano cuando se cambia la foto: `node scripts/optimizar-imagenes.mjs`.
 * No forma parte del build — el resultado queda versionado en public/img/.
 */
import sharp from "sharp";
import { mkdir, access } from "node:fs/promises";

/**
 * Carpeta con los archivos originales sin optimizar. No se versiona: pesan
 * megas y en el repositorio solo hace falta el WebP ya generado.
 */
const ORIGEN = "originales";
const DESTINO = "public/img";

/**
 * La foto de la doctora. Es la única del sitio, y de ella salen dos recortes:
 * el de la sección de presentación y la miniatura de Open Graph.
 *
 * `CENTRO_X` es dónde está ella en la foto original, en tanto por uno del
 * ancho. Los dos recortes se calculan a partir de ahí, así que queda centrada
 * en ambos. **Al cambiar la foto hay que revisar este valor y mirar el
 * resultado**: la original es apaisada y ella no está en el centro, así que un
 * recorte ingenuo le corta la cara en pantallas estrechas.
 */
const FOTO = `${ORIGEN}/dra-gloria-real.png`;
const CENTRO_X = 0.54;

/**
 * La segunda foto del retrato, que alterna con la primera.
 *
 * Es vertical y la anterior apaisada, así que las dos se recortan a cuadrado:
 * es la única forma de que al cambiar de una a otra el hueco no cambie de
 * tamaño y el resto de la página no dé un salto. `RECORTE_2` es dónde empieza
 * el cuadrado dentro de la foto vertical, en tanto por uno del recorte
 * sobrante: 0 lo pega arriba, 1 abajo.
 */
const FOTO_2 = `${ORIGEN}/dra-gloria-2.jpg`;
const RECORTE_2 = 0.22;

/** Tercer retrato, el que se ve primero. Mismo criterio de recorte. */
const FOTO_3 = `${ORIGEN}/dra-gloria-3.png`;
const RECORTE_3 = 0.1;

const existe = (f) => access(f).then(() => true, () => false);

if (!(await existe(FOTO))) {
  console.error(
    `\n  No existe "${FOTO}".\n` +
      `  Deja ahí la foto original y vuelve a ejecutar.\n`,
  );
  process.exit(1);
}

await mkdir(DESTINO, { recursive: true });

const { width: W, height: H } = await sharp(FOTO).metadata();

// — Retrato 1, recortado a cuadrado y centrado en ella.
const izq1 = Math.max(0, Math.min(Math.round(W * CENTRO_X - H / 2), W - H));
const sitio = await sharp(FOTO)
  .extract({ left: izq1, top: 0, width: H, height: H })
  .resize({ width: 1000 })
  .webp({ quality: 82 })
  .toFile(`${DESTINO}/dra-gloria.webp`);
console.log(`OK ${DESTINO}/dra-gloria.webp — ${(sitio.size / 1024).toFixed(0)} KB`);

// — Retratos verticales: el mismo cuadrado, cada uno con su anclaje.
for (const [origen, recorte, salida] of [
  [FOTO_2, RECORTE_2, "dra-gloria-2"],
  [FOTO_3, RECORTE_3, "dra-gloria-3"],
]) {
  if (!(await existe(origen))) {
    console.log(`· se omite ${salida} (falta ${origen})`);
    continue;
  }
  const m = await sharp(origen).rotate().metadata();
  const lado = Math.min(m.width, m.height);
  const arriba = Math.round((m.height - lado) * recorte);
  const r = await sharp(origen)
    .rotate()
    .extract({ left: Math.round((m.width - lado) / 2), top: arriba, width: lado, height: lado })
    .resize({ width: 1000 })
    .webp({ quality: 82 })
    .toFile(`${DESTINO}/${salida}.webp`);
  console.log(`OK ${DESTINO}/${salida}.webp — ${(r.size / 1024).toFixed(0)} KB`);
}

// — Open Graph: la miniatura que se ve al compartir el enlace por WhatsApp.
//   Es una banda apaisada; anclarla arriba sin más corta la sonrisa.
const anchoOg = 1400;
const altoOg = Math.round((anchoOg * 630) / 1200);
const izqOg = Math.max(0, Math.min(Math.round(W * CENTRO_X - anchoOg / 2), W - anchoOg));
const og = await sharp(FOTO)
  .extract({ left: izqOg, top: 40, width: anchoOg, height: Math.min(altoOg, H - 40) })
  .resize(1200, 630)
  .webp({ quality: 85 })
  .toFile(`${DESTINO}/og-dra-gloria-portillo.webp`);
console.log(`OK ${DESTINO}/og-dra-gloria-portillo.webp — ${(og.size / 1024).toFixed(0)} KB`);

/**
 * Fotos de las tarjetas de tratamiento.
 *
 * Se generan en 16:10, que es la proporción del hueco en la tarjeta: así la
 * foto no se recorta una segunda vez en el navegador y se controla aquí qué
 * parte se ve. Las que no tengan original en `originales/tratamientos/` se
 * omiten, porque normalmente se cambia una sola.
 */
const TRATAMIENTOS = [
  { entrada: "CIRUGIA.jpg", salida: "cirugia" },
  { entrada: "PROTESIS.jpg", salida: "protesis" },
  { entrada: "ESTETICA.jpg", salida: "estetica" },
];

await mkdir(`${DESTINO}/tratamientos`, { recursive: true });

for (const { entrada, salida } of TRATAMIENTOS) {
  const origen = `${ORIGEN}/tratamientos/${entrada}`;
  if (!(await existe(origen))) {
    console.log(`· se omite ${salida} (falta ${origen})`);
    continue;
  }
  const r = await sharp(origen)
    .resize(960, 600, { fit: "cover", position: "centre" })
    .webp({ quality: 78 })
    .toFile(`${DESTINO}/tratamientos/${salida}.webp`);
  console.log(
    `OK ${DESTINO}/tratamientos/${salida}.webp — ${(r.size / 1024).toFixed(0)} KB`,
  );
}
