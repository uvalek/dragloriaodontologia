import Contador from "./Contador";
import RetratoDoctora from "./RetratoDoctora";
import { barraDatos, sobreLaDoctora } from "@/lib/contenido";

/**
 * Presentación de la doctora: texto a la izquierda, foto a la derecha, y
 * debajo tres tarjetas con los datos duros.
 *
 * Las tarjetas son las mismas cuatro cifras de la versión anterior, ahora en
 * tres: la calificación de Google subió al hero, junto a los avatares.
 */
export default function Intro() {
  return (
    <section
      style={{
        background: "var(--color-bg)",
        color: "var(--color-text)",
        padding: "clamp(40px, 6vw, 84px) var(--lateral) clamp(24px, 3vw, 40px)",
      }}
    >
      <div
        className="contenedor"
        style={{
          display: "grid",
          gap: "clamp(16px, 2vw, 28px)",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
          alignItems: "stretch",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(14px, 1.6vw, 22px)" }}>
          <h2 style={{ fontSize: "clamp(40px, 5.6vw, 88px)", lineHeight: 0.94, letterSpacing: "-0.035em" }}>
            <span className="linea-recorte" data-animar>
              <span>Dra. Gloria</span>
            </span>
            <span className="linea-recorte" data-animar style={{ ["--retraso" as string]: "90ms" }}>
              <span>Portillo Atempa</span>
            </span>
          </h2>

          <p data-animar style={{ margin: 0, fontSize: "clamp(19px, 1.9vw, 26px)", fontWeight: 500, lineHeight: 1.3, letterSpacing: "-0.01em", ["--retraso" as string]: "160ms" }}>
            Su dentista de confianza, a unas cuadras de casa.
          </p>

          <p data-animar style={{ margin: 0, fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.55, color: "var(--color-suave)", maxWidth: "52ch", ["--retraso" as string]: "220ms" }}>
            25 años cuidando la salud bucal de Zacatelco. Odontología general para toda la familia, con explicaciones claras y sin prisas.
          </p>

          {sobreLaDoctora.parrafos.map((p, i) => (
            <p key={p.slice(0, 24)} data-animar style={{ ["--retraso" as string]: `${280 + i * 60}ms`, margin: 0, fontSize: "clamp(16px, 1.35vw, 19px)", lineHeight: 1.6, color: "var(--color-suave)", maxWidth: "56ch" }}>
              {p}
            </p>
          ))}

          <p data-animar style={{ margin: 0, fontSize: "clamp(16px, 1.35vw, 19px)", lineHeight: 1.6, color: "var(--color-suave)", ["--retraso" as string]: "420ms" }}>
            {sobreLaDoctora.credencial}
          </p>
        </div>

        <figure data-animar="aparecer" style={{ display: "flex", ["--retraso" as string]: "120ms" }}>
          <RetratoDoctora />
        </figure>
      </div>

      <div
        className="contenedor"
        style={{
          marginTop: "clamp(28px, 3.4vw, 48px)",
          display: "grid",
          gap: "clamp(10px, 1.2vw, 16px)",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
          ["--retraso" as string]: "200ms",
        }}
      >
        <Dato cifra={<Contador valor={25} ancho={2} />} texto={barraDatos.experiencia.texto} retraso={0} />
        <Dato cifra={barraDatos.cedula.cifra} texto={barraDatos.cedula.texto} retraso={90} />
        <Dato cifra={barraDatos.horario.cifra} texto={barraDatos.horario.texto} retraso={180} />
      </div>
    </section>
  );
}

/**
 * Una tarjeta de dato.
 *
 * En el diseño la tercera venía con la cifra y el texto colocados a mano
 * (`left: -134px; top: 37px`), un arrastre del editor visual que se salía de
 * la tarjeta en cuanto cambiaba el ancho. Aquí las tres usan el mismo apilado
 * y se acomodan solas.
 */
function Dato({ cifra, texto, retraso }: { cifra: React.ReactNode; texto: string; retraso: number }) {
  return (
    <div
      data-animar="zoom"
      style={{
        background: "var(--color-rosa-pal)",
        borderRadius: "var(--radius-chip)",
        padding: "clamp(16px, 1.6vw, 22px)",
        minHeight: 112,
        ["--retraso" as string]: `${retraso}ms`,
      }}
    >
      <div style={{ fontSize: "clamp(30px, 2.8vw, 40px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
        {cifra}
      </div>
      <p style={{ margin: "8px 0 0", fontSize: 15, lineHeight: 1.4, color: "var(--color-suave)" }}>{texto}</p>
    </div>
  );
}
