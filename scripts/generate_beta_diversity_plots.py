import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from scipy.spatial.distance import pdist, squareform

def generate_synthetic_species_data(n_stations=10, n_species=30, n_depths=4):
    """
    Genera datos sintéticos de presencia/ausencia de especies para diferentes estaciones y profundidades.
    """
    # Probabilidades base de presencia para cada profundidad
    depth_probs = {
        0: 0.7,    # Mayor probabilidad en superficie
        50: 0.5,   # Probabilidad media
        100: 0.4,  # Probabilidad media-baja
        200: 0.3   # Menor probabilidad en profundidad
    }
    
    depths = [0, 50, 100, 200]
    data = []
    
    for depth in depths:
        base_prob = depth_probs[depth]
        
        # Añadir variación espacial
        for station in range(n_stations):
            # Crear gradiente costa-océano
            station_factor = 1 - (station / n_stations) * 0.3
            
            # Generar presencias/ausencias
            species_probs = base_prob * station_factor * np.random.beta(2, 2, n_species)
            presences = np.random.binomial(1, species_probs)
            
            data.append({
                'station': f'E{station+1}',
                'depth': depth,
                'species': presences
            })
    
    return data

def calculate_beta_indices(data):
    """
    Calcula índices de diversidad beta entre pares de estaciones para cada profundidad.
    """
    results = []
    depths = [0, 50, 100, 200]
    
    for depth in depths:
        depth_data = [d['species'] for d in data if d['depth'] == depth]
        stations = [d['station'] for d in data if d['depth'] == depth]
        
        # Calcular matrices de similitud
        n_stations = len(depth_data)
        
        for i in range(n_stations):
            for j in range(i+1, n_stations):
                sp1 = depth_data[i]
                sp2 = depth_data[j]
                
                # Calcular componentes
                a = sum(sp1)  # Especies en sitio 1
                b = sum(sp2)  # Especies en sitio 2
                j = sum(sp1 & sp2)  # Especies compartidas
                
                # Calcular índices
                whittaker = (a + b - 2*j) / ((a + b)/2)
                jaccard = j / (a + b - j) if (a + b - j) > 0 else 0
                sorensen = 2*j / (a + b) if (a + b) > 0 else 0
                
                results.append({
                    'depth': depth,
                    'station_pair': f'{stations[i]}-{stations[j]}',
                    'whittaker': whittaker,
                    'jaccard': jaccard,
                    'sorensen': sorensen
                })
    
    return pd.DataFrame(results)

def plot_beta_diversity_comparison(df):
    """
    Genera visualización de boxplots comparando índices beta entre profundidades.
    """
    plt.figure(figsize=(15, 10))
    
    # Configurar estilo
    plt.style.use('default')
    sns.set_style("whitegrid")
    colors = ['#2c7bb6', '#abd9e9', '#fdae61', '#d7191c']
    
    # Crear subplots
    fig, axes = plt.subplots(1, 3, figsize=(15, 6))
    fig.suptitle('Comparación de Índices de Diversidad Beta por Profundidad', 
                 fontsize=14, y=1.05)
    
    # Configurar boxplots
    indices = ['whittaker', 'jaccard', 'sorensen']
    titles = ['Índice de Whittaker', 'Índice de Jaccard', 'Índice de Sørensen']
    
    for idx, (ax, index, title) in enumerate(zip(axes, indices, titles)):
        sns.boxplot(data=df, x='depth', y=index, ax=ax, palette=colors)
        ax.set_title(title)
        ax.set_xlabel('Profundidad (m)')
        ax.set_ylabel('Valor del Índice')
        
        # Añadir puntos individuales
        sns.stripplot(data=df, x='depth', y=index, ax=ax, 
                     color='0.3', alpha=0.4, size=4, jitter=0.2)
    
    # Ajustar layout
    plt.tight_layout()
    
    # Guardar figura
    plt.savefig('public/images/diversidad/zooplankton/beta_diversity_comparison.png', 
                dpi=300, bbox_inches='tight')
    plt.close()

if __name__ == "__main__":
    # Generar datos sintéticos
    data = generate_synthetic_species_data()
    
    # Calcular índices beta
    df_beta = calculate_beta_indices(data)
    
    # Generar visualización
    plot_beta_diversity_comparison(df_beta) 