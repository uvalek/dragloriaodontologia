import { consultorio, contacto, horarios, ubicacion } from "@/lib/contenido";

/**
 * Dónde está el consultorio y a qué hora abre.
 *
 * El diseño dejaba un hueco 16:9 con la nota "aquí puede ir el mapa incrustado
 * de Google en lugar de la foto"; se optó por el mapa, que resuelve mejor la
 * pregunta real del visitante: cómo llego.
 */
export default function Ubicacion() {
  return (
    <section
      id="ubicacion"
      className="border-t"
      style={{ borderColor: "var(--color-divider)" }}
    >
      <div
        className="contenedor grid items-center"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "clamp(32px, 5vw, 76px)",
          paddingBlock: "clamp(56px, 7vw, 104px)",
        }}
      >
        <div>
          <span
            data-animar="subir"
            className="block uppercase"
            style={{
              fontSize: 12,
              letterSpacing: "0.16em",
              color: "var(--color-accent-700)",
            }}
          >
            {ubicacion.kicker}
          </span>

          <h2
            data-animar="subir"
            style={
              {
                fontSize: "clamp(32px, 3.8vw, 46px)",
                lineHeight: 1.12,
                letterSpacing: "-0.008em",
                margin: "18px 0 0",
                "--retraso": "90ms",
              } as React.CSSProperties
            }
          >
            {ubicacion.titulo}
          </h2>

          {/* Dirección partida en tres líneas fijas, como en el diseño: se lee
              igual que en un sobre y evita cortes raros al reducir el ancho. */}
          <p
            data-animar="subir"
            style={
              {
                fontSize: 16.5,
                lineHeight: 1.7,
                margin: "24px 0 0",
                maxWidth: "34ch",
                "--retraso": "180ms",
              } as React.CSSProperties
            }
          >
            {consultorio.direccion.calle}, Centro,
            <br />
            Segunda Secc, {consultorio.direccion.codigoPostal}
            <br />
            {consultorio.direccion.ciudad}, {consultorio.direccion.estado}
          </p>

          <table
            className="cifras w-full"
            style={{
              maxWidth: 380,
              borderCollapse: "collapse",
              marginTop: 30,
              fontSize: 15,
            }}
          >
            <tbody>
              {/* Cada renglón del horario entra por separado, como si se
                  fueran escribiendo de arriba abajo. Solo desvanecido: las
                  filas de tabla no aceptan `transform` de forma fiable en
                  todos los navegadores. */}
              {horarios.map((fila, i) => (
                <tr
                  key={fila.dias}
                  data-animar="aparecer"
                  style={
                    { "--retraso": `${240 + i * 80}ms` } as React.CSSProperties
                  }
                >
                  <td style={celda(fila.cerrado)}>{fila.dias}</td>
                  <td style={{ ...celda(fila.cerrado), textAlign: "right" }}>
                    {fila.horas}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            data-animar="subir"
            className="flex flex-wrap gap-3"
            style={
              { marginTop: 30, "--retraso": "480ms" } as React.CSSProperties
            }
          >
            <a
              className="btn btn-primary"
              href={contacto.mapa}
              target="_blank"
              rel="noopener"
              style={{ padding: "12px 22px", fontSize: 15 }}
            >
              Cómo llegar
            </a>
            <a
              className="btn btn-secondary"
              href={contacto.telefonoEnlace}
              style={{ padding: "12px 22px", fontSize: 15 }}
            >
              Llamar al {contacto.telefonoVisible}
            </a>
          </div>
        </div>

        <figure className="w-full" style={{ margin: 0 }}>
          {/* Mismo marco de 7px que tenía el placeholder de la foto, para que
              el mapa se integre con el resto de las imágenes de la página. */}
          <div
            data-animar="aparecer"
            style={{
              aspectRatio: "16 / 9",
              background: "var(--color-rosa-mapa)",
              border: "7px solid var(--color-surface)",
              outline: "1px solid var(--color-divider)",
            }}
          >
            <iframe
              src={contacto.mapaEmbebido}
              title={`Ubicación del consultorio de la ${consultorio.nombre} en Google Maps`}
              // Se carga solo cuando el visitante se acerca a esta sección: el
              // iframe de Google pesa varios cientos de kilobytes y no debe
              // competir con el hero por el ancho de banda inicial.
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ width: "100%", height: "100%", border: 0, display: "block" }}
            />
          </div>
          <figcaption
            style={{
              fontSize: 12.5,
              marginTop: 12,
              color: "color-mix(in srgb, var(--color-text) 62%, transparent)",
            }}
          >
            {consultorio.direccion.completa}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/** Celdas de la tabla de horarios. El domingo va atenuado por estar cerrado. */
function celda(cerrado: boolean): React.CSSProperties {
  return {
    padding: "12px 0",
    borderBottom: "1px solid var(--color-divider)",
    color: cerrado
      ? "color-mix(in srgb, var(--color-text) 62%, transparent)"
      : undefined,
  };
}
