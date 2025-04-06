import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export default function PhylogeneticDiversityAnalysis() {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex space-x-2 mb-4">
                <Button
                    onClick={() => setActiveTab('overview')}
                    variant={activeTab === 'overview' ? 'default' : 'outline'}
                >
                    Descripción General
                </Button>
                <Button
                    onClick={() => setActiveTab('methods')}
                    variant={activeTab === 'methods' ? 'default' : 'outline'}
                >
                    Métodos
                </Button>
                <Button
                    onClick={() => setActiveTab('results')}
                    variant={activeTab === 'results' ? 'default' : 'outline'}
                >
                    Resultados
                </Button>
            </div>

            {activeTab === 'overview' && (
                <Card className="p-6 space-y-4">
                    <h2 className="text-2xl font-semibold">Descripción General</h2>
                    <p>Contenido de la descripción general...</p>
                </Card>
            )}

            {activeTab === 'methods' && (
                <Card className="p-6 space-y-4">
                    <h2 className="text-2xl font-semibold">Métodos</h2>
                    <p>Contenido de los métodos...</p>
                </Card>
            )}

            {activeTab === 'results' && (
                <Card className="p-6 space-y-4">
                    <h2 className="text-2xl font-semibold">Resultados</h2>
                    <p>Contenido de los resultados...</p>
                </Card>
            )}
        </div>
    );
} 