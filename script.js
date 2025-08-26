// Bootstrap Customizer JavaScript
class BootstrapCustomizer {
    constructor() {
        this.variables = new Map();
        this.defaultValues = new Map();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadDefaultValues();
        this.updateCSSOutput();
    }

    setupEventListeners() {
        // Color inputs
        document.querySelectorAll('input[type="color"]').forEach(input => {
            const textInput = document.getElementById(input.id + '-text');
            
            input.addEventListener('input', (e) => {
                textInput.value = e.target.value;
                this.updateVariable(e.target.dataset.variable, e.target.value);
            });

            textInput.addEventListener('input', (e) => {
                if (this.isValidColor(e.target.value)) {
                    input.value = e.target.value;
                    this.updateVariable(input.dataset.variable, e.target.value);
                }
            });
        });

        // Range inputs
        document.querySelectorAll('input[type="range"]').forEach(input => {
            const valueDisplay = document.getElementById(input.id + '-value');
            
            input.addEventListener('input', (e) => {
                const value = e.target.value + 'px';
                valueDisplay.textContent = value;
                this.updateVariable(e.target.dataset.variable, value);
            });
        });

        // Select inputs
        document.querySelectorAll('select').forEach(select => {
            select.addEventListener('change', (e) => {
                this.updateVariable(e.target.dataset.variable, e.target.value);
            });
        });

        // Action buttons
        document.getElementById('copy-css').addEventListener('click', () => this.copyCSSToClipboard());
        document.getElementById('copy-css-inline').addEventListener('click', () => this.copyCSSToClipboard());
        document.getElementById('reset-defaults').addEventListener('click', () => this.resetToDefaults());
        document.getElementById('download-css').addEventListener('click', () => this.downloadCSS());
    }

    loadDefaultValues() {
        // Store default values
        this.defaultValues.set('--bs-primary', '#0d6efd');
        this.defaultValues.set('--bs-secondary', '#6c757d');
        this.defaultValues.set('--bs-success', '#198754');
        this.defaultValues.set('--bs-warning', '#ffc107');
        this.defaultValues.set('--bs-danger', '#dc3545');
        this.defaultValues.set('--bs-info', '#0dcaf0');
        this.defaultValues.set('--bs-font-sans-serif', 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif');
        this.defaultValues.set('--bs-body-font-size', '16px');
        this.defaultValues.set('--bs-border-radius', '6px');

        // Initialize variables with defaults
        this.defaultValues.forEach((value, key) => {
            this.variables.set(key, value);
        });
    }

    updateVariable(variable, value) {
        this.variables.set(variable, value);
        this.applyCSSVariables();
        this.updateCSSOutput();
    }

    applyCSSVariables() {
        const root = document.documentElement;
        this.variables.forEach((value, variable) => {
            root.style.setProperty(variable, value);
        });
    }

    updateCSSOutput() {
        const cssOutput = document.getElementById('css-output');
        let css = ':root {\n';
        
        this.variables.forEach((value, variable) => {
            css += `  ${variable}: ${value};\n`;
        });
        
        css += '}';
        
        // Add some helpful comments
        css += '\n\n/* \n * Copia este CSS y añádelo a tu hoja de estilos personalizada\n * para aplicar estos cambios a Bootstrap.\n * \n * También puedes usar estas variables en tu CSS personalizado:\n * \n * .mi-elemento {\n *   background-color: var(--bs-primary);\n *   font-family: var(--bs-font-sans-serif);\n * }\n */';
        
        cssOutput.textContent = css;
        this.highlightSyntax(cssOutput);
    }

    highlightSyntax(element) {
        let content = element.textContent;
        
        // Highlight CSS properties
        content = content.replace(/(--[\w-]+):/g, '<span class="css-property">$1</span>:');
        
        // Highlight CSS values
        content = content.replace(/:\s*([^;]+);/g, ': <span class="css-value">$1</span>;');
        
        // Highlight comments
        content = content.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="css-comment">$1</span>');
        
        element.innerHTML = content;
    }

    async copyCSSToClipboard() {
        const cssText = this.generateCSS();
        
        try {
            await navigator.clipboard.writeText(cssText);
            this.showCopySuccess();
        } catch (err) {
            // Fallback for older browsers
            this.fallbackCopyToClipboard(cssText);
        }
    }

    fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showCopySuccess();
        } catch (err) {
            alert('Error al copiar al portapapeles. Por favor, selecciona y copia manualmente el CSS.');
        }
        
        document.body.removeChild(textArea);
    }

    showCopySuccess() {
        const button = document.getElementById('copy-css');
        const inlineButton = document.getElementById('copy-css-inline');
        
        [button, inlineButton].forEach(btn => {
            const originalText = btn.textContent;
            btn.textContent = '✅ ¡Copiado!';
            btn.classList.add('copy-success');
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.classList.remove('copy-success');
            }, 2000);
        });
    }

    generateCSS() {
        let css = ':root {\n';
        this.variables.forEach((value, variable) => {
            css += `  ${variable}: ${value};\n`;
        });
        css += '}';
        return css;
    }

    downloadCSS() {
        const css = this.generateCSS();
        const blob = new Blob([css], { type: 'text/css' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'bootstrap-custom-variables.css';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    resetToDefaults() {
        // Reset all inputs to default values
        document.querySelectorAll('input[type="color"]').forEach(input => {
            const defaultValue = this.defaultValues.get(input.dataset.variable);
            if (defaultValue) {
                input.value = defaultValue;
                const textInput = document.getElementById(input.id + '-text');
                textInput.value = defaultValue;
            }
        });

        document.querySelectorAll('input[type="range"]').forEach(input => {
            const variable = input.dataset.variable;
            const defaultValue = this.defaultValues.get(variable);
            if (defaultValue) {
                const numericValue = parseInt(defaultValue);
                input.value = numericValue;
                const valueDisplay = document.getElementById(input.id + '-value');
                valueDisplay.textContent = defaultValue;
            }
        });

        document.querySelectorAll('select').forEach(select => {
            const defaultValue = this.defaultValues.get(select.dataset.variable);
            if (defaultValue) {
                select.value = defaultValue;
            }
        });

        // Reset variables map to defaults
        this.variables.clear();
        this.defaultValues.forEach((value, key) => {
            this.variables.set(key, value);
        });

        this.applyCSSVariables();
        this.updateCSSOutput();
    }

    isValidColor(color) {
        // Check if the color is a valid hex color
        return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
    }
}

// Initialize the customizer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const customizer = new BootstrapCustomizer();
    
    // Add some helpful tooltips and interactions
    addTooltips();
});

function addTooltips() {
    // Initialize Bootstrap tooltips if available
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
}

// Export for potential use in other scripts
window.BootstrapCustomizer = BootstrapCustomizer;