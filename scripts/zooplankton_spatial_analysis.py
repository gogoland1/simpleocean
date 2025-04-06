"""
Análisis Espacial de Diversidad de Zooplancton
----------------------------------------------
Este script genera visualizaciones de la distribución espacial de la diversidad
de zooplancton en la Bahía de Valparaíso, Chile, a diferentes profundidades.

Autor: Ocean Insight Team
Fecha: 20-03-2025
"""

import numpy as np
import matplotlib.pyplot as plt
from matplotlib.colors import LinearSegmentedColormap
import matplotlib.colors as mcolors
from scipy.interpolate import Rbf
import cartopy.crs as ccrs
import cartopy.feature as cfeature
from matplotlib.patches import Polygon
import matplotlib.patheffects as PathEffects
import os
from matplotlib.ticker import ScalarFormatter
from scipy import stats

# Crear directorio para guardar las imágenes si no existe
save_dir = 'public/images/diversidad/zooplankton'
os.makedirs(save_dir, exist_ok=True)

# Definir la región de la Bahía de Valparaíso (coordenadas aproximadas)
lon_min, lon_max = -71.7, -71.45
lat_min, lat_max = -33.1, -32.9

# Generar una cuadrícula para la interpolación
grid_size = 300  # Aumentado de 100 a 300 para mayor resolución
lon_grid, lat_grid = np.meshgrid(np.linspace(lon_min, lon_max, grid_size),
                                np.linspace(lat_min, lat_max, grid_size))

# Crear una máscara más precisa para la tierra
def create_land_mask(lon_grid, lat_grid):
    """
    Crea una máscara para la tierra en la Bahía de Valparaíso.
    Utiliza una aproximación más precisa de la línea de costa.
    """
    mask = np.ones_like(lon_grid)
    
    # Definir puntos de la línea de costa con más detalle
    coast_points = [
        (-71.7, -33.1),      # Punto sur
        (-71.65, -33.075),   # Punto intermedio sur
        (-71.62, -33.05),    # Curva bahía sur
        (-71.6, -33.03),     # Bahía Valparaíso
        (-71.58, -33.02),    # Puerto Valparaíso
        (-71.56, -33.0),     # Curva norte Valparaíso
        (-71.54, -32.97),    # Costa Viña
        (-71.52, -32.95),    # Viña del Mar
        (-71.5, -32.93),     # Curva norte Viña
        (-71.48, -32.91),    # Punto norte
        (-71.45, -32.9)      # Extremo norte
    ]
    
    # Crear una malla más densa para la máscara
    x = np.linspace(lon_min, lon_max, grid_size)
    y = np.linspace(lat_min, lat_max, grid_size)
    
    # Interpolar la línea de costa
    from scipy.interpolate import interp1d
    coast_x, coast_y = zip(*coast_points)
    f = interp1d(coast_y, coast_x, kind='cubic', fill_value='extrapolate')
    
    # Crear máscara basada en la línea de costa interpolada
    for i in range(grid_size):
        for j in range(grid_size):
            # Si el punto está a la derecha de la línea de costa interpolada
            # para esa latitud, es tierra
            coast_lon = f(lat_grid[i,j])
            if lon_grid[i,j] >= coast_lon:
                mask[i,j] = np.nan
    
    return mask

