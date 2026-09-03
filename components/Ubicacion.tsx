import { consultorio, contacto, horarios } from "@/lib/contenido";

/**
 * Dirección, horario y mapa.
 *
 * El mapa va en un iframe con `loading="lazy"`: sin eso, Google Maps carga su
 * propio JavaScript en cuanto abre la página y se lleva por delante buena
 * parte del presupuesto de carga, aunque el visitante nunca baje hasta aquí.
 */
export default function Ubicacion() {
  return (
    <section
      id="ubicacion"
      style={{
        background: "var(--color-bg)",
        color: "var(--color-text)",
        padding: "clamp(20px, 3vw, 40px) var(--lateral) clamp(44px, 5vw, 72px)",
      }}
    >
      <div
        className="contenedor"
        style={{
          display: "grid",
          gap: "clamp(20px, 2.6vw, 40px)",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          alignItems: "start",
        }}
      >
        <div data-animar style={{ display: "flex", flexDirection: "column", gap: "clamp(16px, 2vw, 26px)" }}>
          <h2 style={{ fontSize: "clamp(38px, 4.6vw, 66px)" }}>Dónde y cuándo</h2>

          <p style={{ margin: 0, fontSize: "clamp(17px, 1.5vw, 21px)", lineHeight: 1.45, color: "var(--color-suave)" }}>
            {consultorio.direccion.calle}, {consultorio.direccion.colonia},
            <br />
            {consultorio.direccion.codigoPostal}
            <br />
            {consultorio.direccion.ciudad}, {consultorio.direccion.estado}
          </p>

          <div>
            {horarios.map((h) => (
              <div
                key={h.dias}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 16,
                  padding: "13px 0",
                  borderTop: "1px solid var(--color-borde)",
                  fontSize: "clamp(15px, 1.3vw, 17px)",
                  color: h.cerrado ? "color-mix(in srgb, var(--color-suave) 78%, transparent)" : undefined,
                }}
              >
                <span>{h.dias}</span>
                <span style={{ fontVariantNumeric: "tabular-nums" }}>{h.horas}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <a
              className="pildora pildora-rosa"
              href={consultorio.enlaceMapa}
              target="_blank"
              rel="noopener noreferrer"
              style={{ height: 52, padding: "0 26px", fontSize: 16 }}
            >
              Cómo llegar
            </a>
            <a
              className="pildora pildora-borde"
              href={contacto.telefonoEnlace}
              style={{ height: 52, padding: "0 26px", fontSize: 16 }}
            >
              Llamar al {contacto.telefonoVisible}
            </a>
          </div>
        </div>

        <div
          data-animar="aparecer"
          style={{
            borderRadius: "var(--radius-tarjeta)",
            overflow: "hidden",
            background: "var(--color-rosa-pal)",
            ["--retraso" as string]: "120ms",
          }}
        >
          <iframe
            title="Ubicación del consultorio en Google Maps"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(consultorio.direccion.completa)}&z=16&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ border: 0, width: "100%", height: "clamp(300px, 40vw, 460px)", display: "block" }}
          />
        </div>
      </div>
    </section>
  );
}
