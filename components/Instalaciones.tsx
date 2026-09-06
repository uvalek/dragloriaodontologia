"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { instalaciones } from "@/lib/contenido";

/**
 * Galería del consultorio, con visor a pantalla completa.
 *
 * Por qué un visor y no enlaces sueltos como en la sección de títulos: aquí
 * son cuatro fotos del mismo sitio y lo natural es pasar de una a otra. Con
 * enlaces habría que volver atrás entre cada una.
 *
 * Sin JavaScript sigue siendo utilizable: la rejilla se ve igual y cada foto es
 * un enlace normal al archivo, que el navegador abre por su cuenta. El visor
 * solo se interpone cuando el script está vivo (de ahí el `preventDefault`).
 */
export default function Instalaciones() {
  const fotos = instalaciones.fotos;
  const [abierta, setAbierta] = useState<number | null>(null);

  const cerrar = useCallback(() => setAbierta(null), []);
  const mover = useCallback(
    (paso: number) => setAbierta((i) => (i === null ? i : (i + paso + fotos.length) % fotos.length)),
    [fotos.length],
  );

  useEffect(() => {
    if (abierta === null) return;
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    };
    document.addEventListener("keydown", alPulsar);
    // Mientras el visor está abierto, la página de detrás no debe moverse.
    const desbordeAntes = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", alPulsar);
      document.body.style.overflow = desbordeAntes;
    };
  }, [abierta, cerrar, mover]);

  return (
    <section
      style={{
        background: "var(--color-bg)",
        color: "var(--color-text)",
        padding: "clamp(44px, 5.4vw, 80px) var(--lateral)",
      }}
    >
      <div className="contenedor">
        <div data-animar style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: "clamp(22px, 2.6vw, 36px)" }}>
          <h2 style={{ fontSize: "clamp(34px, 4.4vw, 62px)", maxWidth: "20ch" }}>{instalaciones.titulo}</h2>
          <p style={{ margin: 0, fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.55, color: "var(--color-suave)", maxWidth: "52ch" }}>
            {instalaciones.entradilla}
          </p>
        </div>

        {/* Dos columnas fijas y no `auto-fit`: son cuatro fotos, y con columnas
            automáticas caben tres en escritorio y la cuarta queda descolgada
            en una fila para ella sola. */}
        <div className="rejilla-galeria" style={{ display: "grid", gap: "clamp(10px, 1.2vw, 16px)" }}>
          {fotos.map((f, i) => (
            <a
              key={f.src}
              href={f.src}
              onClick={(e) => {
                e.preventDefault();
                setAbierta(i);
              }}
              className="foto-consultorio"
              data-animar="zoom"
              aria-label={`Ver en grande: ${f.alt}`}
              style={{
                position: "relative",
                display: "block",
                aspectRatio: "4 / 3",
                borderRadius: "var(--radius-tarjeta)",
                overflow: "hidden",
                background: "var(--color-rosa-pal)",
                cursor: "zoom-in",
                ["--retraso" as string]: `${i * 70}ms`,
              }}
            >
              <Image
                src={f.src}
                alt={f.alt}
                fill
                sizes="(max-width: 700px) 92vw, (max-width: 1200px) 46vw, 340px"
                style={{ objectFit: "cover" }}
              />
            </a>
          ))}
        </div>
      </div>

      {abierta !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Fotos del consultorio"
          onClick={cerrar}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(13,12,11,0.94)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(12px, 3vw, 40px)",
          }}
        >
          <div style={{ position: "relative", width: "min(1200px, 100%)", aspectRatio: "4 / 3" }} onClick={(e) => e.stopPropagation()}>
            <Image
              src={fotos[abierta].src}
              alt={fotos[abierta].alt}
              fill
              sizes="100vw"
              style={{ objectFit: "contain" }}
            />
          </div>

          <BotonVisor etiqueta="Cerrar" alPulsar={cerrar} estilo={{ top: "clamp(12px, 3vw, 28px)", right: "clamp(12px, 3vw, 28px)" }}>
            <path d="M6 6l12 12M18 6L6 18" />
          </BotonVisor>
          <BotonVisor etiqueta="Foto anterior" alPulsar={() => mover(-1)} estilo={{ left: "clamp(8px, 2vw, 24px)", top: "50%", transform: "translateY(-50%)" }}>
            <path d="M15 5l-7 7 7 7" />
          </BotonVisor>
          <BotonVisor etiqueta="Foto siguiente" alPulsar={() => mover(1)} estilo={{ right: "clamp(8px, 2vw, 24px)", top: "50%", transform: "translateY(-50%)" }}>
            <path d="M9 5l7 7-7 7" />
          </BotonVisor>

          {/* Con fondo propio: la imagen va en `contain` y puede llegar hasta
              abajo, y el contador sobre una foto clara dejaba de leerse. */}
          <span
            style={{
              position: "absolute",
              bottom: "clamp(14px, 3vw, 28px)",
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(0,0,0,0.55)",
              color: "#fff",
              fontSize: 15,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {abierta + 1} / {fotos.length}
          </span>
        </div>
      )}
    </section>
  );
}

function BotonVisor({
  etiqueta,
  alPulsar,
  estilo,
  children,
}: {
  etiqueta: string;
  alPulsar: () => void;
  estilo: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={etiqueta}
      onClick={(e) => {
        e.stopPropagation();
        alPulsar();
      }}
      style={{
        position: "absolute",
        width: 46,
        height: 46,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.4)",
        background: "rgba(0,0,0,0.4)",
        cursor: "pointer",
        padding: 0,
        ...estilo,
      }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {children}
      </svg>
    </button>
  );
}
