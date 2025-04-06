// src/components/innovation/MemoryCard.tsx
import React from 'react';
import { MemoryEntry } from 'src/components/models/memoryTypes';

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