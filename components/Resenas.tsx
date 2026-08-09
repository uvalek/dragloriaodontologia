import Contador from "./Contador";
import Estrellas from "./Estrellas";
import { calificacion, contacto, resenas } from "@/lib/contenido";

/**
 * Prueba social: la calificación de Google en grande y tres reseñas reales.
 *
 * Las reseñas son textuales del perfil de Google del consultorio; se enlaza al
 * perfil para que cualquiera pueda comprobarlas, que es justo lo que las hace
 * creíbles.
 *
 * Fondo verde claro para separar visualmente esta sección de las de arriba y
 * abajo, que van sobre el crema.
 */
export default function Resenas() {
  return (
    <section
      id="resenas"
      className="border-t border-b"
      style={{
        background: "var(--color-verde-claro)",
        borderColor: "var(--color-divider)",
      }}
    >
      <div
        className="contenedor"
        style={{ paddingBlock: "clamp(56px, 7vw, 104px)" }}
      >
        {/* Cabecera: título a la izquierda, calificación a la derecha.
            `items-end` alinea ambos por la base, no por el centro. */}
        <div
          className="grid items-end"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(28px, 4vw, 64px)",
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
              Lo que dicen los pacientes
            </span>
            <h2
              data-animar="subir"
              style={
                {
                  fontSize: "clamp(32px, 3.8vw, 46px)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.008em",
                  margin: "18px 0 0",
                  maxWidth: "18ch",
                  "--retraso": "90ms",
                } as React.CSSProperties
              }
            >
              Reseñas en Google
            </h2>
          </div>

          <div
            data-animar="crecer"
            className="flex items-end"
            style={{ gap: 22 }}
          >
            <span
              className="cifras block"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(72px, 9vw, 112px)",
                // Interlineado por debajo de 1 para que el número se apoye
                // sobre la línea base sin arrastrar espacio muerto arriba.
                lineHeight: 0.86,
                color: "var(--color-accent)",
              }}
            >
              <Contador
                valor={calificacion.promedio}
                decimales={1}
                ancho={3}
                duracion={1600}
              />
            </span>
            <span className="block" style={{ paddingBottom: 8 }}>
              <Estrellas
                id="estrellas-cabecera"
                ancho={102}
                alto={19}
                style={{ display: "block" }}
                animar
              />
              <span
                className="cifras block"
                style={{
                  fontSize: 14,
                  marginTop: 10,
                  color: "color-mix(in srgb, var(--color-text) 70%, transparent)",
                }}
              >
                {calificacion.total} reseñas · Google
              </span>
            </span>
          </div>
        </div>

        {/* Las tres reseñas */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "clamp(20px, 2.5vw, 30px)",
            marginTop: "clamp(38px, 4.5vw, 60px)",
          }}
        >
          {resenas.map((resena, i) => (
            <figure
              key={resena.autor}
              data-animar="subir"
              className="flex flex-col"
              style={
                {
                  margin: 0,
                  background: "var(--color-bg)",
                  border: "1px solid var(--color-divider)",
                  borderRadius: "var(--radius-md)",
                  padding: "26px 24px",
                  gap: 16,
                  // Altura mínima pareja para que las tres tarjetas se vean como
                  // una fila aunque los textos tengan largos distintos.
                  minHeight: 200,
                  "--retraso": `${i * 110}ms`,
                } as React.CSSProperties
              }
            >
              {/* Cinco estrellas llenas: las tres reseñas elegidas son de 5. */}
              <Estrellas
                id={`estrellas-${resena.autor.split(" ")[0].toLowerCase()}`}
                ancho={66}
                alto={13}
                relleno={null}
                animar
              />
              <blockquote
                className="flex-1"
                style={{
                  margin: 0,
                  fontFamily: "var(--font-heading)",
                  fontSize: 20,
                  lineHeight: 1.4,
                }}
              >
                “{resena.texto}”
              </blockquote>
              <figcaption
                className="uppercase"
                style={{
                  fontSize: 12.5,
                  letterSpacing: "0.06em",
                  color: "color-mix(in srgb, var(--color-text) 50%, transparent)",
                  margin: 0,
                }}
              >
                {resena.autor}
              </figcaption>
            </figure>
          ))}
        </div>

        <div
          className="flex flex-wrap items-center"
          style={{ gap: 18, marginTop: "clamp(30px, 3.5vw, 44px)" }}
        >
          <a
            className="btn btn-primary"
            href={contacto.mapa}
            target="_blank"
            rel="noopener"
            style={{ padding: "12px 22px", fontSize: 15 }}
          >
            Ver las reseñas en Google
          </a>
          <span
            style={{
              fontSize: 13.5,
              color: "color-mix(in srgb, var(--color-text) 60%, transparent)",
            }}
          >
            Calificación promedio de {calificacion.total} pacientes verificados
            por Google.
          </span>
        </div>
      </div>
    </section>
  );
}
