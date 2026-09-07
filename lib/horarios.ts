/**
 * Horarios: un solo sitio donde se guardan y tres formas de mostrarlos.
 *
 * Antes el mismo horario estaba escrito a mano en cuatro lugares —la tabla de
 * la sección de ubicación, el resumen de una línea de la banda de datos, el
 * bloque del pie y el `openingHoursSpecification` del JSON-LD— y nada obligaba
 * a que coincidieran. Aquí se guarda una vez, en formato de 24 horas, y las
 * tres presentaciones se derivan.
 */

export type Dia =
  | "lunes"
  | "martes"
  | "miercoles"
  | "jueves"
  | "viernes"
  | "sabado"
  | "domingo";

/** Un tramo de atención. `abre` y `cierra` en "HH:MM", que es lo que pide schema.org. */
export type Franja = {
  dias: readonly Dia[];
  abre: string;
  cierra: string;
};

/** De lunes a domingo, que es el orden en que se lee un horario en México. */
const ORDEN: readonly Dia[] = [
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado",
  "domingo",
];

const NOMBRE: Record<Dia, string> = {
  lunes: "Lunes",
  martes: "Martes",
  miercoles: "Miércoles",
  jueves: "Jueves",
  viernes: "Viernes",
  sabado: "Sábado",
  domingo: "Domingo",
};

/** Nombres de schema.org, que van en inglés. */
const EN_INGLES: Record<Dia, string> = {
  lunes: "Monday",
  martes: "Tuesday",
  miercoles: "Wednesday",
  jueves: "Thursday",
  viernes: "Friday",
  sabado: "Saturday",
  domingo: "Sunday",
};

/** "09:00" → "9:00". En español no se escribe el cero de las horas. */
const hora = (hhmm: string) => hhmm.replace(/^0/, "");

/**
 * "Lunes a viernes", "Sábado", "Lunes a sábado".
 *
 * Si los días son contiguos se escribe como rango; si no, se enumeran. El
 * segundo día del rango va en minúscula, que es como se escribe en español.
 */
export function etiquetaDias(dias: readonly Dia[]): string {
  const indices = dias.map((d) => ORDEN.indexOf(d)).sort((a, b) => a - b);
  if (indices.length === 1) return NOMBRE[ORDEN[indices[0]]];

  const contiguos = indices.every((n, i) => i === 0 || n === indices[i - 1] + 1);
  if (contiguos) {
    const primero = NOMBRE[ORDEN[indices[0]]];
    const ultimo = NOMBRE[ORDEN[indices[indices.length - 1]]].toLowerCase();
    return `${primero} a ${ultimo}`;
  }

  const nombres = indices.map((n) => NOMBRE[ORDEN[n]]);
  const ultimo = nombres.pop()!.toLowerCase();
  return `${nombres.join(", ")} y ${ultimo}`;
}

/**
 * Las filas de la tabla, en orden y con los días cerrados incluidos.
 *
 * Los cerrados no se guardan: se calculan como los días que no aparecen en
 * ninguna franja. Así no hay forma de que la lista diga "Domingo cerrado"
 * mientras el horario real dice otra cosa.
 */
export function filasHorario(
  franjas: readonly Franja[],
): { dias: string; horas: string; cerrado: boolean }[] {
  const abiertos = new Set(franjas.flatMap((f) => f.dias));
  const cerrados = ORDEN.filter((d) => !abiertos.has(d));

  const filas = franjas.map((f) => ({
    dias: etiquetaDias(f.dias),
    horas: `${hora(f.abre)} – ${hora(f.cierra)}`,
    cerrado: false,
    /* Para ordenar: el día más temprano de la franja. */
    orden: Math.min(...f.dias.map((d) => ORDEN.indexOf(d))),
  }));

  if (cerrados.length > 0) {
    filas.push({
      dias: etiquetaDias(cerrados),
      horas: "Cerrado",
      cerrado: true,
      orden: Math.min(...cerrados.map((d) => ORDEN.indexOf(d))),
    });
  }

  return filas
    .sort((a, b) => a.orden - b.orden)
    .map(({ dias, horas, cerrado }) => ({ dias, horas, cerrado }));
}

/**
 * Una línea: "Lunes a viernes 9:00–20:00 · Sábado 9:00–14:00".
 *
 * Solo los días abiertos. La raya va sin espacios, al contrario que en la
 * tabla: en una línea corrida, con espacios, se lee como dos datos sueltos.
 */
export function resumenHorario(franjas: readonly Franja[]): string {
  return franjas
    .map((f) => `${etiquetaDias(f.dias)} ${hora(f.abre)}–${hora(f.cierra)}`)
    .join(" · ");
}

/** El formato que entiende Google. Los días cerrados simplemente no aparecen. */
export function aOpeningHours(franjas: readonly Franja[]) {
  return franjas.map((f) => ({
    "@type": "OpeningHoursSpecification" as const,
    dayOfWeek: f.dias.map((d) => EN_INGLES[d]),
    opens: f.abre,
    closes: f.cierra,
  }));
}
