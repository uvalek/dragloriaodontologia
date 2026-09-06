"use client";

import { useEffect } from "react";

/**
 * Motor de las animaciones de entrada.
 *
 * Se monta una sola vez en el layout y vigila TODOS los elementos que lleven el
 * atributo `data-animar`. Gracias a eso las secciones siguen siendo componentes
 * de servidor: solo marcan el elemento con un atributo, sin volverse de cliente
 * ni cargar JavaScript propio.
 *
 * Un único IntersectionObserver para toda la página en lugar de uno por
 * elemento: el navegador agrupa los cálculos en una sola pasada.
 */
export default function AnimarAlEntrar() {
  useEffect(() => {
    const elementos = document.querySelectorAll<HTMLElement>("[data-animar]");

    /* Si el visitante pidió menos movimiento en su sistema operativo, se le
       muestra todo de una vez. Para alguien con vestibular disorder o migraña
       las animaciones de scroll no son un adorno, son un problema. */
    const sinMovimiento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (sinMovimiento) {
      elementos.forEach((el) => el.classList.add("revelado"));
      return;
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          entrada.target.classList.add("revelado");
          // Una vez revelado ya no interesa: se anima al entrar, no cada vez
          // que se pasa por encima. Repetirlo marea al volver a subir.
          observador.unobserve(entrada.target);
        }
      },
      {
        /* Margen negativo abajo: el elemento se revela cuando ya entró unos
           80 px en pantalla, no en cuanto asoma el primer píxel. Así la
           animación se ve, en vez de terminar fuera del campo de visión. */
        rootMargin: "0px 0px -80px 0px",
        threshold: 0,
      },
    );

    elementos.forEach((el) => observador.observe(el));

    /* Red de seguridad para el final de la página.
     *
     * El margen negativo de arriba exige que el elemento entre 80 px en
     * pantalla antes de revelarlo. Los últimos elementos del documento nunca
     * llegan a cumplirlo: por mucho que se baje, el scroll se acaba antes. Así
     * es como el enlace de WhatsApp del pie se quedaba invisible en el celular.
     *
     * Un centinela al final del <body> avisa cuando se ha llegado abajo del
     * todo, y entonces se revela lo que quede pendiente. */
    const centinela = document.createElement("div");
    centinela.style.cssText = "height:1px;width:1px;pointer-events:none";
    centinela.setAttribute("aria-hidden", "true");
    document.body.append(centinela);

    const final = new IntersectionObserver(([entrada]) => {
      if (!entrada.isIntersecting) return;
      elementos.forEach((el) => el.classList.add("revelado"));
      final.disconnect();
      observador.disconnect();
    });
    final.observe(centinela);

    return () => {
      observador.disconnect();
      final.disconnect();
      centinela.remove();
    };
  }, []);

  /**
   * Sombra del encabezado.
   *
   * Se resuelve con un centinela invisible de 1 px al principio del documento
   * en lugar de escuchar el evento `scroll`: así el navegador solo avisa dos
   * veces (al despegarse y al volver arriba) en vez de en cada píxel de
   * desplazamiento.
   */
  useEffect(() => {
    const encabezado = document.querySelector("header");
    if (!encabezado) return;

    const centinela = document.createElement("div");
    centinela.style.cssText =
      "position:absolute;top:0;left:0;height:1px;width:1px;pointer-events:none";
    document.body.prepend(centinela);

    const observador = new IntersectionObserver(([entrada]) => {
      encabezado.classList.toggle("desplazado", !entrada.isIntersecting);
    });

    observador.observe(centinela);
    return () => {
      observador.disconnect();
      centinela.remove();
    };
  }, []);

  return null;
}
