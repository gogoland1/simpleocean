# Análisis de Diversidad Filogenética para Comunidades de Zooplancton usando Python

Este documento presenta un flujo de trabajo completo para analizar la diversidad filogenética (índices de Faith y Rao) en comunidades costeras de zooplancton utilizando secuencias de 18S rRNA en Python.

## 1. Preparación del Entorno

```bash
# Crear entorno conda para el análisis
conda create -n zoopl_phylo python=3.10
conda activate zoopl_phylo

# Instalar paquetes necesarios
pip install biopython pandas numpy scipy matplotlib seaborn dendropy ete3 scikit-bio
```

## 2. Obtención y Preparación de Secuencias 18S rRNA

```python
import pandas as pd
import numpy as np
from Bio import Entrez, SeqIO
import os

# Definir especies de zooplancton para el análisis
taxa = {
    "Copepodos": ["Calanus finmarchicus", "Acartia tonsa", "Oithona similis", "Temora longicornis", "Paracalanus parvus"],
    "Sifonoforos": ["Muggiaea atlantica", "Agalma elegans", "Nanomia bijuga"],
    "Hidromedusas": ["Aglantha digitale", "Clytia hemisphaerica", "Liriope tetraphylla"],
    "Krill": ["Euphausia superba", "Meganyctiphanes norvegica", "Thysanoessa raschii"],
    "Apendicularia": ["Oikopleura dioica", "Fritillaria borealis", "Appendicularia sicula"],
    "Otros": ["Sagitta elegans", "Limacina helicina", "Doliolum nationalis", "Salpa fusiformis"]
}

# Función para descargar secuencias 18S rRNA desde GenBank
def fetch_18S_sequences(species_list, email="tu_email@ejemplo.com"):
    Entrez.email = email
    all_sequences = []
    
    if not os.path.exists("secuencias"):
        os.mkdir("secuencias")
    
    for species in species_list:
        species_file = f"secuencias/{species.replace(' ', '_')}_18S.fasta"
        
        # Verificar si ya tenemos el archivo para evitar descargas repetidas
        if os.path.exists(species_file):
            sequences = list(SeqIO.parse(species_file, "fasta"))
            if sequences:
                all_sequences.append(sequences[0])
                continue
        
        # Búsqueda en GenBank
        query = f"{species}[Organism] AND (18S ribosomal RNA[Title] OR 18S rRNA[Title]) AND 350:2000[SLEN]"
        search_handle = Entrez.esearch(db="nucleotide", term=query, retmax=5)
        search_results = Entrez.read(search_handle)
        search_handle.close()
        
        if search_results["IdList"]:
            seq_id = search_results["IdList"][0]
            fetch_handle = Entrez.efetch(db="nucleotide", id=seq_id, rettype="fasta", retmode="text")
            sequence = next(SeqIO.parse(fetch_handle, "fasta"))
            fetch_handle.close()
            
            # Guardar secuencia
            sequence.id = species.replace(" ", "_")
            sequence.description = f"18S rRNA {species}"
            SeqIO.write(sequence, species_file, "fasta")
            all_sequences.append(sequence)
            print(f"Secuencia de {species} descargada exitosamente")
        else:
            print(f"No se encontraron secuencias 18S para {species}")
    
    # Combinar todas las secuencias en un solo archivo
    if all_sequences:
        SeqIO.write(all_sequences, "secuencias/all_18S_sequences.fasta", "fasta")
    
    return all_sequences

# Crear lista plana de todas las especies
all_species = [species for group in taxa.values() for species in group]

# Descargar secuencias
sequences = fetch_18S_sequences(all_species)
```

## 3. Alineamiento de Secuencias

