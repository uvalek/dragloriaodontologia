import Encabezado from "@/components/Encabezado";
import Hero from "@/components/Hero";
import BarraDatos from "@/components/BarraDatos";
import SobreLaDoctora from "@/components/SobreLaDoctora";
import Servicios from "@/components/Servicios";
import Resenas from "@/components/Resenas";
import PorQue from "@/components/PorQue";
import Ubicacion from "@/components/Ubicacion";
import LlamadoFinal from "@/components/LlamadoFinal";

/**
 * Landing de la Dra. Gloria Portillo Atempa.
 *
 * Es una sola página de scroll largo; cada sección del diseño vive en su propio
 * componente y aquí solo se ordenan. Salvo el enlace de WhatsApp (que necesita
 * registrar el clic), todo son Server Components: la página llega al navegador
 * como HTML ya renderizado.
 *
 * El orden no es casual: presentación → datos que dan confianza → quién es →
 * qué hace → qué dicen de ella → por qué ella → dónde está → agende.
 */
export default function Home() {
  return (
    <>
      <Encabezado />
      <main>
        <Hero />
        <BarraDatos />
        <SobreLaDoctora />
        <Servicios />
        <Resenas />
        <PorQue />
        <Ubicacion />
        <LlamadoFinal />
      </main>
    </>
  );
}
