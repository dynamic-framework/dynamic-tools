// Initialize tooltips
document.addEventListener('DOMContentLoaded', function() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    // Initial generation
    generateCss();

    // Bind event listeners
    bindEventListeners();
});

// Professional theme presets
const themes = [
    {
        name: 'Fintech Trust',
        description: 'Azul confianza con acentos modernos',
        colors: {
            primary: '#1e3a8a',
            secondary: '#64748b',
            success: '#10b981',
            danger: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6',
            light: '#f8fafc',
            dark: '#0f172a'
        },
        typography: {
            fontSize: '1rem',
            lineHeight: '1.5'
        },
        borderRadius: {
            default: '0.5rem',
            sm: '0.375rem',
            lg: '0.75rem'
        }
    },
    {
        name: 'Digital Banking',
        description: 'Verde moderno y profesional',
        colors: {
            primary: '#059669',
            secondary: '#6b7280',
            success: '#34d399',
            danger: '#dc2626',
            warning: '#fbbf24',
            info: '#06b6d4',
            light: '#f9fafb',
            dark: '#111827'
        },
        typography: {
            fontSize: '1rem',
            lineHeight: '1.6'
        },
        borderRadius: {
            default: '0.75rem',
            sm: '0.5rem',
            lg: '1rem'
        }
    },
    {
        name: 'AI Startup',
        description: 'Púrpura futurista y tech',
        colors: {
            primary: '#7c3aed',
            secondary: '#475569',
            success: '#10b981',
            danger: '#f43f5e',
            warning: '#f59e0b',
            info: '#8b5cf6',
            light: '#faf5ff',
            dark: '#1e1b4b'
        },
        typography: {
            fontSize: '1rem',
            lineHeight: '1.5'
        },
        borderRadius: {
            default: '0.375rem',
            sm: '0.25rem',
            lg: '0.5rem'
        }
    },
    {
        name: 'Corporate Tech',
        description: 'Azul oscuro corporativo',
        colors: {
            primary: '#1e40af',
            secondary: '#475569',
            success: '#16a34a',
            danger: '#dc2626',
            warning: '#facc15',
            info: '#0ea5e9',
            light: '#f1f5f9',
            dark: '#0f172a'
        },
        typography: {
            fontSize: '0.95rem',
            lineHeight: '1.6'
        },
        borderRadius: {
            default: '0.25rem',
            sm: '0.125rem',
            lg: '0.375rem'
        }
    },
    {
        name: 'Modern Crypto',
        description: 'Negro y dorado premium',
        colors: {
            primary: '#f59e0b',
            secondary: '#404040',
            success: '#22c55e',
            danger: '#ef4444',
            warning: '#fbbf24',
            info: '#3b82f6',
            light: '#fafafa',
            dark: '#18181b'
        },
        typography: {
            fontSize: '1rem',
            lineHeight: '1.5'
        },
        borderRadius: {
            default: '0',
            sm: '0',
            lg: '0'
        }
    },
    {
        name: 'Health Tech',
        description: 'Turquesa limpio y médico',
        colors: {
            primary: '#0891b2',
            secondary: '#64748b',
            success: '#10b981',
            danger: '#f43f5e',
            warning: '#f97316',
            info: '#06b6d4',
            light: '#f0fdfa',
            dark: '#164e63'
        },
        typography: {
            fontSize: '1rem',
            lineHeight: '1.6'
        },
        borderRadius: {
            default: '0.5rem',
            sm: '0.375rem',
            lg: '0.75rem'
        }
    },
    {
        name: 'Neobank',
        description: 'Rosa moderno y minimalista',
        colors: {
            primary: '#ec4899',
            secondary: '#6b7280',
            success: '#14b8a6',
            danger: '#f43f5e',
            warning: '#f97316',
            info: '#a855f7',
            light: '#fdf4ff',
            dark: '#701a75'
        },
        typography: {
            fontSize: '1.05rem',
            lineHeight: '1.5'
        },
        borderRadius: {
            default: '1rem',
            sm: '0.75rem',
            lg: '1.5rem'
        }
    },
    {
        name: 'Enterprise SaaS',
        description: 'Azul empresarial confiable',
        colors: {
            primary: '#2563eb',
            secondary: '#52525b',
            success: '#16a34a',
            danger: '#e11d48',
            warning: '#eab308',
            info: '#0ea5e9',
            light: '#f4f4f5',
            dark: '#18181b'
        },
        typography: {
            fontSize: '0.95rem',
            lineHeight: '1.5'
        },
        borderRadius: {
            default: '0.375rem',
            sm: '0.25rem',
            lg: '0.5rem'
        }
    },
    {
        name: 'Gradient Tech',
        description: 'Gradiente moderno y vibrante',
        colors: {
            primary: '#6366f1',
            secondary: '#64748b',
            success: '#10b981',
            danger: '#f43f5e',
            warning: '#f59e0b',
            info: '#06b6d4',
            light: '#f8fafc',
            dark: '#1e293b'
        },
        typography: {
            fontSize: '1rem',
            lineHeight: '1.5'
        },
        borderRadius: {
            default: '0.75rem',
            sm: '0.5rem',
            lg: '1rem'
        }
    },
    {
        name: 'Dark Mode Pro',
        description: 'Oscuro profesional con acentos',
        colors: {
            primary: '#3b82f6',
            secondary: '#374151',
            success: '#10b981',
            danger: '#ef4444',
            warning: '#f59e0b',
            info: '#06b6d4',
            light: '#1f2937',
            dark: '#030712'
        },
        typography: {
            fontSize: '1rem',
            lineHeight: '1.6'
        },
        borderRadius: {
            default: '0.5rem',
            sm: '0.375rem',
            lg: '0.625rem'
        }
    }
];