```python
import subprocess

def align_sequences(input_file="secuencias/all_18S_sequences.fasta", output_file="alineamientos/aligned_18S.fasta"):
    # Crear directorio si no existe
    if not os.path.exists("alineamientos"):
        os.mkdir("alineamientos")
    
    # Ejecutar MAFFT para alineamiento
    cmd = f"mafft --auto --thread -1 {input_file} > {output_file}"
    
    print("Iniciando alineamiento con MAFFT...")
    subprocess.run(cmd, shell=True, check=True)
    print(f"Alineamiento completado y guardado en {output_file}")
    
    return output_file

aligned_file = align_sequences()
```

## 4. Construcción del Árbol Filogenético

```python
def build_phylogenetic_tree(aligned_file="alineamientos/aligned_18S.fasta", output_prefix="arboles/zooplankton_tree"):
    # Crear directorio si no existe
    if not os.path.exists("arboles"):
        os.mkdir("arboles")
    
    # Usar IQ-TREE para construir el árbol
    cmd = f"iqtree -s {aligned_file} -m GTR+G -bb 1000 -pre {output_prefix}"
    
    print("Iniciando construcción del árbol con IQ-TREE...")
    subprocess.run(cmd, shell=True, check=True)
    print(f"Árbol filogenético construido y guardado con prefijo {output_prefix}")
    
    return f"{output_prefix}.treefile"

tree_file = build_phylogenetic_tree()
```

## 5. Preparación de Datos de Abundancia/Ocurrencia

```python
# Ejemplo de matriz de comunidad (en un estudio real, cargarías datos de un archivo)
def create_sample_community_matrix(species_list):
    # Crear sitios de muestreo simulados
    sites = ["Sitio_A", "Sitio_B", "Sitio_C", "Sitio_D", "Sitio_E"]
    
    # Crear matriz con valores aleatorios para simular abundancias
    np.random.seed(42)  # Para reproducibilidad
    community_matrix = pd.DataFrame(
        np.random.negative_binomial(n=5, p=0.5, size=(len(sites), len(species_list))),
        index=sites,
        columns=[sp.replace(" ", "_") for sp in species_list]
    )
    
    # Guardar matriz
    if not os.path.exists("datos"):
        os.mkdir("datos")
    community_matrix.to_csv("datos/community_matrix.csv")
    
    return community_matrix

# Crear matriz de comunidad con especies para las que tenemos secuencias
species_with_sequences = [seq.id for seq in sequences]
community_matrix = create_sample_community_matrix(all_species)
print(community_matrix.head())
```

## 6. Cálculo de Diversidad Filogenética de Faith (PD)

```python
from skbio import TreeNode
from skbio.diversity import alpha_diversity

def calculate_faith_pd(tree_file, community_matrix):
    # Cargar árbol
    tree = TreeNode.read(tree_file, format="newick")
    
    # Asegurarse de que los nombres en el árbol coincidan con los de la matriz
    tree_tips = [tip.name for tip in tree.tips()]
    community_species = community_matrix.columns
    
    # Verificar coincidencia
    missing_species = set(community_species) - set(tree_tips)
    if missing_species:
        print(f"Advertencia: Especies en la matriz de comunidad no encontradas en el árbol: {missing_species}")
    
    # Filtrar matriz para incluir solo especies en el árbol
    filtered_matrix = community_matrix.loc[:, [sp for sp in community_species if sp in tree_tips]]
    
    # Convertir abundancias a presencia/ausencia (1/0)
    pa_matrix = (filtered_matrix > 0).astype(int)
    
    # Calcular PD de Faith para cada sitio
    faith_pd_values = {}
    for site in pa_matrix.index:
        site_diversity = alpha_diversity("faith_pd", pa_matrix.loc[site:site].values, otu_ids=filtered_matrix.columns, tree=tree)
        faith_pd_values[site] = site_diversity[0]
    
    faith_pd_df = pd.DataFrame.from_dict(faith_pd_values, orient='index', columns=['Faith_PD'])
    faith_pd_df.to_csv("resultados/faith_pd_values.csv")
    
    return faith_pd_df

# Ejecutar cálculo de PD de Faith
if not os.path.exists("resultados"):
    os.mkdir("resultados")
faith_pd_results = calculate_faith_pd(tree_file, community_matrix)
print(faith_pd_results)
```

