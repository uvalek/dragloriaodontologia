import Contador from "./Contador";
import { sucursales, type Resena, type Sucursal } from "@/lib/contenido";

function Estrella({ llena }: { llena: boolean }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill={llena ? "var(--color-estrella)" : "rgba(255,255,255,0.3)"} aria-hidden="true">
      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2Z" />
    </svg>
  );
}

/**
 * Reseñas reales de Google, agrupadas por sucursal.
 *
 * Van separadas porque son fichas distintas de Google: mezclar la calificación
 * de una con las opiniones de la otra sería inexacto, y el 4.6 solo cubre las
 * 20 reseñas del consultorio del centro.
 *
 * Es el único bloque oscuro del cuerpo de la página, y eso es deliberado: la
 * prueba social es lo que convence a un paciente nuevo, así que se separa del
 * resto en vez de fundirse con las secciones blancas.
 */
export default function Resenas() {
  return (
    <section
      id="resenas"
      style={{
        background: "var(--color-text)",
        color: "#fff",
        padding: "clamp(44px, 5.4vw, 84px) var(--lateral)",
      }}
    >
      <div className="contenedor">
        <h2 data-animar style={{ fontSize: "clamp(38px, 5vw, 72px)", marginBottom: "clamp(26px, 3vw, 44px)" }}>
          <span className="linea-recorte" data-animar><span>Lo que dicen</span></span>
          <span className="linea-recorte" data-animar style={{ ["--retraso" as string]: "90ms" }}><span>los pacientes</span></span>
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(34px, 4vw, 56px)" }}>
          {sucursales.map((sede) => (
            <GrupoResenas key={sede.id} sede={sede} />
          ))}
        </div>

        <p data-animar style={{ margin: "clamp(24px, 3vw, 40px) 0 0", fontSize: 15, color: "rgba(255,255,255,0.66)" }}>
          Todas son reseñas publicadas en las fichas de Google de cada consultorio.
          Puede abrirlas y leerlas completas.
        </p>
      </div>
    </section>
  );
}

/**
 * Las reseñas de una sede.
 *
 * La primera fila lleva tres columnas: una reseña, el bloque de la nota y otra
 * reseña; el resto va debajo, donde cada tarjeta dispone de más ancho.
 *
 * Arriba van las dos reseñas más cortas. Las tres columnas de esa fila se
 * estiran a la altura de la más alta, así que una reseña larga arriba deja a su
 * pareja con medio palmo de hueco vacío al lado. Abajo, con el doble de ancho,
 * el mismo texto ocupa la mitad de alto y se lee mejor.
 *
 * La partición se deriva del array; antes se leía por índice fijo y una cuarta
 * reseña simplemente no se dibujaba.
 */
function GrupoResenas({ sede }: { sede: Sucursal }) {
  const porLongitud = [...sede.resenas].sort((a, b) => a.texto.length - b.texto.length);
  const arriba = porLongitud.slice(0, 2);
  /* El resto conserva el orden en que están escritas. */
  const resto = sede.resenas.filter((r) => !arriba.includes(r));
  const [primera, segunda] = sede.resenas.filter((r) => arriba.includes(r));

  return (
    <div>
      <h3
        data-animar
        style={{
          fontSize: "clamp(20px, 2vw, 26px)",
          marginBottom: "clamp(14px, 1.6vw, 22px)",
          color: "#fff",
        }}
      >
        {sede.etiqueta}
      </h3>

      <div
        style={{
          display: "grid",
          gap: "clamp(12px, 1.6vw, 22px)",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          alignItems: "stretch",
        }}
      >
        {primera && <Cita resena={primera} retraso={0} />}
        <Nota sede={sede} />
        {segunda && <Cita resena={segunda} retraso={160} />}
      </div>

      {resto.length > 0 && (
        <div
          style={{
            marginTop: "clamp(12px, 1.6vw, 22px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "clamp(12px, 1.6vw, 22px)",
          }}
        >
          {resto.map((r, i) => (
            <Cita key={r.autor} resena={r} retraso={i * 80} />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * El bloque central: la calificación de Google, si la hay.
 *
 * Cuando Google no publica un promedio para esa ficha no se enseñan estrellas
 * ni número: solo cuántas opiniones hay y el enlace para leerlas. Inventar una
 * nota, o reutilizar la de la otra sede, sería decirle al paciente algo que no
 * podemos sostener.
 */
function Nota({ sede }: { sede: Sucursal }) {
  const c = sede.calificacion;
  const enteras = c ? Math.floor(c.promedio) : 0;

  return (
    <div
      data-animar
      className="calificacion-bloque"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        textAlign: "center",
        padding: "clamp(20px, 2.4vw, 32px)",
        ["--retraso" as string]: "80ms",
      }}
    >
      {c ? (
        <>
          <Contador
            valor={c.promedio}
            decimales={1}
            ancho={3}
            style={{ fontSize: "clamp(56px, 7vw, 96px)", fontWeight: 600, lineHeight: 1, letterSpacing: "-0.04em" }}
          />
          <div style={{ display: "flex", gap: 3 }} aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <Estrella key={i} llena={i < enteras} />
            ))}
          </div>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.4, color: "rgba(255,255,255,0.78)" }}>
            {c.total} reseñas
            <br />
            en Google
          </p>
        </>
      ) : (
        <p style={{ margin: 0, fontSize: 17, lineHeight: 1.4, color: "rgba(255,255,255,0.78)" }}>
          {sede.resenas.length} reseñas
          <br />
          en Google
        </p>
      )}

      <a
        href={sede.enlaceMapa}
        target="_blank"
        rel="noopener noreferrer"
        className="pildora"
        style={{
          marginTop: 8,
          height: 46,
          padding: "0 22px",
          border: "1px solid rgba(255,255,255,0.45)",
          color: "#fff",
          fontSize: 16,
        }}
      >
        Ver en Google
      </a>
    </div>
  );
}

function Cita({ resena, retraso }: { resena: Resena; retraso: number }) {
  return (
    <figure
      data-animar
      style={{
        margin: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 20,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.14)",
        borderRadius: "var(--radius-tarjeta)",
        padding: "clamp(20px, 2.4vw, 32px)",
        ["--retraso" as string]: `${retraso}ms`,
      }}
    >
      <blockquote style={{ margin: 0, fontSize: "clamp(16px, 1.4vw, 20px)", lineHeight: 1.45, letterSpacing: "-0.01em" }}>
        {resena.texto}
      </blockquote>
      <figcaption style={{ fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.72)" }}>
        {resena.autor}
      </figcaption>
    </figure>
  );
}
