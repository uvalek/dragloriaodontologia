import type { IconoServicio as Nombre } from "@/lib/contenido";

/**
 * Los seis iconos de las tarjetas de servicios, trazados a mano en el diseño.
 *
 * Van todos en un solo archivo con un `switch` en vez de seis componentes:
 * comparten atributos y siempre se usan desde el mismo lugar, así que separarlos
 * solo repartiría el mismo SVG en más archivos.
 */
const TRAZOS: Record<Nombre, React.ReactNode> = {
  // Destello de cuatro puntas — limpieza
  destello: (
    <path d="M9.9 15.5A2 2 0 0 0 8.5 14.1l-6.1-1.6a.5.5 0 0 1 0-1l6.1-1.6A2 2 0 0 0 9.9 8.5l1.6-6.1a.5.5 0 0 1 1 0l1.6 6.1a2 2 0 0 0 1.4 1.4l6.1 1.6a.5.5 0 0 1 0 1l-6.1 1.6a2 2 0 0 0-1.4 1.4l-1.6 6.1a.5.5 0 0 1-1 0z" />
  ),
  // Capas apiladas — resinas y empastes
  capas: (
    <>
      <path d="M12.8 2.2a2 2 0 0 0-1.6 0L2.6 6.1a1 1 0 0 0 0 1.8l8.6 3.9a2 2 0 0 0 1.6 0l8.6-3.9a1 1 0 0 0 0-1.8z" />
      <path d="M2 12.5l9.2 4.2a2 2 0 0 0 1.6 0L22 12.5" />
      <path d="M2 17.5l9.2 4.2a2 2 0 0 0 1.6 0L22 17.5" />
    </>
  ),
  // Escudo con palomita — extracciones
  escudo: (
    <>
      <path d="M20 13c0 5-3.5 7.5-7.7 9a1 1 0 0 1-.7 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.2 1.2 0 0 1 1.5 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  // Línea de pulso — endodoncia
  pulso: (
    <path d="M22 12h-2.5a2 2 0 0 0-1.9 1.5l-2.4 8.3a.25.25 0 0 1-.5 0L9.2 2.2a.25.25 0 0 0-.5 0l-2.3 8.3A2 2 0 0 1 4.5 12H2" />
  ),
  // Puente dental — prótesis y placas
  puente: (
    <>
      <rect x="3" y="7" width="18" height="10" rx="3" />
      <path d="M8 7v10M12 7v10M16 7v10" />
    </>
  ),
  // Cara sonriente — odontopediatría
  sonrisa: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <path d="M9 9h.01M15 9h.01" />
    </>
  ),
};

export default function IconoServicio({ nombre }: { nombre: Nombre }) {
  return (
    <svg
      width={26}
      height={26}
      viewBox="0 0 24 24"
      fill="none"
      // Dorado fijo: es el único acento de color de la tarjeta.
      stroke="var(--color-accent)"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {TRAZOS[nombre]}
    </svg>
  );
}
