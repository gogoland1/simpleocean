// src/pages/innovation/memory.tsx
import React, { useState, useEffect } from 'react';
import Layout from '~/components/layout/Layout';
import MemoryCapture from '~/components/innovation/MemoryCapture';
import MemoryCollection from '~/components/innovation/MemoryCollection';
import { MemoryEntry } from 'src/components/models/memoryTypes';
import Link from 'next/link';

const MemorySystemPage: React.FC = () => {
  // Estado para todas las entradas de memoria
  const [memories, setMemories] = useState<MemoryEntry[]>([]);
  
  // Estado para la entrada seleccionada para editar
  const [selectedMemory, setSelectedMemory] = useState<MemoryEntry | null>(null);
  
  // Estado para controlar la visualización (añadir/editar o explorar)
  const [view, setView] = useState<'add' | 'explore'>('explore');
  
  // Cargar las memorias del localStorage al inicio
  useEffect(() => {
    const storedMemories = localStorage.getItem('oceanInsight_memories');
    if (storedMemories) {
      try {
        const parsedMemories = JSON.parse(storedMemories);
        // Convertir las fechas de string a Date
        const memoriesWithDates = parsedMemories.map((mem: any) => ({
          ...mem,
          dateCreated: new Date(mem.dateCreated),
          lastModified: new Date(mem.lastModified)
        }));
        setMemories(memoriesWithDates);
      } catch (e) {
        console.error('Error parsing stored memories:', e);
      }
    }
  }, []);
  
  // Guardar las memorias en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('oceanInsight_memories', JSON.stringify(memories));
  }, [memories]);
  
  // Función para guardar una nueva entrada o actualizar una existente
  const handleSaveMemory = (entry: MemoryEntry) => {
    if (selectedMemory) {
      // Actualizar una entrada existente
      setMemories(memories.map(mem => 
        mem.id === entry.id ? entry : mem
      ));
      setSelectedMemory(null);
    } else {
      // Añadir una nueva entrada
      setMemories([...memories, entry]);
    }
    
    // Volver a la vista de exploración
    setView('explore');
  };
  
  // Función para seleccionar una entrada para editar
  const handleSelectMemory = (entry: MemoryEntry) => {
    setSelectedMemory(entry);
    setView('add');
  };
  
  // Función para eliminar una entrada
  const handleDeleteMemory = (entryId: string) => {
    setMemories(memories.filter(mem => mem.id !== entryId));
  };

  return (
    <Layout 
      title="Sistema de Memoria - OceanInsight" 
      description="Captura y explora ideas innovadoras en oceanografía"
    >
      <div className="bg-gradient-to-b from-blue-700 to-teal-600 text-white">
        <div className="container mx-auto px-4 py-10">
          <div className="flex items-center mb-6">
            <Link href="/innovation" className="text-white hover:text-blue-100 transition-colors flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Volver a Innovación
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-2">Sistema de Memoria</h1>
          <p className="text-blue-100 max-w-2xl">
            Captura y organiza tus ideas, observaciones y conceptos relacionados con la oceanografía. 
            Este espacio está diseñado para fomentar la innovación y conexión entre diferentes áreas 
            del conocimiento oceánico.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Controles principales */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => {
                setView('explore');
                setSelectedMemory(null);
              }}
              className={`px-4 py-2 rounded-md ${
                view === 'explore' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
            >
              Explorar Ideas
            </button>
            <button
              onClick={() => {
                setView('add');
                setSelectedMemory(null);
              }}
              className={`px-4 py-2 rounded-md ${
                view === 'add' && !selectedMemory
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
            >
              Nueva Idea
            </button>
          </div>
          
          {/* Estadísticas y métricas */}
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Total: {memories.length} ideas
          </div>
        </div>
        
        {/* Contenido principal */}
        <div className="mt-4">
          {view === 'add' ? (
            <MemoryCapture 
              onSave={handleSaveMemory}
              initialEntry={selectedMemory || undefined}
            />
          ) : (
            <MemoryCollection 
              entries={memories}
              onSelectEntry={handleSelectMemory}
              onDeleteEntry={handleDeleteMemory}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MemorySystemPage;