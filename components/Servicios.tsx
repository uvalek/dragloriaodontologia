import IconoServicio from "./IconoServicio";
import { servicios } from "@/lib/contenido";

/**
 * Los seis tratamientos que se atienden en el consultorio.
 *
 * Cada tarjeta lleva una sola línea de descripción, por diseño: la idea es que
 * el paciente reconozca lo que necesita de un vistazo, no que lea un catálogo.
 *
 * Para agregar o quitar un servicio basta editar el arreglo en contenido.ts;
 * la rejilla se reacomoda sola.
 */
export default function Servicios() {
  return (
    <section
      id="servicios"
      className="border-t"
      style={{
        borderColor: "var(--color-divider)",
        background: "var(--color-bg)",
      }}
    >
      <div
        className="contenedor"
        style={{ paddingBlock: "clamp(56px, 7vw, 100px)" }}
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
          Tratamientos
        </span>

        <h2
          data-animar="subir"
          style={
            {
              fontSize: "clamp(32px, 3.8vw, 46px)",
              lineHeight: 1.12,
              letterSpacing: "-0.008em",
              margin: "18px 0 0",
              maxWidth: "20ch",
              "--retraso": "90ms",
            } as React.CSSProperties
          }
        >
          Lo que se atiende en el consultorio
        </h2>

        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
            gap: "clamp(20px, 2.5vw, 32px)",
            marginTop: "clamp(36px, 4vw, 56px)",
          }}
        >
          {/* Las tarjetas aparecen una tras otra con 70 ms de diferencia. Es
              suficiente para que se lea como una secuencia y lo bastante corto
              para que las seis estén en su sitio en menos de medio segundo. */}
          {servicios.map((servicio, i) => (
            <div
              key={servicio.titulo}
              data-animar="subir"
              className="card"
              style={
                {
                  padding: "26px 24px 28px",
                  gap: 14,
                  "--retraso": `${i * 70}ms`,
                } as React.CSSProperties
              }
            >
              <IconoServicio nombre={servicio.icono} />
              <h3 className="card-title" style={{ fontSize: 19 }}>
                {servicio.titulo}
              </h3>
              <p
                className="card-body"
                style={{ fontSize: 14, opacity: 0.75, lineHeight: 1.6 }}
              >
                {servicio.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
