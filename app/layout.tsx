import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import AnimarAlEntrar from "@/components/AnimarAlEntrar";
import { datosEstructurados } from "@/lib/datos-negocio";
import { SITIO } from "@/lib/sitio";
import "./globals.css";

/**
 * La única fuente del rediseño. next/font la descarga en tiempo de build y la
 * sirve desde nuestro propio dominio: el navegador no hace ninguna petición a
 * Google, lo que quita una conexión de la ruta crítica y evita el parpadeo de
 * texto sin estilo.
 *
 * Se cargan los cuatro pesos que usa el diseño y ninguno más: cada peso extra
 * es un archivo que el visitante descarga.
 */
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--fuente-outfit",
  display: "swap",
});

/**
 * El título empieza por lo que la gente escribe en Google — "dentista en
 * Zacatelco" — y no por el nombre de la doctora. Al buscar un dentista casi
 * nadie sabe todavía cómo se llama, así que la palabra que hace coincidir la
 * búsqueda con el resultado tiene que ir primero, donde Google le da más peso y
 * donde el ojo la encuentra antes en la lista. El nombre va detrás, que es lo
 * que necesita quien ya la conoce y la busca por nombre.
 *
 * Los 60 caracteres son el ancho que Google muestra en un resultado de móvil;
 * pasarse no penaliza, pero corta la frase con puntos suspensivos.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITIO),
  title: "Dentista en Zacatelco | Dra. Gloria Portillo Atempa",
  /* 156 caracteres: ubicación, lo que se atiende, lo que la distingue (abrir en
     domingo) y qué hacer. Google la recorta cerca de 160. */
  description:
    "Dentista en Zacatelco, Tlaxcala. Limpieza, resinas, endodoncia, prótesis y odontopediatría. Dos consultorios, uno abierto los domingos. Agende por WhatsApp.",
  keywords: [
    "dentista Zacatelco",
    "odontóloga Tlaxcala",
    "consultorio dental Zacatelco",
    "limpieza dental Zacatelco",
    "endodoncia Tlaxcala",
    "Dentalitos Zacatelco",
    "dentista domingos Zacatelco",
    "prótesis dental Zacatelco",
    "cirugía bucal Tlaxcala",
    "odontología estética Zacatelco",
    "Dra. Gloria Portillo Atempa",
  ],
  authors: [{ name: "Dra. Gloria Portillo Atempa" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITIO,
    siteName: "Dra. Gloria Portillo Atempa",
    title: "Dentista en Zacatelco | Dra. Gloria Portillo Atempa",
    description:
      "25 años cuidando la salud bucal de Zacatelco, en dos consultorios: el del centro y Dentalitos, abierto los domingos. Agende su cita por WhatsApp.",
    images: [
      {
        url: "/img/og-dra-gloria-portillo.webp",
        width: 1200,
        height: 630,
        alt: "Dra. Gloria Portillo Atempa en la recepción de su consultorio",
      },
    ],
  },
  /* Tarjeta de Twitter/X. Reutiliza la imagen y los textos del Open Graph, que
     es lo que ya lee WhatsApp y Facebook; sin esta etiqueta X enseña un enlace
     pelado en vez de la miniatura ancha. */
  twitter: {
    card: "summary_large_image",
    title: "Dentista en Zacatelco | Dra. Gloria Portillo Atempa",
    description:
      "25 años cuidando la salud bucal de Zacatelco, en dos consultorios: el del centro y Dentalitos, abierto los domingos. Agende su cita por WhatsApp.",
    images: ["/img/og-dra-gloria-portillo.webp"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  /* Color de la barra del navegador en móvil: el negro del hero, para
     que la interfaz del celular se funda con la página. */
  themeColor: "#0d0c0b",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-MX"
      className={`${outfit.variable}`}
    >
      <head>
        {/* Ficha del consultorio para Google. Va en el <head> como script de
            tipo ld+json: no se ejecuta, solo se lee. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(datosEstructurados(SITIO)),
          }}
        />
        {/* Red de seguridad: si el navegador tiene JavaScript desactivado, el
            observador nunca corre y los elementos se quedarían invisibles.
            Esta regla los muestra todos de golpe. */}
        <noscript>
          <style>{`
            [data-animar],[data-entrada],.estrellas-animadas path{
              opacity:1!important;transform:none!important;animation:none!important
            }
          `}</style>
        </noscript>
      </head>
      <body>
        {children}
        <AnimarAlEntrar />
        {/* Métricas de visitas y el evento de clic en WhatsApp. Sin cookies,
            así que no hace falta banner de consentimiento. */}
        <Analytics />
      </body>
    </html>
  );
}
