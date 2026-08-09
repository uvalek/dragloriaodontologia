import EnlaceWhatsApp from "./EnlaceWhatsApp";
import Monograma from "./Monograma";
import { IconoTelefono } from "./Iconos";
import { consultorio, contacto } from "@/lib/contenido";

/**
 * Encabezado fijo en la parte superior.
 *
 * Se queda pegado al hacer scroll (`sticky`) con el fondo semitransparente y
 * desenfocado, de modo que el botón de WhatsApp está siempre a la vista sin
 * tapar del todo el contenido que pasa por detrás.
 *
 * En móvil, `flex-wrap` hace que el teléfono y el botón bajen a una segunda
 * línea por debajo del nombre. Es el comportamiento del diseño: no hay menú
 * hamburguesa porque no hay menú de navegación que esconder.
 */
export default function Encabezado() {
  return (
    <header
      className="sticky top-0 z-30 border-b"
      style={{
        // 92% de opacidad: deja intuir el contenido detrás pero mantiene el
        // texto del encabezado perfectamente legible.
        background: "color-mix(in srgb, var(--color-bg) 92%, transparent)",
        backdropFilter: "blur(10px)",
        borderColor: "var(--color-divider)",
      }}
    >
      <div
        className="contenedor flex flex-wrap items-center"
        style={{
          paddingBlock: 14,
          gap: "clamp(16px, 4vw, 40px)",
        }}
      >
        {/* Marca — `mr-auto` empuja el resto de los elementos a la derecha. */}
        <a
          href="#top"
          className="mr-auto flex items-center gap-3 no-underline"
          style={{ color: "inherit" }}
        >
          <Monograma />
          <span className="block">
            <span
              className="block"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: 19,
                lineHeight: 1.1,
                letterSpacing: "0.01em",
              }}
            >
              {consultorio.nombreCorto}
            </span>
            <span
              className="block uppercase"
              style={{
                fontSize: 10.5,
                letterSpacing: "0.16em",
                color: "color-mix(in srgb, var(--color-text) 62%, transparent)",
                marginTop: 3,
              }}
            >
              {consultorio.especialidad}
            </span>
          </span>
        </a>

        {/* Teléfono — en celular se convierte en una llamada de un toque. */}
        <a
          href={contacto.telefonoEnlace}
          className="inline-flex items-center gap-2 whitespace-nowrap no-underline"
          style={{ color: "var(--color-text)", fontSize: 14.5 }}
        >
          <IconoTelefono style={{ opacity: 0.6 }} />
          {contacto.telefonoVisible}
        </a>

        <EnlaceWhatsApp
          origen="encabezado"
          className="btn btn-primary whitespace-nowrap"
        >
          Agendar por WhatsApp
        </EnlaceWhatsApp>
      </div>
    </header>
  );
}