# Crear estaciones de muestreo en transectas
def create_sampling_stations():
    """
    Crea estaciones de muestreo en transectas perpendiculares a la costa,
    asegurando que todos los puntos estén en el océano.
    """
    # Definir puntos de la línea de costa
    coast_points = [
        (-71.7, -33.1),      # Punto sur
        (-71.65, -33.075),   # Punto intermedio sur
        (-71.62, -33.05),    # Curva bahía sur
        (-71.6, -33.03),     # Bahía Valparaíso
        (-71.58, -33.02),    # Puerto Valparaíso
        (-71.56, -33.0),     # Curva norte Valparaíso
        (-71.54, -32.97),    # Costa Viña
        (-71.52, -32.95),    # Viña del Mar
        (-71.5, -32.93),     # Curva norte Viña
        (-71.48, -32.91),    # Punto norte
        (-71.45, -32.9)      # Extremo norte
    ]
    
    # Interpolar la línea de costa
    coast_x, coast_y = zip(*coast_points)
    from scipy.interpolate import interp1d
    f = interp1d(coast_y, coast_x, kind='cubic', fill_value='extrapolate')
    
    # Generar estaciones
    lon_stations = []
    lat_stations = []
    
    # Crear transectas perpendiculares a la costa
    n_transects = 5  # Número de transectas
    stations_per_transect = 8  # Estaciones por transecta
    transect_lats = np.linspace(lat_min + 0.02, lat_max - 0.02, n_transects)
    
    for lat in transect_lats:
        # Encontrar el punto de la costa para esta latitud
        coast_lon = f(lat)
        
        # Crear estaciones desde un poco más afuera de la costa hacia el oeste
        station_lons = np.linspace(coast_lon - 0.03, lon_min + 0.02, stations_per_transect)
        station_lats = np.repeat(lat, stations_per_transect)
        
        # Añadir variación aleatoria controlada para evitar alineación perfecta
        np.random.seed(42)  # Para reproducibilidad
        station_lats += np.random.normal(0, 0.003, stations_per_transect)
        
        # Verificar cada punto contra la línea de costa
        for lon, lat_point in zip(station_lons, station_lats):
            # Solo incluir el punto si está suficientemente lejos de la costa
            if lon < f(lat_point) - 0.02:  # Margen de seguridad
                lon_stations.append(lon)
                lat_stations.append(lat_point)
    
    return np.array(lon_stations), np.array(lat_stations)

# Generar datos sintéticos de diversidad
def generate_diversity_data(depth, lon_stations=None, lat_stations=None):
    """
    Genera datos sintéticos de diversidad de zooplancton con patrones
    espaciales heterogéneos y realistas.
    """
    # Si no se proporcionan coordenadas, generarlas
    if lon_stations is None or lat_stations is None:
        lon_stations, lat_stations = create_sampling_stations()
    
    # Asegurar que las coordenadas sean arrays numpy
    lon_stations = np.array(lon_stations)
    lat_stations = np.array(lat_stations)
    
    # Verificar que las dimensiones coincidan
    if len(lon_stations) != len(lat_stations):
        raise ValueError("Las dimensiones de las coordenadas no coinciden")
    
    n_stations = len(lon_stations)
    np.random.seed(42 + depth)  # Semilla única para cada profundidad
    
    # Base de diversidad
    diversity_values = np.zeros(n_stations)
    
    # Calcular distancias relativas
    dist_to_coast = (lon_stations - lon_min) / (lon_max - lon_min)
    lat_rel = (lat_stations - lat_min) / (lat_max - lat_min)
    
    if depth == 0:  # Superficie
        # Efecto de la costa
        coast_effect = 1.5 * np.exp(-3 * dist_to_coast)
        
        # Surgencia y frentes
        upwelling = 1.2 * np.exp(-((lon_stations + 71.65)**2 + (lat_stations + 33.02)**2) / 0.002)
        front = 0.8 * np.tanh((lat_stations + 33.0) * 10)
        
        diversity_values = 2.0 + coast_effect + upwelling + front
        
    elif depth == 50:  # Media agua
        # Patrones de mezcla
        mixing = 0.8 * np.sin(lon_stations * 20 + lat_stations * 15)
        front = 0.6 * np.tanh((lon_stations + 71.6) * 8)
        
        diversity_values = 1.8 + mixing + front
        
    elif depth == 100:  # DCM
        # Centro del DCM
        dcm = 1.5 * np.exp(-((lon_stations + 71.6)**2 + (lat_stations + 33.0)**2) / 0.003)
        
        # Patrones subsuperficiales
        subsurface = 0.7 * np.sin(lon_stations * 15 + lat_stations * 10)
        
        diversity_values = 2.2 + dcm + subsurface
        
    else:  # 200m
        # Patrones profundos
        deep_pattern = 0.6 * np.sin(lon_stations * 12 + lat_stations * 8)
        gradient = 0.5 * dist_to_coast
        
        diversity_values = 1.5 + deep_pattern + gradient
    
    # Añadir variabilidad aleatoria
    noise = np.random.normal(0, 0.2, n_stations)
    diversity_values += noise
    
    # Asegurar valores positivos y dentro del rango
    return np.clip(diversity_values, 0.5, 4.0)

# Crear máscara de tierra
land_mask = create_land_mask(lon_grid, lat_grid)

