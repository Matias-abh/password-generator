# 🔐 Password Generator 
Hola! Este es un mini proyecto creado para practicar las bases de desarrollo web (HTML, CSS y JavaScript).
Es un generador de contraseñas personalizable que ayuda a los usuarios a crear claves seguras y mantener un registro de ellas.


## ✨ Funcionalidades

### Generador Principal

Permite generar contraseñas seguras ajustadas a las necesidades del usuario mediante diversos filtros de seguridad.
Puedes controlar exactamente cómo se construye tu contraseña:

*   **Longitud dinámica:** Configura el tamaño de la contraseña (de 4 a 32 caracteres).
*   **Mayúsculas (ABC):** Inclusión de caracteres alfabéticos en mayúscula.
*   **Minúsculas (abc):** Inclusión de caracteres alfabéticos en minúscula.
*   **Números (123):** Opción para añadir dígitos numéricos.
*   **Símbolos (!@#):** Soporte para caracteres especiales para máxima seguridad.

### Historial de Contraseñas
- **Registro local:** Las contraseñas generados se almacenan en el navegador del usuario.
- **Detalles completos:** La lista muestra el valor de la contraseña, su nivel de fortaleza y la fecha exacta de creación.
- **Gestión del historial:** Opción de copiar cualquier contraseña antigua o limpiar toda la lista con el botón de eliminar historial.

## 🛠️ Tecnologías utilizadas
- **HTML5:** Estructura de las vistas.
- **CSS3:** Estilizado de UI.
- **JavaScript (Vanilla):** Lógica de generación, cálculo de fortaleza, manejo del almacenamiento local, etc. con JavaScript puro.

### 🚀 Cómo funciona
El generador utiliza un algoritmo que:
1. Filtra los sets de caracteres basados en las opciones seleccionadas.
2. Valida que al menos una opción esté activa.
3. Genera una cadena aleatoria criptográficamente segura.


### 🚧 Estado
Práctica en desarrollo.