## 7. Cálculo del Índice de Diversidad Filogenética de Rao

```python
from scipy.spatial.distance import squareform, pdist

def calculate_rao_index(tree_file, community_matrix):
    # Cargar árbol
    tree = TreeNode.read(tree_file, format="newick")
    
    # Obtener matriz de distancias filogenéticas
    tip_names = [tip.name for tip in tree.tips()]
    
    # Filtrar matriz para incluir solo especies en el árbol
    species_in_tree = [sp for sp in community_matrix.columns if sp in tip_names]
    filtered_matrix = community_matrix.loc[:, species_in_tree]
    
    # Calcular matriz de distancias cophenéticas (evolutivas)
    distances = {}
    for tip1 in tree.tips():
        for tip2 in tree.tips():
            if tip1.name in species_in_tree and tip2.name in species_in_tree:
                distances[(tip1.name, tip2.name)] = tip1.distance(tip2)
    
    # Convertir a matriz de distancias
    dist_matrix = pd.DataFrame(0, index=species_in_tree, columns=species_in_tree)
    for (sp1, sp2), dist in distances.items():
        dist_matrix.loc[sp1, sp2] = dist
        dist_matrix.loc[sp2, sp1] = dist
    
    # Calcular índice de Rao para cada sitio
    rao_values = {}
    for site in filtered_matrix.index:
        # Obtener abundancias relativas
        abundances = filtered_matrix.loc[site]
        total_abundance = abundances.sum()
        
        if total_abundance > 0:
            rel_abundances = abundances / total_abundance
            
            # Calcular Rao (cuádruple suma)
            rao_q = 0
            for i, sp1 in enumerate(species_in_tree):
                for j, sp2 in enumerate(species_in_tree):
                    rao_q += rel_abundances[sp1] * rel_abundances[sp2] * dist_matrix.loc[sp1, sp2]
            
            rao_values[site] = rao_q
        else:
            rao_values[site] = 0
    
    rao_df = pd.DataFrame.from_dict(rao_values, orient='index', columns=['Rao_Q'])
    rao_df.to_csv("resultados/rao_q_values.csv")
    
    return rao_df

# Ejecutar cálculo del índice de Rao
rao_results = calculate_rao_index(tree_file, community_matrix)
print(rao_results)
```

## 8. Visualización de Resultados

