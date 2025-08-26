/**
 * Dynamic Framework Variables Extractor
 * Fetches and parses CSS variables from Dynamic Framework CSS
 */

class DynamicVariablesExtractor {
    constructor() {
        this.cssUrl = 'https://cdn.dynamicframework.dev/assets/1.36.2/ui-react/css/dynamic-ui-root.css';
        this.variables = {
            baseColors: {},
            colorScales: {},
            surfaceColors: {},
            softColors: {},
            spacing: {},
            components: {},
            typography: {},
            borders: {},
            shadows: {},
            other: {}
        };
    }

    async fetchAndParse() {
        try {
            const response = await fetch(this.cssUrl);
            const cssText = await response.text();
            
            // Extract all CSS variables
            const rootRegex = /:root\s*{([^}]*)}/g;
            let match;
            const allVariables = {};
            
            while ((match = rootRegex.exec(cssText)) !== null) {
                const content = match[1];
                const varRegex = /--(bs-[^:]+):\s*([^;]+);/g;
                let varMatch;
                
                while ((varMatch = varRegex.exec(content)) !== null) {
                    const varName = varMatch[1].trim();
                    const varValue = varMatch[2].trim();
                    allVariables[varName] = varValue;
                }
            }
            
            // Also extract variables from any other selectors
            const varRegex = /--(bs-[^:]+):\s*([^;]+);/g;
            let varMatch;
            
            while ((varMatch = varRegex.exec(cssText)) !== null) {
                const varName = varMatch[1].trim();
                const varValue = varMatch[2].trim();
                allVariables[varName] = varValue;
            }
            
            this.categorizeVariables(allVariables);
            return this.variables;
        } catch (error) {
            console.error('Error fetching Dynamic CSS:', error);
            throw error;
        }
    }

    categorizeVariables(allVariables) {
        Object.entries(allVariables).forEach(([name, value]) => {
            // Base colors (without scales)
            if (name.match(/^bs-(primary|secondary|success|info|warning|danger|light|dark|gray)(-rgb)?$/)) {
                this.variables.baseColors[name] = value;
            }
            // Color scales (25, 50, 100-900)
            else if (name.match(/^bs-(primary|secondary|success|info|warning|danger|light|dark|gray)-(25|50|[1-9]00)(-rgb)?$/)) {
                this.variables.colorScales[name] = value;
            }
            // Surface colors
            else if (name.includes('surface-')) {
                this.variables.surfaceColors[name] = value;
            }
            // Soft colors
            else if (name.includes('-soft')) {
                this.variables.softColors[name] = value;
            }
            // Extended spacing
            else if (name.includes('ref-spacer-')) {
                this.variables.spacing[name] = value;
            }
            // Component variables
            else if (name.match(/^bs-(btn|accordion|modal|card|nav|dropdown|form|input|table|list|badge|alert|toast|offcanvas|pagination|breadcrumb|progress|spinner|tooltip|popover)-/)) {
                this.variables.components[name] = value;
            }
            // Typography
            else if (name.match(/^bs-(fs|fw|lh|font|text|heading|display|body)-/)) {
                this.variables.typography[name] = value;
            }
            // Borders
            else if (name.includes('border') || name.includes('radius')) {
                this.variables.borders[name] = value;
            }
            // Shadows
            else if (name.includes('shadow')) {
                this.variables.shadows[name] = value;
            }
            // Other
            else {
                this.variables.other[name] = value;
            }
        });
    }

    generateColorScale(baseColor, colorName) {
        // Convert hex to RGB
        const hex2rgb = (hex) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        };

        // Convert RGB to HSL
        const rgb2hsl = (r, g, b) => {
            r /= 255;
            g /= 255;
            b /= 255;
            
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;

            if (max === min) {
                h = s = 0;
            } else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                
                switch (max) {
                    case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                    case g: h = ((b - r) / d + 2) / 6; break;
                    case b: h = ((r - g) / d + 4) / 6; break;
                }
            }

            return { h: h * 360, s: s * 100, l: l * 100 };
        };

        // Convert HSL to RGB
        const hsl2rgb = (h, s, l) => {
            h /= 360;
            s /= 100;
            l /= 100;

            let r, g, b;

            if (s === 0) {
                r = g = b = l;
            } else {
                const hue2rgb = (p, q, t) => {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1/6) return p + (q - p) * 6 * t;
                    if (t < 1/2) return q;
                    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                    return p;
                };

                const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                const p = 2 * l - q;
                
                r = hue2rgb(p, q, h + 1/3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1/3);
            }

            return {
                r: Math.round(r * 255),
                g: Math.round(g * 255),
                b: Math.round(b * 255)
            };
        };

        const rgb = hex2rgb(baseColor);
        if (!rgb) return {};

        const hsl = rgb2hsl(rgb.r, rgb.g, rgb.b);
        const scales = {};

        // Generate scale values based on Dynamic Framework patterns
        const scaleConfig = {
            25: { l: 97, s: hsl.s * 0.5 },   // Very light
            50: { l: 95, s: hsl.s * 0.6 },   // Light
            100: { l: 90, s: hsl.s * 0.7 },  // Lighter
            200: { l: 80, s: hsl.s * 0.8 },
            300: { l: 70, s: hsl.s * 0.9 },
            400: { l: 60, s: hsl.s },
            500: { l: 50, s: hsl.s },        // Base color
            600: { l: 40, s: hsl.s },
            700: { l: 30, s: hsl.s },
            800: { l: 20, s: hsl.s * 0.9 },
            900: { l: 10, s: hsl.s * 0.8 }   // Very dark
        };

        Object.entries(scaleConfig).forEach(([scale, config]) => {
            const scaledRgb = hsl2rgb(hsl.h, config.s, config.l);
            scales[`bs-${colorName}-${scale}-rgb`] = `${scaledRgb.r}, ${scaledRgb.g}, ${scaledRgb.b}`;
        });

        // Add surface and soft colors based on scales
        scales[`bs-surface-${colorName}-rgb`] = scales[`bs-${colorName}-50-rgb`];
        scales[`bs-${colorName}-soft-rgb`] = scales[`bs-${colorName}-25-rgb`];

        return scales;
    }

    getExtendedSpacing() {
        // Dynamic Framework extended spacing (6-30)
        const baseRem = 0.25; // Bootstrap base
        const spacing = {};
        
        for (let i = 6; i <= 30; i++) {
            spacing[`bs-ref-spacer-${i}`] = `${baseRem * i}rem`;
        }
        
        return spacing;
    }
}

// Export for use in theme generator
window.DynamicVariablesExtractor = DynamicVariablesExtractor;