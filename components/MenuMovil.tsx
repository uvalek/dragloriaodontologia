"use client";

import { useEffect, useState } from "react";
import { navegacion } from "@/lib/contenido";

/**
 * Botón de menú para pantallas estrechas, donde los enlaces del nav no caben.
 *
 * Es el único componente del hero que necesita JavaScript. Se mantiene
 * separado a propósito: así el resto del hero —el video, el titular, el botón
 * de WhatsApp— se sirve como HTML estático y se ve aunque el script tarde.
 */
export default function MenuMovil() {
  const [abierto, setAbierto] = useState(false);

  // Cerrar con Escape. Sin esto, quien navega con teclado queda atrapado
  // dentro del menú sin forma evidente de salir.
  useEffect(() => {
    if (!abierto) return;
    const alPulsar = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    document.addEventListener("keydown", alPulsar);
    return () => document.removeEventListener("keydown", alPulsar);
  }, [abierto]);

  return (
    <>
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={abierto}
        aria-controls="menu-movil"
        className="solo-movil"
        style={{
          width: 46,
          height: 46,
          flex: "none",
          // `display` lo controla .solo-movil: puesto aquí en línea ganaría
          // sobre la media query y el botón se vería también en escritorio.
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 999,
          border: "1px solid rgba(255,255,255,0.6)",
          background: "rgba(13,12,11,0.35)",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
          {abierto ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
        </svg>
      </button>

      {abierto && (
        <div
          id="menu-movil"
          style={{
            position: "absolute",
            top: 84,
            left: 16,
            right: 16,
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            padding: "14px 18px",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.35)",
            background: "rgba(13,12,11,0.92)",
            backdropFilter: "blur(6px)",
            fontSize: 19,
          }}
        >
          {navegacion.map((n, i) => (
            <a
              key={n.ancla}
              href={n.ancla}
              onClick={() => setAbierto(false)}
              style={{
                color: "#fff",
                padding: "10px 0",
                borderTop: i === 0 ? undefined : "1px solid rgba(255,255,255,0.16)",
              }}
            >
              {n.texto}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
