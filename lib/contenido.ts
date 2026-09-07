/**
 * TODO el texto de la landing vive aquí.
 *
 * La idea es que para cambiar un teléfono, agregar un servicio o actualizar una
 * reseña no haya que abrir un solo componente: se edita este archivo y listo.
 *
 * El consultorio tiene dos sedes, así que lo que varía entre ellas vive en
 * `sucursales` y lo que no —la doctora, sus títulos, los tratamientos— vive
 * aparte. Los datos derivables (el href de un teléfono, la dirección en una
 * línea, la URL de un mapa) NO se guardan: se calculan con los ayudantes de
 * abajo. Antes estaban escritos a mano y era cuestión de tiempo que dejaran de
 * coincidir entre sí.
 */

import type { Franja } from "./horarios";

// ─────────────────────────────────────────────────────────────────────────────
// Tipos
// ─────────────────────────────────────────────────────────────────────────────

/** Un número, en las dos únicas formas que hay que guardar. El resto se deriva. */
export type Telefono = {
  /** Como se lee en pantalla: "246 463 5223". */
  visible: string;
  /** Sin signos ni espacios, que es lo que piden wa.me y los enlaces `tel:`. */
  e164: string;
};

export type Direccion = {
  calle: string;
  colonia: string;
  codigoPostal: string;
  ciudad: string;
  estado: string;
};

export type Calificacion = { promedio: number; total: number };

export type Resena = { texto: string; autor: string };

