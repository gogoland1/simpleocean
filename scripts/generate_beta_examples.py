import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from scipy.spatial.distance import pdist, squareform

def generate_amp_comparison_data():
    """
    Genera datos sintéticos para comparar la diversidad beta dentro y fuera de AMPs.
    """
    np.random.seed(42)
    
    # Simular datos de presencia/ausencia para 20 especies en 6 sitios (3 AMP, 3 no-AMP)
    n_species = 20
    n_sites = 6
    
    # Mayor probabilidad de presencia en AMPs
    amp_prob = 0.7
    no_amp_prob = 0.4
    
    # Generar matrices de presencia/ausencia
    amp_data = np.random.binomial(1, amp_prob, (3, n_species))
    no_amp_data = np.random.binomial(1, no_amp_prob, (3, n_species))
    
    # Combinar datos
    all_data = np.vstack([amp_data, no_amp_data])
    
    # Calcular índices beta para cada par de sitios
    sites = ['AMP1', 'AMP2', 'AMP3', 'No-AMP1', 'No-AMP2', 'No-AMP3']
    comparisons = []
    
    for i in range(n_sites):
        for j in range(i+1, n_sites):
            # Calcular componentes
            shared = np.sum(all_data[i] & all_data[j])
            total_i = np.sum(all_data[i])
            total_j = np.sum(all_data[j])
            
            # Calcular índices
            whittaker = (total_i + total_j - 2*shared) / ((total_i + total_j)/2)
            jaccard = shared / (total_i + total_j - shared) if (total_i + total_j - shared) > 0 else 0
            sorensen = 2*shared / (total_i + total_j) if (total_i + total_j) > 0 else 0
            
            # Determinar tipo de comparación
            if i < 3 and j < 3:
                comparison_type = 'Entre AMPs'
            elif i >= 3 and j >= 3:
                comparison_type = 'Entre No-AMPs'
            else:
                comparison_type = 'AMP vs No-AMP'
            
            comparisons.append({
                'site1': sites[i],
                'site2': sites[j],
                'comparison_type': comparison_type,
                'whittaker': whittaker,
                'jaccard': jaccard,
                'sorensen': sorensen
            })
    
    return pd.DataFrame(comparisons)

def plot_individual_beta_diversity_amp(df, index_name):
    """
    Genera visualización individual para un índice de diversidad beta.
    """
    plt.figure(figsize=(12, 8))
    sns.set_style("whitegrid")
    
    # Colores para cada tipo de comparación
    colors = {
        'Entre AMPs': '#2ecc71',
        'Entre No-AMPs': '#e74c3c',
        'AMP vs No-AMP': '#3498db'
    }
    
    # Crear boxplot
    ax = plt.gca()
    sns.boxplot(data=df, x='comparison_type', y=index_name,
                palette=[colors[t] for t in df['comparison_type'].unique()])
    
    # Añadir puntos individuales
    sns.stripplot(data=df, x='comparison_type', y=index_name,
                 color='0.3', alpha=0.4, size=6, jitter=0.2)
    
    # Configurar etiquetas y título
    plt.title(f'Comparación del Índice de {index_name.capitalize()} en Áreas Marinas Protegidas',
             fontsize=14, pad=20)
    plt.xlabel('Tipo de Comparación', fontsize=12)
    plt.ylabel('Valor del Índice', fontsize=12)
    plt.xticks(rotation=45)
    
    # Ajustar layout
    plt.tight_layout()
    
    # Guardar figura
    plt.savefig(f'public/images/diversidad/beta_diversity_{index_name}_amp.png',
                dpi=300, bbox_inches='tight')
    plt.close()

