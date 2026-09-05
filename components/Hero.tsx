import Contador from "./Contador";
import EnlaceWhatsApp from "./EnlaceWhatsApp";
import MenuMovil from "./MenuMovil";
import VideoHero from "./VideoHero";
import { calificacion, hero, navegacion } from "@/lib/contenido";

/** Estrella maciza. El mismo trazo en el hero y en las reseñas. */
function Estrella({ lado, color }: { lado: number; color: string }) {
  return (
    <svg width={lado} height={lado} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2Z" />
    </svg>
  );
}

/**
 * Primera pantalla: video a sangre, titular a tres líneas y el botón de
 * WhatsApp.
 *
 * El fondo (los videos encadenados) vive en components/VideoHero.tsx.
 */
export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100svh",
        minHeight: 560,
        overflow: "hidden",
        background: "var(--color-negro-hero)",
      }}
    >
      <VideoHero />

      {/* Degradado que oscurece arriba y abajo. Es lo que sostiene el contraste
          del texto blanco: el video cambia de brillo constantemente y sin esta
          capa el titular se vuelve ilegible en los fotogramas claros. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(13,12,11,0.55) 0%, rgba(13,12,11,0.1) 26%, rgba(13,12,11,0.2) 42%, rgba(13,12,11,0.72) 80%, rgba(13,12,11,0.88) 100%)",
        }}
      />

      <nav
        data-entrada
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "clamp(16px, 3vw, 48px)",
          padding: "clamp(18px, 2.6vw, 30px) var(--lateral)",
        }}
      >
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 10 }} aria-label="Dra. Gloria Portillo, inicio">
          <svg width="26" height="26" viewBox="0 0 30 30" fill="none" aria-hidden="true" style={{ flex: "none" }}>
            <path d="M6 5h7.2v4.2H10v3.4H6V5Z" fill="#fff" />
            <path d="M16.8 5H24v7.6h-4V9.2h-3.2V5Z" fill="#fff" />
            <path d="M6 17.4h4v3.4h3.2V25H6v-7.6Z" fill="#fff" />
            <path d="M20 17.4h4V25h-7.2v-4.2H20v-3.4Z" fill="#fff" />
          </svg>
          <span style={{ fontSize: "clamp(21px, 2vw, 27px)", fontWeight: 500, letterSpacing: "-0.02em", color: "#fff", whiteSpace: "nowrap" }}>
            Portillo
          </span>
        </a>

        <div
          className="solo-escritorio"
          style={{
            alignItems: "center",
            gap: "clamp(18px, 2.4vw, 40px)",
            fontSize: "clamp(15px, 1.3vw, 18px)",
            color: "rgba(255,255,255,0.94)",
            whiteSpace: "nowrap",
          }}
        >
          {navegacion.map((n) => (
            <a key={n.ancla} href={n.ancla}>
              {n.texto}
            </a>
          ))}
        </div>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
          {/* En el diseño este botón apuntaba a #ubicacion. Dice "Contáctanos"
              y es el único botón permanente del hero, así que lleva a WhatsApp,
              que es lo que la página busca. */}
          <EnlaceWhatsApp
            origen="nav"
            className="pildora pildora-clara"
            style={{
              height: "clamp(46px, 4vw, 52px)",
              padding: "0 clamp(20px, 2.2vw, 30px)",
              fontSize: "clamp(15px, 1.3vw, 18px)",
            }}
          >
            Contáctanos
          </EnlaceWhatsApp>
          <MenuMovil />
        </div>
      </nav>


      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 5,
          padding: "0 var(--lateral) clamp(26px, 3.4vw, 44px)",
          color: "#fff",
        }}
      >
        {/* En móvil los avatares y la nota suben por encima de "Odontología"
            (ver .hero-fila): apilado en una columna, la prueba social es lo
            primero que conviene que se vea. En el HTML el <h1> sigue yendo
            antes, que es lo correcto para un lector de pantalla. */}
        <div
          data-entrada
          className="hero-fila"
          style={{ display: "flex", flexWrap: "wrap", gap: "clamp(12px, 2.4vw, 34px)", ["--retraso" as string]: "80ms" }}
        >
          <h1 className="titular-hero linea-recorte" data-entrada><span>{hero.titulo[0]}</span></h1>

          <div style={{ display: "flex", alignItems: "center", gap: "clamp(10px, 1.2vw, 16px)", marginTop: 4 }}>
            <div style={{ display: "flex" }} aria-hidden="true">
              {hero.avatares.map((a, i) => (
                <span
                  key={a.iniciales}
                  style={{
                    width: "clamp(38px, 3.6vw, 52px)",
                    height: "clamp(38px, 3.6vw, 52px)",
                    flex: "none",
                    borderRadius: "50%",
                    border: "2px solid #fff",
                    background: a.degradado,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "clamp(13px, 1.2vw, 17px)",
                    fontWeight: 500,
                    color: "#fff",
                    marginLeft: i === 0 ? 0 : -14,
                  }}
                >
                  {a.iniciales}
                </span>
              ))}
            </div>
            <a href="#resenas" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Contador
                valor={calificacion.total}
                ancho={2}
                style={{ fontSize: "clamp(20px, 2vw, 27px)" }}
              />
              <span style={{ display: "flex", alignItems: "center", gap: "clamp(6px, 0.8vw, 10px)" }}>
                <span style={{ display: "flex", gap: 3 }} aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Estrella key={i} lado={17} color="var(--color-estrella-hero)" />
                  ))}
                </span>
                <span style={{ fontSize: "clamp(17px, 1.8vw, 24px)" }}>Reseñas</span>
              </span>
            </a>
          </div>
        </div>

        <h2 className="titular-hero titular-sangrado linea-recorte" data-entrada style={{ ["--retraso" as string]: "140ms" }}>
          <span>{hero.titulo[1]}</span>
        </h2>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "clamp(14px, 2vw, 40px)" }}>
          <h2 className="titular-hero linea-recorte" data-entrada style={{ ["--retraso" as string]: "200ms" }}>
            <span>{hero.titulo[2]}</span>
          </h2>

          {/* En el diseño este botón apuntaba a #agendar, un ancla que no existe
              en la página: el botón más visible del sitio no llevaba a ningún
              lado. Va a WhatsApp, que es la acción que se busca. */}
          <EnlaceWhatsApp
            origen="hero"
            data-entrada
            className="pildora pildora-oscura"
            style={{
              height: "clamp(56px, 5.4vw, 74px)",
              padding: "0 clamp(26px, 2.8vw, 38px)",
              marginBottom: "clamp(2px, 1vw, 12px)",
              fontSize: "clamp(18px, 1.9vw, 25px)",
              gap: "clamp(10px, 1vw, 14px)",
              ["--retraso" as string]: "260ms",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none" }}>
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M8 2v4M16 2v4M3 10h18" />
            </svg>
            Agendar Consulta
          </EnlaceWhatsApp>
        </div>
      </div>
    </section>
  );
}