# Función mejorada de interpolación
def interpolate_data(lon_stations, lat_stations, values, grid_lon, grid_lat):
    """
    Interpola datos puntuales a una malla regular usando una combinación de métodos
    para crear transiciones ultra suaves sin artefactos.
    """
    try:
        # Convertir a arrays numpy si no lo son
        lon_stations = np.array(lon_stations)
        lat_stations = np.array(lat_stations)
        values = np.array(values)
        
        # Verificar dimensiones
        if not (len(lon_stations) == len(lat_stations) == len(values)):
            raise ValueError("Dimensiones inconsistentes")
        
        # Crear grilla de alta resolución para interpolación inicial
        grid_density = 500  # Aumentar densidad para mejor suavizado
        temp_lon, temp_lat = np.meshgrid(
            np.linspace(lon_min, lon_max, grid_density),
            np.linspace(lat_min, lat_max, grid_density)
        )
        
        # Paso 1: Interpolación RBF inicial
        rbf = Rbf(lon_stations, lat_stations, values, 
                 function='multiquadric',
                 epsilon=0.005,  # Ajustar epsilon para control de suavizado
                 smooth=0.1)    # Añadir factor de suavizado
        z_rbf = rbf(temp_lon, temp_lat)
        
        # Paso 2: Suavizado gaussiano progresivo
        from scipy.ndimage import gaussian_filter
        
        # Aplicar múltiples pasadas de suavizado con diferentes escalas
        z_smooth = z_rbf.copy()
        sigmas = [1.5, 1.0, 0.7]  # Diferentes escalas de suavizado
        weights = [0.5, 0.3, 0.2]  # Pesos para cada escala
        
        z_final = np.zeros_like(z_smooth)
        for sigma, weight in zip(sigmas, weights):
            z_final += weight * gaussian_filter(z_smooth, sigma=sigma)
        
        # Paso 3: Interpolación final usando spline bicúbico
        from scipy.interpolate import RectBivariateSpline
        
        # Crear coordenadas para el spline
        x_temp = np.linspace(lon_min, lon_max, grid_density)
        y_temp = np.linspace(lat_min, lat_max, grid_density)
        
        # Ajustar el spline con parámetros de suavizado
        spline = RectBivariateSpline(y_temp, x_temp, z_final, 
                                    s=0.001,  # Factor de suavizado del spline
                                    kx=3, ky=3)  # Orden del spline
        
        # Evaluar el spline en la grilla final
        x_final = np.linspace(lon_min, lon_max, grid_lon.shape[1])
        y_final = np.linspace(lat_min, lat_max, grid_lon.shape[0])
        z_grid = spline(y_final, x_final)
        
        # Paso 4: Suavizado final muy sutil
        z_grid = gaussian_filter(z_grid, sigma=0.6)
        
        return z_grid
    
    except Exception as e:
        print(f"Error en interpolación: {str(e)}")
        try:
            # Método de respaldo más suave
            rbf = Rbf(lon_stations, lat_stations, values, 
                     function='multiquadric', 
                     epsilon=0.01,
                     smooth=0.1)
            return gaussian_filter(rbf(grid_lon, grid_lat), sigma=1.0)
        except:
            print("Error en interpolación de respaldo")
            return np.full_like(grid_lon, np.nanmean(values))

# Crear una paleta de colores similar a ODV para índices de diversidad
def create_odv_cmap():
    """
    Crea una paleta de colores similar a la utilizada en Ocean Data View (ODV)
    para visualizar índices de diversidad.
    """
    # Colores de ODV (azul-turquesa-verde-amarillo-rojo)
    colors = [(0.0, 'darkblue'),
              (0.2, 'blue'),
              (0.4, 'turquoise'),
              (0.6, 'green'),
              (0.8, 'yellow'),
              (1.0, 'red')]
    
    cmap_name = 'odv_diversity'
    cmap = LinearSegmentedColormap.from_list(cmap_name, colors)
    return cmap

