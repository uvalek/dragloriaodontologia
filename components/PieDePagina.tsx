import EnlaceWhatsApp from "./EnlaceWhatsApp";
import { consultorio, contacto } from "@/lib/contenido";

/**
 * Pie con los datos de contacto repetidos.
 *
 * Quien llega hasta abajo ya leyó la página: aquí solo debe encontrar cómo
 * escribir, sin tener que volver a subir.
 */
export default function PieDePagina() {
  return (
    <footer
      style={{
        background: "var(--color-bg)",
        color: "var(--color-text)",
        padding: "clamp(28px, 3vw, 44px) var(--lateral) clamp(36px, 4vw, 56px)",
        borderTop: "1px solid var(--color-borde)",
      }}
    >
      <div
        className="contenedor"
        style={{
          display: "grid",
          gap: "clamp(20px, 2.4vw, 34px)",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
          fontSize: 15,
          lineHeight: 1.6,
          color: "var(--color-suave)",
        }}
      >
        <div data-animar>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              aria-hidden="true"
              style={{
                width: 40,
                height: 40,
                flex: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                border: "1px solid var(--color-borde)",
                color: "var(--color-acento)",
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              {consultorio.monograma}
            </span>
            <p style={{ margin: 0, fontSize: 17, fontWeight: 600, color: "var(--color-text)" }}>
              {consultorio.nombre}
            </p>
          </div>
          <p style={{ margin: "12px 0 0" }}>
            {consultorio.titulo} · Cédula profesional {consultorio.cedula}
          </p>
        </div>

        <p data-animar style={{ margin: 0, ["--retraso" as string]: "80ms" }}>{consultorio.direccion.completa}</p>

        <p data-animar style={{ margin: 0, ["--retraso" as string]: "160ms" }}>
          Lunes a viernes 9:00–20:00
          <br />
          Sábado 9:00–14:00
          <br />
          Domingo cerrado
        </p>

        <p data-animar style={{ margin: 0, display: "flex", flexDirection: "column", gap: 4, ["--retraso" as string]: "240ms" }}>
          <a href={contacto.telefonoEnlace} style={{ color: "var(--color-acento)" }}>
            {contacto.telefonoInternacional}
          </a>
          <EnlaceWhatsApp origen="footer" style={{ color: "var(--color-acento)" }}>
            WhatsApp
          </EnlaceWhatsApp>
        </p>
      </div>
    </footer>
  );
}
