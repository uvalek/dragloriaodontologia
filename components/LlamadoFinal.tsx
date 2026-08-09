import EnlaceWhatsApp from "./EnlaceWhatsApp";
import Monograma from "./Monograma";
import { consultorio, contacto, llamadoFinal } from "@/lib/contenido";

const CREMA = "#f3f2f2";
const CREMA_TENUE = "color-mix(in srgb, #f3f2f2 72%, transparent)";

/**
 * Último bloque de la página: la invitación a escribir y el pie.
 *
 * Comparten la banda verde a propósito. Quien llegó hasta abajo ya leyó todo lo
 * que tenía que leer; aquí solo debe encontrar el botón, y el pie repite los
 * datos de contacto para que no tenga que volver a subir.
 */
export default function LlamadoFinal() {
  return (
    <section style={{ background: "var(--color-verde)", color: CREMA }}>
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
                  color: "color-mix(in srgb, #f3f2f2 80%, transparent)",
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
            {/* Dorado claro en vez del dorado normal: sobre el verde oscuro el
                #b68235 no alcanza contraste suficiente para leerse cómodo. */}
            <EnlaceWhatsApp
              origen="cta_final"
              className="btn btn-sobre-verde"
              style={{
                padding: "13px 24px",
                fontSize: 15,
                color: "var(--color-accent-400)",
                borderColor: "var(--color-accent-400)",
              }}
            >
              Agendar por WhatsApp
            </EnlaceWhatsApp>

            <a
              className="btn btn-sobre-verde"
              href={contacto.telefonoEnlace}
              style={{
                padding: "13px 24px",
                fontSize: 15,
                color: CREMA,
                borderColor: "color-mix(in srgb, #f3f2f2 40%, transparent)",
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
            background: "color-mix(in srgb, #f3f2f2 22%, transparent)",
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
            color: CREMA_TENUE,
          }}
        >
          <div>
            <span className="flex items-center gap-3" style={{ color: CREMA }}>
              <Monograma
                lado={34}
                fontSize={15}
                color="var(--color-accent-400)"
                colorBorde="var(--color-accent-400)"
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
                style={{ color: "var(--color-accent-400)", textDecoration: "none" }}
              >
                {contacto.telefonoInternacional}
              </a>
              <br />
              <EnlaceWhatsApp
                origen="footer"
                style={{ color: "var(--color-accent-400)", textDecoration: "none" }}
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
