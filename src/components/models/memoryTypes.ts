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