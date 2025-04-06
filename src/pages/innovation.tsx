import React from "react";
import dynamic from "next/dynamic";
import Layout from "~/components/layout/Layout";

// Carga dinámica del componente para evitar problemas de hidratación
const InnovationComponent = dynamic(() => import("~/components/InnovationComponent"), {
  ssr: true,
  loading: () => <div className="p-12 text-center">Cargando módulo de innovación...</div>
});

export default function InnovationPage() {
  return (
    <Layout 
      title="Innovación y Creatividad - OceanInsight" 
      description="Innovación, creatividad, memorias e integración multidisciplinar en ciencias marinas."
    >
      <div className="bg-gradient-to-b from-teal-700 to-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Innovación y Creatividad</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Promoviendo el pensamiento innovador, la creatividad y la integración 
            multidisciplinar para resolver los desafíos más complejos 
            de las ciencias marinas.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <InnovationComponent />
      </div>
    </Layout>
  );
}