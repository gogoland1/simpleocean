import React, { useEffect, useState } from 'react';
import { generateSyntheticData, calculateDiversityIndices, calculateBetaDiversity } from '~/lib/data/synthetic_valparaiso_data';
import { performPCA, fitGAM, fitMaxEnt } from '~/lib/models/species_distribution_models';
import dynamic from 'next/dynamic';

// Importar Plot de Plotly dinámicamente para evitar problemas de SSR
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

const SpeciesDistribution: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [diversityIndices, setDiversityIndices] = useState<any>(null);
  const [betaDiversity, setBetaDiversity] = useState<any>(null);
  const [modelResults, setModelResults] = useState<any>(null);
  const [pcaResults, setPcaResults] = useState<any>(null);

  useEffect(() => {
    // Generar datos sintéticos para un año
    const startDate = new Date('2023-01-01');
    const endDate = new Date('2023-12-31');
    const syntheticData = generateSyntheticData(100, startDate, endDate);
    
    // Calcular índices de diversidad
    const indices = calculateDiversityIndices(syntheticData);
    const betaDiv = calculateBetaDiversity(syntheticData);

    // Realizar análisis de componentes principales
    const pca = performPCA(syntheticData);

    // Ajustar modelos de distribución de especies
    const targetSpecies = "Acartia tonsa";
    const gamResults = fitGAM(syntheticData, targetSpecies);
    const maxentResults = fitMaxEnt(syntheticData, targetSpecies);

    setData(syntheticData);
    setDiversityIndices(indices);
    setBetaDiversity(betaDiv);
    setPcaResults(pca);
    setModelResults({
      gam: gamResults,
      maxent: maxentResults
    });
  }, []);

  if (!data || !diversityIndices || !betaDiversity || !modelResults || !pcaResults) {
    return <div>Cargando análisis...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4">
        {/* PCA Plot */}
        <div className="bg-white p-4 rounded-lg shadow">
          <Plot
            data={[{
              type: 'scatter',
              mode: 'markers',
              x: pcaResults.scores.map((score: number[]) => score[0]),
              y: pcaResults.scores.map((score: number[]) => score[1]),
              text: data.map((_: any, i: number) => `PC1: ${pcaResults.scores[i][0].toFixed(2)}<br>PC2: ${pcaResults.scores[i][1].toFixed(2)}`),
              marker: {
                size: 10,
                color: data.map((d: any) => d.temperature),
                colorscale: 'Viridis',
                showscale: true,
                colorbar: { title: 'Temperatura (°C)' }
              },
              hoverinfo: 'text'
            }]}
            layout={{
              title: 'Análisis de Componentes Principales',
              xaxis: { title: 'PC1' },
              yaxis: { title: 'PC2' },
              width: 500,
              height: 400
            }}
          />
        </div>

        {/* GAM Predictions */}
        <div className="bg-white p-4 rounded-lg shadow">
          <Plot
            data={[{
              type: 'scatter',
              mode: 'markers',
              x: data.map((d: any) => d.temperature),
              y: data.map((d: any) => d.chlorophyll),
              marker: {
                size: 10,
                color: modelResults.gam.predictions,
                colorscale: 'Viridis',
                showscale: true,
                colorbar: { title: 'Probabilidad de presencia' }
              },
              text: data.map((d: any, i: number) => 
                `Temp: ${d.temperature.toFixed(1)}°C<br>Chl: ${d.chlorophyll.toFixed(2)} mg/m³<br>P(presencia): ${modelResults.gam.predictions[i].toFixed(2)}`
              ),
              hoverinfo: 'text'
            }]}
            layout={{
              title: 'Predicciones del Modelo GAM',
              xaxis: { title: 'Temperatura (°C)' },
              yaxis: { title: 'Clorofila (mg/m³)' },
              width: 500,
              height: 400
            }}
          />
        </div>

        {/* MaxEnt Variable Importance */}
        <div className="bg-white p-4 rounded-lg shadow">
          <Plot
            data={[{
              type: 'bar',
              x: Object.keys(modelResults.maxent.importance),
              y: Object.values(modelResults.maxent.importance),
              marker: { color: 'rgb(55, 83, 109)' }
            }]}
            layout={{
              title: 'Importancia de Variables (MaxEnt)',
              xaxis: { title: 'Variable' },
              yaxis: { title: 'Importancia relativa' },
              width: 500,
              height: 400
            }}
          />
        </div>

        {/* Model Evaluation */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Evaluación de Modelos</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">GAM</h4>
              <ul className="text-sm space-y-1">
                <li>AUC: {modelResults.gam.evaluation.auc.toFixed(3)} 
                  <span className="text-xs text-gray-500 ml-1">
                    ({getAUCInterpretation(modelResults.gam.evaluation.auc)})
                  </span>
                </li>
                <li>Índice de Boyce: {modelResults.gam.evaluation.boyce.toFixed(3)}
                  <span className="text-xs text-gray-500 ml-1">
                    ({getBoyceInterpretation(modelResults.gam.evaluation.boyce)})
                  </span>
                </li>
                <li>TSS: {modelResults.gam.evaluation.tss.toFixed(3)}</li>
                <li>Kappa: {modelResults.gam.evaluation.kappa.toFixed(3)}</li>
                <li>Sensibilidad: {modelResults.gam.evaluation.sensitivity.toFixed(3)}</li>
                <li>Especificidad: {modelResults.gam.evaluation.specificity.toFixed(3)}</li>
                <li>Precisión: {modelResults.gam.evaluation.precision.toFixed(3)}</li>
                <li>Error balanceado: {modelResults.gam.evaluation.balanced_error_rate.toFixed(3)}</li>
              </ul>
              <div className="mt-2">
                <h5 className="text-sm font-medium">Calibración:</h5>
                <ul className="text-xs space-y-1">
                  <li>Pendiente: {modelResults.gam.evaluation.calibration_stats.slope.toFixed(3)}</li>
                  <li>Intercepto: {modelResults.gam.evaluation.calibration_stats.intercept.toFixed(3)}</li>
                  <li>R²: {modelResults.gam.evaluation.calibration_stats.r_squared.toFixed(3)}</li>
                </ul>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">MaxEnt</h4>
              <ul className="text-sm space-y-1">
                <li>AUC: {modelResults.maxent.evaluation.auc.toFixed(3)}
                  <span className="text-xs text-gray-500 ml-1">
                    ({getAUCInterpretation(modelResults.maxent.evaluation.auc)})
                  </span>
                </li>
                <li>Índice de Boyce: {modelResults.maxent.evaluation.boyce.toFixed(3)}
                  <span className="text-xs text-gray-500 ml-1">
                    ({getBoyceInterpretation(modelResults.maxent.evaluation.boyce)})
                  </span>
                </li>
                <li>TSS: {modelResults.maxent.evaluation.tss.toFixed(3)}</li>
                <li>Kappa: {modelResults.maxent.evaluation.kappa.toFixed(3)}</li>
                <li>Sensibilidad: {modelResults.maxent.evaluation.sensitivity.toFixed(3)}</li>
                <li>Especificidad: {modelResults.maxent.evaluation.specificity.toFixed(3)}</li>
                <li>Precisión: {modelResults.maxent.evaluation.precision.toFixed(3)}</li>
                <li>Error balanceado: {modelResults.maxent.evaluation.balanced_error_rate.toFixed(3)}</li>
              </ul>
              <div className="mt-2">
                <h5 className="text-sm font-medium">Calibración:</h5>
                <ul className="text-xs space-y-1">
                  <li>Pendiente: {modelResults.maxent.evaluation.calibration_stats.slope.toFixed(3)}</li>
                  <li>Intercepto: {modelResults.maxent.evaluation.calibration_stats.intercept.toFixed(3)}</li>
                  <li>R²: {modelResults.maxent.evaluation.calibration_stats.r_squared.toFixed(3)}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Calibration Plot */}
        <div className="bg-white p-4 rounded-lg shadow">
          <Plot
            data={[
              {
                type: 'scatter',
                mode: 'markers',
                name: 'GAM',
                x: Array.from({length: 10}, (_, i) => i/10 + 0.05),
                y: Array.from({length: 10}, (_, i) => {
                  const pred = i/10 + 0.05;
                  return pred * modelResults.gam.evaluation.calibration_stats.slope + 
                         modelResults.gam.evaluation.calibration_stats.intercept;
                }),
                marker: { color: 'rgb(31, 119, 180)' }
              },
              {
                type: 'scatter',
                mode: 'markers',
                name: 'MaxEnt',
                x: Array.from({length: 10}, (_, i) => i/10 + 0.05),
                y: Array.from({length: 10}, (_, i) => {
                  const pred = i/10 + 0.05;
                  return pred * modelResults.maxent.evaluation.calibration_stats.slope + 
                         modelResults.maxent.evaluation.calibration_stats.intercept;
                }),
                marker: { color: 'rgb(255, 127, 14)' }
              },
              {
                type: 'scatter',
                mode: 'lines',
                name: 'Ideal',
                x: [0, 1],
                y: [0, 1],
                line: { 
                  dash: 'dash',
                  color: 'rgb(44, 160, 44)'
                }
              }
            ]}
            layout={{
              title: 'Gráfico de Calibración',
              xaxis: { title: 'Probabilidad predicha' },
              yaxis: { title: 'Proporción observada' },
              width: 500,
              height: 400,
              showlegend: true
            }}
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Resumen del Análisis</h3>
        <p className="text-gray-600">
          Este análisis integra múltiples enfoques para modelar la distribución de copépodos en la bahía de Valparaíso:
        </p>
        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
          <li>El análisis de componentes principales (PCA) revela los principales gradientes ambientales que influyen en la distribución de especies.</li>
          <li>El modelo aditivo generalizado (GAM) captura relaciones no lineales entre variables ambientales y la presencia de especies.</li>
          <li>El modelo MaxEnt identifica las variables más importantes para predecir la distribución de especies y genera mapas de idoneidad del hábitat.</li>
          <li>Las métricas de evaluación indican:
            <ul className="list-circle list-inside ml-4 mt-1">
              <li>AUC: {getAUCInterpretation(modelResults.gam.evaluation.auc)} para GAM y {getAUCInterpretation(modelResults.maxent.evaluation.auc)} para MaxEnt</li>
              <li>Índice de Boyce: {getBoyceInterpretation(modelResults.gam.evaluation.boyce)} para GAM y {getBoyceInterpretation(modelResults.maxent.evaluation.boyce)} para MaxEnt</li>
              <li>La calibración muestra {getCalibrationInterpretation(modelResults.gam.evaluation.calibration_stats)} para GAM y {getCalibrationInterpretation(modelResults.maxent.evaluation.calibration_stats)} para MaxEnt</li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Interpretación de Métricas</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">AUC (Área Bajo la Curva ROC)</h4>
            <ul className="text-sm list-disc list-inside space-y-1">
              <li>0.5: No mejor que el azar</li>
              <li>0.7-0.8: Aceptable</li>
              <li>0.8-0.9: Bueno</li>
              <li>&gt;0.9: Excelente</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Índice de Boyce</h4>
            <ul className="text-sm list-disc list-inside space-y-1">
              <li>-1 a 0: Predicciones contrarias a la distribución</li>
              <li>0: No mejor que el azar</li>
              <li>0 a 1: Predicciones consistentes con la distribución</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">TSS (True Skill Statistic)</h4>
            <ul className="text-sm list-disc list-inside space-y-1">
              <li>-1 a 0: Peor que el azar</li>
              <li>0: No mejor que el azar</li>
              <li>&gt;0.4: Buen desempeño</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Calibración</h4>
            <ul className="text-sm list-disc list-inside space-y-1">
              <li>Pendiente ≈ 1: Buena calibración</li>
              <li>Intercepto ≈ 0: Sin sesgo sistemático</li>
              <li>R² alto: Buena relación lineal</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Funciones auxiliares para interpretación
function getAUCInterpretation(auc: number): string {
  if (auc > 0.9) return "excelente";
  if (auc > 0.8) return "bueno";
  if (auc > 0.7) return "aceptable";
  return "pobre";
}

function getBoyceInterpretation(boyce: number): string {
  if (boyce > 0.7) return "muy bueno";
  if (boyce > 0.4) return "bueno";
  if (boyce > 0) return "aceptable";
  if (boyce === 0) return "no mejor que el azar";
  return "predicciones inversas";
}

function getCalibrationInterpretation(stats: { slope: number; intercept: number; r_squared: number }): string {
  const isGoodSlope = Math.abs(stats.slope - 1) < 0.2;
  const isGoodIntercept = Math.abs(stats.intercept) < 0.1;
  const isGoodR2 = stats.r_squared > 0.7;

  if (isGoodSlope && isGoodIntercept && isGoodR2) return "excelente calibración";
  if ((isGoodSlope || isGoodIntercept) && isGoodR2) return "buena calibración";
  if (isGoodR2) return "calibración aceptable";
  return "calibración pobre";
}

export default SpeciesDistribution; 