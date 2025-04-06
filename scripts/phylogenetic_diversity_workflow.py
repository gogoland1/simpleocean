import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import networkx as nx
from Bio import Phylo
from io import StringIO
import os

# Configuración de visualización
sns.set_style("whitegrid")
os.makedirs('public/images/diversidad', exist_ok=True)

class ZooplanktonDiversityAnalysis:
    def __init__(self):
        self.taxa = {
            "Copepodos": [
                "Acartia tonsa",
                "Calanus chilensis",
                "Paracalanus parvus",
                "Centropages brachiatus"
            ],
            "Eufausidos": [
                "Euphausia mucronata",
                "Stylocheiron affine",
                "Nematoscelis megalops"
            ],
            "Quetognatos": [
                "Sagitta enflata",
                "Pterosagitta draco"
            ],
            "Sifonoforos": [
                "Muggiaea atlantica",
                "Diphyes dispar"
            ]
        }
        
        self.zones = ["Costera", "Transición", "Oceánica"]
        self.traits = ["Tamaño", "Movilidad", "Estrategia_alimentación", "Reproducción"]
        
        self.generate_data()
        
    def generate_data(self):
        """Genera datos sintéticos para las diferentes métricas de diversidad."""
        np.random.seed(42)
        
        # Datos de abundancia por zona
        all_species = [sp for group in self.taxa.values() for sp in group]
        abundance_data = []
        
        for zone in self.zones:
            abundances = np.random.gamma(2, 2, size=len(all_species))
            abundance_data.append({
                'zone': zone,
                **dict(zip(all_species, abundances))
            })
        
        self.abundance_df = pd.DataFrame(abundance_data)
        
        # Matriz de distancias filogenéticas
        n_species = len(all_species)
        self.phylo_distances = np.random.gamma(2, 0.5, (n_species, n_species))
        self.phylo_distances = (self.phylo_distances + self.phylo_distances.T) / 2
        np.fill_diagonal(self.phylo_distances, 0)
        
        # Datos de rasgos funcionales
        self.trait_data = pd.DataFrame({
            'species': all_species,
            'Tamaño': np.random.uniform(0.5, 5, n_species),
            'Movilidad': np.random.choice(['Baja', 'Media', 'Alta'], n_species),
            'Estrategia_alimentación': np.random.choice(['Herbívoro', 'Carnívoro', 'Omnívoro'], n_species),
            'Reproducción': np.random.choice(['Sexual', 'Asexual', 'Mixta'], n_species)
        })

    def plot_taxonomic_diversity(self):
        """Crea un diagrama circular de diversidad taxonómica."""
        plt.figure(figsize=(10, 10))
        
        # Preparar datos para el gráfico circular
        group_sizes = [len(species) for species in self.taxa.values()]
        group_colors = plt.cm.Set3(np.linspace(0, 1, len(self.taxa)))
        
        # Crear gráfico circular
        plt.pie(group_sizes, labels=self.taxa.keys(), colors=group_colors,
                autopct='%1.1f%%', startangle=90)
        plt.title('Diversidad Taxonómica del Zooplancton')
        
        plt.savefig('public/images/diversidad/taxonomic_diversity.png', bbox_inches='tight')
        plt.close()

    def plot_phylogenetic_tree(self):
        """Crea una visualización del árbol filogenético."""
        plt.figure(figsize=(12, 8))
        
        # Crear un árbol simple para visualización
        G = nx.Graph()
        
        # Añadir nodos por grupo taxonómico
        colors = []
        labels = {}
        pos = {}
        y_pos = 0
        
        for i, (group, species) in enumerate(self.taxa.items()):
            # Añadir nodo de grupo
            G.add_node(group)
            colors.append('lightgray')
            pos[group] = (0, y_pos)
            
            # Añadir especies
            for j, sp in enumerate(species):
                G.add_node(sp)
                G.add_edge(group, sp)
                colors.append(f'C{i}')
                pos[sp] = (1, y_pos + j/(len(species)-1 if len(species) > 1 else 1))
            
            y_pos += 2
        
        # Dibujar el árbol
        nx.draw(G, pos=pos, node_color=colors, with_labels=True, 
                node_size=1000, font_size=8)
        plt.title('Diversidad Filogenética del Zooplancton')
        
        plt.savefig('public/images/diversidad/phylogenetic_tree.png', bbox_inches='tight')
        plt.close()

    def plot_functional_network(self):
        """Crea una red de diversidad funcional."""
        plt.figure(figsize=(12, 12))
        
        # Crear grafo para la red funcional
        G = nx.Graph()
        
        # Añadir nodos (especies)
        for species in self.trait_data['species']:
            G.add_node(species)
        
        # Añadir conexiones basadas en similitud de rasgos
        for i, sp1 in enumerate(self.trait_data['species']):
            traits1 = self.trait_data.iloc[i]
            for j, sp2 in enumerate(self.trait_data['species'][i+1:], i+1):
                traits2 = self.trait_data.iloc[j]
                # Calcular similitud simple
                similarity = sum(traits1[trait] == traits2[trait] 
                               for trait in self.traits) / len(self.traits)
                if similarity > 0.5:  # Solo conectar especies similares
                    G.add_edge(sp1, sp2, weight=similarity)
        
        # Dibujar la red
        pos = nx.spring_layout(G)
        nx.draw(G, pos, with_labels=True, node_color='lightblue',
                node_size=1000, font_size=8)
        plt.title('Red de Diversidad Funcional del Zooplancton')
        
        plt.savefig('public/images/diversidad/functional_network.png', bbox_inches='tight')
        plt.close()

    def plot_zone_dissimilarity(self):
        """Crea un diagrama de disimilitud entre zonas biogeográficas."""
        plt.figure(figsize=(10, 5))
        
        # Calcular matriz de disimilitud entre zonas
        abundance_matrix = self.abundance_df.drop('zone', axis=1).values
        dissimilarity = np.zeros((len(self.zones), len(self.zones)))
        
        for i in range(len(self.zones)):
            for j in range(len(self.zones)):
                # Calcular índice de Bray-Curtis
                sum_min = np.minimum(abundance_matrix[i], abundance_matrix[j]).sum()
                sum_total = abundance_matrix[i].sum() + abundance_matrix[j].sum()
                dissimilarity[i,j] = 1 - (2 * sum_min / sum_total)
        
        # Crear mapa de calor de disimilitud
        sns.heatmap(dissimilarity, xticklabels=self.zones, yticklabels=self.zones,
                    cmap='YlOrRd', annot=True, fmt='.2f')
        plt.title('Disimilitud entre Zonas')
        
        plt.savefig('public/images/diversidad/zone_dissimilarity.png', bbox_inches='tight')
        plt.close()

    def create_all_visualizations(self):
        """Genera todas las visualizaciones."""
        print("Generando visualización de diversidad taxonómica...")
        self.plot_taxonomic_diversity()
        
        print("Generando visualización de diversidad filogenética...")
        self.plot_phylogenetic_tree()
        
        print("Generando visualización de diversidad funcional...")
        self.plot_functional_network()
        
        print("Generando visualización de disimilitud entre zonas...")
        self.plot_zone_dissimilarity()

if __name__ == "__main__":
    print("Iniciando análisis de diversidad del zooplancton...")
    analysis = ZooplanktonDiversityAnalysis()
    
    print("Creando visualizaciones...")
    analysis.create_all_visualizations()
    
    print("Análisis completado.") 