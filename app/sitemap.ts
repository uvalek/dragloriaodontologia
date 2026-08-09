import type { MetadataRoute } from "next";

/**
 * Mapa del sitio. Hoy la web es una sola página, así que tiene una única
 * entrada; si más adelante se agregan páginas (blog, precios, un tratamiento
 * con su propia página) se listan aquí.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://dra-gloria-portillo.vercel.app",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
