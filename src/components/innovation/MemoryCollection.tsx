// src/components/innovation/MemoryCollection.tsx
import React, { useState } from 'react';
import { MemoryEntry, OceanCategory } from 'src/components/models/memoryTypes';
import MemoryCard from './MemoryCard';

interface MemoryCollectionProps {
  entries: MemoryEntry[];
  onSelectEntry: (entry: MemoryEntry) => void;
  onDeleteEntry: (entryId: string) => void;
}

const MemoryCollection: React.FC<MemoryCollectionProps> = ({
  entries,
  onSelectEntry,
  onDeleteEntry
}) => {
  const [filterCategory, setFilterCategory] = useState<OceanCategory | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<string | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortMethod, setSortMethod] = useState<'date' | 'alpha'>('date');

  // Aplicar filtros y ordenación
  const filteredEntries = entries.filter(entry => {
    // Filtrar por categoría
    if (filterCategory !== 'all' && entry.category !== filterCategory) return false;
    
    // Filtrar por estado
    if (filterStatus !== 'all' && entry.status !== filterStatus) return false;
    
    // Filtrar por término de búsqueda
    if (searchTerm && !entry.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !entry.content.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return false;
    }
    
    return true;
  });
  
  // Ordenar entradas
  const sortedEntries = [...filteredEntries].sort((a, b) => {
    if (sortMethod === 'date') {
      return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  return (
    <div className="space-y-6">
      {/* Filtros y búsqueda */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Búsqueda */}
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Buscar ideas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-md bg-transparent"
            />
          </div>
          
          {/* Ordenar */}
          <div className="flex-shrink-0">
            <select
              value={sortMethod}
              onChange={(e) => setSortMethod(e.target.value as 'date' | 'alpha')}
              className="p-2 border border-gray-200 dark:border-gray-700 rounded-md bg-transparent"
            >
              <option value="date">Más recientes</option>
              <option value="alpha">Alfabético</option>
            </select>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {/* Filtro por categoría */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value as OceanCategory | 'all')}
            className="p-2 border border-gray-200 dark:border-gray-700 rounded-md bg-transparent"
          >
            <option value="all">Todas las categorías</option>
            <option value="biological">Oceanografía Biológica</option>
            <option value="physical">Oceanografía Física</option>
            <option value="chemical">Oceanografía Química</option>
            <option value="geological">Oceanografía Geológica</option>
            <option value="quantum">Computación Cuántica</option>
            <option value="interdisciplinary">Interdisciplinario</option>
          </select>
          
          {/* Filtro por estado */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 border border-gray-200 dark:border-gray-700 rounded-md bg-transparent"
          >
            <option value="all">Todos los estados</option>
            <option value="draft">Borradores</option>
            <option value="refined">Refinadas</option>
            <option value="implemented">Implementadas</option>
          </select>
        </div>
      </div>
      
      {/* Contador de resultados */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        {sortedEntries.length} {sortedEntries.length === 1 ? 'idea encontrada' : 'ideas encontradas'}
      </div>
      
      {/* Lista de tarjetas de memoria */}
      {sortedEntries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedEntries.map((entry) => (
            <MemoryCard
              key={entry.id}
              entry={entry}
              onSelect={() => onSelectEntry(entry)}
              onDelete={() => onDeleteEntry(entry.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No se encontraron ideas con los filtros actuales.
          </p>
        </div>
      )}
    </div>
  );
};

export default MemoryCollection;