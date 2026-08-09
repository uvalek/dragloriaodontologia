import Contador from "./Contador";
import Estrellas from "./Estrellas";
import { barraDatos, calificacion } from "@/lib/contenido";

/** Crema sobre el verde, con la opacidad que usa el diseño para el texto de apoyo. */
const CREMA_TENUE = "color-mix(in srgb, #f3f2f2 78%, transparent)";

/**
 * Banda verde con los cuatro datos duros que sostienen la confianza:
 * calificación, años de práctica, cédula profesional y horario.
 *
 * Va justo debajo del hero a propósito: son las objeciones que un paciente
 * nuevo resuelve antes de escribir por WhatsApp.
 *
 * Las columnas se separan con un borde a la izquierda. La primera no lo lleva,
 * porque una línea al inicio de la fila se leería como el borde de la sección.
 */
export default function BarraDatos() {
  return (
    <section style={{ background: "var(--color-verde)", color: "#f3f2f2" }}>
      <div
        className="contenedor grid"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: "clamp(24px, 3vw, 40px)",
          paddingBlock: "clamp(34px, 4vw, 52px)",
        }}
      >
        {/* Calificación de Google. Las cuatro columnas entran escalonadas de
            izquierda a derecha, en el mismo orden en que se leen. */}
        <Columna primera retraso={0}>
          <span className="flex items-baseline gap-2.5">
            <Cifra style={{ color: "var(--color-accent-400)" }}>
              <Contador
                valor={calificacion.promedio}
                decimales={1}
                ancho={3}
              />
            </Cifra>
            <Estrellas
              id="estrellas-banda"
              color="var(--color-accent-400)"
              animar
            />
          </span>
          <Pie>{barraDatos.resenas}</Pie>
        </Columna>

        {/* Años de experiencia */}
        <Columna retraso={110}>
          <Cifra>
            <Contador valor={25} ancho={2} />
          </Cifra>
          <Pie>{barraDatos.experiencia.texto}</Pie>
        </Columna>

        {/* Cédula profesional — el dato que vuelve verificable todo lo demás.
            No se anima como contador a propósito: es un folio, no una cantidad,
            y verlo correr de 0 a 2 740 104 sugiere una cifra que no significa
            nada. */}
        <Columna retraso={220}>
          <Cifra>{barraDatos.cedula.cifra}</Cifra>
          <Pie>{barraDatos.cedula.texto}</Pie>
        </Columna>

        {/* Horario. `nbsp` evita que "Lun a Sáb" se parta en dos renglones. */}
        <Columna retraso={330}>
          <Cifra sinFormatoNumerico>Lun&nbsp;a&nbsp;Sáb</Cifra>
          <Pie>{barraDatos.horario.texto}</Pie>
        </Columna>
      </div>
    </section>
  );
}

function Columna({
  primera = false,
  retraso = 0,
  children,
}: {
  primera?: boolean;
  /** Milisegundos de espera antes de que esta columna aparezca. */
  retraso?: number;
  children: React.ReactNode;
}) {
  return (
    <div
      data-animar="crecer"
      className="flex flex-col gap-2.5"
      style={
        {
          "--retraso": `${retraso}ms`,
          ...(primera
            ? {}
            : {
                borderLeft:
                  "1px solid color-mix(in srgb, #f3f2f2 22%, transparent)",
                paddingLeft: "clamp(20px, 3vw, 40px)",
              }),
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

function Cifra({
  children,
  style,
  sinFormatoNumerico = false,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  /** Para "Lun a Sáb", que es texto y no debe llevar el ajuste de cifras. */
  sinFormatoNumerico?: boolean;
}) {
  return (
    <span
      className={sinFormatoNumerico ? undefined : "cifras"}
      style={{
        fontFamily: "var(--font-heading)",
        fontSize: 44,
        lineHeight: 1,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

function Pie({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontSize: 13.5, lineHeight: 1.5, color: CREMA_TENUE }}>
      {children}
    </span>
  );
}