# Crear una función para trazar el mapa con la línea de costa de Valparaíso
def plot_diversity_map(z_grid, depth, vmin=0, vmax=4):
    """
    Crea un mapa de la Bahía de Valparaíso mostrando la diversidad interpolada
    con la línea de costa y una paleta de colores tipo ODV.
    """
    # Crear figura con proyección y mayor resolución
    fig = plt.figure(figsize=(12, 10), dpi=300)
    ax = plt.axes(projection=ccrs.PlateCarree())
    
    # Añadir la costa y características geográficas
    ax.coastlines(resolution='10m', color='black', linewidth=1)
    ax.add_feature(cfeature.LAND, facecolor='lightgray', zorder=3)
    ax.add_feature(cfeature.OCEAN, facecolor='white')
    
    # Establecer los límites de la región
    ax.set_extent([lon_min, lon_max, lat_min, lat_max], crs=ccrs.PlateCarree())
    
    # Añadir coordenadas
    gl = ax.gridlines(draw_labels=True, linewidth=0.5, color='gray', alpha=0.5, linestyle='--')
    gl.top_labels = False
    gl.right_labels = False
    
    # Crear colormap ODV
    cmap = create_odv_cmap()
    
    # Plotear los datos interpolados con parámetros optimizados
    im = ax.pcolormesh(lon_grid, lat_grid, z_grid, 
                      cmap=cmap, 
                      vmin=vmin, vmax=vmax, 
                      transform=ccrs.PlateCarree(),
                      shading='gouraud',  # Suavizado gouraud
                      rasterized=True,    # Mejor renderizado
                      snap=True,          # Evitar artefactos
                      zorder=2)
    
    # Añadir las estaciones de muestreo con puntos más pequeños
    lon_stations, lat_stations = create_sampling_stations()
    ax.scatter(lon_stations, lat_stations, c='black', s=20, transform=ccrs.PlateCarree(),
              edgecolor='white', linewidth=0.5, alpha=0.7, marker='o', zorder=4)
    
    # Añadir barra de colores con más niveles
    cbar = plt.colorbar(im, ax=ax, shrink=0.8, pad=0.05, extend='both')
    cbar.set_label('Índice de Shannon (H\')', fontsize=12)
    
    # Añadir etiquetas de ubicaciones importantes con mejor posicionamiento
    txt = ax.text(-71.58, -33.03, 'Valparaíso', fontsize=12, 
                 color='black', transform=ccrs.PlateCarree(), zorder=5)
    txt.set_path_effects([PathEffects.withStroke(linewidth=3, foreground='white')])
    
    txt = ax.text(-71.52, -32.95, 'Viña del Mar', fontsize=12, 
                 color='black', transform=ccrs.PlateCarree(), zorder=5)
    txt.set_path_effects([PathEffects.withStroke(linewidth=3, foreground='white')])
    
    # Añadir título
    plt.title(f'Diversidad de Zooplancton a {depth}m de profundidad - Bahía de Valparaíso', 
             fontsize=14, pad=20)
    
    # Añadir información adicional
    ax.text(0.02, 0.02, 'Datos sintéticos para fines educativos', transform=ax.transAxes, 
           fontsize=8, color='gray', zorder=5)
    
    return fig, ax

# Generar y guardar mapas para cada profundidad
depths = [0, 50, 100, 200]

for depth in depths:
    # Generar datos de diversidad
    diversity_values = generate_diversity_data(depth)
    
    # Interpolar los valores
    lon_stations, lat_stations = create_sampling_stations()
    diversity_grid = interpolate_data(lon_stations, lat_stations, diversity_values, 
                                    lon_grid, lat_grid)
    
    # Aplicar máscara de tierra
    diversity_grid = diversity_grid * land_mask
    
    # Crear y guardar el mapa
    fig, ax = plot_diversity_map(diversity_grid, depth)
    
    # Guardar figura
    output_file = os.path.join(save_dir, f'zooplankton_diversity_{depth}m.png')
    plt.savefig(output_file, dpi=300, bbox_inches='tight')
    plt.close()
    
    print(f"Mapa guardado: {output_file}")

# Generar un mapa que muestre la variación vertical (diferencia entre 0m y 200m)
diversity_0m = generate_diversity_data(0)
diversity_200m = generate_diversity_data(200)
diversity_diff = diversity_0m - diversity_200m

diversity_diff_grid = interpolate_data(lon_stations, lat_stations, diversity_diff, 
                                    lon_grid, lat_grid)
diversity_diff_grid = diversity_diff_grid * land_mask

# Crear figura para la diferencia
fig = plt.figure(figsize=(10, 8))
ax = plt.axes(projection=ccrs.PlateCarree())

# Añadir la costa y características geográficas
ax.coastlines(resolution='10m', color='black', linewidth=1)
ax.add_feature(cfeature.LAND, facecolor='lightgray')
ax.add_feature(cfeature.OCEAN, facecolor='white')

# Establecer los límites de la región
ax.set_extent([lon_min, lon_max, lat_min, lat_max], crs=ccrs.PlateCarree())

