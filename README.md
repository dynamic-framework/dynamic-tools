# 🧰 Dynamic Tools - Herramientas de Desarrollo UI

Colección completa de herramientas de desarrollo UI que incluye un showcase de componentes reutilizables y un customizador de Bootstrap, construido con React y Vite.

![Component Showcase](https://github.com/user-attachments/assets/a360021b-dc7b-4dc1-9b6a-e305d3d59b86)

## 🚀 Herramientas Incluidas

### 🎨 Bootstrap Customizer
Herramienta interactiva para personalizar variables de Bootstrap con selectores de color y controles intuitivos.

**Características:**
- **Color Pickers Interactivos**: Personaliza los colores del tema de Bootstrap (Primary, Secondary, Success, Warning, Danger, Info)
- **Controles de Tipografía**: Ajusta la familia de fuentes y tamaño base  
- **Configuración de Bordes**: Modifica el radio de borde con controles deslizantes
- **Vista Previa en Tiempo Real**: Ve los cambios aplicados instantáneamente en componentes de Bootstrap
- **Copiar CSS**: Copia fácilmente el CSS generado al portapapeles
- **Descargar CSS**: Descarga el archivo CSS personalizado
- **Restablecer**: Vuelve a los valores predeterminados de Bootstrap

### 🧩 Showcase de Componentes UI
Biblioteca de componentes UI reutilizables para aplicaciones web modernas.

**Componentes Incluidos:**

### 🔘 Botones
- **Variantes**: Primario, Secundario, Éxito, Peligro, Advertencia
- **Tamaños**: Pequeño, Mediano, Grande
- **Estados**: Normal, Deshabilitado
- **Props personalizables**: variant, size, disabled, onClick

### 🃏 Tarjetas
- **Variantes**: Básica, Elevada, Compacta, Outlined
- **Soporte para**: Títulos, subtítulos, imágenes, contenido personalizado
- **Efectos**: Hover con transformación y sombras

### 📝 Inputs
- **Tipos**: Texto, Email, Contraseña
- **Variantes**: Default, Outlined, Filled
- **Tamaños**: Pequeño, Mediano, Grande
- **Estados**: Normal, Error, Deshabilitado
- **Características**: Labels, mensajes de error, texto de ayuda

### ⬇️ Dropdowns
- **Funcionalidad completa**: Click outside para cerrar, navegación con teclado
- **Estados**: Normal, Error, Deshabilitado
- **Tamaños personalizables**
- **Opciones dinámicas** con labels y valores

### 📑 Tabs
- **Variantes**: Default, Pills, Minimal
- **Características**: Iconos, badges, tabs deshabilitados
- **Soporte para**: Contenido personalizado, navegación con teclado
- **Responsive**: Scroll horizontal en dispositivos móviles

## 📱 Estructura de la Aplicación

La aplicación utiliza un sistema de tabs que permite acceder a todas las herramientas:

- **🎨 Bootstrap Customizer**: Personalización de variables CSS de Bootstrap
- **🔘 Botones**: Showcase de componentes de botones con múltiples variantes
- **🃏 Tarjetas**: Ejemplos de componentes de tarjetas con diferentes estilos
- **📝 Inputs**: Campos de entrada con validación y estados
- **⬇️ Dropdowns**: Menús desplegables con funcionalidad completa
- **🧩 Más Componentes**: Tabs anidados y combinaciones de componentes

## 🛠️ Tecnologías

- **React 19** - Biblioteca de componentes UI
- **Vite** - Build tool y dev server
- **CSS3** - Estilos modernos con variables CSS
- **ESLint** - Linting y calidad de código

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/dynamic-framework/dynamic-tools.git

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build
```

## 🎯 Uso

### Bootstrap Customizer

La herramienta de personalización de Bootstrap permite:

1. **Ajustar Colores**: Usa los color pickers para modificar los colores del tema de Bootstrap
2. **Modificar Tipografía**: Cambia la familia de fuentes y el tamaño base
3. **Personalizar Bordes**: Ajusta el radio de borde con controles deslizantes
4. **Vista Previa en Tiempo Real**: Observa los cambios instantáneamente en componentes de ejemplo
5. **Exportar CSS**: Copia o descarga el CSS generado para usar en tus proyectos

### Componentes UI Showcase

La biblioteca de componentes incluye ejemplos listos para usar:

### Ejemplo: Button
```jsx
import Button from './components/Button';

// Botón básico
<Button variant="primary" size="medium" onClick={handleClick}>
  Click me!
</Button>

// Botón deshabilitado
<Button variant="secondary" disabled>
  Disabled
</Button>
```

### Ejemplo: Card
```jsx
import Card from './components/Card';

<Card 
  title="Mi Tarjeta" 
  subtitle="Descripción de la tarjeta"
  image="https://example.com/image.jpg"
  variant="elevated"
>
  <p>Contenido de la tarjeta...</p>
  <Button size="small">Acción</Button>
</Card>
```

### Ejemplo: Input
```jsx
import Input from './components/Input';

<Input
  label="Email"
  type="email"
  placeholder="tu@email.com"
  variant="outlined"
  required
  error={errors.email}
  helperText="Ingresa un email válido"
/>
```

### Ejemplo: Dropdown
```jsx
import Dropdown from './components/Dropdown';

const options = [
  { value: 'mx', label: 'México' },
  { value: 'us', label: 'Estados Unidos' }
];

<Dropdown
  label="País"
  options={options}
  value={selectedCountry}
  onChange={setSelectedCountry}
  placeholder="Selecciona un país"
/>
```

### Ejemplo: Tabs
```jsx
import Tabs from './components/Tabs';

const tabs = [
  {
    label: 'Tab 1',
    icon: '🏠',
    content: <div>Contenido del tab 1</div>
  },
  {
    label: 'Tab 2',
    badge: '3',
    content: <div>Contenido del tab 2</div>
  }
];

<Tabs tabs={tabs} defaultTab={0} variant="pills" />
```

## 🎯 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Construcción para producción
npm run preview  # Vista previa de la build
npm run lint     # Verificar calidad del código
```

## 📱 Responsive Design

Todos los componentes están diseñados para ser completamente responsive:

- **Desktop**: Layout completo con todas las características
- **Tablet**: Adaptación de grids y espaciados
- **Mobile**: Stack vertical y navegación optimizada

## 🎨 Personalización

### Variables CSS
Los componentes utilizan variables CSS que puedes personalizar:

```css
:root {
  --primary-color: #646cff;
  --success-color: #22c55e;
  --danger-color: #ef4444;
  --warning-color: #f59e0b;
  /* ... más variables */
}
```

### Temas
Cada componente acepta props de `className` para personalizaciones adicionales.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙋‍♂️ Soporte

¿Tienes preguntas o necesitas ayuda? 

- Crea un [Issue](https://github.com/dynamic-framework/dynamic-tools/issues)
- Contacta al equipo de Dynamic Framework

---

⭐ **¡Dale una estrella si este proyecto te fue útil!** ⭐
