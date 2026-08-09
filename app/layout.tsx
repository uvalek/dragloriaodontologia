import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Lora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import AnimarAlEntrar from "@/components/AnimarAlEntrar";
import { datosEstructurados } from "@/lib/datos-negocio";
import { SITIO } from "@/lib/sitio";
import "./globals.css";

/**
 * Las dos fuentes del diseño. next/font las descarga en tiempo de build y las
 * sirve desde nuestro propio dominio: el navegador no hace ninguna petición a
 * Google, lo que quita una conexión de la ruta crítica y evita el parpadeo de
 * texto sin estilo.
 *
 * `variable` expone cada fuente como custom property; globals.css las conecta
 * con --font-heading y --font-body, que son los nombres del sistema de diseño.
 */
const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--fuente-titulo",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--fuente-cuerpo",
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
  /* Color de la barra del navegador en móvil: el mismo rosa del fondo, para
     que la interfaz del celular se funda con la página. */
  themeColor: "#fdf8f8",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-MX"
      className={`${cormorantGaramond.variable} ${lora.variable}`}
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
