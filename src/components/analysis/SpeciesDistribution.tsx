import React, { useState, useEffect } from 'react';
import { generateSyntheticData, SamplingPoint } from '~/lib/data/synthetic_valparaiso_data';
import { modelCopepodDistribution, ModelResults } from '~/lib/models/species_distribution_models';
import dynamic from 'next/dynamic';

// Importar Plot de Plotly dinámicamente para evitar problemas de SSR
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export default function SpeciesDistribution() {
    const [data, setData] = useState<SamplingPoint[] | null>(null);
    const [results, setResults] = useState<ModelResults | null>(null);
    const [selectedSpecies, setSelectedSpecies] = useState('Acartia tonsa');

    useEffect(() => {
        // Generar datos sintéticos al montar el componente
        const syntheticData = generateSyntheticData(100, new Date('2023-01-01'), new Date('2023-12-31'));
        setData(syntheticData);
    }, []);

    const handleModelRun = async () => {
        if (data) {
            const modelResults = await modelCopepodDistribution(data, selectedSpecies);
            setResults(modelResults);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Distribución de Especies</h1>
            <select
                value={selectedSpecies}
                onChange={(e) => setSelectedSpecies(e.target.value)}
                className="mb-4 p-2 border rounded"
            >
                <option value="Acartia tonsa">Acartia tonsa</option>
                <option value="Calanus chilensis">Calanus chilensis</option>
                <option value="Centropages brachiatus">Centropages brachiatus</option>
            </select>
            <button
                onClick={handleModelRun}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Ejecutar Modelo
            </button>
            {/* Aquí irían las visualizaciones de los resultados */}
        </div>
    );
} 