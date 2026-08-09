import Image from "next/image";
import { sobreLaDoctora } from "@/lib/contenido";

/**
 * Bloque biográfico: foto a la izquierda, historia a la derecha.
 *
 * Los párrafos van justificados con partición de palabras activada, que es como
 * están en el diseño. Es el tratamiento tipográfico de un libro, y aquí funciona
 * porque el texto es largo y la columna es ancha.
 */
export default function SobreLaDoctora() {
  return (
    <section
      id="doctora"
      className="contenedor grid items-center"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "clamp(32px, 5vw, 76px)",
        paddingBlock: "clamp(56px, 7vw, 104px)",
      }}
    >
      <figure className="w-full" style={{ margin: 0, maxWidth: 420 }}>
        {/* Solo desvanecido, sin desplazamiento: una foto de este tamaño
            moviéndose distrae más de lo que aporta. */}
        <div
          data-animar="aparecer"
          className="plate relative"
          style={{ aspectRatio: "3 / 4" }}
        >
          <Image
            src={sobreLaDoctora.imagen.src}
            alt={sobreLaDoctora.imagen.alt}
            fill
            sizes="(max-width: 800px) 92vw, 420px"
            style={{ objectFit: "cover", objectPosition: "50% 35%" }}
          />
        </div>
      </figure>

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
          {sobreLaDoctora.kicker}
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
          {sobreLaDoctora.titulo}
        </h2>

        {sobreLaDoctora.parrafos.map((parrafo, i) => (
          <p
            key={i}
            data-animar="subir"
            style={{
              "--retraso": `${180 + i * 90}ms`,
              fontSize: 16,
              lineHeight: 1.75,
              // El primer párrafo se separa más del título que los siguientes
              // entre sí, para que se lea como bloque.
              margin: i === 0 ? "24px 0 0" : "16px 0 0",
              textAlign: "justify",
              hyphens: "auto",
              color: "color-mix(in srgb, var(--color-text) 80%, transparent)",
            } as React.CSSProperties}
          >
            {parrafo}
          </p>
        ))}

        <p
          data-animar="subir"
          className="cifras"
          style={
            {
              fontSize: 13.5,
              lineHeight: 1.6,
              margin: "24px 0 0",
              color: "color-mix(in srgb, var(--color-text) 62%, transparent)",
              "--retraso": "360ms",
            } as React.CSSProperties
          }
        >
          {sobreLaDoctora.credencial}
        </p>
      </div>
    </section>
  );
}
