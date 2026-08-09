import EnlaceWhatsApp from "./EnlaceWhatsApp";
import Monograma from "./Monograma";
import { consultorio, contacto, llamadoFinal } from "@/lib/contenido";

const CLARO = "var(--color-claro)";
const CLARO_TENUE = "color-mix(in srgb, var(--color-claro) 72%, transparent)";

/**
 * Último bloque de la página: la invitación a escribir y el pie.
 *
 * Comparten el fondo vino a propósito, y es el único bloque oscuro de la
 * página: quien llegó hasta abajo ya leyó todo lo que tenía que leer, así que
 * aquí solo debe encontrar el botón. El pie repite los datos de contacto para
 * que no tenga que volver a subir.
 */
export default function LlamadoFinal() {
  return (
    <section style={{ background: "var(--color-vino)", color: CLARO }}>
      <div
        className="contenedor"
        style={{ paddingBlock: "clamp(56px, 7vw, 96px)" }}
      >
        <div
          className="grid items-center"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "clamp(28px, 4vw, 64px)",
          }}
        >
          <div>
            <h2
              data-animar="subir"
              style={{
                fontSize: "clamp(30px, 3.6vw, 44px)",
                lineHeight: 1.14,
                margin: 0,
                maxWidth: "18ch",
              }}
            >
              {llamadoFinal.titulo}
            </h2>
            <p
              data-animar="subir"
              style={
                {
                  fontSize: 16,
                  lineHeight: 1.7,
                  margin: "18px 0 0",
                  maxWidth: "42ch",
                  color: "color-mix(in srgb, var(--color-claro) 80%, transparent)",
                  "--retraso": "100ms",
                } as React.CSSProperties
              }
            >
              {llamadoFinal.parrafo}
            </p>
          </div>

          {/* Los botones entran al final de la secuencia. Es el último gesto
              de la página y lo único que queremos que el visitante haga. */}
          <div
            data-animar="subir"
            className="flex flex-wrap gap-3 justify-self-start"
            style={{ "--retraso": "220ms" } as React.CSSProperties}
          >
            {/* Rosa claro (300) en vez del rosa principal: sobre el vino da
                6.3:1 y se lee cómodo. El rosa normal se quedaría en 2.4:1. */}
            <EnlaceWhatsApp
              origen="cta_final"
              className="btn btn-sobre-vino"
              style={{
                padding: "13px 24px",
                fontSize: 15,
                color: "var(--color-accent-300)",
                borderColor: "var(--color-accent-300)",
              }}
            >
              Agendar por WhatsApp
            </EnlaceWhatsApp>

            <a
              className="btn btn-sobre-vino"
              href={contacto.telefonoEnlace}
              style={{
                padding: "13px 24px",
                fontSize: 15,
                color: CLARO,
                borderColor: "color-mix(in srgb, var(--color-claro) 40%, transparent)",
              }}
            >
              {contacto.telefonoVisible}
            </a>
          </div>
        </div>

        <hr
          style={{
            height: 1,
            border: 0,
            margin: "clamp(40px, 5vw, 64px) 0 0",
            background: "color-mix(in srgb, var(--color-claro) 22%, transparent)",
          }}
        />

        <footer
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 28,
            paddingTop: 32,
            fontSize: 13.5,
            lineHeight: 1.7,
            color: CLARO_TENUE,
          }}
        >
          <div>
            <span className="flex items-center gap-3" style={{ color: CLARO }}>
              <Monograma
                lado={34}
                fontSize={15}
                color="var(--color-accent-300)"
                colorBorde="var(--color-accent-300)"
              />
              <span
                style={{ fontFamily: "var(--font-heading)", fontSize: 17 }}
              >
                {consultorio.nombre}
              </span>
            </span>
            <p style={{ margin: "14px 0 0" }}>
              {consultorio.titulo} · Cédula profesional {consultorio.cedula}
            </p>
          </div>

          <div>
            <p style={{ margin: 0 }}>{consultorio.direccion.completa}</p>
          </div>

          <div>
            <p style={{ margin: 0 }}>
              Lunes a viernes 9:00–20:00
              <br />
              Sábado 9:00–14:00
              <br />
              Domingo cerrado
            </p>
          </div>

          <div>
            <p style={{ margin: 0 }}>
              <a
                href={contacto.telefonoEnlace}
                style={{ color: "var(--color-accent-300)", textDecoration: "none" }}
              >
                {contacto.telefonoInternacional}
              </a>
              <br />
              <EnlaceWhatsApp
                origen="footer"
                style={{ color: "var(--color-accent-300)", textDecoration: "none" }}
              >
                WhatsApp
              </EnlaceWhatsApp>
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}
