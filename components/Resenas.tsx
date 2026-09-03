import { calificacion, resenas } from "@/lib/contenido";

function Estrella({ llena }: { llena: boolean }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill={llena ? "var(--color-estrella)" : "rgba(255,255,255,0.3)"} aria-hidden="true">
      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2Z" />
    </svg>
  );
}

/**
 * Reseñas reales de Google, con la calificación en medio.
 *
 * Es el único bloque oscuro del cuerpo de la página, y eso es deliberado: la
 * prueba social es lo que convence a un paciente nuevo, así que se separa del
 * resto en vez de fundirse con las secciones blancas de arriba y abajo.
 */
export default function Resenas() {
  const enteras = Math.floor(calificacion.promedio);

  return (
    <section
      id="resenas"
      style={{
        background: "var(--color-text)",
        color: "#fff",
        padding: "clamp(44px, 5.4vw, 84px) var(--lateral)",
      }}
    >
      <div className="contenedor">
        <h2 data-animar style={{ fontSize: "clamp(38px, 5vw, 72px)", marginBottom: "clamp(26px, 3vw, 44px)" }}>
          Lo que dicen los pacientes
        </h2>

        <div
          style={{
            display: "grid",
            gap: "clamp(12px, 1.6vw, 22px)",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            alignItems: "stretch",
          }}
        >
          <Cita texto={resenas[0].texto} autor={resenas[0].autor} retraso={0} />

          {/* En móvil este bloque sube al principio (ver .calificacion-bloque):
              la nota de Google encabeza la sección en vez de quedar escondida
              entre dos reseñas. */}
          <div
            data-animar
            className="calificacion-bloque"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              textAlign: "center",
              padding: "clamp(20px, 2.4vw, 32px)",
              ["--retraso" as string]: "80ms",
            }}
          >
            <div style={{ fontSize: "clamp(56px, 7vw, 96px)", fontWeight: 600, lineHeight: 1, letterSpacing: "-0.04em", fontVariantNumeric: "tabular-nums" }}>
              {calificacion.promedio.toFixed(1)}
            </div>
            <div style={{ display: "flex", gap: 3 }} aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Estrella key={i} llena={i < enteras} />
              ))}
            </div>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.4, color: "rgba(255,255,255,0.78)" }}>
              {calificacion.total} reseñas
              <br />
              en Google
            </p>
            <a
              href={calificacion.enlace}
              target="_blank"
              rel="noopener noreferrer"
              className="pildora"
              style={{
                marginTop: 8,
                height: 46,
                padding: "0 22px",
                border: "1px solid rgba(255,255,255,0.45)",
                color: "#fff",
                fontSize: 16,
              }}
            >
              Ver las reseñas en Google
            </a>
          </div>

          <Cita texto={resenas[1].texto} autor={resenas[1].autor} retraso={160} />
        </div>

        {resenas[2] && (
          <div style={{ marginTop: "clamp(12px, 1.6vw, 22px)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "clamp(12px, 1.6vw, 22px)" }}>
            <Cita texto={resenas[2].texto} autor={resenas[2].autor} retraso={0} />
          </div>
        )}

        <p data-animar style={{ margin: "clamp(20px, 2.4vw, 32px) 0 0", fontSize: 15, color: "rgba(255,255,255,0.66)" }}>
          Calificación promedio de {calificacion.total} pacientes verificados por Google.
        </p>
      </div>
    </section>
  );
}

function Cita({ texto, autor, retraso }: { texto: string; autor: string; retraso: number }) {
  return (
    <figure
      data-animar
      style={{
        margin: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 20,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.14)",
        borderRadius: "var(--radius-tarjeta)",
        padding: "clamp(20px, 2.4vw, 32px)",
        ["--retraso" as string]: `${retraso}ms`,
      }}
    >
      <blockquote style={{ margin: 0, fontSize: "clamp(17px, 1.5vw, 21px)", lineHeight: 1.45, letterSpacing: "-0.01em" }}>
        {texto}
      </blockquote>
      <figcaption style={{ fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.72)" }}>
        {autor}
      </figcaption>
    </figure>
  );
}
