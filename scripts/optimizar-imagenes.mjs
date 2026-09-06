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

// — Foto del sitio: 4:3, que es lo que más se acerca al hueco donde va.
const ancho43 = Math.round((H * 4) / 3);
const izq43 = Math.max(0, Math.min(Math.round(W * CENTRO_X - ancho43 / 2), W - ancho43));
const sitio = await sharp(FOTO)
  .extract({ left: izq43, top: 0, width: ancho43, height: H })
  .resize({ width: 1100 })
  .webp({ quality: 82 })
  .toFile(`${DESTINO}/dra-gloria.webp`);
console.log(`OK ${DESTINO}/dra-gloria.webp — ${(sitio.size / 1024).toFixed(0)} KB`);

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