```python
import matplotlib.pyplot as plt
import seaborn as sns
from ete3 import Tree, TreeStyle, NodeStyle

def visualize_results(tree_file, faith_pd_results, rao_results, community_matrix):
    # Combinar resultados
    combined_results = pd.concat([faith_pd_results, rao_results], axis=1)
    combined_results.to_csv("resultados/combined_phylodiversity.csv")
    
    # 1. Gráfico de barras para comparar índices entre sitios
    plt.figure(figsize=(12, 6))
    
    # Normalizar valores para comparación
    normalized_results = combined_results.copy()
    normalized_results['Faith_PD'] = normalized_results['Faith_PD'] / normalized_results['Faith_PD'].max()
    normalized_results['Rao_Q'] = normalized_results['Rao_Q'] / normalized_results['Rao_Q'].max()
    
    # Gráfico
    normalized_results.plot(kind='bar', figsize=(10, 6))
    plt.title('Índices de Diversidad Filogenética Normalizados por Sitio')
    plt.ylabel('Valor Normalizado')
    plt.xlabel('Sitio de Muestreo')
    plt.tight_layout()
    plt.savefig("resultados/phylodiversity_comparison.png", dpi=300)
    
    # 2. Heatmap de la matriz de comunidad
    plt.figure(figsize=(14, 8))
    sns.heatmap(community_matrix, cmap='viridis', annot=False, cbar_kws={'label': 'Abundancia'})
    plt.title('Matriz de Abundancia de Zooplancton por Sitio')
    plt.ylabel('Sitio de Muestreo')
    plt.xlabel('Especies')
    plt.xticks(rotation=90)
    plt.tight_layout()
    plt.savefig("resultados/community_heatmap.png", dpi=300)
    
    # 3. Visualizar árbol filogenético
    t = Tree(tree_file)
    
    # Estilo del árbol
    ts = TreeStyle()
    ts.show_leaf_name = True
    ts.branch_vertical_margin = 10
    ts.scale = 20
    ts.title.add_face(TextFace("Árbol Filogenético de Zooplancton", fsize=20), column=0)
    
    # Guardar imagen del árbol
    t.render("resultados/phylogenetic_tree.png", w=800, tree_style=ts)
    
    # 4. Correlación entre Faith PD y Rao Q
    plt.figure(figsize=(8, 6))
    sns.scatterplot(x='Faith_PD', y='Rao_Q', data=combined_results)
    plt.title('Correlación entre Índices de Diversidad Filogenética')
    plt.xlabel('Faith PD')
    plt.ylabel('Rao Q')
    
    # Añadir línea de tendencia
    from scipy import stats
    slope, intercept, r_value, p_value, std_err = stats.linregress(combined_results['Faith_PD'], 
                                                                   combined_results['Rao_Q'])
    x = np.array([combined_results['Faith_PD'].min(), combined_results['Faith_PD'].max()])
    plt.plot(x, intercept + slope*x, 'r', 
             label=f'r = {r_value:.2f}, p = {p_value:.3f}')
    plt.legend()
    plt.tight_layout()
    plt.savefig("resultados/pd_rao_correlation.png", dpi=300)
    
    print("Visualizaciones guardadas en el directorio 'resultados'")

# Ejecutar visualizaciones
visualize_results(tree_file, faith_pd_results, rao_results, community_matrix)
```

## 9. Análisis e Interpretación

```python
def analyze_results(faith_pd_results, rao_results, community_matrix):
    # Combinar resultados
    combined_results = pd.concat([faith_pd_results, rao_results], axis=1)
    
    # Calcular riqueza de especies por sitio
    species_richness = (community_matrix > 0).sum(axis=1)
    combined_results['Species_Richness'] = species_richness
    
    # Calcular correlación entre riqueza y diversidad filogenética
    from scipy.stats import pearsonr
    
    faith_richness_corr = pearsonr(combined_results['Faith_PD'], combined_results['Species_Richness'])
    rao_richness_corr = pearsonr(combined_results['Rao_Q'], combined_results['Species_Richness'])
    
    print("\nCorrelación entre Faith PD y Riqueza de Especies:")
    print(f"r = {faith_richness_corr[0]:.3f}, p = {faith_richness_corr[1]:.3f}")
    
    print("\nCorrelación entre Rao Q y Riqueza de Especies:")
    print(f"r = {rao_richness_corr[0]:.3f}, p = {rao_richness_corr[1]:.3f}")
    
    # Identificar sitios con alta diversidad filogenética pero baja riqueza (indicador de linajes únicos)
    combined_results['Faith_PD_per_Species'] = combined_results['Faith_PD'] / combined_results['Species_Richness']
    combined_results['Rao_Q_per_Species'] = combined_results['Rao_Q'] / combined_results['Species_Richness']
    
    print("\nDiversidad Filogenética por Especie (indicador de unicidad evolutiva):")
    print(combined_results[['Faith_PD_per_Species', 'Rao_Q_per_Species']].sort_values(by='Faith_PD_per_Species', ascending=False))
    
    # Guardar resultados completos
    combined_results.to_csv("resultados/full_analysis.csv")
    
    # Crear reporte de resumen
    with open("resultados/resumen_analisis.txt", "w") as f:
        f.write("RESUMEN DE ANÁLISIS DE DIVERSIDAD FILOGENÉTICA\n")
        f.write("=============================================\n\n")
        
        f.write("Estadísticas Descriptivas:\n")
        f.write(f"- Rango de PD de Faith: {combined_results['Faith_PD'].min():.2f} - {combined_results['Faith_PD'].max():.2f}\n")
        f.write(f"- Promedio de PD de Faith: {combined_results['Faith_PD'].mean():.2f}\n")
        f.write(f"- Rango de Rao Q: {combined_results['Rao_Q'].min():.2f} - {combined_results['Rao_Q'].max():.2f}\n")
        f.write(f"- Promedio de Rao Q: {combined_results['Rao_Q'].mean():.2f}\n\n")
        
        f.write("Correlaciones:\n")
        f.write(f"- Faith PD vs. Riqueza: r = {faith_richness_corr[0]:.3f}, p = {faith_richness_corr[1]:.3f}\n")
        f.write(f"- Rao Q vs. Riqueza: r = {rao_richness_corr[0]:.3f}, p = {rao_richness_corr[1]:.3f}\n\n")
        
        f.write("Sitios con Mayor Diversidad Filogenética:\n")
        top_faith = combined_results.sort_values(by='Faith_PD', ascending=False).head(2)
        for idx, row in top_faith.iterrows():
            f.write(f"- {idx}: Faith PD = {row['Faith_PD']:.2f}, Riqueza = {row['Species_Richness']}\n")
        
        f.write("\nSitios con Mayor Diversidad Filogenética por Especie (uniqueness):\n")
        top_unique = combined_results.sort_values(by='Faith_PD_per_Species', ascending=False).head(2)
        for idx, row in top_unique.iterrows():
            f.write(f"- {idx}: Faith PD/Sp = {row['Faith_PD_per_Species']:.2f}\n")
    
    print("\nAnálisis completo guardado en 'resultados/full_analysis.csv'")
    print("Resumen de análisis guardado en 'resultados/resumen_analisis.txt'")

# Ejecutar análisis
analyze_results(faith_pd_results, rao_results, community_matrix)
```

