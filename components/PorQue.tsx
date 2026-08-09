import { porQue } from "@/lib/contenido";

/**
 * Los cuatro motivos para elegir el consultorio.
 *
 * Cada uno se marca con una línea dorada arriba en lugar de encerrarlo en una
 * tarjeta: es más ligero visualmente y deja que los cuatro se lean como una
 * sola idea en vez de como cuatro cajas sueltas.
 */
export default function PorQue() {
  return (
    <section
      id="por-que"
      className="contenedor"
      style={{ paddingBlock: "clamp(56px, 7vw, 104px)" }}
    >
      <span
        data-animar="subir"
        className="block uppercase"
        style={{
          fontSize: 12,
          letterSpacing: "0.16em",
          color: "var(--color-accent-700)",
        }}
      >
        {porQue.kicker}
      </span>

      <h2
        data-animar="subir"
        style={
          {
            fontSize: "clamp(32px, 3.8vw, 46px)",
            lineHeight: 1.12,
            letterSpacing: "-0.008em",
            margin: "18px 0 0",
            maxWidth: "22ch",
            "--retraso": "90ms",
          } as React.CSSProperties
        }
      >
        {porQue.titulo}
      </h2>

      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "clamp(26px, 3vw, 48px)",
          marginTop: "clamp(36px, 4vw, 56px)",
        }}
      >
        {porQue.motivos.map((motivo, i) => (
          <div
            key={motivo.titulo}
            data-animar="subir"
            style={
              {
                borderTop: "1px solid var(--color-accent)",
                paddingTop: 20,
                "--retraso": `${i * 90}ms`,
              } as React.CSSProperties
            }
          >
            <h3
              style={{
                fontSize: 22,
                lineHeight: 1.25,
                margin: 0,
              }}
            >
              {motivo.titulo}
            </h3>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.7,
                margin: "12px 0 0",
                color: "color-mix(in srgb, var(--color-text) 78%, transparent)",
              }}
            >
              {motivo.texto}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
