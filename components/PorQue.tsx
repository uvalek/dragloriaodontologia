import { porQue } from "@/lib/contenido";

/**
 * Las cuatro razones por las que un paciente repite.
 *
 * Van después de las reseñas a propósito: primero lo dicen los pacientes, y
 * solo entonces lo explica el consultorio.
 */
export default function PorQue() {
  return (
    <section
      style={{
        background: "var(--color-bg)",
        color: "var(--color-text)",
        padding: "clamp(44px, 5.4vw, 80px) var(--lateral)",
      }}
    >
      <div className="contenedor">
        <h2 data-animar style={{ fontSize: "clamp(38px, 5vw, 72px)", maxWidth: "24ch", marginBottom: "clamp(26px, 3vw, 44px)" }}>
          {porQue.titulo}
        </h2>

        <div
          style={{
            display: "grid",
            gap: "clamp(16px, 2vw, 30px)",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
          }}
        >
          {porQue.motivos.map((p, i) => (
            <div key={p.titulo} data-animar style={{ ["--retraso" as string]: `${i * 70}ms` }}>
              <h3 style={{ margin: "0 0 10px", fontSize: "clamp(21px, 1.9vw, 26px)", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
                {p.titulo}
              </h3>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "var(--color-suave)" }}>{p.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
