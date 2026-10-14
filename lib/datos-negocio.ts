import {
  doctora,
  formacion,
  hero,
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
      nodoSitio(urlSitio),
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

/**
 * El sitio en sí. No genera ningún adorno en los resultados; sirve para que las
 * tres cosas —la web, la doctora y los consultorios— queden declaradas como
 * partes de una misma entidad en vez de como datos sueltos.
 */
function nodoSitio(urlSitio: string) {
  return {
    "@type": "WebSite",
    "@id": `${urlSitio}#sitio`,
    url: urlSitio,
    name: doctora.nombre,
    inLanguage: "es-MX",
    publisher: { "@id": idDoctora(urlSitio) },
  };
}

/** Una sola entidad para la doctora, referenciada desde las dos sedes. */
function nodoDoctora(urlSitio: string) {
  return {
    "@type": "Person",
    "@id": idDoctora(urlSitio),
    name: doctora.nombre,
    jobTitle: doctora.titulo,
    identifier: `Cédula profesional ${doctora.cedula}`,
    image: `${urlSitio}${hero.retratos[0].src}`,

    /* Quién la formó y qué acredita. En salud, Google pondera de quién viene la
       información antes que las palabras que use; estos documentos están
       además a la vista en la página, escaneados, así que la afirmación se
       puede comprobar. Salen de `formacion` para que no haya dos versiones. */
    alumniOf: formacion.documentos.map((d) => ({
      "@type": "EducationalOrganization",
      name: d.institucion,
    })),
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Cédula profesional",
        identifier: doctora.cedula,
        name: doctora.titulo,
        recognizedBy: {
          "@type": "GovernmentOrganization",
          name: "Secretaría de Educación Pública",
        },
      },
      ...formacion.documentos.map((d) => ({
        "@type": "EducationalOccupationalCredential",
        name: d.nombre,
        recognizedBy: { "@type": "EducationalOrganization", name: d.institucion },
      })),
    ],

    /* Lo que efectivamente trata. Es la lista de la página, no una colección de
       palabras clave: si deja de ofrecer algo, desaparece de los dos sitios. */
    knowsAbout: servicios.map((s) => s.titulo),

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
    /* `Dentist` es a la vez negocio local y negocio médico; esto último es lo
       que le dice a Google de qué trata la consulta. "Dentistry" es uno de los
       valores del vocabulario, no texto libre. */
    medicalSpecialty: "Dentistry",

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

    /* AQUÍ NO VA LA CALIFICACIÓN, a propósito.
     *
     * El 4.6 es real y se sigue viendo en la página, pero declararlo aquí sería
     * una "reseña de parte interesada": el negocio publicando su propia nota en
     * su propio sitio. Google no la muestra para un negocio local —las estrellas
     * del resultado salen de la ficha de Google Business, no de este marcado— y
     * sí la considera motivo de acción manual. Se arriesgaba algo a cambio de
     * nada.
     *
     * Por lo mismo las reseñas no se emiten como `Review`. Se enseñan como texto
     * visible, que convence a quien lee aunque no genere estrellas.
     */

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

    /* De dónde viene el paciente. Zacatelco es el municipio; los otros cuatro
       están pegados y a menos de quince minutos, y es de donde llega el resto.
       Declararlos no posiciona por sí solo, pero sí acota a Google para qué
       búsquedas con intención local tiene sentido enseñar el consultorio. */
    areaServed: [
      { "@type": "City", name: "Zacatelco" },
      { "@type": "City", name: "Papalotla de Xicohténcatl" },
      { "@type": "City", name: "Xicohtzinco" },
      { "@type": "City", name: "Tepeyanco" },
      { "@type": "City", name: "Tlaxcala" },
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
