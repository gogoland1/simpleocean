import React, { useState, useEffect } from 'react';
import { SpeciesDistributionPlots } from '~/components/SpeciesDistributionPlots';
import { modelCopepodDistribution } from '~/lib/models/species_distribution_models';
import type { SamplingPoint } from '~/lib/data/synthetic_valparaiso_data';
import type { ModelResults } from '~/lib/models/species_distribution_models';

const SPECIES = [
  'Calanus chilensis',
  'Paracalanus parvus',
  'Acartia tonsa',
  'Centropages brachiatus',
  'Oithona similis'
];

export default function SpeciesDistributionPage() {
  const [data, setData] = useState<SamplingPoint[]>([]);
  const [results, setResults] = useState<ModelResults | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/sampling-data');
        if (!response.ok) {
          throw new Error('Failed to load sampling data');
        }
        const samplingData = await response.json();
        setData(samplingData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const runModel = async () => {
    if (!selectedSpecies || data.length === 0) return;

    try {
      setLoading(true);
      setError(null);
      const modelResults = await modelCopepodDistribution(data, selectedSpecies);
      setResults(modelResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c1016] text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Modelo de Distribución de Especies</h1>
        
        <div className="bg-[#152238] rounded-lg p-6 mb-8">
          <div className="flex gap-4 items-center">
            <select
              value={selectedSpecies}
              onChange={(e) => setSelectedSpecies(e.target.value)}
              className="px-4 py-2 bg-[#1c2e4a] text-white rounded-md border border-gray-600"
            >
              <option value="">Seleccionar una especie</option>
              {SPECIES.map((species) => (
                <option key={species} value={species}>
                  {species}
                </option>
              ))}
            </select>

            <button
              onClick={runModel}
              disabled={!selectedSpecies || loading}
              className="px-4 py-2 bg-[#00a3d9] text-white rounded-md hover:bg-[#0095c8] disabled:opacity-50"
            >
              {loading ? 'Ejecutando...' : 'Ejecutar Modelo'}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-900/50 text-red-200 rounded-md">
            {error}
          </div>
        )}

        {results && (
          <SpeciesDistributionPlots
            data={data}
            results={results}
            speciesName={selectedSpecies}
          />
        )}
      </div>
    </div>
  );
} 