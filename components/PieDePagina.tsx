import EnlaceWhatsApp from "./EnlaceWhatsApp";
import {
  direccionUnaLinea,
  doctora,
  hrefTel,
  sucursales,
  whatsappPrincipal,
} from "@/lib/contenido";
import { resumenHorario } from "@/lib/horarios";

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
              {doctora.monograma}
            </span>
            <p style={{ margin: 0, fontSize: 17, fontWeight: 600, color: "var(--color-text)" }}>
              {doctora.nombre}
            </p>
          </div>
          <p style={{ margin: "12px 0 0" }}>
            {doctora.titulo} · Cédula profesional {doctora.cedula}
          </p>
        </div>

        {/* Una celda por sede. El horario sale de `resumenHorario` y no escrito
            a mano: antes esta era la tercera copia del mismo dato en el sitio, y
            nada obligaba a que las tres coincidieran. */}
        {sucursales.map((sede, i) => (
          <div
            key={sede.id}
            data-animar
            style={{ ["--retraso" as string]: `${80 + i * 80}ms` }}
          >
            <p style={{ margin: 0, fontWeight: 600, color: "var(--color-text)" }}>
              {sede.etiqueta}
            </p>
            <p style={{ margin: "6px 0 0" }}>{direccionUnaLinea(sede.direccion)}</p>
            <p style={{ margin: "6px 0 0" }}>{resumenHorario(sede.horario)}</p>
            <p style={{ margin: "6px 0 0" }}>
              <a href={hrefTel(sede.telefono)} style={{ color: "var(--color-acento)" }}>
                {sede.telefono.visible}
              </a>
            </p>
          </div>
        ))}

        <p data-animar style={{ margin: 0, display: "flex", flexDirection: "column", gap: 4, ["--retraso" as string]: "320ms" }}>
          <a href={hrefTel(whatsappPrincipal)} style={{ color: "var(--color-acento)" }}>
            +52 {whatsappPrincipal.visible}
          </a>
          <EnlaceWhatsApp origen="footer" style={{ color: "var(--color-acento)" }}>
            WhatsApp
          </EnlaceWhatsApp>
        </p>
      </div>
    </footer>
  );
}
