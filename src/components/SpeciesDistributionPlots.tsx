import React from 'react';
import { createROCPlot, createDistributionMap, createVariableImportancePlot, createFuturePredictionsPlot } from '~/lib/visualization/species_distribution_plots';
import type { SamplingPoint } from '~/lib/data/synthetic_valparaiso_data';
import type { ModelResults } from '~/lib/models/species_distribution_models';

interface SpeciesDistributionPlotsProps {
  data: SamplingPoint[];
  results: ModelResults;
  speciesName: string;
}

export const SpeciesDistributionPlots: React.FC<SpeciesDistributionPlotsProps> = ({ 
  data, 
  results, 
  speciesName 
}) => {
  // Verificar que todos los datos necesarios estén presentes
  if (!data || !results || !results.predictions || !results.observed || !results.evaluation) {
    return <div>Error: Datos incompletos para generar las visualizaciones</div>;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Model Evaluation */}
        <div className="bg-[#152238] rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-white">Evaluación del Modelo</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">AUC</p>
                <p className="text-xl font-bold text-white">
                  {results.evaluation?.auc?.toFixed(3) ?? 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Boyce</p>
                <p className="text-xl font-bold text-white">
                  {results.evaluation?.boyce?.toFixed(3) ?? 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Precisión</p>
                <p className="text-xl font-bold text-white">
                  {results.evaluation?.accuracy?.toFixed(3) ?? 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Sensibilidad</p>
                <p className="text-xl font-bold text-white">
                  {results.evaluation?.sensitivity?.toFixed(3) ?? 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Especificidad</p>
                <p className="text-xl font-bold text-white">
                  {results.evaluation?.specificity?.toFixed(3) ?? 'N/A'}
                </p>
              </div>
            </div>
            <div dangerouslySetInnerHTML={{ 
              __html: createROCPlot(results.observed, results.predictions) 
            }} />
          </div>
        </div>

        {/* Distribution Map */}
        <div className="bg-[#152238] rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-white">Mapa de Distribución</h3>
          <div dangerouslySetInnerHTML={{ 
            __html: createDistributionMap(data, results.predictions) 
          }} />
        </div>

        {/* Variable Importance */}
        <div className="bg-[#152238] rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-white">Importancia de Variables</h3>
          <div dangerouslySetInnerHTML={{ 
            __html: createVariableImportancePlot(results.importance || {}) 
          }} />
        </div>

        {/* Future Predictions */}
        <div className="bg-[#152238] rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-white">Predicciones Futuras</h3>
          <div dangerouslySetInnerHTML={{ 
            __html: createFuturePredictionsPlot(
              results.habitatPredictions?.current || [],
              results.habitatPredictions?.future || []
            ) 
          }} />
        </div>
      </div>
    </div>
  );
}; 