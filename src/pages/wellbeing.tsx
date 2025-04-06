import React from "react";
import dynamic from "next/dynamic";
import Layout from "~/components/layout/Layout";

// Carga dinámica del componente para evitar problemas de hidratación
const WellbeingComponent = dynamic(() => import("~/components/WellbeingComponent"), {
  ssr: true,
  loading: () => <div className="p-12 text-center">Cargando módulo de bienestar...</div>
});

export default function WellbeingPage() {
  return (
    <Layout 
      title="Bienestar y Salud Mental - OceanInsight" 
      description="Recursos y apoyo para el bienestar, la salud mental y el buen trato laboral en las ciencias marinas."
    >
      <div className="bg-gradient-to-b from-cyan-700 to-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Bienestar y Salud Mental</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Promoviendo el equilibrio, la salud mental y entornos laborales saludables 
            en el ámbito de las ciencias marinas y la investigación oceanográfica.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <WellbeingComponent />
      </div>
    </Layout>
  );
}