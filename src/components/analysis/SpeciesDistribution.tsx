import React, { useState, useEffect } from 'react';
import { generateSyntheticData } from '~/lib/data/synthetic_valparaiso_data';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';

// Importar Plot de Plotly dinámicamente para evitar problemas de SSR
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export default function SpeciesDistribution() {
    const [data, setData] = useState<any>(null);
    const [results, setResults] = useState<any>(null);
    const [selectedSpecies, setSelectedSpecies] = useState('Acartia tonsa');

    useEffect(() => {
        // Generar datos sintéticos al montar el componente
        const syntheticData = generateSyntheticData(
            100, // número de puntos de muestreo
            new Date('2023-01-01'), // fecha inicio
            new Date('2023-12-31') // fecha fin
        );
        setData(syntheticData);
    }, []);

    const handleModelRun = async () => {
        if (data) {
            // Por ahora, solo mostramos los datos generados
            setResults(data);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Distribución de Especies</h1>
            <select
                value={selectedSpecies}
                onChange={(e) => setSelectedSpecies(e.target.value)}
                className="mb-4 p-2 border rounded"
            >
                <option value="Acartia tonsa">Acartia tonsa</option>
                <option value="Calanus chilensis">Calanus chilensis</option>
                <option value="Centropages brachiatus">Centropages brachiatus</option>
            </select>
            <Button onClick={handleModelRun} className="mb-4">
                Ejecutar Modelo
            </Button>
            {results && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Aquí irían las visualizaciones de los resultados */}
                    <div>Resultados del modelo...</div>
                </div>
            )}
        </div>
    );
} 