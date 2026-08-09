import type { MetadataRoute } from "next";

/** Se indexa todo: es una landing pública sin secciones privadas. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://dra-gloria-portillo.vercel.app/sitemap.xml",
  };
}
