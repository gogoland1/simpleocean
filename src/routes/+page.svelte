<script lang="ts">
  import type { SamplingPoint } from '~/lib/data/synthetic_valparaiso_data';
  import { modelCopepodDistribution } from '~/lib/models/species_distribution_models';
  import SpeciesDistributionPlots from '~/components/SpeciesDistributionPlots.svelte';
  import { onMount } from 'svelte';

  let data: SamplingPoint[] = [];
  let results: any = null;
  let selectedSpecies = '';
  let loading = false;
  let error: string | null = null;

  const species = [
    'Calanus chilensis',
    'Paracalanus parvus',
    'Acartia tonsa',
    'Centropages brachiatus',
    'Oithona similis'
  ];

  async function loadData() {
    try {
      loading = true;
      error = null;
      const response = await fetch('/api/sampling-data');
      if (!response.ok) throw new Error('Failed to load data');
      data = await response.json();
    } catch (e) {
      error = e instanceof Error ? e.message : 'An error occurred';
    } finally {
      loading = false;
    }
  }

  function runModel() {
    if (!selectedSpecies || !data.length) return;
    
    try {
      loading = true;
      error = null;
      results = modelCopepodDistribution(data, selectedSpecies);
    } catch (e) {
      error = e instanceof Error ? e.message : 'An error occurred';
    } finally {
      loading = false;
    }
  }

  onMount(loadData);
</script>

<div class="container">
  <h1>Species Distribution Modeling</h1>
  
  <div class="controls">
    <select bind:value={selectedSpecies}>
      <option value="">Select a species</option>
      {#each species as speciesName}
        <option value={speciesName}>{speciesName}</option>
      {/each}
    </select>
    
    <button on:click={runModel} disabled={!selectedSpecies || loading}>
      {loading ? 'Running...' : 'Run Model'}
    </button>
  </div>

  {#if error}
    <div class="error">
      {error}
    </div>
  {/if}

  {#if results}
    <SpeciesDistributionPlots 
      {data}
      {results}
      speciesName={selectedSpecies}
    />
  {/if}
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    color: #333;
    margin-bottom: 2rem;
  }

  .controls {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  select, button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  button {
    background: #4292c6;
    color: white;
    border: none;
    cursor: pointer;
  }

  button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  .error {
    background: #fee;
    color: #c00;
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
  }
</style> 