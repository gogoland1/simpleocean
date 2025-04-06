# Sistema de Memoria OceanInsight - Documentación Completa

## 1. Visión General del Sistema

El Sistema de Memoria para OceanInsight es un módulo que permite capturar, organizar y explorar ideas relacionadas con la oceanografía. Está diseñado con una interfaz minimalista y se integra con la página de innovación existente.

## 2. Componentes Desarrollados

### Estructura de Archivos
```
src/
├── components/
│   ├── innovation/
│   │   ├── MemoryCapture.tsx  // Componente para ingresar nuevas ideas
│   │   ├── MemoryCard.tsx     // Tarjeta individual de idea
│   │   └── MemoryCollection.tsx // Visualización de colecciones
│   └── InnovationComponent.tsx  // Modificado para incluir acceso al sistema
├── models/
│   └── memoryTypes.ts         // Tipos de datos para memoria
└── pages/
    ├── innovation.tsx         // Página principal existente
    └── innovation/
        └── memory.tsx         // Nueva página del sistema de memoria
```

### 2.1 Modelo de Datos (memoryTypes.ts)

```typescript
// src/models/memoryTypes.ts
export interface MemoryEntry {
  id: string;
  title: string;
  content: string;
  tags: string[];
  category: OceanCategory;
  dateCreated: Date;
  lastModified: Date;
  status: 'draft' | 'refined' | 'implemented';
  connections?: string[]; // IDs de entradas relacionadas
}

export type OceanCategory = 
  | 'biological' 
  | 'physical' 
  | 'chemical' 
  | 'geological'
  | 'quantum'
  | 'interdisciplinary';

export interface MemoryCollection {
  id: string;
  name: string;
  description: string;
  entries: string[]; // IDs de las entradas
  dateCreated: Date;
}
```

### 2.2 Componente de Captura (MemoryCapture.tsx)

Este componente permite ingresar y editar ideas:

```typescript
// src/components/innovation/MemoryCapture.tsx
import React, { useState } from 'react';
import { MemoryEntry, OceanCategory } from '~/models/memoryTypes';
import { v4 as uuidv4 } from 'uuid';

interface MemoryCaptureProps {
  onSave: (entry: MemoryEntry) => void;
  initialEntry?: Partial<MemoryEntry>;
}

const MemoryCapture: React.FC<MemoryCaptureProps> = ({ onSave, initialEntry }) => {
  const [entry, setEntry] = useState<Partial<MemoryEntry>>(
    initialEntry || {
      id: uuidv4(),
      title: '',
      content: '',
      tags: [],
      category: 'interdisciplinary',
      status: 'draft',
      dateCreated: new Date(),
      lastModified: new Date(),
    }
  );
  
  const [currentTag, setCurrentTag] = useState<string>('');

  const handleSave = () => {
    if (!entry.title || !entry.content) {
      // Mostrar error de validación
      alert("Por favor, completa al menos el título y la descripción de la idea");
      return;
    }
    
    const completeEntry = {
      ...entry,
      id: entry.id || uuidv4(), // Asegurarse de que haya un ID
      lastModified: new Date(),
      dateCreated: entry.dateCreated || new Date(),
      tags: entry.tags || [],
    } as MemoryEntry;
    
    console.log("Guardando entrada:", completeEntry); // Para depuración
    
    onSave(completeEntry);
  };
  
  const addTag = () => {
    if (currentTag && !entry.tags?.includes(currentTag)) {
      setEntry({
        ...entry,
        tags: [...(entry.tags || []), currentTag],
      });
      setCurrentTag('');
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setEntry({
      ...entry,
      tags: entry.tags?.filter(tag => tag !== tagToRemove) || [],
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-all">
      <div className="space-y-4">
        {/* Título */}
        <div>
          <input
            type="text"
            value={entry.title}
            onChange={(e) => setEntry({ ...entry, title: e.target.value })}
            placeholder="Título de la idea..."
            className="w-full text-xl font-medium focus:outline-none border-b border-gray-200 dark:border-gray-700 py-2 bg-transparent"
          />
        </div>
        
        {/* Contenido */}
        <div>
          <textarea
            value={entry.content}
            onChange={(e) => setEntry({ ...entry, content: e.target.value })}
            placeholder="Describe tu idea aquí... Puedes incluir observaciones, preguntas, conexiones con otros conceptos, o posibles aplicaciones."
            className="w-full min-h-[200px] focus:outline-none resize-none bg-transparent"
            rows={8}
          />
        </div>
        
        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            Categoría
          </label>
          <select
            value={entry.category}
            onChange={(e) => setEntry({ ...entry, category: e.target.value as OceanCategory })}
            className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-md bg-transparent"
          >
            <option value="biological">Oceanografía Biológica</option>
            <option value="physical">Oceanografía Física</option>
            <option value="chemical">Oceanografía Química</option>
            <option value="geological">Oceanografía Geológica</option>
            <option value="quantum">Computación Cuántica</option>
            <option value="interdisciplinary">Interdisciplinario</option>
          </select>
        </div>
        
        {/* Etiquetas */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            Etiquetas
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {entry.tags?.map((tag) => (
              <span 
                key={tag} 
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md text-sm flex items-center"
              >
                {tag}
                <button 
                  onClick={() => removeTag(tag)}
                  className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              placeholder="Añadir etiqueta..."
              className="flex-grow p-2 border border-gray-200 dark:border-gray-700 rounded-l-md bg-transparent"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }}
            />
            <button
              onClick={addTag}
              className="px-4 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
            >
              +
            </button>
          </div>
        </div>
        
        {/* Estado */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            Estado
          </label>
          <div className="flex space-x-4">
            {['draft', 'refined', 'implemented'].map((status) => (
              <label key={status} className="flex items-center">
                <input
                  type="radio"
                  checked={entry.status === status}
                  onChange={() => setEntry({ ...entry, status: status as any })}
                  className="mr-2"
                />
                <span className="capitalize">
                  {status === 'draft' ? 'Borrador' : 
                   status === 'refined' ? 'Refinada' : 'Implementada'}
                </span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Botones */}
        <div className="flex justify-end pt-4">
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemoryCapture;
```

