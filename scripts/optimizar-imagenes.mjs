/**
 * Convierte las fotos originales del diseño (PNG de ~1.9 MB cada una) a WebP.
 *
 * Se corre una sola vez, a mano: `node scripts/optimizar-imagenes.mjs`.
 * No forma parte del build — el resultado queda versionado en public/img/.
 *
 * Se conserva el ancho original (1086 px) porque next/image genera después los
 * tamaños intermedios que hagan falta; aquí solo cambiamos el formato para que
 * el repositorio no cargue con 4 MB de PNG.
 */
import sharp from "sharp";
import { mkdir, access } from "node:fs/promises";

/**
 * Carpeta con los originales sin optimizar. No está versionada (pesan ~2 MB
 * cada uno y en el repositorio solo hace falta el WebP ya generado). Para
 * volver a correr el script hay que dejar aquí los archivos de origen.
 */
const ORIGEN = "originales";
const DESTINO = "public/img";

// La primera imagen es la del hero, y se usa además como Open Graph recortada.
const IMAGENES = [
  {
    entrada: `${ORIGEN}/dragloriarosa.png`,
    salida: `${DESTINO}/dra-gloria-recepcion.webp`,
  },
  {
    entrada: `${ORIGEN}/ChatGPT Image 8 ago 2026, 03_51_18 p.m..png`,
    salida: `${DESTINO}/dra-gloria-consulta.webp`,
  },
];

// Aviso claro en vez de un error de "archivo no encontrado" a medio camino.
try {
  await access(ORIGEN);
} catch {
  console.error(
    `\n  No existe la carpeta "${ORIGEN}/".\n` +
      `  Copia ahí los PNG de uploads/ del zip del diseño y vuelve a ejecutar.\n`,
  );
  process.exit(1);
}

await mkdir(DESTINO, { recursive: true });

const existe = async (f) => access(f).then(() => true, () => false);

// Se salta lo que no esté en la carpeta en vez de abortar: normalmente solo se
// reemplaza una foto, y no tiene sentido exigir los originales de todas para
// poder regenerar esa una.
for (const { entrada, salida } of IMAGENES) {
  if (!(await existe(entrada))) {
    console.log(`· se omite ${salida} (falta ${entrada})`);
    continue;
  }
  const info = await sharp(entrada).webp({ quality: 82 }).toFile(salida);
  console.log(`✓ ${salida} — ${(info.size / 1024).toFixed(0)} KB`);
}

/**
 * Open Graph: la miniatura que aparece al compartir el enlace por WhatsApp.
 *
 * Se genera de la foto del hero, así que hay que regenerarla cada vez que esa
 * foto cambie. El recorte NO puede dejarse en `position: "top"`: la franja
 * apaisada que sale de una foto vertical es estrecha, y anclada arriba corta la
 * sonrisa a la altura del labio. Se recorta a mano una banda que va desde algo
 * de aire sobre la cabeza hasta por debajo de la barbilla.
 *
 * `RECORTE_Y` es el píxel donde empieza esa banda en la foto original. Si se
 * cambia la foto del hero, hay que revisar este valor y mirar el resultado:
 * es la primera impresión de quien recibe el enlace.
 */
const RECORTE_Y = 110;
const OG_ANCHO = 1200;
const OG_ALTO = 630;

if (await existe(IMAGENES[0].entrada)) {
  const origen = sharp(IMAGENES[0].entrada);
  const { width } = await origen.metadata();
  // Banda con la misma proporción que el destino, para que no se deforme nada.
  const alto = Math.round((width * OG_ALTO) / OG_ANCHO);

  const og = await sharp(IMAGENES[0].entrada)
    .extract({ left: 0, top: RECORTE_Y, width, height: alto })
    .resize(OG_ANCHO, OG_ALTO)
    .webp({ quality: 85 })
    .toFile(`${DESTINO}/og-dra-gloria-portillo.webp`);
  console.log(
    `✓ ${DESTINO}/og-dra-gloria-portillo.webp — ${(og.size / 1024).toFixed(0)} KB`,
  );
}
