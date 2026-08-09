/**
 * TODO el texto de la landing vive aquí.
 *
 * La idea es que para cambiar un teléfono, agregar un servicio o actualizar una
 * reseña no haya que abrir un solo componente: se edita este archivo y listo.
 * Los textos son los del diseño aprobado en Claude Design, palabra por palabra.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Contacto
// ─────────────────────────────────────────────────────────────────────────────

/** Número en formato internacional sin signos, que es como lo pide wa.me. */
const WHATSAPP_NUMERO = "522464635223";

/** Mensaje que aparece ya escrito al abrir el chat: baja la fricción de escribir
 *  el primer mensaje, que es donde se pierde la mayoría de las conversiones. */
const WHATSAPP_MENSAJE = "Hola Dra. Gloria, me gustaría agendar una cita.";

export const contacto = {
  telefonoVisible: "246 463 5223",
  telefonoInternacional: "+52 246 463 5223",
  /** href para <a href="tel:…"> */
  telefonoEnlace: "tel:+522464635223",
  whatsapp: `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(WHATSAPP_MENSAJE)}`,
  mapa: "https://www.google.com/maps/place/Dra.+Gloria+Portillo+Atempa/@19.2157807,-98.241731,17z",
  /** Iframe del mapa. Con `output=embed` no hace falta clave de API de Google. */
  mapaEmbebido:
    "https://maps.google.com/maps?q=Av.%20Lerdo%20de%20Tejada%2012%2C%20Centro%2C%20Segunda%20Secc%2C%2090740%20Zacatelco%2C%20Tlaxcala&z=16&hl=es&output=embed",
} as const;

export const consultorio = {
  nombre: "Dra. Gloria Portillo Atempa",
  nombreCorto: "Dra. Gloria Portillo",
  monograma: "GP",
  especialidad: "Odontología general",
  titulo: "Cirujano Dentista",
  cedula: "2740104",
  direccion: {
    calle: "Av. Lerdo de Tejada 12",
    colonia: "Centro, Segunda Secc",
    codigoPostal: "90740",
    ciudad: "Zacatelco",
    estado: "Tlaxcala",
    /** Una sola línea, para el footer y el JSON-LD. */
    completa:
      "Av. Lerdo de Tejada 12, Centro, Segunda Secc, 90740 Zacatelco, Tlaxcala",
  },
  coordenadas: { latitud: 19.2157807, longitud: -98.241731 },
} as const;

export const horarios = [
  { dias: "Lunes a viernes", horas: "9:00 – 20:00", cerrado: false },
  { dias: "Sábado", horas: "9:00 – 14:00", cerrado: false },
  { dias: "Domingo", horas: "Cerrado", cerrado: true },
] as const;

/** Resumen del horario en una línea, como aparece en la banda de datos. */
export const horarioResumen = "Lunes a viernes 9:00–20:00 · Sábado 9:00–14:00";

// ─────────────────────────────────────────────────────────────────────────────
// Prueba social
// ─────────────────────────────────────────────────────────────────────────────

export const calificacion = {
  promedio: 4.6,
  total: 20,
  /** Porcentaje de la quinta estrella que se pinta (4.6 → 60% de la última). */
  rellenoUltimaEstrella: "60%",
} as const;

/**
 * Reseñas reales tomadas del perfil de Google del consultorio.
 * Solo se corrigió ortografía evidente del original; el contenido es literal.
 */
