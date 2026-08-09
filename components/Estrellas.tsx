import { calificacion } from "@/lib/contenido";

/**
 * Fila de cinco estrellas.
 *
 * Aparece tres veces en la página (banda de datos, cabecera de reseñas y cada
 * tarjeta) con tamaños y colores distintos, así que está parametrizado.
 *
 * Para la calificación de 4.6 la quinta estrella se pinta a medias con un
 * degradado de dos paradas en el mismo punto: es un corte seco, no un
 * desvanecido. Cada instancia necesita su propio `id` de degradado porque los
 * ids de SVG son globales en el documento y se pisarían entre sí.
 */
export default function Estrellas({
  ancho = 76,
  alto = 15,
  color = "var(--color-accent)",
  /** Porcentaje de la quinta estrella que se rellena. `null` = las cinco llenas. */
  relleno = calificacion.rellenoUltimaEstrella as string | null,
  id,
  style,
  animar = false,
}: {
  ancho?: number;
  alto?: number;
  color?: string;
  relleno?: string | null;
  /** Identificador único del degradado dentro de la página. */
  id: string;
  style?: React.CSSProperties;
  /** Enciende las estrellas una tras otra al entrar en pantalla. */
  animar?: boolean;
}) {
  // Las cinco estrellas arrancan en x = 7, 22, 37, 52 y 67.
  const estrellas = [7, 22, 37, 52, 67];

  // La primera se traza con un nodo menos que las otras cuatro. Es así en el
  // archivo del diseño y se respeta tal cual; a 15 px de alto la diferencia no
  // se percibe, pero conviene que el SVG sea idéntico al original.
  const trazoEstrella = (x: number) =>
    x === 7
      ? "M7 1.5l1.7 3.5 3.8.5-2.8 2.7.7 3.8L7 10.2l-3.4 1.8.7-3.8L1.5 5.5l3.8-.5z"
      : `M${x} 1.5l1.7 3.5 3.8.5-2.8 2.7.7 3.8L${x} 10.2l-3.4 1.8.7-3.8-2.8-2.7 3.8-.5z`;

  return (
    <svg
      width={ancho}
      height={alto}
      viewBox="0 0 76 15"
      fill="none"
      aria-hidden="true"
      style={style}
      className={animar ? "estrellas-animadas" : undefined}
      data-animar={animar ? "estrellas" : undefined}
    >
      {relleno && (
        <defs>
          <linearGradient id={id}>
            <stop offset={relleno} stopColor={color} />
            <stop offset={relleno} stopColor="transparent" />
          </linearGradient>
        </defs>
      )}
      <g stroke={color} strokeWidth={1.2} strokeLinejoin="round">
        {estrellas.map((x, i) => {
          const esUltima = i === estrellas.length - 1;
          return (
            <path
              key={x}
              d={trazoEstrella(x)}
              fill={relleno && esUltima ? `url(#${id})` : color}
            />
          );
        })}
      </g>
    </svg>
  );
}