### 2.3 Componente de Tarjeta (MemoryCard.tsx)

Este componente muestra una idea individual:

```typescript
// src/components/innovation/MemoryCard.tsx
import React from 'react';
import { MemoryEntry } from '~/models/memoryTypes';

interface MemoryCardProps {
  entry: MemoryEntry;
  onSelect: () => void;
  onDelete: () => void;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ entry, onSelect, onDelete }) => {
  // Función para formatear fechas
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Función para obtener el color de la categoría
  const getCategoryColor = (category: string): string => {
    switch(category) {
      case 'biological': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'physical': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'chemical': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'geological': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'quantum': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };
  
  // Traducir la categoría
  const getCategoryName = (category: string): string => {
    switch(category) {
      case 'biological': return 'Biológica';
      case 'physical': return 'Física';
      case 'chemical': return 'Química';
      case 'geological': return 'Geológica';
      case 'quantum': return 'Cuántica';
      case 'interdisciplinary': return 'Interdisciplinaria';
      default: return category;
    }
  };
  
  // Obtener color del estado
  const getStatusColor = (status: string): string => {
    switch(status) {
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      case 'refined': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'implemented': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };
  
  // Traducir el estado
  const getStatusName = (status: string): string => {
    switch(status) {
      case 'draft': return 'Borrador';
      case 'refined': return 'Refinada';
      case 'implemented': return 'Implementada';
      default: return status;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer relative" onClick={onSelect}>
      {/* Botón de eliminar */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (window.confirm('¿Estás seguro de que deseas eliminar esta idea?')) {
            onDelete();
          }
        }}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </button>
      
      {/* Encabezado */}
      <div className="mb-3">
        <h3 className="text-lg font-medium truncate">{entry.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {formatDate(entry.lastModified)}
        </p>
      </div>
      
      {/* Extracto del contenido */}
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
        {entry.content}
      </p>
      
      {/* Metadatos */}
      <div className="flex flex-wrap gap-2 mb-2">
        {/* Categoría */}
        <span className={`px-2 py-0.5 rounded-full text-xs ${getCategoryColor(entry.category)}`}>
          {getCategoryName(entry.category)}
        </span>
        
        {/* Estado */}
        <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(entry.status)}`}>
          {getStatusName(entry.status)}
        </span>
      </div>
      
      {/* Etiquetas */}
      {entry.tags && entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {entry.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs">
              {tag}
            </span>
          ))}
          {entry.tags.length > 3 && (
            <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs">
              +{entry.tags.length - 3}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default MemoryCard;
```

### 2.4 Componente de Colección (MemoryCollection.tsx)

Este componente maneja la visualización y filtrado de ideas:

```typescript
// src/components/innovation/MemoryCollection.tsx
import React, { useState } from 'react';
import { MemoryEntry, OceanCategory } from '~/models/memoryTypes';
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
```

### 2.5 Página de Sistema de Memoria (memory.tsx)

```typescript
// src/pages/innovation/memory.tsx
import React, { useState, useEffect } from 'react';
import Layout from '~/components/layout/Layout';
import MemoryCapture from '~/components/innovation/MemoryCapture';
import MemoryCollection from '~/components/innovation/MemoryCollection';
import { MemoryEntry } from '~/models/memoryTypes';
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
    try {
      const storedMemories = localStorage.getItem('oceanInsight_memories');
      if (storedMemories) {
        const parsedMemories = JSON.parse(storedMemories);
        // Convertir las fechas de string a Date
        const memoriesWithDates = parsedMemories.map((mem: any) => ({
          ...mem,
          dateCreated: new Date(mem.dateCreated),
          lastModified: new Date(mem.lastModified)
        }));
        console.log("Memorias cargadas:", memoriesWithDates);
        setMemories(memoriesWithDates);
      }
    } catch (e) {
      console.error('Error parsing stored memories:', e);
    }
  }, []);
  
  // Guardar las memorias en localStorage cuando cambian
  useEffect(() => {
    if (memories.length > 0) {
      console.log("Guardando en localStorage:", memories);
      try {
        // Usar una función de reemplazo para manejar correctamente fechas
        localStorage.setItem('oceanInsight_memories', JSON.stringify(memories, (key, value) => {
          // Convertir objetos Date a strings ISO
          if (value instanceof Date) {
            return value.toISOString();
          }
          return value;
        }));
      } catch (e) {
        console.error("Error al guardar en localStorage:", e);
      }
    }
  }, [memories]);
  
  // Función para guardar una nueva entrada o actualizar una existente
  const handleSaveMemory = (entry: MemoryEntry) => {
    console.log("Recibido para guardar:", entry);
    
    if (selectedMemory) {
      // Actualizar una entrada existente
      console.log("Actualizando memoria existente");
      setMemories(prev => prev.map(mem => 
        mem.id === entry.id ? entry : mem
      ));
    } else {
      // Añadir una nueva entrada
      console.log("Añadiendo nueva memoria");
      setMemories(prev => [...prev, entry]);
    }
    
    // Volver a la vista de exploración
    setView('explore');
    setSelectedMemory(null);
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
```

### 2.6 Componente de Innovación (InnovationComponent.tsx Modificado)

Modificación del componente existente para integrar el acceso al sistema de memoria:

```typescript
// Modificaciones agregadas al InnovationComponent.tsx existente

// 1. Agregar importación de Link
import Link from "next/link";

// 2. Agregar sección de banner para el sistema de memoria en la parte superior
<div className="bg-gradient-to-r from-blue-50 to-teal-50 border border-teal-100 rounded-xl p-6 shadow-sm mb-8">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
    <div className="md:col-span-2">
      <h2 className="text-2xl font-bold text-gray-800 mb-3">Sistema de Memoria Oceanográfica</h2>
      <p className="text-gray-700 mb-4">
        Captura, organiza y desarrolla ideas relacionadas con todas las disciplinas oceanográficas. 
        Nuestro sistema de memoria te permite documentar observaciones, conceptos e innovaciones 
        potenciales, categorizarlas por disciplina y conectarlas entre sí.
      </p>
      <Link 
        href="/innovation/memory" 
        className="inline-flex items-center bg-gradient-to-r from-teal-500 to-blue-600 text-white font-medium px-5 py-2.5 rounded-lg hover:shadow-lg transition-all duration-300"
      >
        Acceder al Sistema de Memoria
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </div>
    {/* Vista previa del sistema */}
  </div>
</div>

// 3. Agregar botón en la sección de "Laboratorio de Innovación"
<div className="mt-4 flex flex-wrap gap-3">
  <a 
    href="#"
    className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
  >
    Solicitar Taller de Innovación
  </a>
  
  <Link 
    href="/innovation/memory"
    className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
    Sistema de Memoria
  </Link>
</div>
```

## 3. Problemas Identificados y Soluciones

### 3.1 Error con el botón "Guardar" que no funciona

**Problema:** La interfaz se muestra correctamente pero el botón de guardar no está funcionando.

**Solución:**

1. **Mejorar el manejo de eventos:**
   - Agregar logs de depuración para rastrear el proceso
   - Validación mejorada para los datos de entrada

2. **Manejo de fechas en localStorage:**
   - Implementar una función de reemplazo personalizada para JSON.stringify
   - Convertir adecuadamente los strings a fechas cuando se carga

3. **Estado de React:**
   - Usar updater functions (`setMemories(prev => ...)`) para garantizar referencias actualizadas
   - Resetear correctamente los estados tras el guardado

### 3.2 Error con rutas de imágenes

**Problema:** Error en las rutas de imágenes en el componente InnovationComponent.tsx.

**Solución:**

Corregir las rutas asegurándose de que comiencen con `/`:

```typescript
// De esto:
imagePath: "images/innovation/design_thinking.png"

// A esto:
imagePath: "/images/innovation/design_thinking.png"
```

### 3.3 Error 404 al acceder a /innovation/memory

**Problema:** La ruta /innovation/memory devuelve un error 404.

**Solución:**
- Verificar la estructura de carpetas (debe ser src/pages/innovation/memory.tsx)
- Asegurar que el archivo exporte correctamente un componente como default
- Reiniciar el servidor de desarrollo

## 4. Implementación

### 4.1 Dependencias necesarias

```bash
# Instalar UUID para generación de IDs
npm install uuid
npm install --save-dev @types/uuid
```

### 4.2 Configuración de carpetas

```bash
# Crear estructura de carpetas
mkdir -p src/components/innovation
mkdir -p src/models
mkdir -p src/pages/innovation
```

### 4.3 Orden de implementación

1. Crear el archivo `memoryTypes.ts` en src/models
2. Implementar los componentes individuales:
   - MemoryCard.tsx
   - MemoryCapture.tsx  
   - MemoryCollection.tsx
3. Crear la página de memoria (memory.tsx)
4. Modificar el InnovationComponent.tsx existente

### 4.4 Pasos para depuración

Si persisten problemas con el botón de guardar, agregar este botón de prueba:

```tsx
// Botón de prueba para verificar la funcionalidad de guardar
<button 
  onClick={() => {
    const testMemory = {
      id: uuidv4(),
      title: "Prueba de guardado",
      content: "Esta es una entrada de prueba para verificar el guardado",
      tags: ["prueba", "test"],
      category: "interdisciplinary",
      dateCreated: new Date(),
      lastModified: new Date(),
      status: "draft"
    };
    setMemories(prev => [...prev, testMemory]);
    localStorage.setItem('oceanInsight_memories', JSON.stringify([...memories, testMemory]));
    console.log("Datos guardados en localStorage");
    setView('explore');
  }}
  className="ml-2 px-4 py-2 bg-green-600 text-white rounded-md"
>
  Guardar Prueba
</button>
```

## 5. Próximos Pasos

Una vez implementado el sistema básico, considera estas mejoras:

1. **Migrar a una base de datos** para persistencia robusta
2. **Implementar un sistema de búsqueda avanzada** con vectores de texto
3. **Añadir visualización de conexiones** entre ideas relacionadas
4. **Integrar con IA** para recibir sugerencias basadas en el conocimiento almacenado
5. **Exportación e importación** de colecciones de ideas

## 6. Prompt para generar imagen relacionada con el sistema

```
Hyperrealistic human brain whose folds form a miniature turquoise ocean with research vessels sailing through the grooves. From this ocean-brain, translucent thought clouds emerge connected by threads of golden light, each containing: 1) an oceanographic research ship, 2) scientific instruments like CTDs, current meters and smart buoys, 3) 3D data visualizations with colorful ocean current graphs, and 4) floating pages of scientific papers with equations. The entire composition is bathed in an ethereal cyan light beam from above, symbolizing knowledge transmission. Background: deep blue to turquoise gradient. Style: conceptual photorealism with scientific illustration elements.
```

Este prompt puede ser utilizado para generar una imagen representativa para el Sistema de Memoria.