export const resenas = [
  {
    texto:
      "Muy ética y profesional, me extrajeron mi muelita del juicio y todo estuvo muy bien. Tardé más en el proceso de anestesia que en que me la extrajeran. Recomendable al 100.",
    autor: "Jose Luis Elias Montiel",
  },
  {
    texto:
      "Muy profesional, muy amable, hace muchos años que nos atiende a mí y a mis hijos, sus trabajos son muy buenos y de calidad, es muy recomendable.",
    autor: "Nereyda Flores Hervert",
  },
  {
    texto:
      "Excelente dentista, trabajos muy bien hechos. Súper amable, da mucha confianza al ir con ella. Todo impecable, se nota el profesionalismo.",
    autor: "Lorena Nava",
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Secciones
// ─────────────────────────────────────────────────────────────────────────────

export const hero = {
  kicker: "Consultorio dental · Zacatelco, Tlaxcala",
  tituloLinea1: "Dra. Gloria",
  tituloLinea2: "Portillo Atempa",
  subtitulo: "Su dentista de confianza, a unas cuadras de casa.",
  parrafo:
    "25 años cuidando la salud bucal de Zacatelco. Odontología general para toda la familia, con explicaciones claras y sin prisas.",
  imagen: {
    src: "/img/dra-gloria-recepcion.webp",
    alt: "Dra. Gloria Portillo Atempa en la recepción de su consultorio",
  },
} as const;

export const barraDatos = {
  experiencia: { cifra: "25", texto: "años de experiencia en odontología general" },
  cedula: { cifra: consultorio.cedula, texto: "Cédula profesional" },
  horario: { cifra: "Lun a Sáb", texto: horarioResumen },
  resenas: `${calificacion.total} reseñas en Google`,
} as const;

export const sobreLaDoctora = {
  kicker: "Conózcala",
  titulo: "Conoce a la Dra. Gloria",
  parrafos: [
    "La Dra. Gloria Portillo Atempa atiende en Zacatelco desde hace 25 años. En ese tiempo ha acompañado a familias enteras: pacientes que llegaron de niños hoy traen a sus propios hijos al mismo consultorio.",
    "Su forma de trabajar es sencilla: revisar con calma, explicar lo que encuentra en palabras claras y proponer solo el tratamiento que hace falta. Antes de empezar, usted sabrá qué se va a hacer, cuánto tiempo toma y cuánto cuesta.",
  ],
  credencial: `${consultorio.titulo} · Cédula profesional ${consultorio.cedula}`,
  imagen: {
    src: "/img/dra-gloria-consulta.webp",
    alt: "La Dra. Gloria Portillo atendiendo a una paciente",
  },
} as const;

/** Identificador del icono que dibuja cada tarjeta (ver components/IconoServicio). */
export type IconoServicio =
  | "destello"
  | "capas"
  | "escudo"
  | "pulso"
  | "puente"
  | "sonrisa";

export const servicios: ReadonlyArray<{
  icono: IconoServicio;
  titulo: string;
  descripcion: string;
}> = [
  {
    icono: "destello",
    titulo: "Limpieza dental",
    descripcion: "Remoción de sarro y pulido para mantener las encías sanas.",
  },
  {
    icono: "capas",
    titulo: "Resinas y empastes",
    descripcion: "Restauración de caries con material del color del diente.",
  },
  {
    icono: "escudo",
    titulo: "Extracciones",
    descripcion: "Con anestesia local, indicaciones claras y revisión posterior.",
  },
  {
    icono: "pulso",
    titulo: "Endodoncia",
    descripcion: "Tratamiento de conducto para conservar la pieza natural.",
  },
  {
    icono: "puente",
    titulo: "Prótesis y placas",
    descripcion: "Prótesis fijas y removibles ajustadas a su mordida.",
  },
  {
    icono: "sonrisa",
    titulo: "Odontopediatría",
    descripcion: "Atención para los más pequeños, sin prisas y con paciencia.",
  },
];

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
        "Hasta las 8 de la noche entre semana y sábados por la mañana, para que no tenga que faltar al trabajo.",
    },
    {
      titulo: "En el centro, cerca de casa",
      texto:
        "Sobre Av. Lerdo de Tejada, a unos pasos del centro de Zacatelco y con acceso desde municipios vecinos.",
    },
  ],
} as const;

export const ubicacion = {
  kicker: "Visítenos",
  titulo: "Dónde y cuándo",
} as const;

export const llamadoFinal = {
  titulo: "Agende su cita por WhatsApp",
  parrafo:
    "Escríbanos con el motivo de su consulta y le confirmamos horario el mismo día.",
} as const;
