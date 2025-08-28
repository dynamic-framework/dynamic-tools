/**
 * Dynamic Framework Integration
 * Extends the theme generator with Dynamic Framework variables
 */

let dynamicVariablesExtractor = null;
let dynamicScales = {};
let dynamicSpacing = {};

// Initialize Dynamic Framework integration
function initializeDynamicFramework() {
    console.log('Initializing Dynamic Framework integration...');
    dynamicVariablesExtractor = new DynamicVariablesExtractor();
    
    // Generate initial scales (always enabled)
    generateDynamicScales();
    updateColorScalePreview();
    
    // Generate extended spacing
    dynamicSpacing = dynamicVariablesExtractor.getExtendedSpacing();
    
    // Bind event listeners for color changes
    bindDynamicEventListeners();
    
    // Force generate CSS on initialization
    setTimeout(() => {
        if (window.generateCss) {
            console.log('Forcing CSS generation...');
            // Debug RGB conversion
            testRgbConversion();
            window.generateCss();
        }
    }, 300);
}

// Generate Dynamic color scales for all base colors
function generateDynamicScales() {
    if (!dynamicVariablesExtractor) return;
    
    const baseColors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
    dynamicScales = {};
    
    baseColors.forEach(colorName => {
        const colorInput = document.getElementById(colorName);
        if (colorInput) {
            const scales = dynamicVariablesExtractor.generateColorScale(colorInput.value, colorName);
            Object.assign(dynamicScales, scales);
        }
    });
    
    // Also generate gray scales
    const grayBase = document.getElementById('secondary')?.value || '#4848b7';
    const grayScales = dynamicVariablesExtractor.generateColorScale(grayBase, 'gray');
    Object.assign(dynamicScales, grayScales);
}

// Update the color scale preview in the UI
function updateColorScalePreview() {
    const container = document.getElementById('scaleContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    const baseColors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
    
    baseColors.forEach(colorName => {
        const colorInput = document.getElementById(colorName);
        if (!colorInput) return;
        
        const colorGroup = document.createElement('div');
        colorGroup.className = 'color-scale-group mb-3';
        colorGroup.innerHTML = `<div class="small fw-semibold text-capitalize mb-1">${colorName}</div>`;
        
        const scaleRow = document.createElement('div');
        scaleRow.className = 'd-flex gap-1';
        
        const scales = ['25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
        scales.forEach(scale => {
            const scaleKey = `bs-${colorName}-${scale}-rgb`;
            if (dynamicScales[scaleKey]) {
                const rgbValues = dynamicScales[scaleKey].split(',');
                const color = `rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`;
                
                const swatch = document.createElement('div');
                swatch.className = 'color-scale-swatch';
                swatch.style.backgroundColor = color;
                swatch.style.width = '30px';
                swatch.style.height = '30px';
                swatch.style.borderRadius = '4px';
                swatch.style.border = '1px solid rgba(0,0,0,0.1)';
                swatch.title = `${colorName}-${scale}`;
                
                scaleRow.appendChild(swatch);
            }
        });
        
        colorGroup.appendChild(scaleRow);
        container.appendChild(colorGroup);
    });
}

// Extend the updateCssVariables function
const originalUpdateCssVariables = window.updateCssVariables;
window.updateCssVariables = function() {
    // Call original function
    if (originalUpdateCssVariables) {
        originalUpdateCssVariables();
    }
    
    // Always apply Dynamic Framework variables
    const root = document.documentElement;
    
    // Generate fresh scales
    generateDynamicScales();
    
    // Apply color scales
    Object.entries(dynamicScales).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
    });
    
    // Apply extended spacing
    Object.entries(dynamicSpacing).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
    });
    
    // Update preview
    updateColorScalePreview();
};

// Also listen for color changes to update scales
function bindDynamicEventListeners() {
    const colorInputs = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
    
    colorInputs.forEach(colorId => {
        const colorPicker = document.getElementById(colorId);
        const textInput = colorPicker?.nextElementSibling;
        
        if (colorPicker) {
            colorPicker.addEventListener('input', function() {
                generateDynamicScales();
                updateColorScalePreview();
            });
        }
        
        if (textInput) {
            textInput.addEventListener('input', function() {
                generateDynamicScales();
                updateColorScalePreview();
            });
        }
    });
}