## 10. Análisis de Diversidad Gamma Regional

```python
def calculate_gamma_diversity(faith_pd_results, rao_results, community_matrix, tree_file):
    # Para diversidad gamma, necesitamos considerar todas las muestras juntas como una sola comunidad regional
    
    # 1. Enfoque de agregación: Combinar todas las muestras
    regional_community = community_matrix.sum(axis=0)
    
    # 2. Calcular PD de Faith para la comunidad regional
    tree = TreeNode.read(tree_file, format="newick")
    regional_pa = (regional_community > 0).astype(int)
    
    # Asegurar que los nombres coincidan con el árbol
    tree_tips = [tip.name for tip in tree.tips()]
    species_in_tree = [sp for sp in regional_community.index if sp in tree_tips]
    regional_pa_filtered = regional_pa.loc[species_in_tree]
    
    # Faith PD regional
    regional_faith_pd = alpha_diversity("faith_pd", regional_pa_filtered.values.reshape(1, -1), 
                                        otu_ids=regional_pa_filtered.index, tree=tree)[0]
    
    # 3. Calcular índice de Rao para la comunidad regional
    # Obtener abundancias relativas
    regional_abundance = regional_community.loc[species_in_tree]
    total_abundance = regional_abundance.sum()
    regional_rel_abundance = regional_abundance / total_abundance
    
    # Obtener distancias filogenéticas
    distances = {}
    for tip1 in tree.tips():
        for tip2 in tree.tips():
            if tip1.name in species_in_tree and tip2.name in species_in_tree:
                distances[(tip1.name, tip2.name)] = tip1.distance(tip2)
    
    dist_matrix = pd.DataFrame(0, index=species_in_tree, columns=species_in_tree)
    for (sp1, sp2), dist in distances.items():
        dist_matrix.loc[sp1, sp2] = dist
        dist_matrix.loc[sp2, sp1] = dist
    
    # Calcular Rao regional
    regional_rao_q = 0
    for i, sp1 in enumerate(species_in_tree):
        for j, sp2 in enumerate(species_in_tree):
            regional_rao_q += regional_rel_abundance[sp1] * regional_rel_abundance[sp2] * dist_matrix.loc[sp1, sp2]
    
    # 4. Calcular índices de diversidad beta
    # Promedio de diversidad alpha local
    mean_alpha_faith_pd = faith_pd_results['Faith_PD'].mean()
    mean_alpha_rao_q = rao_results['Rao_Q'].mean()
    
    # Calcular beta como gamma/alpha (enfoque multiplicativo)
    beta_faith_pd = regional_faith_pd / mean_alpha_faith_pd
    beta_rao_q = regional_rao_q / mean_alpha_rao_q
    
    # 5. Guardar resultados
    gamma_results = {
        "Alpha_Faith_PD_Mean": mean_alpha_faith_pd,
        "Gamma_Faith_PD": regional_faith_pd,
        "Beta_Faith_PD": beta_faith_pd,
        "Alpha_Rao_Q_Mean": mean_alpha_rao_q,
        "Gamma_Rao_Q": regional_rao_q,
        "Beta_Rao_Q": beta_rao_q
    }
    
    gamma_df = pd.DataFrame.from_dict(gamma_results, orient='index', columns=['Value'])
    gamma_df.to_csv("resultados/gamma_diversity.csv")
    
    print("\nDiversidad Gamma Regional:")
    print(gamma_df)
    
    # 6. Crear visualización
    plt.figure(figsize=(10, 6))
    plt.bar(['Alpha', 'Beta', 'Gamma'], 
            [mean_alpha_faith_pd, beta_faith_pd, regional_faith_pd],
            color=['blue', 'green', 'red'])
    plt.title('Partición de Diversidad Filogenética (Faith PD)')
    plt.ylabel('Valor de PD')
    plt.savefig("resultados/gamma_diversity_partition.png", dpi=300)
    
    return gamma_df

# Ejecutar análisis de diversidad gamma
gamma_diversity = calculate_gamma_diversity(faith_pd_results, rao_results, community_matrix, tree_file)
```

