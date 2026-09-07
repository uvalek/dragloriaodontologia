"use client";

import { track } from "@vercel/analytics";
import {
  MENSAJE_WHATSAPP,
  hrefWhatsApp,
  whatsappPrincipal,
  type Telefono,
} from "@/lib/contenido";

/**
 * Enlace a WhatsApp. Es el único objetivo de la página, así que está
 * centralizado en un componente por dos razones:
 *
 *  1. El número y el mensaje se definen en un solo lugar (contenido.ts).
 *  2. Cada clic se registra en analítica con la sección desde la que se hizo y
 *     la sucursal a la que escribe, para poder ver después qué botón convierte
 *     y qué sede recibe más citas.
 *
 * `telefono` y `mensaje` son opcionales y por defecto apuntan al número de
 * siempre: los botones del encabezado, del hero y del pie no tienen que
 * declarar nada y siguen yendo donde iban.
 */
export default function EnlaceWhatsApp({
  origen,
  telefono = whatsappPrincipal,
  mensaje = MENSAJE_WHATSAPP,
  sucursal = "general",
  className,
  style,
  children,
}: {
  /** Desde dónde se hizo clic: "nav", "hero", "footer", "sucursales". */
  origen: string;
  /** A qué número escribe. Por defecto, el de siempre. */
  telefono?: Telefono;
  /** Texto que aparece ya escrito al abrir el chat. */
  mensaje?: string;
  /**
   * `id` de la sucursal cuando el botón pertenece a una sede concreta.
   *
   * Va como dimensión aparte y no metido dentro de `origen`: así "qué botón
   * convierte" y "qué sede recibe más" son dos desgloses directos en vez de
   * tener que partir cadenas.
   */
  sucursal?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <a
      href={hrefWhatsApp(telefono, mensaje)}
      target="_blank"
      rel="noopener"
      className={className}
      style={style}
      onClick={() => track("clic_whatsapp", { origen, sucursal })}
    >
      {children}
    </a>
  );
}