// Override the generateCss function completely
window.generateCss = function() {
    let cssOutput = '';
    
    // Generate base Bootstrap variables
    const variables = {
        // Colors (RGB format for Dynamic compatibility)
        '--bs-primary-rgb': hexToRgb(document.getElementById('primary').value),
        '--bs-secondary-rgb': hexToRgb(document.getElementById('secondary').value),
        '--bs-success-rgb': hexToRgb(document.getElementById('success').value),
        '--bs-danger-rgb': hexToRgb(document.getElementById('danger').value),
        '--bs-warning-rgb': hexToRgb(document.getElementById('warning').value),
        '--bs-info-rgb': hexToRgb(document.getElementById('info').value),
        '--bs-light-rgb': hexToRgb(document.getElementById('light').value),
        '--bs-dark-rgb': hexToRgb(document.getElementById('dark').value),
        '--bs-gray-rgb': hexToRgb(document.getElementById('secondary').value),
        
        // Also include hex versions for compatibility
        '--bs-primary': document.getElementById('primary').value,
        '--bs-secondary': document.getElementById('secondary').value,
        '--bs-success': document.getElementById('success').value,
        '--bs-danger': document.getElementById('danger').value,
        '--bs-warning': document.getElementById('warning').value,
        '--bs-info': document.getElementById('info').value,
        '--bs-light': document.getElementById('light').value,
        '--bs-dark': document.getElementById('dark').value,
    };
    
    // Start CSS output
    cssOutput = '/* Dynamic Framework Theme Variables */\n:root {\n';
    cssOutput += '    /* Base Colors (Dynamic Framework compatible) */\n';
    
    for (const [key, value] of Object.entries(variables)) {
        cssOutput += `    ${key}: ${value};\n`;
    }
    
    // Add Dynamic Framework color scales
    cssOutput += '\n    /* Dynamic Framework Color Scales */\n';
    const colorGroups = {};
    
    // Group scales by color
    Object.entries(dynamicScales).forEach(([key, value]) => {
        const match = key.match(/bs-([^-]+)-/);
        if (match) {
            const colorName = match[1];
            if (!colorGroups[colorName]) {
                colorGroups[colorName] = {};
            }
            colorGroups[colorName][key] = value;
        }
    });
    
    // Output grouped scales
    Object.entries(colorGroups).forEach(([colorName, scales]) => {
        cssOutput += `\n    /* ${colorName} scales */\n`;
        
        // Sort scales numerically
        const sortedKeys = Object.keys(scales).sort((a, b) => {
            const aNum = parseInt(a.match(/(\d+)/)?.[1] || '500');
            const bNum = parseInt(b.match(/(\d+)/)?.[1] || '500');
            return aNum - bNum;
        });
        
        sortedKeys.forEach(key => {
            cssOutput += `    --${key}: ${scales[key]};\n`;
        });
        
        // Add surface and soft colors
        if (scales[`bs-${colorName}-50-rgb`]) {
            cssOutput += `    --bs-surface-${colorName}-rgb: var(--bs-${colorName}-50-rgb);\n`;
        }
        if (scales[`bs-${colorName}-25-rgb`]) {
            cssOutput += `    --bs-${colorName}-soft-rgb: var(--bs-${colorName}-25-rgb);\n`;
        }
    });
    
    // Add extended spacing
    cssOutput += '\n    /* Extended Spacing (Dynamic Framework) */\n';
    Object.entries(dynamicSpacing).forEach(([key, value]) => {
        cssOutput += `    --${key}: ${value};\n`;
    });
    
    // Add Dynamic Framework Nav Variables
    cssOutput += '\n    /* Dynamic Framework Nav Variables */\n';
    cssOutput += `    --bs-nav-tabs-nav-gap: 0;\n`;
    cssOutput += `    --bs-nav-tabs-link-border-active-font-weight: 600;\n`;
    cssOutput += `    --bs-nav-tabs-border-color: rgba(0, 0, 0, 0.1);\n`;
    cssOutput += `    --bs-nav-link-padding-x: 1rem;\n`;
    cssOutput += `    --bs-nav-link-padding-y: 0.75rem;\n`;
    cssOutput += `    --bs-nav-link-hover-bg: transparent;\n`;
    cssOutput += `    --bs-nav-link-hover-color: rgb(var(--bs-primary-rgb));\n`;
    
    // Add typography and other Bootstrap variables
    cssOutput += '\n    /* Typography */\n';
    cssOutput += `    --bs-font-family: ${document.getElementById('fontFamily').value};\n`;
    cssOutput += `    --bs-heading-font-family: ${document.getElementById('headingFontFamily').value};\n`;
    cssOutput += `    --bs-body-font-size: ${(document.getElementById('fontSize').value / 16)}rem;\n`;
    cssOutput += `    --bs-font-weight: ${document.getElementById('fontWeight').value};\n`;
    cssOutput += `    --bs-heading-weight: ${document.getElementById('headingWeight').value};\n`;
    cssOutput += `    --bs-body-line-height: ${document.getElementById('lineHeight').value};\n`;
    cssOutput += `    --bs-letter-spacing: ${document.getElementById('letterSpacing').value}em;\n`;
    
    cssOutput += '\n    /* Borders & Radius */\n';
    cssOutput += `    --bs-border-radius: ${(document.getElementById('borderRadius').value / 16)}rem;\n`;
    cssOutput += `    --bs-border-radius-sm: ${(document.getElementById('borderRadiusSm').value / 16)}rem;\n`;
    cssOutput += `    --bs-border-radius-lg: ${(document.getElementById('borderRadiusLg').value / 16)}rem;\n`;
    cssOutput += `    --bs-border-width: ${document.getElementById('borderWidth').value}px;\n`;
    cssOutput += `    --bs-border-style: ${document.getElementById('borderStyle').value};\n`;
    
    cssOutput += '}\n\n';
    
    // Add component overrides (Dynamic Framework format)
    cssOutput += '/* Component Overrides */\n';
    cssOutput += `.btn-primary {\n    background-color: rgb(var(--bs-primary-rgb));\n    border-color: rgb(var(--bs-primary-rgb));\n}\n\n`;
    cssOutput += `.btn-secondary {\n    background-color: rgb(var(--bs-secondary-rgb));\n    border-color: rgb(var(--bs-secondary-rgb));\n}\n\n`;
    cssOutput += `.btn-success {\n    background-color: rgb(var(--bs-success-rgb));\n    border-color: rgb(var(--bs-success-rgb));\n}\n\n`;
    cssOutput += `.btn-danger {\n    background-color: rgb(var(--bs-danger-rgb));\n    border-color: rgb(var(--bs-danger-rgb));\n}\n\n`;
    cssOutput += `.btn-warning {\n    background-color: rgb(var(--bs-warning-rgb));\n    border-color: rgb(var(--bs-warning-rgb));\n}\n\n`;
    cssOutput += `.btn-info {\n    background-color: rgb(var(--bs-info-rgb));\n    border-color: rgb(var(--bs-info-rgb));\n}\n\n`;
    
    cssOutput += '/* Text Colors */\n';
    cssOutput += `.text-primary { color: rgb(var(--bs-primary-rgb)) !important; }\n`;
    cssOutput += `.text-secondary { color: rgb(var(--bs-secondary-rgb)) !important; }\n`;
    cssOutput += `.text-success { color: rgb(var(--bs-success-rgb)) !important; }\n`;
    cssOutput += `.text-danger { color: rgb(var(--bs-danger-rgb)) !important; }\n`;
    cssOutput += `.text-warning { color: rgb(var(--bs-warning-rgb)) !important; }\n`;
    cssOutput += `.text-info { color: rgb(var(--bs-info-rgb)) !important; }\n\n`;
    
    cssOutput += '/* Background Colors */\n';
    cssOutput += `.bg-primary { background-color: rgb(var(--bs-primary-rgb)) !important; }\n`;
    cssOutput += `.bg-secondary { background-color: rgb(var(--bs-secondary-rgb)) !important; }\n`;
    cssOutput += `.bg-success { background-color: rgb(var(--bs-success-rgb)) !important; }\n`;
    cssOutput += `.bg-danger { background-color: rgb(var(--bs-danger-rgb)) !important; }\n`;
    cssOutput += `.bg-warning { background-color: rgb(var(--bs-warning-rgb)) !important; }\n`;
    cssOutput += `.bg-info { background-color: rgb(var(--bs-info-rgb)) !important; }\n\n`;
    
    // Add surface color utilities
    cssOutput += '/* Surface Colors (Dynamic Framework) */\n';
    cssOutput += `.bg-surface-primary { background-color: rgb(var(--bs-surface-primary-rgb)) !important; }\n`;
    cssOutput += `.bg-surface-secondary { background-color: rgb(var(--bs-surface-secondary-rgb)) !important; }\n`;
    cssOutput += `.bg-surface-success { background-color: rgb(var(--bs-surface-success-rgb)) !important; }\n`;
    cssOutput += `.bg-surface-danger { background-color: rgb(var(--bs-surface-danger-rgb)) !important; }\n`;
    cssOutput += `.bg-surface-warning { background-color: rgb(var(--bs-surface-warning-rgb)) !important; }\n`;
    cssOutput += `.bg-surface-info { background-color: rgb(var(--bs-surface-info-rgb)) !important; }\n\n`;
    
    // Add soft color utilities  
    cssOutput += '/* Soft Colors (Dynamic Framework) */\n';
    cssOutput += `.bg-primary-soft { background-color: rgb(var(--bs-primary-soft-rgb)) !important; }\n`;
    cssOutput += `.bg-secondary-soft { background-color: rgb(var(--bs-secondary-soft-rgb)) !important; }\n`;
    cssOutput += `.bg-success-soft { background-color: rgb(var(--bs-success-soft-rgb)) !important; }\n`;
    cssOutput += `.bg-danger-soft { background-color: rgb(var(--bs-danger-soft-rgb)) !important; }\n`;
    cssOutput += `.bg-warning-soft { background-color: rgb(var(--bs-warning-soft-rgb)) !important; }\n`;
    cssOutput += `.bg-info-soft { background-color: rgb(var(--bs-info-soft-rgb)) !important; }\n`;
    
    // Store raw CSS for copy/download operations
    window.rawCssOutput = cssOutput;

    // Display the CSS with Prism.js syntax highlighting
    const outputElement = document.getElementById('cssOutput');
    if (outputElement) {
        console.log('Setting Dynamic Framework CSS output, length:', cssOutput.length);
        outputElement.textContent = cssOutput;
        // Apply Prism highlighting if available
        if (typeof Prism !== 'undefined') {
            console.log('Applying Prism highlighting...');
            Prism.highlightElement(outputElement);
        } else {
            console.log('Prism not available');
        }
    } else {
        console.error('CSS Output element not found!');
    }
    
    console.log('Dynamic CSS generated successfully, first 200 chars:', cssOutput.substring(0, 200));
    return cssOutput;
};

