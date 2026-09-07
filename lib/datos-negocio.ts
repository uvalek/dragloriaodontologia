import {
  doctora,
  servicios,
  sucursales,
  telefonoInternacional,
  type Sucursal,
} from "./contenido";
import { aOpeningHours } from "./horarios";

/**
 * Datos estructurados (JSON-LD) del consultorio.
 *
 * Es lo más importante del SEO de este sitio. Para un negocio local, esto es lo
 * que permite que Google muestre en los resultados la calificación con
 * estrellas, el horario y el botón de "Cómo llegar" — mucho más determinante
 * para que alguien haga clic que cualquier meta etiqueta.
 *
 * Con dos sedes se emite un `@graph`: un nodo por consultorio, más un nodo de
 * la doctora al que ambos apuntan. Las alternativas no servían:
 *
 * · Un solo `Dentist` con dos direcciones no es válido: `address` es uno, y
 *   Google se queda con el primero y descarta el otro.
 * · `department` describe un local dentro de otro local (una óptica dentro de
 *   una farmacia), no dos direcciones distintas.
 * · Dos bloques sueltos duplicarían a la doctora: dos entidades donde debería
 *   haber una, que es justo lo que no conviene en un sitio de salud.
 */
export function datosEstructurados(urlSitio: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      nodoDoctora(urlSitio),
      ...sucursales.map((s, i) => nodoSede(s, urlSitio, i === 0)),
    ],
  };
}

/**
 * El identificador de la sede principal NO cambia.
 *
 * Sigue siendo `#consultorio`, que es el que Google lleva meses viendo.
 * Cambiarlo por un `#sede-centro` más descriptivo no aporta nada y arriesga a
 * que Google interprete la entidad como nueva y empiece de cero.
 */
const idSede = (urlSitio: string, s: Sucursal, esPrincipal: boolean) =>
  esPrincipal ? `${urlSitio}#consultorio` : `${urlSitio}#${s.id}`;

const idDoctora = (urlSitio: string) => `${urlSitio}#doctora`;

/** Una sola entidad para la doctora, referenciada desde las dos sedes. */
function nodoDoctora(urlSitio: string) {
  return {
    "@type": "Person",
    "@id": idDoctora(urlSitio),
    name: doctora.nombre,
    jobTitle: doctora.titulo,
    identifier: `Cédula profesional ${doctora.cedula}`,
    worksFor: sucursales.map((s, i) => ({
      "@id": idSede(urlSitio, s, i === 0),
    })),
  };
}

function nodoSede(s: Sucursal, urlSitio: string, esPrincipal: boolean) {
  return {
    "@type": "Dentist",
    "@id": idSede(urlSitio, s, esPrincipal),
    /* El nombre tiene que coincidir letra por letra con la ficha de Google: es
       lo que une este marcado con el perfil del negocio. */
    name: s.nombre,
    ...(s.etiqueta !== s.nombre ? { alternateName: s.etiqueta } : {}),
    url: urlSitio,
    image: `${urlSitio}/img/og-dra-gloria-portillo.webp`,
    description: s.descripcionSeo,
    telephone: telefonoInternacional(s.telefono),
    priceRange: "$$",
    currenciesAccepted: "MXN",

    address: {
      "@type": "PostalAddress",
      streetAddress: s.direccion.calle,
      addressLocality: s.direccion.ciudad,
      addressRegion: s.direccion.estado,
      postalCode: s.direccion.codigoPostal,
      addressCountry: "MX",
    },

    geo: {
      "@type": "GeoCoordinates",
      latitude: s.coordenadas.latitud,
      longitude: s.coordenadas.longitud,
    },

    hasMap: s.enlaceMapa,
    ...(s.perfiles.length > 0 ? { sameAs: s.perfiles } : {}),

    /* Los horarios, derivados del mismo dato que pinta la tabla en pantalla.
       Los días cerrados no aparecen, que es como schema.org dice "cerrado". */
    openingHoursSpecification: aOpeningHours(s.horario),

    /* La calificación solo se declara si Google publica una para ESTA ficha.
       Sin dato no se pone nada: ni promediar las dos sedes, ni un `reviewCount`
       suelto sin nota (que además sería marcado inválido). Declarar estrellas
       que no existen es de las pocas cosas por las que Google penaliza de
       verdad.

       Las reseñas tampoco se emiten como `Review`: Google descarta las
       opiniones que un negocio publica sobre sí mismo en su propio sitio, y no
       conocemos la puntuación de cada una. Se enseñan como texto, que sirve
       para convencer a quien lee aunque no genere estrellas. */
    ...(s.calificacion
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: s.calificacion.promedio,
            reviewCount: s.calificacion.total,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),

    /* `founder` solo en la sede principal: que la doctora atienda en la otra
       está confirmado, que la fundara no lo sabemos. `employee` es la
       afirmación que sí se sostiene en ambas. */
    ...(esPrincipal ? { founder: { "@id": idDoctora(urlSitio) } } : {}),
    employee: { "@id": idDoctora(urlSitio) },

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

    /* La relación entre sedes. `branchOf` está obsoleto en schema.org. */
    ...(esPrincipal
      ? {
          subOrganization: sucursales
            .slice(1)
            .map((otra) => ({ "@id": idSede(urlSitio, otra, false) })),
        }
      : {
          parentOrganization: {
            "@id": idSede(urlSitio, sucursales[0], true),
          },
        }),
  };
}