# Añadir coordenadas
gl = ax.gridlines(draw_labels=True, linewidth=0.5, color='gray', alpha=0.5, linestyle='--')
gl.top_labels = False
gl.right_labels = False

# Crear un colormap divergente para diferencias
diff_cmap = plt.cm.RdBu_r

# Plotear los datos interpolados con el colormap divergente
im = ax.pcolormesh(lon_grid, lat_grid, diversity_diff_grid, cmap=diff_cmap, 
                  vmin=-2, vmax=2, transform=ccrs.PlateCarree(), 
                  shading='auto')

# Añadir barra de colores
cbar = plt.colorbar(im, ax=ax, shrink=0.8, pad=0.05)
cbar.set_label('Diferencia del Índice de Shannon (0m - 200m)', fontsize=12)

# Añadir título
plt.title('Gradiente Vertical de Diversidad de Zooplancton - Bahía de Valparaíso', fontsize=14)

# Guardar figura
output_file = os.path.join(save_dir, 'zooplankton_vertical_gradient.png')
plt.savefig(output_file, dpi=300, bbox_inches='tight')
plt.close()

print(f"Mapa de gradiente vertical guardado: {output_file}")

# Generar visualización de perfil vertical promedio
depths_profile = [0, 10, 20, 30, 50, 75, 100, 150, 200]
avg_diversity = []

for d in depths_profile:
    if d in [0, 50, 100, 200]:
        div_values = generate_diversity_data(d)
        avg_diversity.append(np.mean(div_values))
    else:
        # Interpolar para profundidades intermedias
        if d < 50:
            d0, d1 = 0, 50
            v0, v1 = np.mean(generate_diversity_data(0)), np.mean(generate_diversity_data(50))
        elif d < 100:
            d0, d1 = 50, 100
            v0, v1 = np.mean(generate_diversity_data(50)), np.mean(generate_diversity_data(100))
        else:
            d0, d1 = 100, 200
            v0, v1 = np.mean(generate_diversity_data(100)), np.mean(generate_diversity_data(200))
        
        # Interpolación lineal
        weight = (d - d0) / (d1 - d0)
        interpolated_value = v0 * (1 - weight) + v1 * weight
        
        # Añadir variabilidad
        interpolated_value += np.random.normal(0, 0.05)
        avg_diversity.append(interpolated_value)

# Crear gráfico de perfil vertical
fig, ax = plt.figure(figsize=(7, 10)), plt.axes()
ax.plot(avg_diversity, depths_profile, 'o-', linewidth=2, markersize=8, color='#0077b6')
ax.set_ylim(210, -10)  # Invertir el eje Y para mostrar 0m arriba
ax.set_xlim(0, 4)
ax.set_ylabel('Profundidad (m)', fontsize=14)
ax.set_xlabel('Índice de Shannon (H\')', fontsize=14)
ax.grid(True, linestyle='--', alpha=0.7)
plt.title('Perfil Vertical Promedio de Diversidad de Zooplancton', fontsize=16)

# Añadir anotaciones sobre las capas principales
ax.axhspan(0, 25, alpha=0.1, color='yellow', label='Capa Superficial')
ax.text(3.5, 12.5, 'Capa Superficial', fontsize=10, va='center')

ax.axhspan(25, 100, alpha=0.1, color='green', label='Capa Intermedia')
ax.text(3.5, 62.5, 'Capa Intermedia', fontsize=10, va='center')

ax.axhspan(100, 210, alpha=0.1, color='blue', label='Capa Profunda')
ax.text(3.5, 155, 'Capa Profunda', fontsize=10, va='center')

# Destacar la DCM
ax.axhline(y=100, color='red', linestyle='--', alpha=0.5)
ax.text(3.5, 100, 'DCM', fontsize=10, va='bottom', color='red')

# Guardar perfil vertical
output_file = os.path.join(save_dir, 'zooplankton_vertical_profile.png')
plt.savefig(output_file, dpi=300, bbox_inches='tight')
plt.close()

print(f"Perfil vertical guardado: {output_file}")

# Generar un gráfico resumen
fig, axes = plt.subplots(2, 2, figsize=(16, 14))
plt.subplots_adjust(wspace=0.3, hspace=0.3)

# Definir títulos y colores para cada profundidad
depth_titles = ['Superficie (0m)', 'Media agua (50m)', 'DCM (100m)', 'Profundidad (200m)']
depth_colors = ['#0077b6', '#00a8e8', '#4361ee', '#023e8a']