## 11. Conclusiones e Interpretación Ecológica

Los resultados obtenidos nos permiten extraer conclusiones importantes sobre la estructura filogenética de las comunidades de zooplancton:

1. **Diversidad alfa y gamma**:
   - Los sitios con mayor PD de Faith indican comunidades con mayor historia evolutiva representada
   - El índice de Rao proporciona información sobre la divergencia evolutiva entre especies

2. **Patrones espaciales**:
   - La variación en PD entre sitios puede indicar diferentes presiones selectivas
   - Sitios con alta PD pero baja riqueza pueden albergar linajes únicos y ser prioritarios para conservación

3. **Estructura comunitaria**:
   - La correlación entre riqueza y PD revela si las comunidades están compuestas por especies cercanamente emparentadas (clustering filogenético) o distantes (sobredispersión)
   - La divergencia entre PD y riqueza puede indicar procesos ecológicos específicos como filtrado ambiental o exclusión competitiva

4. **Diversidad beta filogenética**:
   - Alta beta diversidad filogenética sugiere recambio de linajes entre sitios
   - Baja beta diversidad filogenética indica redundancia funcional entre sitios

5. **Implicaciones para conservación**:
   - Sitios con máxima diversidad filogenética representan prioridades de conservación
   - La preservación de sitios con linajes únicos es crucial para mantener la diversidad evolutiva regional

## 12. Consideraciones Adicionales

- **Calibración temporal**: Para una interpretación más precisa, se recomienda calibrar el árbol filogenético con fósiles o tasas de mutación conocidas
- **Incertidumbre filogenética**: Considerar la generación de árboles filogenéticos por bootstrapping para evaluar robustez
- **Rasgos funcionales**: Combinar este análisis con datos de rasgos funcionales para una visión más completa
- **Variables ambientales**: Correlacionar los índices de diversidad filogenética con variables ambientales para identificar factores determinantes
- **Dinámica temporal**: Repetir el análisis en diferentes temporadas para evaluar patrones estacionales