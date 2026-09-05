"use client";

import { useEffect, useRef, useState } from "react";

/** Los clips del hero, en el orden en que se ven. Al terminar el último vuelve al primero. */
const CLIPS = ["/video/hero-1.mp4", "/video/hero-2.mp4"] as const;

/**
 * Fondo del hero: encadena varios videos, uno tras otro, en bucle.
 *
 * Decisiones que sostienen esto:
 *
 * · **Solo se descarga el primero al abrir la página.** El segundo arranca con
 *   `preload="none"` y no se pide hasta que el primero va por la mitad. Sumados
 *   pesan 1 MB, y buena parte de las visitas llegan por WhatsApp desde un
 *   celular con datos: cargar los dos de golpe sería cobrarle al visitante un
 *   video que quizá no llegue a ver.
 *
 * · **Dos elementos superpuestos, no uno que cambia de `src`.** Cambiar el
 *   `src` deja el hueco en negro mientras el navegador abre el archivo nuevo.
 *   Con dos elementos, el siguiente ya está listo y el cambio es un fundido.
 *
 * · **Sin JavaScript se ve igual de bien.** El HTML sale del servidor con el
 *   primer clip en bucle; el efecto le quita ese `loop` y toma el control. Si
 *   el script no llega a correr, queda el primer video repitiéndose, que es
 *   exactamente lo que había antes.
 *
 * · **Con "reducir movimiento" activado no se reproduce nada.** Se queda el
 *   póster fijo. Un video en bucle detrás del texto es justo el tipo de
 *   movimiento que molesta a quien pidió que no lo hubiera.
 */
export default function VideoHero() {
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activo, setActivo] = useState(0);
  /* En una ref y no en estado: solo la consultan los manejadores, y guardarla
     en estado obligaría a un render extra que no cambia nada en pantalla. */
  const quieto = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      quieto.current = true;
      refs.current.forEach((v) => v?.pause());
      return;
    }

    const primero = refs.current[0];
    if (!primero) return;

    // El `loop` del HTML era la red de seguridad para cuando no hay JavaScript.
    // Ya estamos dentro: a partir de aquí la secuencia la lleva el componente.
    primero.loop = false;
    void primero.play().catch(() => {
      /* Algunos navegadores bloquean la reproducción automática; el póster se
         queda visible y la página funciona igual. */
    });
  }, []);

  /** Al acabar un clip, pasa al siguiente (o vuelve al principio). */
  const alTerminar = (indice: number) => {
    if (quieto.current) return;
    const siguiente = (indice + 1) % CLIPS.length;
    const vSiguiente = refs.current[siguiente];
    if (!vSiguiente) return;

    vSiguiente.currentTime = 0;
    void vSiguiente.play().catch(() => {});
    setActivo(siguiente);

    // El que se va vuelve al principio, listo para su próximo turno.
    const vActual = refs.current[indice];
    if (vActual) vActual.currentTime = 0;
  };

  /** A mitad del clip actual se pide el siguiente, para que llegue a tiempo. */
  const alAvanzar = (indice: number) => {
    if (quieto.current) return;
    const v = refs.current[indice];
    if (!v || !v.duration || v.currentTime < v.duration / 2) return;
    const siguiente = refs.current[(indice + 1) % CLIPS.length];
    if (siguiente && siguiente.preload !== "auto") {
      siguiente.preload = "auto";
      siguiente.load();
    }
  };

  return (
    <div data-entrada="escala" style={{ position: "absolute", inset: 0 }} aria-hidden="true">
      {CLIPS.map((src, i) => (
        <video
          key={src}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className="video-hero"
          // Solo el primero arranca solo y repite: es la versión que se ve si el
          // JavaScript no llega a ejecutarse.
          autoPlay={i === 0}
          loop={i === 0}
          muted
          playsInline
          preload={i === 0 ? "metadata" : "none"}
          poster={i === 0 ? "/video/hero-poster.webp" : undefined}
          tabIndex={-1}
          onEnded={() => alTerminar(i)}
          onTimeUpdate={() => alAvanzar(i)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            // El fundido es de opacidad, que el navegador resuelve sin
            // recalcular el layout.
            opacity: activo === i ? 1 : 0,
            transition: "opacity .8s ease",
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
      ))}
    </div>
  );
}