export type Sucursal = {
  /**
   * Identificador estable. Se usa como ancla en la página, clave de React,
   * fragmento del `@id` en los datos estructurados y dimensión del evento de
   * analítica. No cambiarlo una vez publicado.
   */
  id: string;
  /**
   * El nombre EXACTO de la ficha de Google. Google empareja el marcado con el
   * perfil comparando nombre, dirección y teléfono; si no coincide letra por
   * letra, no une las dos cosas.
   */
  nombre: string;
  /** Cómo se le llama en la página, que puede ser más corto y más humano. */
  etiqueta: string;
  /** Una línea que sitúa la sede sin obligar a leer la dirección completa. */
  descriptor: string;
  /** Distintivo corto, si tiene algo que la diferencie. `null` si no. */
  distintivo: string | null;
  direccion: Direccion;
  coordenadas: { latitud: number; longitud: number };
  telefono: Telefono;
  /** WhatsApp propio de la sede. `null` = solo se puede llamar. */
  whatsapp: Telefono | null;
  /** Mensaje ya escrito al abrir el chat de esta sede. */
  mensajeWhatsApp: string;
  horario: readonly Franja[];
  /** Su ficha en Google Maps: botón "ver en Google" y `hasMap` del JSON-LD. */
  enlaceMapa: string;
  /** Perfiles públicos comprobables. Van al `sameAs` de los datos estructurados. */
  perfiles: readonly string[];
  /**
   * `null` cuando Google todavía no publica un promedio para esta ficha.
   * Es `null` y no opcional a propósito: así el código está obligado a decidir
   * qué enseñar cuando no hay nota, en vez de dejar pasar un `undefined`.
   * Nunca se inventa ni se promedia con la de la otra sede.
   */
  calificacion: Calificacion | null;
  resenas: readonly Resena[];
  /** Descripción de esta sede para los datos estructurados. */
  descripcionSeo: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// Derivados
// ─────────────────────────────────────────────────────────────────────────────

export const hrefTel = (t: Telefono) => `tel:+${t.e164}`;

/** Los dos números son mexicanos, así que la lada de país es siempre +52. */
export const telefonoInternacional = (t: Telefono) => `+52 ${t.visible}`;

export const hrefWhatsApp = (t: Telefono, mensaje: string) =>
  `https://wa.me/${t.e164}?text=${encodeURIComponent(mensaje)}`;

export const direccionUnaLinea = (d: Direccion) =>
  `${d.calle}, ${d.colonia}, ${d.codigoPostal} ${d.ciudad}, ${d.estado}`;

/**
 * Iframe del mapa. Con `output=embed` no hace falta clave de API de Google.
 *
 * Se centra en las coordenadas y no en la dirección escrita: una dirección hay
 * que geocodificarla y en un pueblo con calles repetidas el pin puede acabar a
 * dos cuadras. El par de coordenadas es exacto. Lo que va entre paréntesis es
 * la etiqueta del pin.
 */
export const hrefMapaEmbebido = (s: Sucursal) =>
  `https://maps.google.com/maps?q=${s.coordenadas.latitud},${s.coordenadas.longitud}` +
  `(${encodeURIComponent(s.nombre)})&z=17&hl=es&output=embed`;

/**
 * "Cómo llegar" abre la navegación con el destino ya puesto, que es lo que
 * quiere quien toca ese botón. Ver la ficha se deja para `enlaceMapa`.
 */
export const hrefComoLlegar = (s: Sucursal) =>
  `https://www.google.com/maps/dir/?api=1&destination=${s.coordenadas.latitud},${s.coordenadas.longitud}`;

// ─────────────────────────────────────────────────────────────────────────────
// La doctora
// ─────────────────────────────────────────────────────────────────────────────

/** Es la misma persona en las dos sedes, así que nada de esto vive dentro de una. */
export const doctora = {
  nombre: "Dra. Gloria Portillo Atempa",
  nombreCorto: "Dra. Gloria Portillo",
  monograma: "GP",
  especialidad: "Odontología general",
  titulo: "Cirujano Dentista",
  cedula: "2740104",
  anosExperiencia: 25,
} as const;

/**
 * El WhatsApp de siempre: el del encabezado, el del botón grande y el del pie.
 * Es el número que la doctora contesta, sea cual sea la sede a la que se vaya.
 */
export const whatsappPrincipal: Telefono = {
  visible: "246 463 5223",
  e164: "522464635223",
};

/** Mensaje por defecto. Baja la fricción de escribir el primer mensaje, que es
 *  donde se pierde la mayoría de las conversiones. */
export const MENSAJE_WHATSAPP = "Hola Dra. Gloria, me gustaría agendar una cita.";

// ─────────────────────────────────────────────────────────────────────────────
// Las sucursales
// ─────────────────────────────────────────────────────────────────────────────

const CENTRO: Sucursal = {
  id: "centro",
  nombre: "Dra. Gloria Portillo Atempa",
  etiqueta: "Consultorio del centro",
  descriptor:
    "Sobre Av. Lerdo de Tejada, a unos pasos del centro de Zacatelco.",
  distintivo: null,
  direccion: {
    calle: "Av. Lerdo de Tejada 12",
    colonia: "Centro, Segunda Secc",
    codigoPostal: "90740",
    ciudad: "Zacatelco",
    estado: "Tlaxcala",
  },
  coordenadas: { latitud: 19.2157807, longitud: -98.241731 },
  telefono: whatsappPrincipal,
  whatsapp: whatsappPrincipal,
  mensajeWhatsApp: MENSAJE_WHATSAPP,
  horario: [
    {
      dias: ["lunes", "martes", "miercoles", "jueves", "viernes"],
      abre: "09:00",
      cierra: "20:00",
    },
    { dias: ["sabado"], abre: "09:00", cierra: "14:00" },
  ],
  enlaceMapa:
    "https://www.google.com/maps/place/Dra.+Gloria+Portillo+Atempa/@19.2157807,-98.241731,17z",
  perfiles: [],
  calificacion: { promedio: 4.6, total: 20 },
  resenas: [
    {
      texto:
        "Muy ética y profesional, me extrajeron mi muelita del juicio y todo estuvo muy bien. Tardé más en el proceso de anestesia que en que me la extrajeran. Recomendable al 100.",
      autor: "Jose Luis Elias Montiel",
    },
    {
      texto:
        "Excelente dentista, trabajos muy bien hechos. Súper amable, da mucha confianza al ir con ella. Todo impecable, se nota el profesionalismo.",
      autor: "Lorena Nava",
    },
    {
      texto:
        "Muy profesional, muy amable, hace muchos años que nos atiende a mí y a mis hijos, sus trabajos son muy buenos y de calidad, es muy recomendable.",
      autor: "Nereyda Flores Hervert",
    },
  ],
  descripcionSeo:
    "Consultorio dental en el centro de Zacatelco, Tlaxcala. Odontología general para toda la familia con 25 años de experiencia.",
};

const DENTALITOS: Sucursal = {
  id: "dentalitos",
  nombre: "Dentalitos Sucursal Zacatelco",
  etiqueta: "Dentalitos",
  descriptor:
    "En la calle Niño Perdido, en la Sección Primera. Es la que abre los domingos.",
  distintivo: "Abre domingos",
  direccion: {
    // Sin el "#": así se escribe en la ficha de Google y en schema.org.
    calle: "Calle Niño Perdido 35",
    colonia: "Sección Primera",
    codigoPostal: "90740",
    ciudad: "Zacatelco",
    estado: "Tlaxcala",
  },
  coordenadas: { latitud: 19.2257947, longitud: -98.2414158 },
  telefono: { visible: "221 193 9821", e164: "522211939821" },
  whatsapp: { visible: "221 193 9821", e164: "522211939821" },
  mensajeWhatsApp: "Hola, me gustaría agendar una cita en Dentalitos.",
  horario: [
    {
      dias: ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"],
      abre: "08:30",
      cierra: "19:00",
    },
    { dias: ["domingo"], abre: "09:00", cierra: "17:00" },
  ],
  enlaceMapa:
    "https://www.google.com/maps/place/Dentalitos+Sucursal+Zacatelco/@19.2257947,-98.2414158,17z",
  perfiles: [
    "https://www.facebook.com/people/Dentalitos-Zacatelco/61583930846429/",
  ],
  /* Google no publica un promedio para esta ficha todavía. Se queda en `null`
     a propósito: sin dato verificable no se enseñan estrellas ni se declara una
     calificación en los datos estructurados. */
  calificacion: null,
  /* Sin reseñas por ahora: las de la ficha de Google todavía no se publican
     aquí. El array vacío está soportado — la sección simplemente no dibuja el
     grupo. */
  resenas: [],
  descripcionSeo:
    "Dentalitos, consultorio dental en la Sección Primera de Zacatelco, Tlaxcala. Odontología general para toda la familia, abierto de lunes a domingo.",
};

/**
 * Las sedes, en el orden en que aparecen en la página. La primera es la
 * principal: de ella salen los datos por defecto del encabezado y del SEO.
 */
export const sucursales: readonly Sucursal[] = [CENTRO, DENTALITOS];
export const sedePrincipal = sucursales[0];

// ─────────────────────────────────────────────────────────────────────────────
// Secciones
// ─────────────────────────────────────────────────────────────────────────────

export const hero = {
  /** Las tres líneas del titular. Se parten a mano: el diseño las escalona. */
  titulo: ["Odontología", "Estética & Salud", "Dental Integral"],
  /** Iniciales de los pacientes que dejaron las reseñas visibles. */
  avatares: [
    { iniciales: "MR", degradado: "linear-gradient(150deg, #c98d6b, #8d5136)" },
    { iniciales: "JL", degradado: "linear-gradient(150deg, #6f8ea8, #3d566b)" },
    { iniciales: "AC", degradado: "linear-gradient(150deg, #d8b25e, #9a7522)" },
  ],
  /**
   * Retratos que alternan en la sección de presentación. Los dos se recortan a
   * cuadrado (ver scripts/optimizar-imagenes.mjs) para que al cambiar de uno a
   * otro el hueco no cambie de tamaño.
   */
  retratos: [
    {
      src: "/img/dra-gloria-3.webp",
      alt: "Retrato de la Dra. Gloria Portillo Atempa en su consultorio",
    },
    {
      src: "/img/dra-gloria.webp",
      alt: "La Dra. Gloria Portillo Atempa, sonriendo en la recepción de su consultorio",
    },
    {
      src: "/img/dra-gloria-2.webp",
      alt: "La Dra. Gloria Portillo Atempa, con bata blanca, junto a la unidad dental de su consultorio",
    },
  ],
} as const;

/** Enlaces del menú superior. */
export const navegacion = [
  { texto: "Tratamientos", ancla: "#tratamientos" },
  { texto: "Reseñas", ancla: "#resenas" },
  // El ancla no cambia: está publicada y puede haber enlaces externos.
  { texto: "Sucursales", ancla: "#ubicacion" },
] as const;

export const barraDatos = {
  experiencia: {
    cifra: String(doctora.anosExperiencia),
    texto: "años de experiencia en odontología general",
  },
  cedula: { cifra: doctora.cedula, texto: "Cédula profesional" },
  horario: {
    cifra: "Lun a Dom",
    texto: "Entre las dos sucursales, consulta todos los días de la semana",
  },
} as const;

export const sobreLaDoctora = {
  kicker: "Conózcala",
  titulo: "Conoce a la Dra. Gloria",
  parrafos: [
    "La Dra. Gloria Portillo Atempa atiende en Zacatelco desde hace 25 años. En ese tiempo ha acompañado a familias enteras: pacientes que llegaron de niños hoy traen a sus propios hijos. Hoy atiende en dos consultorios del pueblo.",
    "Su forma de trabajar es sencilla: revisar con calma, explicar lo que encuentra en palabras claras y proponer solo el tratamiento que hace falta. Antes de empezar, usted sabrá qué se va a hacer, cuánto tiempo toma y cuánto cuesta.",
  ],
  credencial: `${doctora.titulo} · Cédula profesional ${doctora.cedula}`,
} as const;

export const servicios: ReadonlyArray<{
  titulo: string;
  descripcion: string;
  /** Foto de la tarjeta. `null` = todavía sin foto: la tarjeta usa un fondo liso. */
  imagen: { src: string; alt: string } | null;
}> = [
  {
    titulo: "Limpieza dental",
    descripcion: "Remoción de sarro y pulido para mantener las encías sanas.",
    imagen: {
      src: "/img/tratamientos/limpieza.webp",
      alt: "Paciente durante una limpieza dental en el consultorio",
    },
  },
  {
    // La doctora trabaja con resina, no con amalgama: el título decía "Resinas
    // y empastes" y se corrigió a petición suya.
    titulo: "Resinas",
    descripcion: "Restauración de caries con material del color del diente.",
    imagen: {
      src: "/img/tratamientos/resinas.webp",
      alt: "Trabajo de precisión sobre un molde dental",
    },
  },
  {
    titulo: "Endodoncia",
    descripcion: "Tratamiento de conducto para conservar la pieza natural.",
    imagen: {
      src: "/img/tratamientos/endodoncia.webp",
      alt: "Material de restauración dental ordenado sobre una superficie",
    },
  },
  {
    titulo: "Extracciones",
    descripcion: "Con anestesia local, indicaciones claras y revisión posterior.",
    imagen: {
      src: "/img/tratamientos/extracciones.webp",
      alt: "Procedimiento dental con instrumental esterilizado",
    },
  },
  {
    titulo: "Cirugía bucal",
    descripcion: "Procedimientos quirúrgicos menores, con anestesia local y seguimiento.",
    imagen: {
      src: "/img/tratamientos/cirugia.webp",
      alt: "Instrumental quirúrgico esterilizado, preparado sobre un campo estéril",
    },
  },
  {
    titulo: "Prótesis fija y removible",
    descripcion: "Prótesis ajustadas a su mordida, fijas o de quitar y poner.",
    imagen: {
      src: "/img/tratamientos/protesis.webp",
      alt: "Modelos de yeso de una dentadura con una prótesis en preparación",
    },
  },
  {
    titulo: "Odontología estética",
    descripcion: "Tratamientos para mejorar el aspecto de la sonrisa.",
    imagen: {
      src: "/img/tratamientos/estetica.webp",
      alt: "Guía de tonos dentales junto a la sonrisa de una paciente para elegir el color",
    },
  },
  {
    titulo: "Odontopediatría",
    descripcion: "Atención para los más pequeños, sin prisas y con paciencia.",
    imagen: {
      src: "/img/tratamientos/odontopediatria.webp",
      alt: "Dos niñas jugando a la consulta dental",
    },
  },
];

/**
 * Formación de la doctora.
 *
 * Los datos están transcritos de los documentos originales, que se guardan en
 * `originales/titulos/`. No se resumen ni se reinterpretan: son títulos
 * profesionales y decir de más sería atribuirle una especialidad que no tiene.
 */
export const formacion = {
  titulo: "Títulos y certificaciones",
  entradilla:
    "Los documentos están a la vista. Puede abrirlos y comprobarlos usted mismo.",
  documentos: [
    {
      institucion: "Benemérita Universidad Autónoma de Puebla",
      nombre: "Cirujano Dentista",
      detalle: "Título profesional · 1998",
      imagen: {
        src: "/img/titulos/buap.webp",
        alt: "Título de Cirujano Dentista expedido por la Benemérita Universidad Autónoma de Puebla a Gloria Portillo Atempa en 1998",
      },
    },
    {
      institucion: "Universidad Popular Autónoma del Estado de Puebla",
      nombre: "Diplomado en Odontología Estética",
      detalle: "148 horas · 2013",
      imagen: {
        src: "/img/titulos/upaep.webp",
        alt: "Diploma de la UPAEP por el diplomado en Odontología Estética, de 148 horas, cursado en 2013",
      },
    },
    {
      institucion: "Colegio de Prostodoncia e Implantología del Estado de Puebla",
      nombre: "Seminario Odontoprotésico",
      detalle: "16 horas crédito · 1998",
      imagen: {
        src: "/img/titulos/prostodoncia.webp",
        alt: "Constancia del Colegio de Prostodoncia e Implantología del Estado de Puebla por el Primer Seminario Odontoprotésico, de 1998",
      },
    },
  ],
} as const;

export const porQue = {
  kicker: "Por qué el consultorio",
  titulo: "Por qué las familias de Zacatelco vuelven",
  motivos: [
    {
      titulo: "Siempre la misma doctora",
      texto:
        "Usted no pasa con un dentista distinto cada vez. La Dra. Gloria lleva su historial y conoce su boca.",
    },
    {
      titulo: "Se explica antes de tratar",
      texto:
        "Qué tiene, qué opciones hay, cuánto cuesta y cuánto tarda. Sin tecnicismos y sin sorpresas al final.",
    },
    {
      titulo: "Horario que alcanza",
      texto:
        "Entre las dos sedes hay consulta los siete días: hasta las 8 de la noche en el centro y también los domingos en Dentalitos.",
    },
    {
      titulo: "Dos consultorios en Zacatelco",
      texto:
        "Uno sobre Av. Lerdo de Tejada, a unos pasos del centro; el otro en Niño Perdido, en la Sección Primera. Vaya al que le quede más cerca.",
    },
  ],
} as const;

/**
 * Fotos del consultorio.
 *
 * Todas se sirven en 4:3 para que la galería quede pareja. Tres de las cuatro
 * originales son verticales y se recortan al centro; los originales están en
 * `originales/consultorio/`.
 */
export const instalaciones = {
  titulo: "Así son los consultorios",
  entradilla:
    "Antes de venir puede ver dónde va a sentarse. Toque una foto para verla en grande.",
  fotos: [
    {
      src: "/img/consultorio/1.webp",
      alt: "Sala de atención con sillón dental junto a la ventana y mueble de trabajo",
    },
    {
      src: "/img/consultorio/2.webp",
      alt: "Zona de preparación con lavabo, material desechable y superficie de trabajo",
    },
    {
      src: "/img/consultorio/3.webp",
      alt: "Sala de atención con sillón dental, pantalla en la pared y silla para acompañante",
    },
    {
      src: "/img/consultorio/4.webp",
      alt: "Mueble de instrumental con la unidad dental y contenedor de residuos",
    },
    {
      src: "/img/consultorio/dentalitos-1.webp",
      alt: "Sala de atención de Dentalitos, con unidad dental, lavabo y pantalla",
    },
  ],
} as const;

export const sucursalesSeccion = {
  titulo: "Dos consultorios en Zacatelco",
  entradilla:
    "La misma doctora atiende en dos direcciones del pueblo. Los tratamientos y el trato son los mismos: elija la que le quede más cerca, o la que abra el día que puede venir.",
} as const;
