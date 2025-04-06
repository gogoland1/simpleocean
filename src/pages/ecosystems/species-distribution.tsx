import React from 'react';
import Layout from '~/components/Layout';
import { SpeciesDistribution } from '~/components/analysis/SpeciesDistribution';

const SpeciesDistributionPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Modelos de Distribución de Especies</h1>
          <p className="text-gray-600 mb-4">
            Análisis y modelación de la distribución espacial de especies marinas en la bahía de Valparaíso,
            utilizando técnicas avanzadas como GAM (Modelos Aditivos Generalizados), MaxEnt (Máxima Entropía)
            y análisis multivariados.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <h2 className="text-lg font-semibold mb-2">Características del Análisis</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Modelación de nichos ecológicos</li>
              <li>Análisis de variables ambientales</li>
              <li>Evaluación de modelos con múltiples métricas</li>
              <li>Visualización interactiva de resultados</li>
              <li>Predicciones espaciales y temporales</li>
            </ul>
          </div>
        </div>
        
        <SpeciesDistribution />
      </div>
    </Layout>
  );
};

export default SpeciesDistributionPage; 