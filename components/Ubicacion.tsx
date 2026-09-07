import EnlaceWhatsApp from "./EnlaceWhatsApp";
import {
  direccionUnaLinea,
  hrefComoLlegar,
  hrefMapaEmbebido,
  hrefTel,
  sucursales,
  sucursalesSeccion,
  type Sucursal,
} from "@/lib/contenido";
import { filasHorario } from "@/lib/horarios";

/**
 * Las sucursales: dirección, horario y mapa de cada una.
 *
 * Conserva el id `#ubicacion` aunque ahora hable de dos sedes. Ese ancla está
 * publicada, está en el menú y puede haber enlaces externos apuntando a ella;
 * cambiarla por un `#sucursales` más bonito solo rompería cosas.
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
      <div className="contenedor">
        <div
          data-animar
          style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: "clamp(26px, 3vw, 44px)" }}
        >
          <h2 className="subrayado" style={{ fontSize: "clamp(34px, 4.4vw, 62px)", maxWidth: "20ch" }}>
            {sucursalesSeccion.titulo}
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: "clamp(16px, 1.4vw, 19px)",
              lineHeight: 1.55,
              color: "var(--color-suave)",
              maxWidth: "56ch",
            }}
          >
            {sucursalesSeccion.entradilla}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(36px, 4.5vw, 64px)" }}>
          {sucursales.map((s, i) => (
            <BloqueSucursal key={s.id} sede={s} retraso={i * 80} />
          ))}
        </div>

        <p
          data-animar
          style={{ margin: "clamp(28px, 3vw, 44px) 0 0", fontSize: 15, color: "var(--color-suave)" }}
        >
          {sucursalesSeccion.cierre}
        </p>
      </div>
    </section>
  );
}

/**
 * Una sede: datos a la izquierda, mapa a la derecha.
 *
 * Es la misma rejilla que había cuando solo existía un consultorio, extraída
 * para poder repetirla. El mapa va en un iframe con `loading="lazy"`: sin eso
 * Google Maps carga su propio JavaScript nada más abrir la página, aunque el
 * visitante no llegue nunca hasta aquí — y ahora serían dos.
 */
function BloqueSucursal({ sede, retraso }: { sede: Sucursal; retraso: number }) {
  const filas = filasHorario(sede.horario);

  return (
    <div
      id={`sede-${sede.id}`}
      style={{
        display: "grid",
        gap: "clamp(20px, 2.6vw, 40px)",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
        alignItems: "start",
        scrollMarginTop: 24,
      }}
    >
      <div data-animar style={{ display: "flex", flexDirection: "column", gap: "clamp(14px, 1.8vw, 22px)", ["--retraso" as string]: `${retraso}ms` }}>
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <h3 style={{ fontSize: "clamp(26px, 2.6vw, 36px)", letterSpacing: "-0.02em" }}>
            {sede.etiqueta}
          </h3>
          {sede.distintivo && (
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                padding: "5px 12px",
                borderRadius: 999,
                background: "var(--color-rosa-pal)",
                color: "var(--color-acento)",
                whiteSpace: "nowrap",
              }}
            >
              {sede.distintivo}
            </span>
          )}
        </div>

        <p style={{ margin: 0, fontSize: "clamp(16px, 1.4vw, 18px)", lineHeight: 1.5, color: "var(--color-suave)" }}>
          {sede.descriptor}
        </p>

        <p style={{ margin: 0, fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.45 }}>
          {sede.direccion.calle}, {sede.direccion.colonia},
          <br />
          {sede.direccion.codigoPostal} {sede.direccion.ciudad}, {sede.direccion.estado}
        </p>

        <div>
          {filas.map((h) => (
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
            href={hrefComoLlegar(sede)}
            target="_blank"
            rel="noopener noreferrer"
            style={{ height: 52, padding: "0 26px", fontSize: 16 }}
          >
            Cómo llegar
          </a>
          <a
            className="pildora pildora-borde"
            href={hrefTel(sede.telefono)}
            style={{ height: 52, padding: "0 26px", fontSize: 16 }}
          >
            Llamar al {sede.telefono.visible}
          </a>
          {sede.whatsapp && (
            <EnlaceWhatsApp
              origen="sucursales"
              sucursal={sede.id}
              telefono={sede.whatsapp}
              mensaje={sede.mensajeWhatsApp}
              className="pildora pildora-borde"
              style={{ height: 52, padding: "0 26px", fontSize: 16 }}
            >
              WhatsApp
            </EnlaceWhatsApp>
          )}
        </div>
      </div>

      <div
        data-animar="aparecer"
        style={{
          borderRadius: "var(--radius-tarjeta)",
          overflow: "hidden",
          background: "var(--color-rosa-pal)",
          ["--retraso" as string]: `${retraso + 120}ms`,
        }}
      >
        <iframe
          title={`Ubicación de ${sede.etiqueta} en Google Maps`}
          src={hrefMapaEmbebido(sede)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ border: 0, width: "100%", height: "clamp(300px, 40vw, 460px)", display: "block" }}
        />
        <span className="solo-lectores">{direccionUnaLinea(sede.direccion)}</span>
      </div>
    </div>
  );
}
