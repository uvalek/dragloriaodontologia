"use client";

import { useEffect, useRef, useState } from "react";

/** Los clips del hero, en orden. Al terminar el último vuelve al primero. */
const CLIPS = ["hero-1", "hero-2"] as const;

/**
 * A partir de aquí se sirve la versión de 1920 px; por debajo, la de 1280.
 *
 * En una pantalla de celular, 1920 px es tres veces más información de la que
 * caben, y la mayoría de las visitas llegan por WhatsApp desde el celular. La
 * versión ligera pesa un 58 % menos.
 *
 * El navegador elige el `<source>` una sola vez, al cargar: si alguien
 * redimensiona la ventana no cambia de versión. Da igual, nadie pasa de móvil
 * a escritorio a media visita.
 */
const CORTE = "(min-width: 900px)";

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
  /* Hasta que la página no ha terminado de cargar, no se pide ningún clip
     extra. Con un primer clip de 2.5 s, "a mitad" cae en el segundo 1.25,
     cuando el navegador todavía está trayendo las fuentes y el resto de la
     página: el video se colaría en la cola y retrasaría lo que sí se ve. */
  const paginaLista = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      quieto.current = true;
      refs.current.forEach((v) => v?.pause());
      return;
    }

    if (document.readyState === "complete") {
      paginaLista.current = true;
    } else {
      const marcar = () => {
        paginaLista.current = true;
      };
      window.addEventListener("load", marcar, { once: true });
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
    if (quieto.current || !paginaLista.current) return;
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
      {CLIPS.map((nombre, i) => (
        <video
          key={nombre}
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
          {/* El orden importa: el navegador se queda con el primer <source>
              cuyo `media` encaje, así que la versión pesada va primero y
              condicionada. */}
          <source src={`/video/${nombre}.mp4`} media={CORTE} type="video/mp4" />
          <source src={`/video/${nombre}-movil.mp4`} type="video/mp4" />
        </video>
      ))}
    </div>
  );
}
