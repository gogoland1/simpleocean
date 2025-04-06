import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PhylogeneticDiversityAnalysis() {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="container mx-auto px-4 py-8">
            <Tabs defaultValue="overview" className="w-full">
                <TabsList>
                    <TabsTrigger value="overview">Descripción General</TabsTrigger>
                    <TabsTrigger value="methods">Métodos</TabsTrigger>
                    <TabsTrigger value="results">Resultados</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                    <Card className="p-6 space-y-4">
                        <h2 className="text-2xl font-semibold">Descripción General</h2>
                        <p>Contenido de la descripción general...</p>
                    </Card>
                </TabsContent>
                <TabsContent value="methods">
                    <Card className="p-6 space-y-4">
                        <h2 className="text-2xl font-semibold">Métodos</h2>
                        <p>Contenido de los métodos...</p>
                    </Card>
                </TabsContent>
                <TabsContent value="results">
                    <Card className="p-6 space-y-4">
                        <h2 className="text-2xl font-semibold">Resultados</h2>
                        <p>Contenido de los resultados...</p>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
} 