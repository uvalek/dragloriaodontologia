import Image from "next/image";
import { servicios } from "@/lib/contenido";

/**
 * Los seis tratamientos, en tarjetas con foto y número.
 *
 * La primera va en vino y el resto en rosa pálido, como en el diseño: rompe la
 * cuadrícula y da un punto de entrada a la lista.
 *
 * La rejilla es `auto-fit` con un mínimo, no un número fijo de columnas: pasa
 * de tres a dos y a una según el ancho, sin media queries y sin que haya que
 * tocar nada si algún día se agrega un séptimo tratamiento.
 */
export default function Tratamientos() {
  return (
    <section
      id="tratamientos"
      style={{
        background: "var(--color-bg)",
        color: "var(--color-text)",
        padding: "clamp(40px, 5vw, 72px) var(--lateral)",
      }}
    >
      <div className="contenedor">
        <div data-animar style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: "clamp(22px, 2.6vw, 36px)" }}>
          <span style={{ fontSize: "clamp(11px, 1vw, 13px)", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-kicker)" }}>
            Tratamientos
          </span>
          <h2 style={{ fontSize: "clamp(34px, 4.4vw, 62px)", maxWidth: "22ch" }}>
            Lo que se atiende en el consultorio
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gap: "clamp(10px, 1.2vw, 16px)",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          }}
        >
          {servicios.map((s, i) => {
            const destacada = i === 0;
            return (
              <article
                key={s.titulo}
                className="tarjeta-trat"
                data-animar
                style={{
                  background: destacada ? "var(--color-text)" : "var(--color-rosa-pal)",
                  color: destacada ? "#fff" : "var(--color-text)",
                  borderRadius: "var(--radius-tarjeta)",
                  overflow: "hidden",
                  minHeight: 200,
                  display: "flex",
                  flexDirection: "column",
                  ["--retraso" as string]: `${i * 60}ms`,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "16 / 10",
                    minWidth: 0,
                    background: destacada ? "rgba(255,255,255,0.08)" : "var(--color-rosa-cl)",
                  }}
                >
                  {s.imagen && (
                    <Image
                      src={s.imagen.src}
                      alt={s.imagen.alt}
                      fill
                      sizes="(max-width: 700px) 92vw, (max-width: 1200px) 46vw, 460px"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </div>

                <div style={{ flex: 1, padding: "clamp(20px, 2.2vw, 30px)", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 20 }}>
                  <div>
                    <h3 style={{ margin: "0 0 10px", fontSize: "clamp(22px, 2vw, 30px)", lineHeight: 1.08, letterSpacing: "-0.02em", overflowWrap: "break-word" }}>
                      {s.titulo}
                    </h3>
                    <p style={{ margin: 0, fontSize: 16, lineHeight: 1.5, color: destacada ? "rgba(255,255,255,0.78)" : "var(--color-suave)" }}>
                      {s.descripcion}
                    </p>
                  </div>

                  {/* El número es decorativo: ordena la lista visualmente pero no
                      añade nada leído en voz alta, y "01" antes de cada título
                      solo estorbaría a quien usa lector de pantalla. */}
                  <span
                    aria-hidden="true"
                    style={{
                      alignSelf: "flex-end",
                      width: 44,
                      height: 44,
                      borderRadius: 999,
                      border: `1px solid ${destacada ? "rgba(255,255,255,0.6)" : "var(--color-acento)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      fontWeight: 500,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
