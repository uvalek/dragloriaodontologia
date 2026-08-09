"use client";

import { track } from "@vercel/analytics";
import { contacto } from "@/lib/contenido";

/**
 * Enlace a WhatsApp. Es el único objetivo de la página, así que está centralizado
 * en un componente por dos razones:
 *
 *  1. El número y el mensaje precargado se definen en un solo lugar (contenido.ts).
 *  2. Cada clic se registra en analítica junto con la sección desde la que se hizo,
 *     para poder ver después cuál de los botones es el que realmente convierte.
 *
 * Es el único componente de cliente de la página; todo lo demás se sirve como
 * HTML estático.
 */
export default function EnlaceWhatsApp({
  origen,
  className,
  style,
  children,
}: {
  /** Desde dónde se hizo clic: "encabezado", "hero", "cta_final", "footer". */
  origen: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <a
      href={contacto.whatsapp}
      target="_blank"
      rel="noopener"
      className={className}
      style={style}
      onClick={() => track("clic_whatsapp", { origen })}
    >
      {children}
    </a>
  );
}
