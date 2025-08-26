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

// Generate CSS output
function generateCss() {
    const variables = {
        '--bs-primary': document.getElementById('primary').value,
        '--bs-secondary': document.getElementById('secondary').value,
        '--bs-success': document.getElementById('success').value,
        '--bs-danger': document.getElementById('danger').value,
        '--bs-warning': document.getElementById('warning').value,
        '--bs-info': document.getElementById('info').value,
        '--bs-light': document.getElementById('light').value,
        '--bs-dark': document.getElementById('dark').value,
        '--bs-body-font-size': document.getElementById('fontSize').value,
        '--bs-body-line-height': document.getElementById('lineHeight').value,
        '--bs-border-radius': document.getElementById('borderRadius').value,
        '--bs-border-radius-sm': document.getElementById('borderRadiusSm').value,
        '--bs-border-radius-lg': document.getElementById('borderRadiusLg').value,
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
    
    cssOutput += '/* Typography */\n';
    cssOutput += `body {\n    font-size: var(--bs-body-font-size);\n    line-height: var(--bs-body-line-height);\n}\n\n`;
    
    cssOutput += '/* Border Radius */\n';
    cssOutput += `.btn, .card, .alert, .modal-content, .dropdown-menu,\n.form-control, .form-select {\n    border-radius: var(--bs-border-radius);\n}\n\n`;
    cssOutput += `.btn-sm { border-radius: var(--bs-border-radius-sm); }\n`;
    cssOutput += `.btn-lg { border-radius: var(--bs-border-radius-lg); }\n`;
    cssOutput += `.rounded-pill { border-radius: 50rem !important; }`;

    document.getElementById('cssOutput').textContent = cssOutput;
    return cssOutput;
}

// Update CSS variables in real-time
function updateCssVariables() {
    const root = document.documentElement;
    root.style.setProperty('--bs-primary', document.getElementById('primary').value);
    root.style.setProperty('--bs-secondary', document.getElementById('secondary').value);
    root.style.setProperty('--bs-success', document.getElementById('success').value);
    root.style.setProperty('--bs-danger', document.getElementById('danger').value);
    root.style.setProperty('--bs-warning', document.getElementById('warning').value);
    root.style.setProperty('--bs-info', document.getElementById('info').value);
    root.style.setProperty('--bs-light', document.getElementById('light').value);
    root.style.setProperty('--bs-dark', document.getElementById('dark').value);
    root.style.setProperty('--bs-body-font-size', document.getElementById('fontSize').value);
    root.style.setProperty('--bs-body-line-height', document.getElementById('lineHeight').value);
    root.style.setProperty('--bs-border-radius', document.getElementById('borderRadius').value);
    root.style.setProperty('--bs-border-radius-sm', document.getElementById('borderRadiusSm').value);
    root.style.setProperty('--bs-border-radius-lg', document.getElementById('borderRadiusLg').value);
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