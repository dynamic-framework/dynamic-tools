# Dynamic Framework Theme Builder

A professional Bootstrap 5 theme generator with real-time preview, designed for creating custom color schemes for fintech, AI startups, and modern web applications.

🌐 **Live Demo**: [themes.dynamicframework.dev](https://themes.dynamicframework.dev/)

## Features

- **Real-time Preview** - See your theme changes instantly as you customize
- **10+ Professional Presets** - Pre-designed themes for various industries
- **Bootstrap 5 Compatible** - Generates standard Bootstrap CSS variables
- **Export Options** - Copy to clipboard or download your custom CSS
- **No Build Required** - Pure HTML/CSS/JS, runs directly in browser
- **Surprise Me** - Random theme generator for inspiration
- **Live Components** - Preview themes on real Bootstrap components

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

1. **Choose a Preset** - Start with a professional theme template
2. **Customize Colors** - Adjust primary, secondary, and accent colors
3. **Preview Components** - See your theme applied to various UI elements
4. **Export Theme** - Copy CSS or download as a file

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

## Integration

### Basic Implementation
```html
<!-- Add generated CSS to your project -->
<link rel="stylesheet" href="path/to/your-theme.css">
```

### CSS Variables
The generator creates Bootstrap-compatible CSS variables:
```css
:root {
  --bs-primary: #your-color;
  --bs-secondary: #your-color;
  --bs-success: #your-color;
  /* ... more variables */
}
```

## Available Presets

- **Default** - Classic Bootstrap theme
- **Fintech Blue** - Professional financial services
- **AI Startup** - Modern tech aesthetic
- **Healthcare** - Medical and wellness
- **E-commerce** - Retail and shopping
- **Education** - Learning platforms
- **Real Estate** - Property and housing
- **Dark Mode** - Night-friendly theme
- **High Contrast** - Accessibility focused
- **Minimalist** - Clean and simple

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

All dependencies are loaded via CDN:
- Bootstrap 5.3.0
- Font Awesome 6.4.0
- Google Fonts (Inter)

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
