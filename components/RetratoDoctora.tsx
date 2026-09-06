"use client";

import { useState } from "react";
import Image from "next/image";
import { hero } from "@/lib/contenido";

/**
 * Las fotos de la doctora, alternables con dos botones.
 *
 * Las dos imágenes se dibujan siempre y se cambia solo la opacidad, en lugar de
 * montar y desmontar la que toca: así el cambio es un fundido y no un
 * parpadeo mientras el navegador decodifica la otra.
 *
 * Ambas están recortadas a cuadrado desde el script, así que el hueco mide lo
 * mismo con cualquiera de las dos y la página no se mueve al cambiar.
 */
export default function RetratoDoctora() {
  const retratos = hero.retratos;
  const [activa, setActiva] = useState(0);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1 / 1",
        borderRadius: "var(--radius-tarjeta)",
        overflow: "hidden",
        background: "var(--color-rosa-pal)",
      }}
    >
      {retratos.map((r, i) => (
        <Image
          key={r.src}
          src={r.src}
          alt={r.alt}
          fill
          sizes="(max-width: 860px) 92vw, 620px"
          // La primera es la que se ve al cargar: se pide con prioridad para que
          // no llegue después del texto que tiene al lado.
          priority={i === 0}
          style={{
            objectFit: "cover",
            opacity: activa === i ? 1 : 0,
            transition: "opacity .5s ease",
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          bottom: 14,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 8,
          padding: "8px 12px",
          borderRadius: 999,
          background: "rgba(13,12,11,0.45)",
          backdropFilter: "blur(4px)",
        }}
      >
        {retratos.map((r, i) => (
          <button
            key={r.src}
            type="button"
            onClick={() => setActiva(i)}
            aria-label={`Ver foto ${i + 1} de ${retratos.length}`}
            aria-pressed={activa === i}
            style={{
              width: activa === i ? 26 : 10,
              height: 10,
              padding: 0,
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              background: activa === i ? "#fff" : "rgba(255,255,255,0.55)",
              transition: "width .3s ease, background-color .3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
