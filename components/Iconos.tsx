/**
 * Iconos SVG del diseño, trazados a mano (no vienen de ninguna librería).
 *
 * Todos usan `stroke="currentColor"` para que hereden el color del contexto:
 * gris tenue en el encabezado, rosa en las tarjetas de servicios.
 */

type PropsIcono = {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
};

/** Trazos compartidos por todos los iconos, tal como los define el diseño. */
const trazo = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function IconoTelefono({ size = 15, style }: PropsIcono) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      style={style}
      aria-hidden="true"
      {...trazo}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function IconoWhatsApp({ size = 16, style }: PropsIcono) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      style={style}
      aria-hidden="true"
      {...trazo}
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}
