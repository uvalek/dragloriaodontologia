import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Tratamientos from "@/components/Tratamientos";
import Resenas from "@/components/Resenas";
import PorQue from "@/components/PorQue";
import Formacion from "@/components/Formacion";
import Instalaciones from "@/components/Instalaciones";
import Ubicacion from "@/components/Ubicacion";
import PieDePagina from "@/components/PieDePagina";

/**
 * La landing entera, en el orden en que un paciente nuevo resuelve sus dudas:
 * quién es → qué hace → qué dicen de ella → por qué volver → con qué
 * respaldo → cómo es el lugar → dónde está.
 *
 * Cada sección es un componente de servidor: la página se genera como HTML
 * estático y el navegador no ejecuta nada para verla. Lo único que corre en el
 * cliente es el menú del móvil, el observador que revela las secciones y el
 * registro de clics en WhatsApp.
 */
export default function Pagina() {
  return (
    <main>
      <Hero />
      <Intro />
      <Tratamientos />
      <Resenas />
      <PorQue />
      <Formacion />
      <Instalaciones />
      <Ubicacion />
      <PieDePagina />
    </main>
  );
}
