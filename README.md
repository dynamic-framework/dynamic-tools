# Bootstrap Customizer - Dynamic Tools

Una herramienta web interactiva para personalizar variables de Bootstrap con selectores de color y controles intuitivos.

## Características

- 🎨 **Color Pickers Interactivos**: Personaliza los colores del tema de Bootstrap (Primary, Secondary, Success, Warning, Danger, Info)
- 📝 **Controles de Tipografía**: Ajusta la familia de fuentes y tamaño base
- 🔲 **Configuración de Bordes**: Modifica el radio de borde con controles deslizantes
- 👀 **Vista Previa en Tiempo Real**: Ve los cambios aplicados instantáneamente en componentes de Bootstrap
- 📋 **Copiar CSS**: Copia fácilmente el CSS generado al portapapeles
- 💾 **Descargar CSS**: Descarga el archivo CSS personalizado
- 🔄 **Restablecer**: Vuelve a los valores predeterminados de Bootstrap

## Uso

1. Abre `index.html` en tu navegador web
2. Usa los controles en la barra lateral izquierda para personalizar:
   - **Colores del Tema**: Usa los color pickers o introduce valores hexadecimales
   - **Tipografía**: Selecciona familia de fuentes y ajusta el tamaño
   - **Bordes**: Modifica el radio de borde con el deslizante
3. Observa los cambios en tiempo real en la vista previa
4. Copia o descarga el CSS generado cuando estés satisfecho con el resultado

## Instalación y Desarrollo

### Ejecutar localmente

```bash
# Clona el repositorio
git clone https://github.com/dynamic-framework/dynamic-tools.git
cd dynamic-tools

# Inicia un servidor HTTP local
python3 -m http.server 8000
# o
python -m SimpleHTTPServer 8000

# Abre http://localhost:8000 en tu navegador
```

### Estructura del Proyecto

```
dynamic-tools/
├── index.html          # Página principal de la aplicación
├── style.css           # Estilos personalizados
├── script.js           # Lógica de la aplicación
├── package.json        # Metadatos del proyecto
└── README.md           # Este archivo
```

## Tecnologías Utilizadas

- **HTML5**: Estructura de la aplicación
- **CSS3**: Estilos personalizados y diseño responsivo
- **JavaScript ES6+**: Lógica de la aplicación y manipulación del DOM
- **Bootstrap 5.3**: Framework CSS base y componentes de vista previa

## Variables de Bootstrap Soportadas

### Colores del Tema
- `--bs-primary`
- `--bs-secondary`
- `--bs-success`
- `--bs-warning`
- `--bs-danger`
- `--bs-info`

### Tipografía
- `--bs-font-sans-serif`
- `--bs-body-font-size`

### Bordes
- `--bs-border-radius`

## Uso del CSS Generado

El CSS generado puede ser usado de varias maneras:

### 1. Archivo CSS Personalizado
Copia el CSS y guárdalo como `custom-bootstrap.css`:

```css
:root {
  --bs-primary: #ff6b35;
  --bs-secondary: #6c757d;
  /* ... más variables */
}
```

Luego inclúyelo después de Bootstrap:

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="custom-bootstrap.css" rel="stylesheet">
```

### 2. Variables CSS en tu Stylesheet
Usa las variables generadas en tu CSS personalizado:

```css
.mi-elemento {
  background-color: var(--bs-primary);
  border-radius: var(--bs-border-radius);
  font-family: var(--bs-font-sans-serif);
}
```

## Compatibilidad

- ✅ Chrome/Chromium 88+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Edge 88+

## Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.

## Contacto

Dynamic Framework - [@dynamic-framework](https://github.com/dynamic-framework)

Link del Proyecto: [https://github.com/dynamic-framework/dynamic-tools](https://github.com/dynamic-framework/dynamic-tools)
