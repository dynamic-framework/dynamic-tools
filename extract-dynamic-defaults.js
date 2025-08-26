/**
 * Script para extraer los valores por defecto REALES de Dynamic Framework
 * Ejecutar este script en la consola del navegador visitando cualquier página que use Dynamic Framework
 * O en una página que tenga cargado el CSS de Dynamic Framework
 */

async function extractDynamicDefaults() {
    console.log('🔍 Extrayendo valores por defecto de Dynamic Framework...\n');
    
    try {
        // Fetch Dynamic Framework CSS
        const response = await fetch('https://cdn.dynamicframework.dev/assets/1.36.2/ui-react/css/dynamic-ui-root.css');
        const cssText = await response.text();
        
        // Extract all CSS variables from :root
        const rootRegex = /:root\s*\{([^}]*)\}/g;
        const variables = {};
        
        let match;
        while ((match = rootRegex.exec(cssText)) !== null) {
            const content = match[1];
            const varRegex = /--(bs-[^:]+):\s*([^;]+);/g;
            let varMatch;
            
            while ((varMatch = varRegex.exec(content)) !== null) {
                const varName = varMatch[1].trim();
                const varValue = varMatch[2].trim();
                variables[varName] = varValue;
            }
        }
        
        // Convert RGB to HEX helper
        function rgbToHex(rgbString) {
            if (!rgbString.includes(',')) return rgbString;
            
            const rgbValues = rgbString.split(',').map(v => parseInt(v.trim()));
            if (rgbValues.length !== 3) return rgbString;
            
            const [r, g, b] = rgbValues;
            return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
        }
        
        // Extract specific categories
        const results = {
            colors: {},
            typography: {},
            spacing: {},
            borders: {},
            other: {}
        };
        
        // Base colors
        const baseColors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
        baseColors.forEach(color => {
            const rgbVar = `bs-${color}-rgb`;
            const hexVar = `bs-${color}`;
            
            if (variables[rgbVar]) {
                results.colors[color] = {
                    rgb: variables[rgbVar],
                    hex: rgbToHex(variables[rgbVar])
                };
            } else if (variables[hexVar]) {
                results.colors[color] = {
                    hex: variables[hexVar],
                    rgb: hexToRgb(variables[hexVar])
                };
            }
        });
        
        // Typography
        const typographyVars = [
            'bs-font-family',
            'bs-heading-font-family', 
            'bs-body-font-size',
            'bs-font-weight',
            'bs-heading-weight',
            'bs-body-line-height',
            'bs-letter-spacing'
        ];
        
        typographyVars.forEach(varName => {
            if (variables[varName]) {
                results.typography[varName] = variables[varName];
            }
        });
        
        // Spacing
        const spacingVars = Object.keys(variables).filter(key => 
            key.includes('spacer') || key.includes('padding') || key.includes('margin')
        );
        
        spacingVars.forEach(varName => {
            results.spacing[varName] = variables[varName];
        });
        
        // Borders
        const borderVars = Object.keys(variables).filter(key => 
            key.includes('border') || key.includes('radius')
        );
        
        borderVars.forEach(varName => {
            results.borders[varName] = variables[varName];
        });
        
        // Output results
        console.log('📊 RESULTADOS:\n');
        
        console.log('🎨 COLORES BASE:');
        Object.entries(results.colors).forEach(([color, values]) => {
            console.log(`  ${color}: RGB(${values.rgb}) → HEX(${values.hex})`);
        });
        
        console.log('\n📝 TIPOGRAFÍA:');
        Object.entries(results.typography).forEach(([key, value]) => {
            console.log(`  ${key}: ${value}`);
        });
        
        console.log('\n📏 ESPACIADO:');
        Object.entries(results.spacing).forEach(([key, value]) => {
            console.log(`  ${key}: ${value}`);
        });
        
        console.log('\n🔲 BORDES:');
        Object.entries(results.borders).forEach(([key, value]) => {
            console.log(`  ${key}: ${value}`);
        });
        
        // Generate update code
        console.log('\n🔧 CÓDIGO PARA ACTUALIZAR HTML:');
        Object.entries(results.colors).forEach(([color, values]) => {
            console.log(`<input type="color" id="${color}" value="${values.hex}">`);
        });
        
        console.log('\n🔧 CÓDIGO PARA ACTUALIZAR CSS:');
        Object.entries(results.colors).forEach(([color, values]) => {
            console.log(`--bs-${color}: ${values.hex};`);
        });
        
        console.log('\n🔧 CÓDIGO PARA ACTUALIZAR JS (resetDefaults):');
        Object.entries(results.colors).forEach(([color, values]) => {
            console.log(`document.getElementById('${color}').value = '${values.hex}';`);
        });
        
        return results;
        
    } catch (error) {
        console.error('❌ Error extrayendo valores de Dynamic Framework:', error);
    }
}

// Helper function
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
        const r = parseInt(result[1], 16);
        const g = parseInt(result[2], 16);
        const b = parseInt(result[3], 16);
        return `${r}, ${g}, ${b}`;
    }
    return '0, 0, 0';
}

// Auto-execute
console.log('📋 Para ejecutar: extractDynamicDefaults()');

// Uncomment to auto-execute
// extractDynamicDefaults();