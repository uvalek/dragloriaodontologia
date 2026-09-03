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

export const metadata: Metadata = {
  metadataBase: new URL(SITIO),
  title: "Dra. Gloria Portillo Atempa — Dentista en Zacatelco, Tlaxcala",
  description:
    "Consultorio dental en el centro de Zacatelco, Tlaxcala. 25 años de experiencia en odontología general para toda la familia: limpiezas, resinas, endodoncia, prótesis y odontopediatría. Agende su cita por WhatsApp.",
  keywords: [
    "dentista Zacatelco",
    "odontóloga Tlaxcala",
    "consultorio dental Zacatelco",
    "limpieza dental Zacatelco",
    "endodoncia Tlaxcala",
    "Dra. Gloria Portillo Atempa",
  ],
  authors: [{ name: "Dra. Gloria Portillo Atempa" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITIO,
    siteName: "Dra. Gloria Portillo Atempa",
    title: "Dra. Gloria Portillo Atempa — Dentista en Zacatelco, Tlaxcala",
    description:
      "25 años cuidando la salud bucal de Zacatelco. Odontología general para toda la familia, con explicaciones claras y sin prisas.",
    images: [
      {
        url: "/img/og-dra-gloria-portillo.webp",
        width: 1200,
        height: 630,
        alt: "Dra. Gloria Portillo Atempa en la recepción de su consultorio",
      },
    ],
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