def generate_temporal_comparison_individual(index_name):
    """
    Genera visualización temporal individual para un índice con patrones únicos.
    """
    np.random.seed(42 + hash(index_name) % 1000)  # Semilla única para cada índice
    
    years = np.arange(2019, 2024)
    seasons = ['Verano', 'Otoño', 'Invierno', 'Primavera']
    
    # Patrones específicos para cada índice
    patterns = {
        'whittaker': {
            'trend': 0.08,  # Tendencia más suave para evitar que se salga del rango
            'seasonal': {
                'Verano': 0.15,    # Reducido para mantener dentro del rango
                'Otoño': 0.05,
                'Invierno': -0.1,  # Menor diversidad en invierno
                'Primavera': 0.0
            },
            'noise': 0.03,
            'base': 0.35  # Valor base más bajo para compensar efectos
        },
        'jaccard': {
            'trend': 0.04,  # Tendencia más suave
            'seasonal': {
                'Verano': 0.08,
                'Otoño': 0.12,    # Pico en otoño
                'Invierno': 0.03,
                'Primavera': -0.08  # Menor similitud en primavera
            },
            'noise': 0.02,
            'base': 0.55
        },
        'sorensen': {
            'trend': -0.03,  # Tendencia decreciente más suave
            'seasonal': {
                'Verano': -0.05,   # Efecto reducido para evitar pérdida de datos
                'Otoño': 0.12,     # Mayor similitud en otoño
                'Invierno': 0.05,
                'Primavera': 0.08
            },
            'noise': 0.02,
            'base': 0.75          # Base más alta para compensar la tendencia decreciente
        }
    }
    
    pattern = patterns[index_name]
    data = []
    
    for year in years:
        for season in seasons:
            # Calcular valor base con tendencia temporal
            year_effect = (year - 2019) * pattern['trend']
            base_value = pattern['base'] + year_effect
            
            # Añadir efecto estacional
            seasonal_effect = pattern['seasonal'][season]
            
            # Añadir ruido aleatorio
            noise = np.random.normal(0, pattern['noise'])
            
            # Combinar efectos y asegurar valores entre 0 y 1
            value = base_value + seasonal_effect + noise
            value = np.clip(value, 0, 1)
            
            data.append({
                'year': year,
                'season': season,
                'value': value
            })
    
    df = pd.DataFrame(data)
    
    # Crear visualización
    plt.figure(figsize=(12, 8))
    sns.set_style("whitegrid")
    
    # Colores específicos para cada estación
    colors = {
        'Verano': '#f39c12',    # Naranja cálido
        'Otoño': '#c0392b',     # Rojo otoñal
        'Invierno': '#2980b9',  # Azul frío
        'Primavera': '#27ae60'  # Verde primaveral
    }
    
    # Añadir líneas y puntos
    for season in seasons:
        season_data = df[df['season'] == season]
        plt.plot(season_data['year'], season_data['value'],
                marker='o', label=season, color=colors[season],
                linewidth=2.5, markersize=8)
    
    # Personalizar título según el índice
    titles = {
        'whittaker': 'Cambios Temporales en Diversidad Beta (Whittaker)\nMayor variabilidad en verano, menor diversidad en invierno',
        'jaccard': 'Similitud Temporal entre Comunidades (Jaccard)\nPicos de similitud en otoño',
        'sorensen': 'Evolución de la Similitud entre Comunidades (Sørensen)\nTendencia decreciente con recuperación estacional'
    }
    
    plt.title(titles[index_name], fontsize=14, pad=20)
    plt.xlabel('Año', fontsize=12)
    plt.ylabel('Valor del Índice', fontsize=12)
    plt.legend(title='Estación', bbox_to_anchor=(1.05, 1), loc='upper left', fontsize=10)
    plt.grid(True, alpha=0.3)
    
    # Ajustar límites del eje y según el índice con más margen
    if index_name == 'whittaker':
        plt.ylim(0.15, 0.85)  # Ampliado para mostrar todo el rango
    elif index_name == 'jaccard':
        plt.ylim(0.35, 0.95)  # Ajustado para mostrar todo el rango
    else:  # sorensen
        plt.ylim(0.4, 0.95)   # Ajustado para mostrar todo el rango de Sørensen
    
    plt.tight_layout()
    plt.savefig(f'public/images/diversidad/beta_diversity_{index_name}_temporal.png',
                dpi=300, bbox_inches='tight')
    plt.close()

if __name__ == "__main__":
    # Generar datos y visualizaciones para comparación de AMPs
    df_amp = generate_amp_comparison_data()
    
    # Generar visualizaciones individuales para cada índice
    indices = ['whittaker', 'jaccard', 'sorensen']
    for index in indices:
        plot_individual_beta_diversity_amp(df_amp, index)
        generate_temporal_comparison_individual(index) 