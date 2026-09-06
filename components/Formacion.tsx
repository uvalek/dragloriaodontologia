import Image from "next/image";
import { formacion } from "@/lib/contenido";

/**
 * Los títulos de la doctora, con el documento a la vista.
 *
 * Va justo después de las razones para volver: quien llegó hasta aquí ya está
 * convencido de que la tratan bien, y esto responde la otra pregunta —si sabe
 * lo que hace— con papeles en vez de adjetivos.
 *
 * Cada tarjeta abre el documento completo en otra pestaña. Es un enlace normal,
 * no un visor: funciona sin JavaScript, el celular lo abre con su propio visor
 * —donde se puede ampliar con los dedos, que es justo lo que hace falta para
 * leer letra pequeña— y no hay que mantener código de ventanas emergentes.
 */
export default function Formacion() {
  return (
    <section
      style={{
        background: "var(--color-rosa-pal)",
        color: "var(--color-text)",
        padding: "clamp(44px, 5.4vw, 80px) var(--lateral)",
      }}
    >
      <div className="contenedor">
        <div data-animar style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: "clamp(22px, 2.6vw, 36px)" }}>
          <span style={{ fontSize: "clamp(11px, 1vw, 13px)", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-kicker)" }}>
            {formacion.kicker}
          </span>
          <h2 style={{ fontSize: "clamp(34px, 4.4vw, 62px)", maxWidth: "20ch" }}>{formacion.titulo}</h2>
          <p style={{ margin: 0, fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.55, color: "var(--color-suave)", maxWidth: "52ch" }}>
            {formacion.entradilla}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gap: "clamp(12px, 1.6vw, 22px)",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          }}
        >
          {formacion.documentos.map((d, i) => (
            <a
              key={d.nombre}
              href={d.imagen.src}
              target="_blank"
              rel="noopener noreferrer"
              className="tarjeta-titulo"
              data-animar="zoom"
              style={{ ["--retraso" as string]: `${i * 80}ms` }}
            >
              <div
                style={{
                  position: "relative",
                  aspectRatio: "4 / 3",
                  background: "#fff",
                  borderRadius: "var(--radius-chip)",
                  overflow: "hidden",
                  border: "1px solid var(--color-borde)",
                }}
              >
                <Image
                  src={d.imagen.src}
                  alt={d.imagen.alt}
                  fill
                  sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 420px"
                  // `contain` y no `cover`: recortar un documento para que llene
                  // la tarjeta le cortaría el encabezado o la firma.
                  style={{ objectFit: "contain", padding: 10 }}
                />
              </div>

              <div style={{ marginTop: 14 }}>
                <h3 style={{ margin: "0 0 6px", fontSize: "clamp(18px, 1.6vw, 22px)", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
                  {d.nombre}
                </h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.45, color: "var(--color-suave)" }}>
                  {d.institucion}
                </p>
                <p style={{ margin: "6px 0 0", fontSize: 14, color: "var(--color-acento)" }}>
                  {d.detalle}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
