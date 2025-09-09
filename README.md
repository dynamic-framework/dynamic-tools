# Dynamic Framework Theme Builder

A professional theme generator and manager for Dynamic Framework applications, with real-time preview of Dynamic React components and Bootstrap elements. Create, manage, and export custom themes for fintech, AI startups, and modern web applications powered by Dynamic Framework.

🌐 **Live Demo**: [themes.dynamicframework.dev](https://themes.dynamicframework.dev/)

## Features

- **Dynamic Framework Integration** - Build themes specifically for Dynamic Framework applications
- **React Component Preview** - Live preview of Dynamic React components with your custom theme
- **Real-time Updates** - See theme changes instantly across all components
- **10+ Professional Presets** - Pre-designed themes for various industries
- **Dynamic & Bootstrap Compatible** - Generates CSS variables for both Dynamic Framework and Bootstrap 5
- **Export Options** - Copy to clipboard or download your custom theme
- **No Build Required** - Pure HTML/CSS/JS, runs directly in browser
- **Surprise Me** - Random theme generator for inspiration

## Quick Start

### Option 1: Direct Browser Access
Simply open `index.html` in your browser

### Option 2: Local Server
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server
```

Then visit `http://localhost:8000`

## Usage

1. **Choose a Preset** - Start with a professional theme template optimized for Dynamic Framework
2. **Customize Colors** - Adjust primary, secondary, and accent colors for your brand
3. **Preview Components** - View your theme on:
   - Dynamic React components (React Preview tab)
   - Bootstrap UI elements
   - Real-world application layouts
4. **Export Theme** - Copy CSS or download as a file ready for Dynamic Framework integration

## Project Structure

```
dynamic-tools/
├── index.html                 # Main application
├── assets/
│   ├── js/
│   │   ├── theme-generator.js # Core theme logic
│   │   └── surprise-me.js     # Random theme generator
│   └── css/
│       └── styles.css          # Custom styles
└── test-dynamic-theme.html    # Theme testing page
```

## Integration with Dynamic Framework

### Basic Implementation
```html
<!-- Add generated theme to your Dynamic Framework project -->
<link rel="stylesheet" href="path/to/your-dynamic-theme.css">
```

### CSS Variables
The generator creates Dynamic Framework and Bootstrap-compatible CSS variables:
```css
:root {
  /* Dynamic Framework variables */
  --dynamic-primary: #your-color;
  --dynamic-secondary: #your-color;
  --dynamic-accent: #your-color;
  
  /* Bootstrap variables */
  --bs-primary: #your-color;
  --bs-secondary: #your-color;
  --bs-success: #your-color;
  /* ... more variables */
}
```

### Using in Dynamic React Components
The generated themes work seamlessly with Dynamic Framework's React component library, automatically applying your custom colors to all Dynamic components.

## Available Presets

Professionally designed themes optimized for Dynamic Framework applications:

- **Default** - Classic Dynamic Framework theme
- **Fintech Blue** - Professional financial services and banking
- **AI Startup** - Modern tech and artificial intelligence platforms
- **Healthcare** - Medical and wellness applications
- **E-commerce** - Retail and shopping experiences
- **Education** - Learning management systems
- **Real Estate** - Property and housing platforms
- **Dark Mode** - Night-friendly professional theme
- **High Contrast** - Accessibility-focused design
- **Minimalist** - Clean and simple interface

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

All dependencies are loaded via CDN:
- Dynamic Framework React Components
- Bootstrap 5.3.0
- Font Awesome 6.4.0
- Google Fonts (Inter)
- React & ReactDOM (for component preview)

## Deployment

The project automatically deploys to GitHub Pages when changes are pushed to the main branch.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is part of the Dynamic Framework ecosystem. For licensing information, please contact the Dynamic Framework team.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

Built with ❤️ by [Dynamic Framework](https://dynamicframework.dev)
