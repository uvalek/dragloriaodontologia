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
  /** Abre la ficha del consultorio en Google Maps, con la ruta ya lista. */
  enlaceMapa:
    "https://www.google.com/maps/search/?api=1&query=Av.+Lerdo+de+Tejada+12,+Centro,+Segunda+Secc,+90740+Zacatelco,+Tlaxcala",
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
  /** Ficha del consultorio en Google, para que cualquiera compruebe la nota. */
  enlace:
    "https://www.google.com/maps/search/?api=1&query=Dra.+Gloria+Portillo+Atempa+Zacatelco",
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
      "Excelente dentista, trabajos muy bien hechos. Súper amable, da mucha confianza al ir con ella. Todo impecable, se nota el profesionalismo.",
    autor: "Lorena Nava",
  },
  {
    texto:
      "Muy profesional, muy amable, hace muchos años que nos atiende a mí y a mis hijos, sus trabajos son muy buenos y de calidad, es muy recomendable.",
    autor: "Nereyda Flores Hervert",
  },
] as const;

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
  imagen: {
    src: "/img/dra-gloria.webp",
    alt: "La Dra. Gloria Portillo Atempa, sonriendo en su consultorio de Zacatelco",
  },
} as const;

/** Enlaces del menú superior. */
export const navegacion = [
  { texto: "Tratamientos", ancla: "#tratamientos" },
  { texto: "Reseñas", ancla: "#resenas" },
  { texto: "Ubicación", ancla: "#ubicacion" },
] as const;

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
