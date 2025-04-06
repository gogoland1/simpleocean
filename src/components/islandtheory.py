import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import RadioButtons

# Configuración básica
fig, ax = plt.subplots(figsize=(12, 8))
fig.subplots_adjust(left=0.25)

# Parámetros
S_max = 100  # Máximo de especies en pool continental
S_values = np.linspace(0, S_max, 1000)
dist_factor = 0.5
area_factor = 2.0

# Funciones del modelo clásico
def classic_immigration(S):
    return max(0, (S_max - S) * np.exp(-dist_factor))

def classic_extinction(S):
    return S * np.exp(-area_factor)

# Funciones con efectos no lineales
def nonlinear_immigration_founder(S):
    # Efecto fundador: tasa reducida para pequeñas S por dificultad de establecimiento
    if S < 10:
        return max(0, (S_max - S) * np.exp(-dist_factor) * 0.3)
    else:
        return max(0, (S_max - S) * np.exp(-dist_factor))

def nonlinear_extinction_cascade(S):
    # Extinción en cascada: aumentos abruptos a ciertos umbrales
    base_rate = S * np.exp(-area_factor)
    if S > 60:
        return base_rate * 2  # Extinción acelerada por competencia a alta densidad
    return base_rate

def nonlinear_extinction_allee(S):
    # Efecto Allee: extinción muy alta a bajas densidades
    base_rate = S * np.exp(-area_factor)
    if S < 15:
        return base_rate * 3 + 1  # Extinción acelerada por efecto Allee
    return base_rate

def nonlinear_immigration_facilitation(S):
    # Facilitación: algunas especies facilitan el establecimiento de otras
    base_rate = max(0, (S_max - S) * np.exp(-dist_factor))
    if 20 < S < 50:
        return base_rate * 1.5  # Fase de facilitación
    return base_rate

# Calcular curvas del modelo clásico
classic_imm = [classic_immigration(s) for s in S_values]
classic_ext = [classic_extinction(s) for s in S_values]

# Encontrar equilibrio clásico
classic_eq_idx = np.argmin(np.abs(np.array(classic_imm) - np.array(classic_ext)))
classic_eq_S = S_values[classic_eq_idx]

# Crear líneas de ploteo
imm_line, = ax.plot(S_values, classic_imm, 'b-', label='Inmigración')
ext_line, = ax.plot(S_values, classic_ext, 'r-', label='Extinción')
eq_point, = ax.plot([classic_eq_S], [classic_imm[classic_eq_idx]], 'ko', markersize=8)

# Configurar gráfico
ax.set_xlim(0, S_max)
ax.set_ylim(0, 50)
ax.set_xlabel('Número de Especies (S)')
ax.set_ylabel('Tasa')
ax.set_title('Modelos de Biogeografía de Islas: Clásico vs. No Lineal')
ax.legend()
ax.grid(True)

# Líneas de referencia
eq_vline = ax.axvline(x=classic_eq_S, color='gray', linestyle='--')
eq_text = ax.text(classic_eq_S + 2, classic_imm[classic_eq_idx] + 1, 
                  f'Equilibrio: {classic_eq_S:.1f} especies', fontsize=10)

# Opciones de modelos
model_options = [
    ('Modelo Clásico', (classic_immigration, classic_extinction)),
    ('Efecto Fundador', (nonlinear_immigration_founder, classic_extinction)),
    ('Extinción en Cascada', (classic_immigration, nonlinear_extinction_cascade)),
    ('Efecto Allee', (classic_immigration, nonlinear_extinction_allee)),
    ('Facilitación', (nonlinear_immigration_facilitation, classic_extinction))
]

# Botones de radio para seleccionar modelo
rax = plt.axes([0.05, 0.5, 0.15, 0.3])
radio = RadioButtons(rax, [opt[0] for opt in model_options])

# Descripción del modelo actual
desc_ax = plt.axes([0.05, 0.1, 0.15, 0.3])
desc_ax.axis('off')
model_desc = desc_ax.text(0, 0.9, 
                        "Modelo Clásico:\nPropuesto por MacArthur\ny Wilson (1967).\nPredice equilibrio\nbasado en balance\nentre inmigración\ny extinción.", 
                        fontsize=9, 
                        verticalalignment='top')

# Descripciones de modelos
model_descriptions = {
    'Modelo Clásico': "Modelo Clásico:\nPropuesto por MacArthur\ny Wilson (1967).\nPredice equilibrio\nbasado en balance\nentre inmigración\ny extinción.",
    'Efecto Fundador': "Efecto Fundador:\nColonización dificultada\npara primeras especies\npor falta de diversidad\ngenética y ausencia\nde facilitadores.",
    'Extinción en Cascada': "Extinción en Cascada:\nA altas densidades,\nla extinción se acelera\npor competencia y\nefectos en cadena cuando\nse pierden especies clave.",
    'Efecto Allee': "Efecto Allee:\nPoblaciones pequeñas\nsufren tasas de extinción\ndesproporcionadamente\naltas por falta de\nparejas, polinizadores, etc.",
    'Facilitación': "Facilitación:\nAlgunas especies mejoran\nlas condiciones para otras,\nacelerando la inmigración\nen fases intermedias\nde colonización."
}

# Función de actualización al cambiar modelo
def update_model(label):
    # Obtener funciones del modelo seleccionado
    for name, funcs in model_options:
        if name == label:
            imm_func, ext_func = funcs
            break
    
    # Actualizar curvas
    imm_values = [imm_func(s) for s in S_values]
    ext_values = [ext_func(s) for s in S_values]
    
    imm_line.set_ydata(imm_values)
    ext_line.set_ydata(ext_values)
    
    # Encontrar nuevo equilibrio
    eq_idx = np.argmin(np.abs(np.array(imm_values) - np.array(ext_values)))
    eq_S = S_values[eq_idx]
    
    # Actualizar punto y líneas de equilibrio
    eq_point.set_data([eq_S], [imm_values[eq_idx]])
    eq_vline.set_xdata([eq_S, eq_S])
    eq_text.set_position((eq_S + 2, imm_values[eq_idx] + 1))
    eq_text.set_text(f'Equilibrio: {eq_S:.1f} especies')
    
    # Actualizar descripción
    model_desc.set_text(model_descriptions[label])
    
    fig.canvas.draw_idle()

# Conectar radio buttons a función de actualización
radio.on_clicked(update_model)

plt.show()