// Helper function to convert hex to RGB
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

// Test function to verify RGB conversion
function testRgbConversion() {
    console.log('=== RGB CONVERSION TEST ===');
    const primaryHex = document.getElementById('primary')?.value || '#d81b60';
    const secondaryHex = document.getElementById('secondary')?.value || '#4848b7';
    
    console.log('Primary HEX:', primaryHex);
    console.log('Primary RGB:', hexToRgb(primaryHex));
    console.log('Expected RGB for #d81b60: 216, 27, 96');
    
    console.log('Secondary HEX:', secondaryHex);
    console.log('Secondary RGB:', hexToRgb(secondaryHex));
    console.log('Expected RGB for #4848b7: 72, 72, 183');
    
    // Check current CSS variable values
    const computedStyle = getComputedStyle(document.documentElement);
    const currentPrimaryRgb = computedStyle.getPropertyValue('--bs-primary-rgb').trim();
    const currentSecondaryRgb = computedStyle.getPropertyValue('--bs-secondary-rgb').trim();
    
    console.log('Current CSS --bs-primary-rgb:', currentPrimaryRgb);
    console.log('Current CSS --bs-secondary-rgb:', currentSecondaryRgb);
    
    // Verification
    if (currentPrimaryRgb !== hexToRgb(primaryHex)) {
        console.error('❌ PRIMARY RGB MISMATCH!');
        console.error('Expected:', hexToRgb(primaryHex));
        console.error('Actual:', currentPrimaryRgb);
    } else {
        console.log('✅ Primary RGB is correct');
    }
    
    if (currentSecondaryRgb !== hexToRgb(secondaryHex)) {
        console.error('❌ SECONDARY RGB MISMATCH!');
        console.error('Expected:', hexToRgb(secondaryHex));
        console.error('Actual:', currentSecondaryRgb);
    } else {
        console.log('✅ Secondary RGB is correct');
    }
    
    console.log('=== END RGB TEST ===');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initializeDynamicFramework, 100);
    });
} else {
    setTimeout(initializeDynamicFramework, 100);
}