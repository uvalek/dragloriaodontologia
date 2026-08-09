/**
 * URL pública del sitio.
 *
 * Se resuelve sola, en este orden:
 *
 *  1. `NEXT_PUBLIC_SITIO` — se define a mano en Vercel cuando ya haya dominio
 *     propio (por ejemplo https://dragloriaportillo.com).
 *  2. `VERCEL_PROJECT_PRODUCTION_URL` — la inyecta Vercel en cada compilación
 *     con el subdominio del proyecto. Gracias a esto el sitio se publica sin
 *     configurar nada y las URL canónicas salen correctas desde el primer
 *     despliegue.
 *  3. localhost, para desarrollo.
 *
 * Antes esta URL estaba escrita a mano en tres archivos distintos, lo que
 * garantizaba que tarde o temprano quedaran desincronizados.
 */
export const SITIO =
  process.env.NEXT_PUBLIC_SITIO ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
