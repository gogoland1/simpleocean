// src/pages/biological/islandtheory.tsx
import Layout from "../components/layout/Layout";
import IslandTheoryAdvancedModel from 'src/components/visualization/IslandTheoryAdvancedModel';

export default function IslandTheoryPage() {
  return (
    <Layout 
      title="Teoría de Islas - OceanInsight" 
      description="Exploración de la teoría de biogeografía de islas, sus aplicaciones en ecología marina y sus limitaciones"
    >
      <div className="w-full bg-gradient-to-r from-blue-900 to-teal-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Teoría de Biogeografía de Islas</h1>
          <p className="text-xl">
            Un pilar fundamental en la ecología de comunidades con importantes 
            aplicaciones en ecosistemas marinos y conservación biológica.
          </p>
        </div>
      </div>
      
      <IslandTheoryAdvancedModel />
    </Layout>
  );
}