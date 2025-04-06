<script lang="ts">
  import type { SamplingPoint } from '~/lib/data/synthetic_valparaiso_data';
  import type { ModelResults } from '~/lib/models/species_distribution_models';
  import { createROCPlot, createDistributionMap, createVariableImportancePlot, createFuturePredictionsPlot } from '~/lib/visualization/species_distribution_plots';

  export let data: SamplingPoint[];
  export let results: ModelResults;
  export let speciesName: string;

  // Crear las visualizaciones
  const rocPlot = createROCPlot(results);
  const distributionMap = createDistributionMap(data, results, { title: `Distribution of ${speciesName}` });
  const importancePlot = createVariableImportancePlot(results);
  const futurePlot = createFuturePredictionsPlot(results);
</script>

<div class="plots-container">
  <div class="plot-section">
    <h2>Model Evaluation</h2>
    <div class="plot" bind:this={rocPlotContainer}>
      {@html rocPlot}
    </div>
    <div class="metrics">
      <p>AUC: {results.evaluation.auc.toFixed(3)}</p>
      <p>Boyce Index: {results.evaluation.boyce.toFixed(3)}</p>
      <p>Accuracy: {results.evaluation.accuracy.toFixed(3)}</p>
      <p>Sensitivity: {results.evaluation.sensitivity.toFixed(3)}</p>
      <p>Specificity: {results.evaluation.specificity.toFixed(3)}</p>
    </div>
  </div>

  <div class="plot-section">
    <h2>Distribution Map</h2>
    <div class="plot" bind:this={mapContainer}>
      {@html distributionMap}
    </div>
  </div>

  <div class="plot-section">
    <h2>Variable Importance</h2>
    <div class="plot" bind:this={importanceContainer}>
      {@html importancePlot}
    </div>
  </div>

  <div class="plot-section">
    <h2>Future Predictions</h2>
    <div class="plot" bind:this={futureContainer}>
      {@html futurePlot}
    </div>
  </div>
</div>

<style>
  .plots-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    padding: 1rem;
  }

  .plot-section {
    background: white;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .plot {
    width: 100%;
    height: 400px;
    margin: 1rem 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
  }

  .metrics {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-top: 1rem;
  }

  .metrics p {
    margin: 0;
    padding: 0.5rem;
    background: #f5f5f5;
    border-radius: 4px;
  }

  h2 {
    margin: 0 0 1rem 0;
    color: #333;
    font-size: 1.2rem;
  }
</style> 