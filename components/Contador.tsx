"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Número que cuenta hacia arriba cuando entra en pantalla.
 *
 * Dos cuidados importantes:
 *
 * 1. **SEO y sin JavaScript.** El valor final se renderiza en el servidor, así
 *    que está en el HTML desde el primer momento. La animación solo lo
 *    reemplaza mientras dura; si el JavaScript no corre, el número correcto ya
 *    estaba ahí.
 *
 * 2. **Sin saltos de layout.** Al pasar de "0" a "25" el texto cambia de ancho
 *    y empujaría lo que tiene al lado. Por eso el contenedor reserva desde el
 *    principio el ancho del valor final (`ancho`, en unidades `ch`) y el número
 *    se dibuja con cifras de ancho fijo. El indicador CLS se queda en cero.
 */
export default function Contador({
  valor,
  decimales = 0,
  /** Ancho reservado en caracteres. Debe ser el largo del valor final. */
  ancho,
  duracion = 1400,
  className,
  style,
}: {
  valor: number;
  decimales?: number;
  ancho: number;
  duracion?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const referencia = useRef<HTMLSpanElement>(null);
  const [mostrado, setMostrado] = useState<number | null>(null);

  useEffect(() => {
    const elemento = referencia.current;
    if (!elemento) return;

    // Igual que en el resto de la página: si pidieron menos movimiento, el
    // número simplemente se queda quieto en su valor final.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cuadro = 0;
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        observador.disconnect();

        const inicio = performance.now();
        const avanzar = (ahora: number) => {
          const progreso = Math.min((ahora - inicio) / duracion, 1);
          // Misma desaceleración que las demás animaciones: el conteo frena
          // al acercarse a la cifra final en vez de cortarse en seco.
          const suavizado = 1 - Math.pow(1 - progreso, 3);
          setMostrado(valor * suavizado);
          if (progreso < 1) cuadro = requestAnimationFrame(avanzar);
          else setMostrado(null); // devuelve el control al valor del servidor
        };
        cuadro = requestAnimationFrame(avanzar);
      },
      { threshold: 0.4 },
    );

    observador.observe(elemento);
    return () => {
      observador.disconnect();
      cancelAnimationFrame(cuadro);
    };
  }, [valor, duracion]);

  const texto =
    mostrado === null
      ? valor.toLocaleString("es-MX", {
          minimumFractionDigits: decimales,
          maximumFractionDigits: decimales,
        })
      : mostrado.toLocaleString("es-MX", {
          minimumFractionDigits: decimales,
          maximumFractionDigits: decimales,
        });

  return (
    <span
      ref={referencia}
      className={className}
      style={{
        display: "inline-block",
        minWidth: `${ancho}ch`,
        ...style,
      }}
    >
      {texto}
    </span>
  );
}
