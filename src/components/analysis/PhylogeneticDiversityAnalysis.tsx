import React, { useState } from 'react';
import Image from 'next/image';
import { Tabs } from '../ui/tabs';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

type VisualizationType = 'vertical' | 'heatmap' | 'network' | 'comparison';

interface Visualization {
    title: string;
    description: string;
    image: string;
}

const PhylogeneticDiversityAnalysis: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedVisualization, setSelectedVisualization] = useState<VisualizationType>('vertical');

    const visualizations: Record<VisualizationType, Visualization> = {
        vertical: {
            title: 'Perfiles Verticales de Diversidad Filogenética',
            description: 'Muestra cómo varían los índices de diversidad filogenética (Faith PD y Rao Q) con la profundidad en diferentes estaciones.',
            image: '/images/diversidad/vertical_profiles.png'
        },
        heatmap: {
            title: 'Distribución Espacial de la Diversidad',
            description: 'Mapa de calor que muestra la distribución espacial de los índices de diversidad filogenética en la columna de agua.',
            image: '/images/diversidad/diversity_heatmap.png'
        },
        network: {
            title: 'Red de Relaciones Filogenéticas',
            description: 'Visualización de las relaciones evolutivas entre las especies de zooplancton estudiadas.',
            image: '/images/diversidad/phylogenetic_network.png'
        },
        comparison: {
            title: 'Comparación de Índices',
            description: 'Análisis comparativo entre los índices de Faith PD y Rao Q, mostrando su correlación y patrones.',
            image: '/images/diversidad/diversity_comparison.png'
        }
    };

    return (
        <div className="space-y-6 p-4">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-gray-800">
                    Análisis de Diversidad Filogenética en la Bahía de Valparaíso
                </h1>
                <p className="text-gray-600 max-w-3xl mx-auto">
                    Estudio de la estructura evolutiva de las comunidades de zooplancton mediante índices de diversidad filogenética.
                </p>
            </div>

            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
                items={[
                    { value: 'overview', label: 'Descripción General' },
                    { value: 'methods', label: 'Métodos' },
                    { value: 'results', label: 'Resultados' },
                    { value: 'implications', label: 'Implicaciones' }
                ]}
            />

            <div className="mt-6">
                {activeTab === 'overview' && (
                    <Card className="p-6 space-y-4">
                        <h2 className="text-2xl font-semibold">Diversidad Filogenética del Zooplancton</h2>
                        <p className="text-gray-700">
                            La diversidad filogenética es una medida que considera las relaciones evolutivas entre especies,
                            proporcionando una perspectiva más profunda que la simple riqueza de especies. En este estudio,
                            analizamos la estructura filogenética de las comunidades de zooplancton en la Bahía de Valparaíso
                            utilizando dos índices principales:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-blue-800">Faith&apos;s PD</h3>
                                <p className="text-gray-700">
                                    Mide la suma total de las longitudes de rama en el árbol filogenético que conecta todas
                                    las especies en una comunidad. Un valor alto indica mayor diversidad evolutiva.
                                </p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-green-800">Rao&apos;s Q</h3>
                                <p className="text-gray-700">
                                    Considera tanto las abundancias relativas como las distancias filogenéticas entre especies.
                                    Refleja la divergencia evolutiva promedio entre individuos de la comunidad.
                                </p>
                            </div>
                        </div>
                    </Card>
                )}

                {activeTab === 'methods' && (
                    <Card className="p-6 space-y-4">
                        <h2 className="text-2xl font-semibold">Metodología</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-xl font-semibold text-blue-800">Diseño de Muestreo</h3>
                                <p className="text-gray-700">
                                    Se establecieron tres estaciones de muestreo en la Bahía de Valparaíso:
                                </p>
                                <ul className="list-disc list-inside ml-4 mt-2">
                                    <li>E1: Zona costera</li>
                                    <li>E2: Plataforma continental</li>
                                    <li>E3: Zona oceánica</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-green-800">Grupos Taxonómicos</h3>
                                <p className="text-gray-700">
                                    Se analizaron cuatro grupos principales de zooplancton:
                                </p>
                                <ul className="list-disc list-inside ml-4 mt-2">
                                    <li>Copépodos: 5 especies</li>
                                    <li>Eufáusidos: 3 especies</li>
                                    <li>Quetognatos: 3 especies</li>
                                    <li>Sifonóforos: 3 especies</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-purple-800">Análisis de Datos</h3>
                                <p className="text-gray-700">
                                    Se utilizaron técnicas de análisis multivariado y métodos filogenéticos para:
                                </p>
                                <ul className="list-disc list-inside ml-4 mt-2">
                                    <li>Calcular índices de diversidad filogenética</li>
                                    <li>Generar perfiles verticales de diversidad</li>
                                    <li>Crear mapas de distribución espacial</li>
                                    <li>Analizar patrones de correlación entre índices</li>
                                </ul>
                            </div>
                        </div>
                    </Card>
                )}

                {activeTab === 'results' && (
                    <Card className="p-6 space-y-4">
                        <h2 className="text-2xl font-semibold">Resultados</h2>
                        <div className="space-y-6">
                            <div className="flex space-x-2 overflow-x-auto pb-2">
                                {Object.entries(visualizations).map(([key, value]) => (
                                    <Button
                                        key={key}
                                        variant={selectedVisualization === key ? "default" : "outline"}
                                        onClick={() => setSelectedVisualization(key as VisualizationType)}
                                        className="whitespace-nowrap"
                                    >
                                        {value.title}
                                    </Button>
                                ))}
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="text-xl font-semibold mb-2">
                                    {visualizations[selectedVisualization].title}
                                </h3>
                                <p className="text-gray-700 mb-4">
                                    {visualizations[selectedVisualization].description}
                                </p>
                                <div className="relative w-full h-[500px]">
                                    <Image
                                        src={visualizations[selectedVisualization].image}
                                        alt={visualizations[selectedVisualization].title}
                                        fill
                                        style={{ objectFit: "contain" }}
                                        className="rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                )}

                {activeTab === 'implications' && (
                    <Card className="p-6 space-y-4">
                        <h2 className="text-2xl font-semibold">Implicaciones y Conclusiones</h2>
                        <div className="space-y-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="text-xl font-semibold text-blue-800">Patrones Espaciales</h3>
                                <ul className="list-disc list-inside mt-2 space-y-2">
                                    <li>Mayor diversidad filogenética en zonas intermedias de la columna de agua</li>
                                    <li>Gradientes costa-océano en la estructura evolutiva de las comunidades</li>
                                    <li>Patrones distintivos entre diferentes grupos taxonómicos</li>
                                </ul>
                            </div>

                            <div className="bg-green-50 p-4 rounded-lg">
                                <h3 className="text-xl font-semibold text-green-800">Significado Ecológico</h3>
                                <ul className="list-disc list-inside mt-2 space-y-2">
                                    <li>Identificación de zonas con linajes únicos o antiguos</li>
                                    <li>Comprensión de procesos de estructuración comunitaria</li>
                                    <li>Evaluación de la redundancia funcional entre especies</li>
                                </ul>
                            </div>

                            <div className="bg-purple-50 p-4 rounded-lg">
                                <h3 className="text-xl font-semibold text-purple-800">Aplicaciones</h3>
                                <ul className="list-disc list-inside mt-2 space-y-2">
                                    <li>Identificación de áreas prioritarias para conservación</li>
                                    <li>Monitoreo de cambios en la estructura evolutiva de las comunidades</li>
                                    <li>Evaluación de impactos ambientales en la diversidad evolutiva</li>
                                </ul>
                            </div>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default PhylogeneticDiversityAnalysis; 