// Function to add syntax highlighting to CSS
function highlightCSS(css) {
    // Replace CSS comments
    css = css.replace(/(\/\*[^*]*\*+(?:[^/*][^*]*\*+)*\/)/g, '<span class="css-comment">$1</span>');
    
    // Replace CSS selectors (simplified)
    css = css.replace(/^([^{]+){/gm, function(match, selector) {
        // Handle property lines inside curly braces
        if (selector.includes(':')) return match;
        return '<span class="css-selector">' + selector + '</span>{';
    });
    
    // Replace CSS properties
    css = css.replace(/([\w-]+)\s*:/g, '<span class="css-property">$1</span>:');
    
    // Replace CSS values (colors)
    css = css.replace(/(#[0-9a-fA-F]{3,8})/g, '<span class="css-color">$1</span>');
    
    // Replace CSS values (numbers with units)
    css = css.replace(/(\d+(?:\.\d+)?(?:px|rem|em|%|ms|s|deg))/g, '<span class="css-number">$1</span>');
    
    // Replace CSS important
    css = css.replace(/(!important)/g, '<span class="css-important">$1</span>');
    
    // Replace CSS variables
    css = css.replace(/(var\([^)]+\))/g, '<span class="css-variable">$1</span>');
    css = css.replace(/(--[\w-]+)/g, '<span class="css-variable">$1</span>');
    
    // Replace CSS functions
    css = css.replace(/(rgba?|scale|translate|rotate)\(/g, '<span class="css-function">$1</span>(');
    
    return css;
}

// Generate CSS output
function generateCss() {
    const variables = {
        // Colors
        '--bs-primary': document.getElementById('primary').value,
        '--bs-secondary': document.getElementById('secondary').value,
        '--bs-success': document.getElementById('success').value,
        '--bs-danger': document.getElementById('danger').value,
        '--bs-warning': document.getElementById('warning').value,
        '--bs-info': document.getElementById('info').value,
        '--bs-light': document.getElementById('light').value,
        '--bs-dark': document.getElementById('dark').value,
        
        // Typography
        '--bs-font-family': document.getElementById('fontFamily').value,
        '--bs-heading-font-family': document.getElementById('headingFontFamily').value,
        '--bs-body-font-size': (document.getElementById('fontSize').value / 16) + 'rem',
        '--bs-font-weight': document.getElementById('fontWeight').value,
        '--bs-heading-weight': document.getElementById('headingWeight').value,
        '--bs-body-line-height': document.getElementById('lineHeight').value,
        '--bs-letter-spacing': document.getElementById('letterSpacing').value + 'em',
        
        // Spacing
        '--bs-spacing-base': document.getElementById('spacingBase').value,
        '--bs-container-padding': document.getElementById('containerPadding').value,
        '--bs-component-padding': document.getElementById('componentPadding').value,
        
        // Borders
        '--bs-border-radius': (document.getElementById('borderRadius').value / 16) + 'rem',
        '--bs-border-radius-sm': (document.getElementById('borderRadiusSm').value / 16) + 'rem',
        '--bs-border-radius-lg': (document.getElementById('borderRadiusLg').value / 16) + 'rem',
        '--bs-border-width': document.getElementById('borderWidth').value + 'px',
        '--bs-border-style': document.getElementById('borderStyle').value,
        
        // Shadows & Effects
        '--bs-box-shadow': document.getElementById('boxShadow').value,
        '--bs-box-shadow-hover': document.getElementById('boxShadowHover').value,
        '--bs-text-shadow': document.getElementById('textShadow').value,
        '--bs-glow-effect': document.getElementById('glowEffect').value,
        
        // Animations
        '--bs-transition-duration': document.getElementById('transitionDuration').value,
        '--bs-transition-timing': document.getElementById('transitionTiming').value,
        '--bs-hover-scale': document.getElementById('hoverScale').value,
        '--bs-animation-intensity': document.getElementById('animationIntensity').value,
        
        // Links & Focus States
        '--bs-link-color': document.getElementById('linkColor')?.value || '#0d6efd',
        '--bs-link-hover-color': document.getElementById('linkHoverColor')?.value || '#0a58ca',
        '--bs-link-decoration': document.getElementById('linkDecoration')?.value || 'underline',
        '--bs-focus-ring-color': document.getElementById('focusRingColor')?.value || '#0d6efd',
        '--bs-focus-ring-width': (document.getElementById('focusRingWidth')?.value || 3) + 'px',
        '--bs-focus-ring-opacity': document.getElementById('focusRingOpacity')?.value || '0.25',
        
        // Forms & Inputs
        '--bs-input-bg': document.getElementById('inputBg')?.value || '#ffffff',
        '--bs-input-border-color': document.getElementById('inputBorderColor')?.value || '#ced4da',
        '--bs-input-focus-border-color': document.getElementById('inputFocusColor')?.value || '#0d6efd',
        '--bs-input-placeholder-color': document.getElementById('inputPlaceholderColor')?.value || '#6c757d',
        '--bs-input-disabled-bg': document.getElementById('inputDisabledBg')?.value || '#e9ecef',
        '--bs-input-padding-y': (document.getElementById('inputPaddingY')?.value || 6) / 16 + 'rem',
        '--bs-input-padding-x': (document.getElementById('inputPaddingX')?.value || 12) / 16 + 'rem',
        '--bs-form-label-font-size': (document.getElementById('formLabelSize')?.value || 14) / 16 + 'rem',
        
        // Grid System
        '--bs-grid-columns': document.getElementById('gridColumns')?.value || 12,
        '--bs-grid-gutter-width': (document.getElementById('gridGutterWidth')?.value || 24) + 'px',
        '--bs-container-max-width-sm': (document.getElementById('containerMaxWidthSm')?.value || 540) + 'px',
        '--bs-container-max-width-md': (document.getElementById('containerMaxWidthMd')?.value || 720) + 'px',
        '--bs-container-max-width-lg': (document.getElementById('containerMaxWidthLg')?.value || 960) + 'px',
        '--bs-container-max-width-xl': (document.getElementById('containerMaxWidthXl')?.value || 1140) + 'px',
    };

    let cssOutput = '/* Bootstrap Custom Variables */\n:root {\n';
    for (const [key, value] of Object.entries(variables)) {
        cssOutput += `    ${key}: ${value};\n`;
    }
    cssOutput += '}\n\n';

    // Add component overrides
    cssOutput += '/* Component Overrides */\n';
    cssOutput += `.btn-primary {\n    background-color: var(--bs-primary);\n    border-color: var(--bs-primary);\n}\n\n`;
    cssOutput += `.btn-secondary {\n    background-color: var(--bs-secondary);\n    border-color: var(--bs-secondary);\n}\n\n`;
    cssOutput += `.btn-success {\n    background-color: var(--bs-success);\n    border-color: var(--bs-success);\n}\n\n`;
    cssOutput += `.btn-danger {\n    background-color: var(--bs-danger);\n    border-color: var(--bs-danger);\n}\n\n`;
    cssOutput += `.btn-warning {\n    background-color: var(--bs-warning);\n    border-color: var(--bs-warning);\n}\n\n`;
    cssOutput += `.btn-info {\n    background-color: var(--bs-info);\n    border-color: var(--bs-info);\n}\n\n`;
    
    cssOutput += '/* Text Colors */\n';
    cssOutput += `.text-primary { color: var(--bs-primary) !important; }\n`;
    cssOutput += `.text-secondary { color: var(--bs-secondary) !important; }\n`;
    cssOutput += `.text-success { color: var(--bs-success) !important; }\n`;
    cssOutput += `.text-danger { color: var(--bs-danger) !important; }\n`;
    cssOutput += `.text-warning { color: var(--bs-warning) !important; }\n`;
    cssOutput += `.text-info { color: var(--bs-info) !important; }\n\n`;
    
    cssOutput += '/* Background Colors */\n';
    cssOutput += `.bg-primary { background-color: var(--bs-primary) !important; }\n`;
    cssOutput += `.bg-secondary { background-color: var(--bs-secondary) !important; }\n`;
    cssOutput += `.bg-success { background-color: var(--bs-success) !important; }\n`;
    cssOutput += `.bg-danger { background-color: var(--bs-danger) !important; }\n`;
    cssOutput += `.bg-warning { background-color: var(--bs-warning) !important; }\n`;
    cssOutput += `.bg-info { background-color: var(--bs-info) !important; }\n\n`;
    
    cssOutput += '/* Links & Focus */\n';
    cssOutput += `a {\n    color: var(--bs-link-color);\n    text-decoration: var(--bs-link-decoration);\n}\n\n`;
    cssOutput += `a:hover {\n    color: var(--bs-link-hover-color);\n}\n\n`;
    cssOutput += `*:focus {\n    outline: var(--bs-focus-ring-width) solid rgba(var(--bs-focus-ring-color), var(--bs-focus-ring-opacity));\n    outline-offset: 2px;\n}\n\n`;
    
    cssOutput += '/* Forms & Inputs */\n';
    cssOutput += `.form-control, .form-select {\n    background-color: var(--bs-input-bg);\n    border-color: var(--bs-input-border-color);\n    padding: var(--bs-input-padding-y) var(--bs-input-padding-x);\n}\n\n`;
    cssOutput += `.form-control:focus, .form-select:focus {\n    border-color: var(--bs-input-focus-border-color);\n    box-shadow: 0 0 0 0.25rem rgba(var(--bs-input-focus-border-color), 0.25);\n}\n\n`;
    cssOutput += `.form-control::placeholder {\n    color: var(--bs-input-placeholder-color);\n}\n\n`;
    cssOutput += `.form-control:disabled, .form-select:disabled {\n    background-color: var(--bs-input-disabled-bg);\n}\n\n`;
    cssOutput += `.form-label {\n    font-size: var(--bs-form-label-font-size);\n}\n\n`;
    
    cssOutput += '/* Grid System */\n';
    cssOutput += `.container {\n    --bs-gutter-x: var(--bs-grid-gutter-width);\n}\n\n`;
    cssOutput += `@media (min-width: 576px) {\n    .container { max-width: var(--bs-container-max-width-sm); }\n}\n`;
    cssOutput += `@media (min-width: 768px) {\n    .container { max-width: var(--bs-container-max-width-md); }\n}\n`;
    cssOutput += `@media (min-width: 992px) {\n    .container { max-width: var(--bs-container-max-width-lg); }\n}\n`;
    cssOutput += `@media (min-width: 1200px) {\n    .container { max-width: var(--bs-container-max-width-xl); }\n}\n\n`;
    
    cssOutput += '/* Typography */\n';
    cssOutput += `body {\n    font-family: var(--bs-font-family);\n    font-size: var(--bs-body-font-size);\n    font-weight: var(--bs-font-weight);\n    line-height: var(--bs-body-line-height);\n    letter-spacing: var(--bs-letter-spacing);\n}\n\n`;
    cssOutput += `h1, h2, h3, h4, h5, h6 {\n    font-family: var(--bs-heading-font-family);\n    font-weight: var(--bs-heading-weight);\n}\n\n`;
    
    cssOutput += '/* Spacing */\n';
    cssOutput += `.container, .container-fluid {\n    padding-left: var(--bs-container-padding);\n    padding-right: var(--bs-container-padding);\n}\n\n`;
    cssOutput += `.btn {\n    padding: var(--bs-component-padding);\n}\n\n`;
    
    cssOutput += '/* Borders & Radius */\n';
    cssOutput += `.btn, .card, .alert, .modal-content, .dropdown-menu,\n.form-control, .form-select {\n    border-radius: var(--bs-border-radius);\n    border-width: var(--bs-border-width);\n    border-style: var(--bs-border-style);\n}\n\n`;
    cssOutput += `.btn-sm { border-radius: var(--bs-border-radius-sm); }\n`;
    cssOutput += `.btn-lg { border-radius: var(--bs-border-radius-lg); }\n`;
    cssOutput += `.rounded-pill { border-radius: 50rem !important; }\n\n`;
    
    cssOutput += '/* Shadows & Effects */\n';
    cssOutput += `.card, .btn, .dropdown-menu {\n    box-shadow: var(--bs-box-shadow);\n    transition: all var(--bs-transition-duration) var(--bs-transition-timing);\n}\n\n`;
    cssOutput += `.btn:hover, .card:hover {\n    box-shadow: var(--bs-box-shadow-hover);\n    transform: scale(var(--bs-hover-scale));\n}\n\n`;
    cssOutput += `.text-shadow {\n    text-shadow: var(--bs-text-shadow);\n}\n\n`;
    cssOutput += `.glow {\n    box-shadow: var(--bs-glow-effect);\n}`;

    // Apply syntax highlighting
    document.getElementById('cssOutput').innerHTML = highlightCSS(cssOutput);
    return cssOutput;
}

// Update CSS variables in real-time
function updateCssVariables() {
    const root = document.documentElement;
    
    // Colors
    root.style.setProperty('--bs-primary', document.getElementById('primary').value);
    root.style.setProperty('--bs-secondary', document.getElementById('secondary').value);
    root.style.setProperty('--bs-success', document.getElementById('success').value);
    root.style.setProperty('--bs-danger', document.getElementById('danger').value);
    root.style.setProperty('--bs-warning', document.getElementById('warning').value);
    root.style.setProperty('--bs-info', document.getElementById('info').value);
    root.style.setProperty('--bs-light', document.getElementById('light').value);
    root.style.setProperty('--bs-dark', document.getElementById('dark').value);
    
    // Typography
    root.style.setProperty('--bs-font-family', document.getElementById('fontFamily').value);
    root.style.setProperty('--bs-heading-font-family', document.getElementById('headingFontFamily').value);
    root.style.setProperty('--bs-body-font-size', document.getElementById('fontSize').value);
    root.style.setProperty('--bs-font-weight', document.getElementById('fontWeight').value);
    root.style.setProperty('--bs-heading-weight', document.getElementById('headingWeight').value);
    root.style.setProperty('--bs-body-line-height', document.getElementById('lineHeight').value);
    root.style.setProperty('--bs-letter-spacing', document.getElementById('letterSpacing').value);
    
    // Spacing
    root.style.setProperty('--bs-spacing-base', document.getElementById('spacingBase').value);
    root.style.setProperty('--bs-container-padding', document.getElementById('containerPadding').value);
    root.style.setProperty('--bs-component-padding', document.getElementById('componentPadding').value);
    
    // Borders
    root.style.setProperty('--bs-border-radius', document.getElementById('borderRadius').value);
    root.style.setProperty('--bs-border-radius-sm', document.getElementById('borderRadiusSm').value);
    root.style.setProperty('--bs-border-radius-lg', document.getElementById('borderRadiusLg').value);
    root.style.setProperty('--bs-border-width', document.getElementById('borderWidth').value);
    root.style.setProperty('--bs-border-style', document.getElementById('borderStyle').value);
    
    // Shadows & Effects
    root.style.setProperty('--bs-box-shadow', document.getElementById('boxShadow').value);
    root.style.setProperty('--bs-box-shadow-hover', document.getElementById('boxShadowHover').value);
    root.style.setProperty('--bs-text-shadow', document.getElementById('textShadow').value);
    root.style.setProperty('--bs-glow-effect', document.getElementById('glowEffect').value);
    
    // Animations
    root.style.setProperty('--bs-transition-duration', document.getElementById('transitionDuration').value);
    root.style.setProperty('--bs-transition-timing', document.getElementById('transitionTiming').value);
    root.style.setProperty('--bs-hover-scale', document.getElementById('hoverScale').value);
    root.style.setProperty('--bs-animation-intensity', document.getElementById('animationIntensity').value);
    
    generateCss();
}

// Bind event listeners
function bindEventListeners() {
    // Sync color picker with text input
    document.querySelectorAll('input[type="color"]').forEach(picker => {
        const textInput = picker.nextElementSibling;
        
        picker.addEventListener('input', function() {
            textInput.value = this.value;
            updateCssVariables();
        });
        
        textInput.addEventListener('input', function() {
            if (/^#[0-9A-F]{6}$/i.test(this.value)) {
                picker.value = this.value;
                updateCssVariables();
            }
        });
    });

    // Update on select changes
    document.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', updateCssVariables);
    });

    // Bind slider event listeners
    bindSliderListeners();
}

// Bind slider listeners and update display values
function bindSliderListeners() {
    // Font Size Slider
    const fontSizeSlider = document.getElementById('fontSize');
    if (fontSizeSlider) {
        fontSizeSlider.addEventListener('input', function() {
            document.getElementById('fontSizeValue').textContent = this.value + 'px';
            document.documentElement.style.setProperty('--bs-body-font-size', (this.value / 16) + 'rem');
            generateCss();
        });
    }

    // Font Weight Slider
    const fontWeightSlider = document.getElementById('fontWeight');
    if (fontWeightSlider) {
        fontWeightSlider.addEventListener('input', function() {
            document.getElementById('fontWeightValue').textContent = this.value;
            document.documentElement.style.setProperty('--bs-font-weight', this.value);
            generateCss();
        });
    }

    // Heading Weight Slider
    const headingWeightSlider = document.getElementById('headingWeight');
    if (headingWeightSlider) {
        headingWeightSlider.addEventListener('input', function() {
            document.getElementById('headingWeightValue').textContent = this.value;
            document.documentElement.style.setProperty('--bs-heading-weight', this.value);
            generateCss();
        });
    }

    // Line Height Slider
    const lineHeightSlider = document.getElementById('lineHeight');
    if (lineHeightSlider) {
        lineHeightSlider.addEventListener('input', function() {
            document.getElementById('lineHeightValue').textContent = this.value;
            document.documentElement.style.setProperty('--bs-body-line-height', this.value);
            generateCss();
        });
    }

    // Letter Spacing Slider
    const letterSpacingSlider = document.getElementById('letterSpacing');
    if (letterSpacingSlider) {
        letterSpacingSlider.addEventListener('input', function() {
            document.getElementById('letterSpacingValue').textContent = this.value + 'em';
            document.documentElement.style.setProperty('--bs-letter-spacing', this.value + 'em');
            generateCss();
        });
    }

    // Border Radius Sliders
    const borderRadiusSlider = document.getElementById('borderRadius');
    if (borderRadiusSlider) {
        borderRadiusSlider.addEventListener('input', function() {
            document.getElementById('borderRadiusValue').textContent = this.value + 'px';
            document.documentElement.style.setProperty('--bs-border-radius', (this.value / 16) + 'rem');
            generateCss();
        });
    }

    const borderRadiusSmSlider = document.getElementById('borderRadiusSm');
    if (borderRadiusSmSlider) {
        borderRadiusSmSlider.addEventListener('input', function() {
            document.getElementById('borderRadiusSmValue').textContent = this.value + 'px';
            document.documentElement.style.setProperty('--bs-border-radius-sm', (this.value / 16) + 'rem');
            generateCss();
        });
    }

    const borderRadiusLgSlider = document.getElementById('borderRadiusLg');
    if (borderRadiusLgSlider) {
        borderRadiusLgSlider.addEventListener('input', function() {
            document.getElementById('borderRadiusLgValue').textContent = this.value + 'px';
            document.documentElement.style.setProperty('--bs-border-radius-lg', (this.value / 16) + 'rem');
            generateCss();
        });
    }

    // Border Width Slider
    const borderWidthSlider = document.getElementById('borderWidth');
    if (borderWidthSlider) {
        borderWidthSlider.addEventListener('input', function() {
            document.getElementById('borderWidthValue').textContent = this.value + 'px';
            document.documentElement.style.setProperty('--bs-border-width', this.value + 'px');
            generateCss();
        });
    }

    // Links & Focus State Sliders
    const focusRingWidthSlider = document.getElementById('focusRingWidth');
    if (focusRingWidthSlider) {
        focusRingWidthSlider.addEventListener('input', function() {
            document.getElementById('focusRingWidthValue').textContent = this.value + 'px';
            document.documentElement.style.setProperty('--bs-focus-ring-width', this.value + 'px');
            generateCss();
        });
    }

    const focusRingOpacitySlider = document.getElementById('focusRingOpacity');
    if (focusRingOpacitySlider) {
        focusRingOpacitySlider.addEventListener('input', function() {
            document.getElementById('focusRingOpacityValue').textContent = this.value;
            document.documentElement.style.setProperty('--bs-focus-ring-opacity', this.value);
            generateCss();
        });
    }

    // Form Input Sliders
    const inputPaddingYSlider = document.getElementById('inputPaddingY');
    if (inputPaddingYSlider) {
        inputPaddingYSlider.addEventListener('input', function() {
            document.getElementById('inputPaddingYValue').textContent = this.value + 'px';
            document.documentElement.style.setProperty('--bs-input-padding-y', (this.value / 16) + 'rem');
            generateCss();
        });
    }

    const inputPaddingXSlider = document.getElementById('inputPaddingX');
    if (inputPaddingXSlider) {
        inputPaddingXSlider.addEventListener('input', function() {
            document.getElementById('inputPaddingXValue').textContent = this.value + 'px';
            document.documentElement.style.setProperty('--bs-input-padding-x', (this.value / 16) + 'rem');
            generateCss();
        });
    }

    const formLabelSizeSlider = document.getElementById('formLabelSize');
    if (formLabelSizeSlider) {
        formLabelSizeSlider.addEventListener('input', function() {
            document.getElementById('formLabelSizeValue').textContent = this.value + 'px';
            document.documentElement.style.setProperty('--bs-form-label-font-size', (this.value / 16) + 'rem');
            generateCss();
        });
    }

    // Grid System Sliders
    const gridColumnsSlider = document.getElementById('gridColumns');
    if (gridColumnsSlider) {
        gridColumnsSlider.addEventListener('input', function() {
            document.getElementById('gridColumnsValue').textContent = this.value;
            document.documentElement.style.setProperty('--bs-grid-columns', this.value);
            generateCss();
        });
    }

    const gridGutterWidthSlider = document.getElementById('gridGutterWidth');
    if (gridGutterWidthSlider) {
        gridGutterWidthSlider.addEventListener('input', function() {
            document.getElementById('gridGutterWidthValue').textContent = this.value + 'px';
            document.documentElement.style.setProperty('--bs-grid-gutter-width', this.value + 'px');
            generateCss();
        });
    }

    const containerMaxWidthSmSlider = document.getElementById('containerMaxWidthSm');
    if (containerMaxWidthSmSlider) {
        containerMaxWidthSmSlider.addEventListener('input', function() {
            document.getElementById('containerMaxWidthSmValue').textContent = this.value + 'px';
            document.documentElement.style.setProperty('--bs-container-max-width-sm', this.value + 'px');
            generateCss();
        });
    }

    const containerMaxWidthMdSlider = document.getElementById('containerMaxWidthMd');
    if (containerMaxWidthMdSlider) {
        containerMaxWidthMdSlider.addEventListener('input', function() {
            document.getElementById('containerMaxWidthMdValue').textContent = this.value + 'px';
            document.documentElement.style.setProperty('--bs-container-max-width-md', this.value + 'px');
            generateCss();
        });
    }

    const containerMaxWidthLgSlider = document.getElementById('containerMaxWidthLg');
    if (containerMaxWidthLgSlider) {
        containerMaxWidthLgSlider.addEventListener('input', function() {
            document.getElementById('containerMaxWidthLgValue').textContent = this.value + 'px';
            document.documentElement.style.setProperty('--bs-container-max-width-lg', this.value + 'px');
            generateCss();
        });
    }

    const containerMaxWidthXlSlider = document.getElementById('containerMaxWidthXl');
    if (containerMaxWidthXlSlider) {
        containerMaxWidthXlSlider.addEventListener('input', function() {
            document.getElementById('containerMaxWidthXlValue').textContent = this.value + 'px';
            document.documentElement.style.setProperty('--bs-container-max-width-xl', this.value + 'px');
            generateCss();
        });
    }
}

// Copy CSS to clipboard
function copyCss() {
    const css = generateCss();
    navigator.clipboard.writeText(css).then(() => {
        const toast = new bootstrap.Toast(document.getElementById('copyToast'));
        toast.show();
    });
}

// Copy CSS from modal
function copyCssFromModal() {
    const css = document.getElementById('cssOutput').textContent;
    navigator.clipboard.writeText(css).then(() => {
        const toast = new bootstrap.Toast(document.getElementById('copyToast'));
        toast.show();
    });
}

// Toggle CSS view modal
function toggleCssView() {
    generateCss();
    const modal = new bootstrap.Modal(document.getElementById('cssModal'));
    modal.show();
}

// Download CSS file
function downloadCss() {
    const css = generateCss();
    const blob = new Blob([css], { type: 'text/css' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bootstrap-custom.css';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Reset to default values
function resetDefaults() {
    if (confirm('¿Estás seguro de que quieres restaurar todos los valores por defecto?')) {
        // Reset colors
        document.getElementById('primary').value = '#0d6efd';
        document.getElementById('secondary').value = '#6c757d';
        document.getElementById('success').value = '#198754';
        document.getElementById('danger').value = '#dc3545';
        document.getElementById('warning').value = '#ffc107';
        document.getElementById('info').value = '#0dcaf0';
        document.getElementById('light').value = '#f8f9fa';
        document.getElementById('dark').value = '#212529';
        
        // Update text inputs
        document.querySelectorAll('input[type="color"]').forEach(picker => {
            const textInput = picker.nextElementSibling;
            textInput.value = picker.value;
        });
        
        // Reset typography and border radius
        document.getElementById('fontSize').value = '1rem';
        document.getElementById('lineHeight').value = '1.5';
        document.getElementById('borderRadius').value = '0.375rem';
        document.getElementById('borderRadiusSm').value = '0.25rem';
        document.getElementById('borderRadiusLg').value = '0.5rem';
        
        // Update CSS variables
        updateCssVariables();
    }
}

// Surprise me function
function surpriseMe() {
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    
    // Show theme name with animation
    showThemeNotification(randomTheme.name, randomTheme.description);
    
    // Apply colors with slight delay for effect
    setTimeout(() => {
        // Set colors
        Object.keys(randomTheme.colors).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.value = randomTheme.colors[key];
                // Update associated text input
                const textInput = element.nextElementSibling;
                if (textInput && textInput.classList.contains('color-value')) {
                    textInput.value = randomTheme.colors[key];
                }
            }
        });
        
        // Set typography
        document.getElementById('fontSize').value = randomTheme.typography.fontSize;
        document.getElementById('lineHeight').value = randomTheme.typography.lineHeight;
        
        // Set border radius
        document.getElementById('borderRadius').value = randomTheme.borderRadius.default;
        document.getElementById('borderRadiusSm').value = randomTheme.borderRadius.sm;
        document.getElementById('borderRadiusLg').value = randomTheme.borderRadius.lg;
        
        // Update CSS variables
        updateCssVariables();
    }, 300);
}

// Show theme notification
function showThemeNotification(themeName, description) {
    // Create custom toast for theme
    const toastHtml = `
        <div class="toast align-items-center border-0" role="alert" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
            <div class="d-flex">
                <div class="toast-body text-white">
                    <strong><i class="fas fa-palette me-2"></i>${themeName}</strong><br>
                    <small>${description}</small>
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    
    const toastContainer = document.querySelector('.toast-container');
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = toastHtml;
    const toastElement = tempDiv.firstElementChild;
    toastContainer.appendChild(toastElement);
    
    const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
    toast.show();
    
    // Remove toast element after it's hidden
    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
}