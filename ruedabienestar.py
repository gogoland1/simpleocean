import matplotlib.pyplot as plt
import numpy as np
import matplotlib.patches as patches

def crear_rueda_bienestar():
    # Configuración inicial
    plt.figure(figsize=(12, 12))
    ax = plt.subplot(111, aspect='equal')

    # Colores para cada sección (siguiendo los colores de la imagen original)
    colores = [
        '#F2D13D',  # Intelectual - amarillo
        '#B3D335',  # Carrera - verde claro
        '#4CB848',  # Físico - verde
        '#26B7B9',  # Social - turquesa
        '#9A3A98',  # Propósito - púrpura
        '#662D91',  # Emocional - morado
        '#ED1C24',  # Ambiental - rojo
        '#F7941D'   # Financiero - naranja
    ]

    # Títulos y descripciones (traducidos al español)
    secciones = [
        ('INTELECTUAL', 'Reconocer habilidades\ncreativas y encontrar\nformas de expandir\nconocimientos y\nhabilidades'),
        ('CARRERA', 'Crear satisfacción\npersonal y\nenriquecimiento a\npartir del trabajo\npropio'),
        ('FÍSICO', 'Reconocer la\nnecesidad de actividad\nfísica, alimentación\nsaludable y sueño'),
        ('SOCIAL', 'Desarrollar un sentido\nde conexión,\npertenencia y un\nsistema de apoyo\nbien desarrollado'),
        ('PROPÓSITO', 'Expandir el sentido\nde propósito y\nsignificado en\nla vida'),
        ('EMOCIONAL', 'Afrontar eficazmente\nla vida y crear\nrelaciones\nsatisfactorias'),
        ('AMBIENTAL', 'Ocupar entornos\nagradables y\nestimulantes que\napoyan el bienestar'),
        ('FINANCIERO', 'Sentirse satisfecho\ncon la situación\nfinanciera actual\ny futura')
    ]

    # Parámetros para la rueda
    num_secciones = len(secciones)
    angulo_seccion = 360.0 / num_secciones
    radio_externo = 5
    radio_interno = 1.8

    # Crear las secciones de la rueda
    for i in range(num_secciones):
        angulo_inicio = i * angulo_seccion
        angulo_fin = (i + 1) * angulo_seccion
        
        # Crear la cuña (wedge)
        wedge = patches.Wedge(
            (0, 0), 
            radio_externo, 
            angulo_inicio, 
            angulo_fin, 
            width=radio_externo-radio_interno,
            facecolor=colores[i],
            edgecolor='white',
            linewidth=2
        )
        ax.add_patch(wedge)
        
        # Calcular posición para texto del título
        angulo_medio = np.radians((angulo_inicio + angulo_fin) / 2)
        x_titulo = (radio_externo - 0.7) * np.cos(angulo_medio)
        y_titulo = (radio_externo - 0.7) * np.sin(angulo_medio)
        
        # Agregar título
        plt.text(
            x_titulo, y_titulo, 
            secciones[i][0], 
            ha='center', 
            va='center', 
            fontsize=12,
            fontweight='bold',
            color='white'
        )
        
        # Calcular posición para descripción
        x_desc = (radio_externo - 2.2) * np.cos(angulo_medio)
        y_desc = (radio_externo - 2.2) * np.sin(angulo_medio)
        
        # Agregar descripción
        plt.text(
            x_desc, y_desc, 
            secciones[i][1], 
            ha='center', 
            va='center', 
            fontsize=8,
            color='white',
            linespacing=1.3
        )

    # Crear círculo central
    circulo_central = patches.Circle((0, 0), radio_interno, facecolor='white', edgecolor='#CCCCCC', linewidth=2)
    ax.add_patch(circulo_central)

    # Agregar texto central
    plt.text(0, 0.3, "TU", ha='center', va='center', fontsize=16, fontweight='bold')
    plt.text(0, -0.3, "BIENESTAR", ha='center', va='center', fontsize=16, fontweight='bold')

    # Agregar flechas circulares alrededor del círculo central (opcional)
    for i in range(num_secciones):
        angulo = np.radians(i * angulo_seccion + angulo_seccion / 2)
        x_arrow = radio_interno * np.cos(angulo)
        y_arrow = radio_interno * np.sin(angulo)
        dx = 0.2 * np.cos(angulo + np.pi/2)
        dy = 0.2 * np.sin(angulo + np.pi/2)
        
        arrow = patches.Arrow(
            x_arrow, y_arrow, 
            dx, dy, 
            width=0.3,
            color=colores[i]
        )
        ax.add_patch(arrow)

    # Configurar los ejes
    plt.axis('off')
    plt.xlim(-radio_externo-0.5, radio_externo+0.5)
    plt.ylim(-radio_externo-0.5, radio_externo+0.5)

    # Guardar y mostrar
    plt.tight_layout()
    plt.savefig('rueda_bienestar_es.png', dpi=300, bbox_inches='tight')
    plt.show()

# Ejecutar la función para crear la rueda
if __name__ == "__main__":
    crear_rueda_bienestar()