/**
 * URL pública del sitio.
 *
 * Es la que usan la etiqueta canónica, el Open Graph (la miniatura que se ve al
 * compartir por WhatsApp), el sitemap y el robots.txt. Tiene que ser una sola y
 * apuntar siempre al dominio definitivo: si Google encuentra el mismo contenido
 * en dos direcciones, reparte el posicionamiento entre las dos.
 *
 * Se resuelve en este orden:
 *
 *  1. `NEXT_PUBLIC_SITIO`, por si algún día hace falta forzarla desde Vercel.
 *  2. El dominio propio, en cualquier compilación de producción.
 *  3. localhost, en desarrollo.
 */
const DOMINIO = "https://gloriaportillo.com";

export const SITIO =
  process.env.NEXT_PUBLIC_SITIO ??
  (process.env.NODE_ENV === "production" ? DOMINIO : "http://localhost:3000");
