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
 * Carpeta con los PNG originales. No está versionada (pesan ~2 MB cada uno y
 * en el repositorio solo hace falta el WebP ya optimizado). Para volver a
 * generarlos hay que sacar los archivos de `uploads/` del zip del diseño y
 * dejarlos aquí.
 */
const ORIGEN = "originales";
const DESTINO = "public/img";

// La imagen del hero se usa también como Open Graph (1200×630), recortada.
const IMAGENES = [
  {
    entrada: `${ORIGEN}/ChatGPT Image 8 ago 2026, 03_48_03 p.m..png`,
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

for (const { entrada, salida } of IMAGENES) {
  const info = await sharp(entrada).webp({ quality: 82 }).toFile(salida);
  console.log(`✓ ${salida} — ${(info.size / 1024).toFixed(0)} KB`);
}

// Open Graph: recorte apaisado centrado en el rostro (la cara está en el tercio
// superior de la foto vertical, de ahí el `position: top`).
const og = await sharp(IMAGENES[0].entrada)
  .resize(1200, 630, { fit: "cover", position: "top" })
  .webp({ quality: 85 })
  .toFile(`${DESTINO}/og-dra-gloria-portillo.webp`);
console.log(
  `✓ ${DESTINO}/og-dra-gloria-portillo.webp — ${(og.size / 1024).toFixed(0)} KB`,
);
