import {
  calificacion,
  consultorio,
  contacto,
  servicios,
} from "./contenido";

/**
 * Datos estructurados (JSON-LD) del consultorio.
 *
 * Es lo más importante del SEO de este sitio. Para un negocio local, esto es lo
 * que permite que Google muestre en los resultados la calificación con
 * estrellas, el horario y el botón de "Cómo llegar" — mucho más determinante
 * para que alguien haga clic que cualquier meta etiqueta.
 *
 * El tipo `Dentist` es el específico de schema.org para consultorios dentales;
 * hereda de `LocalBusiness` y de `MedicalOrganization`.
 */
export function datosEstructurados(urlSitio: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${urlSitio}#consultorio`,
    name: consultorio.nombre,
    url: urlSitio,
    image: `${urlSitio}/img/og-dra-gloria-portillo.webp`,
    description:
      "Consultorio dental en Zacatelco, Tlaxcala. Odontología general para toda la familia con 25 años de experiencia.",
    telephone: contacto.telefonoInternacional,
    priceRange: "$$",
    currenciesAccepted: "MXN",

    address: {
      "@type": "PostalAddress",
      streetAddress: consultorio.direccion.calle,
      addressLocality: consultorio.direccion.ciudad,
      addressRegion: consultorio.direccion.estado,
      postalCode: consultorio.direccion.codigoPostal,
      addressCountry: "MX",
    },

    geo: {
      "@type": "GeoCoordinates",
      latitude: consultorio.coordenadas.latitud,
      longitude: consultorio.coordenadas.longitud,
    },

    hasMap: contacto.mapa,

    /* Los horarios en el formato que entiende Google. Se declara el bloque
       entre semana y el del sábado; el domingo simplemente no aparece, que es
       como schema.org expresa "cerrado". */
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "14:00",
      },
    ],

    /* Calificación real del perfil de Google. Google exige que este dato sea
       verificable: si algún día cambia, hay que actualizarlo en contenido.ts. */
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: calificacion.promedio,
      reviewCount: calificacion.total,
      bestRating: 5,
      worstRating: 1,
    },

    /* La doctora, como profesional a cargo. Lo que da peso E-E-A-T al sitio en
       una categoría de salud, donde Google es especialmente exigente. */
    founder: {
      "@type": "Person",
      name: consultorio.nombre,
      jobTitle: consultorio.titulo,
      identifier: `Cédula profesional ${consultorio.cedula}`,
    },

    /* Cada tratamiento como servicio ofrecido, con los mismos nombres que
       aparecen en las tarjetas de la página. */
    makesOffer: servicios.map((servicio) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "MedicalProcedure",
        name: servicio.titulo,
        description: servicio.descripcion,
      },
    })),

    areaServed: [
      { "@type": "City", name: "Zacatelco" },
      { "@type": "State", name: "Tlaxcala" },
    ],
  };
}
