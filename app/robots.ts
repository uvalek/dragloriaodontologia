import type { MetadataRoute } from "next";
import { SITIO } from "@/lib/sitio";

/** Se indexa todo: es una landing pública sin secciones privadas. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITIO}/sitemap.xml`,
  };
}
