/**
 * Cuadro con las iniciales "GP" que hace las veces de logo, en el encabezado y
 * en el footer. Cambia de tamaño y de color según dónde se use, así que ambos
 * llegan por props en vez de duplicar el componente.
 */
export default function Monograma({
  lado = 38,
  color = "var(--color-accent-700)",
  colorBorde = "var(--color-accent)",
  fontSize = 17,
}: {
  /** Ancho y alto del cuadro en píxeles. */
  lado?: number;
  color?: string;
  colorBorde?: string;
  fontSize?: number;
}) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "grid",
        placeItems: "center",
        width: lado,
        height: lado,
        border: `1px solid ${colorBorde}`,
        borderRadius: "var(--radius-sm)",
        fontFamily: "var(--font-heading)",
        fontWeight: 400,
        fontSize,
        letterSpacing: "0.04em",
        color,
        flex: "none",
      }}
    >
      GP
    </span>
  );
}
