import Image from "next/image";
import EnlaceWhatsApp from "./EnlaceWhatsApp";
import { IconoWhatsApp } from "./Iconos";
import { contacto, hero } from "@/lib/contenido";

/**
 * Primera pantalla: nombre, promesa y los dos botones de acción.
 *
 * El layout es una rejilla de `auto-fit` con columnas de mínimo 330 px. Eso
 * significa que no hace falta ningún media query: mientras quepan dos columnas
 * de 330 px, texto y foto van lado a lado; cuando no caben (más o menos por
 * debajo de 800 px de ancho), la foto se pasa sola debajo del texto.
 */
export default function Hero() {
  return (
    <section
      id="top"
      className="contenedor grid items-center"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
        gap: "clamp(32px, 5vw, 72px)",
        paddingTop: "clamp(40px, 6vw, 76px)",
        paddingBottom: "clamp(48px, 6vw, 84px)",
        // Ocupa casi todo el alto de la pantalla menos el encabezado.
        // `svh` en vez de `vh` para que la barra del navegador móvil no la corte.
        minHeight: "min(760px, calc(100svh - 70px))",
      }}
    >
      {/* Los elementos del hero entran escalonados de arriba abajo, con 90 ms
          entre uno y otro: el ojo sigue la secuencia y termina en los botones,
          que es donde queremos que acabe.

          Se anima con `animation` de CSS y no con el observador de scroll a
          propósito: esto está en la primera pantalla y debe empezar en cuanto
          se lee el CSS, sin esperar a que cargue el JavaScript. */}
      <div>
        <span
          data-entrada
          className="cifras block uppercase"
          style={{
            fontSize: 12,
            letterSpacing: "0.16em",
            color: "var(--color-accent-700)",
          }}
        >
          {hero.kicker}
        </span>

        {/* Único h1 de la página. Las dos líneas se separan a propósito para
            que el apellido nunca quede partido a mitad de palabra. */}
        <h1
          data-entrada
          style={{
            fontSize: "clamp(40px, 5.6vw, 74px)",
            lineHeight: 1.06,
            letterSpacing: "-0.012em",
            margin: "22px 0 0",
            "--retraso": "90ms",
          } as React.CSSProperties}
        >
          <span className="block">{hero.tituloLinea1}</span>{" "}
          <span className="block">{hero.tituloLinea2}</span>
        </h1>

        <p
          data-entrada
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(21px, 2.2vw, 27px)",
            lineHeight: 1.35,
            margin: "20px 0 0",
            color: "color-mix(in srgb, var(--color-text) 82%, transparent)",
            // Medido en caracteres, no en píxeles: el corte de línea cae
            // siempre en el mismo punto sin importar el tamaño de fuente.
            maxWidth: "22ch",
            "--retraso": "180ms",
          } as React.CSSProperties}
        >
          {hero.subtitulo}
        </p>

        <p
          data-entrada
          style={{
            fontSize: 16.5,
            lineHeight: 1.7,
            margin: "20px 0 0",
            maxWidth: "46ch",
            color: "color-mix(in srgb, var(--color-text) 78%, transparent)",
            "--retraso": "270ms",
          } as React.CSSProperties}
        >
          {hero.parrafo}
        </p>

        <div
          data-entrada
          className="flex flex-wrap gap-3"
          style={
            { marginTop: 32, "--retraso": "360ms" } as React.CSSProperties
          }
        >
          <EnlaceWhatsApp
            origen="hero"
            className="btn btn-primary"
            style={{ padding: "12px 22px", fontSize: 15 }}
          >
            <IconoWhatsApp />
            Agendar por WhatsApp
          </EnlaceWhatsApp>

          <a
            className="btn btn-secondary"
            href={contacto.mapa}
            target="_blank"
            rel="noopener"
            style={{ padding: "12px 22px", fontSize: 15 }}
          >
            Cómo llegar
          </a>
        </div>
      </div>

      <figure
        className="w-full justify-self-end"
        style={{ margin: 0, maxWidth: 460 }}
      >
        <div
          data-entrada="escala"
          className="plate relative"
          style={{ aspectRatio: "3 / 4" }}
        >
          <Image
            src={hero.imagen.src}
            alt={hero.imagen.alt}
            fill
            /* Es el elemento más grande de la primera pantalla, o sea el que
               marca el Largest Contentful Paint. Se precarga desde el <head>
               y se pide con prioridad alta para que el navegador no la deje
               para el final. (En Next 16 `priority` quedó obsoleto: ahora se
               declara explícitamente con estas tres propiedades.) */
            preload
            loading="eager"
            fetchPriority="high"
            // Ancho real que ocupa: casi toda la pantalla en móvil, 460 px tope
            // en escritorio. Sin esto Next serviría la versión más grande.
            sizes="(max-width: 800px) 92vw, 460px"
            style={{ objectFit: "cover", objectPosition: "50% 30%" }}
          />
        </div>
      </figure>
    </section>
  );
}
