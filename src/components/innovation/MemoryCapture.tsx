// src/components/innovation/MemoryCapture.tsx
import React, { useState } from 'react';
import { MemoryEntry, OceanCategory } from 'src/components/models/memoryTypes';
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
      // Mostrar error de validación si es necesario
      return;
    }
    
    const completeEntry = {
      ...entry,
      lastModified: new Date(),
    } as MemoryEntry;
    
    onSave(completeEntry);
    
    // Resetear el formulario para una nueva entrada
    if (!initialEntry) {
      setEntry({
        id: uuidv4(),
        title: '',
        content: '',
        tags: [],
        category: 'interdisciplinary',
        status: 'draft',
        dateCreated: new Date(),
        lastModified: new Date(),
      });
    }
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