# Índices promedio para cada profundidad
avg_indices = [np.mean(generate_diversity_data(d)) for d in [0, 50, 100, 200]]
std_indices = [np.std(generate_diversity_data(d)) for d in [0, 50, 100, 200]]

# Gráfico de barras para diversidad promedio
axes[0, 0].bar([0, 1, 2, 3], avg_indices, yerr=std_indices, capsize=10, color=depth_colors, 
              alpha=0.7, edgecolor='black', linewidth=1.5)
axes[0, 0].set_ylabel('Índice de Shannon Promedio', fontsize=12)
axes[0, 0].set_xticks([0, 1, 2, 3])
axes[0, 0].set_xticklabels(depth_titles, rotation=45, ha='right')
axes[0, 0].set_ylim(0, 4)
axes[0, 0].set_title('Diversidad Promedio por Profundidad', fontsize=14)
axes[0, 0].grid(axis='y', linestyle='--', alpha=0.7)

# Gráfico de caja para distribución de valores
box_data = [generate_diversity_data(d) for d in [0, 50, 100, 200]]
axes[0, 1].boxplot(box_data, patch_artist=True, 
                  boxprops=dict(facecolor=depth_colors[0], alpha=0.7), 
                  medianprops=dict(color='darkred'))
axes[0, 1].set_ylabel('Índice de Shannon', fontsize=12)
axes[0, 1].set_xticklabels(depth_titles)
axes[0, 1].set_ylim(0, 4)
axes[0, 1].set_title('Distribución de Diversidad por Profundidad', fontsize=14)
axes[0, 1].grid(axis='y', linestyle='--', alpha=0.7)

# Perfil vertical (reutilizando datos anteriores)
axes[1, 0].plot(avg_diversity, depths_profile, 'o-', linewidth=2, markersize=8, color='#0077b6')
axes[1, 0].set_ylim(210, -10)  # Invertir el eje Y
axes[1, 0].set_xlim(0, 4)
axes[1, 0].set_ylabel('Profundidad (m)', fontsize=12)
axes[1, 0].set_xlabel('Índice de Shannon (H\')', fontsize=12)
axes[1, 0].grid(True, linestyle='--', alpha=0.7)
axes[1, 0].set_title('Perfil Vertical de Diversidad', fontsize=14)

# Gráfico de correlación entre diversidad y distancia a la costa
lon_stations, lat_stations = create_sampling_stations()
distance_to_coast = (lon_stations - lon_min) / (lon_max - lon_min)
diversity_0m = generate_diversity_data(0, lon_stations, lat_stations)
diversity_200m = generate_diversity_data(200, lon_stations, lat_stations)

axes[1, 1].scatter(distance_to_coast, diversity_0m, color=depth_colors[0], 
                  alpha=0.7, s=80, label='0m')
axes[1, 1].scatter(distance_to_coast, diversity_200m, color=depth_colors[3], 
                  alpha=0.7, s=80, label='200m')

# Ajuste lineal para cada conjunto
slope0, intercept0, r0, p0, std_err0 = stats.linregress(distance_to_coast, diversity_0m)
slope200, intercept200, r200, p200, std_err200 = stats.linregress(distance_to_coast, diversity_200m)

x_fit = np.linspace(0, 1, 100)
axes[1, 1].plot(x_fit, slope0*x_fit + intercept0, '--', color=depth_colors[0], 
               label=f'0m (r={r0:.2f})')
axes[1, 1].plot(x_fit, slope200*x_fit + intercept200, '--', color=depth_colors[3], 
               label=f'200m (r={r200:.2f})')

axes[1, 1].set_xlabel('Distancia Relativa desde la Costa (Oeste a Este)', fontsize=12)
axes[1, 1].set_ylabel('Índice de Shannon (H\')', fontsize=12)
axes[1, 1].set_title('Diversidad vs. Distancia a la Costa', fontsize=14)
axes[1, 1].grid(True, linestyle='--', alpha=0.7)
axes[1, 1].legend()

# Título general
plt.suptitle('Análisis de Diversidad Espacial de Zooplancton - Bahía de Valparaíso', 
             fontsize=18, y=0.98)

# Guardar figura resumen
output_file = os.path.join(save_dir, 'zooplankton_diversity_summary.png')
plt.savefig(output_file, dpi=300, bbox_inches='tight')
plt.close()

print(f"Resumen guardado: {output_file}")

print("¡Análisis espacial de zooplancton completado!") 