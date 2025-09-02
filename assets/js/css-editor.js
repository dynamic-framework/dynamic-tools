// css-editor.js - Bidirectional CSS editor for Theme Generator
let originalCSS = '';
let editMode = false;
let cssValidator = null;

// Initialize validator
class CSSValidator {
  constructor() {
    this.knownVariables = new Set([
      // Core Bootstrap colors
      '--bs-primary', '--bs-primary-rgb',
      '--bs-secondary', '--bs-secondary-rgb',
      '--bs-success', '--bs-success-rgb',
      '--bs-danger', '--bs-danger-rgb',
      '--bs-warning', '--bs-warning-rgb',
      '--bs-info', '--bs-info-rgb',
      '--bs-light', '--bs-light-rgb',
      '--bs-dark', '--bs-dark-rgb',
      
      // Typography
      '--bs-font-family', '--bs-heading-font-family',
      '--bs-body-font-size', '--bs-body-font-weight',
      '--bs-body-line-height', '--bs-letter-spacing',
      '--bs-h1-font-size', '--bs-h2-font-size', '--bs-h3-font-size',
      '--bs-h4-font-size', '--bs-h5-font-size', '--bs-h6-font-size',
      '--bs-heading-font-weight', '--bs-heading-line-height',
      
      // Borders and shadows
      '--bs-border-radius', '--bs-border-radius-sm', '--bs-border-radius-lg',
      '--bs-border-width', '--bs-border-color',
      '--bs-box-shadow', '--bs-box-shadow-sm', '--bs-box-shadow-lg',
      
      // Body
      '--bs-body-bg', '--bs-body-bg-rgb',
      '--bs-body-color', '--bs-body-color-rgb',
      '--bs-emphasis-color', '--bs-emphasis-color-rgb',
      
      // Links
      '--bs-link-color', '--bs-link-color-rgb',
      '--bs-link-hover-color', '--bs-link-hover-color-rgb',
      '--bs-link-decoration', '--bs-link-hover-decoration',
      
      // Components
      '--bs-card-bg', '--bs-card-border-color',
      '--bs-nav-link-color', '--bs-nav-link-hover-color',
      '--bs-nav-tabs-border-color', '--bs-nav-tabs-link-active-color',
      '--bs-navbar-color', '--bs-navbar-hover-color',
      '--bs-navbar-active-color', '--bs-navbar-brand-color'
    ]);
  }
  
  validate(cssText) {
    const errors = [];
    const warnings = [];
    const variables = {};
    
    // Extract :root section
    const rootMatch = cssText.match(/:root\s*{([^}]*)}/);
    if (!rootMatch) {
      errors.push({
        type: 'structure',
        message: 'No :root selector found. CSS variables must be defined within :root { }'
      });
      return { variables, errors, warnings };
    }
    
    const content = rootMatch[1];
    
    // Parse variables
    const varRegex = /(--[\w-]+):\s*([^;]+);/g;
    let match;
    
    while ((match = varRegex.exec(content)) !== null) {
      const [, name, value] = match;
      variables[name] = value.trim();
      
      // Check if it's a known variable
      if (!this.knownVariables.has(name) && name.startsWith('--bs-')) {
        warnings.push({
          type: 'unknown',
          variable: name,
          message: `"${name}" is not a standard Bootstrap variable`
        });
      }
    }
    
    // Validate required variables
    const requiredVars = [
      '--bs-primary', '--bs-secondary', '--bs-success',
      '--bs-danger', '--bs-warning', '--bs-info'
    ];
    
    requiredVars.forEach(varName => {
      if (!variables[varName]) {
        errors.push({
          type: 'missing',
          variable: varName,
          message: `Missing required variable: ${varName}`
        });
      }
    });
    
    // Validate color formats (only flag truly invalid values as errors)
    Object.entries(variables).forEach(([name, value]) => {
      if (this.isColorVariable(name) && !this.isValidColor(value)) {
        // Only error if it's clearly malformed (not a CSS function)
        if (!this.isCSSDFunction(value)) {
          errors.push({
            type: 'invalid-value',
            variable: name,
            value: value,
            message: `Invalid color value for ${name}: "${value}"`
          });
        }
      }
      
      // Check RGB variables (more lenient)
      if (name.endsWith('-rgb') && !this.isValidRGB(value)) {
        // Only error if it's clearly malformed (not a CSS function)
        if (!this.isCSSDFunction(value)) {
          errors.push({
            type: 'invalid-value',
            variable: name,
            value: value,
            message: `Invalid RGB value for ${name}: "${value}". Expected format: "r, g, b" or CSS function`
          });
        }
      }
    });
    
    return { variables, errors, warnings };
  }
  
  isColorVariable(name) {
    return name.includes('color') || 
           ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'].some(color => 
             name.includes(color) && !name.endsWith('-rgb')
           );
  }
  
  isValidColor(value) {
    const cleanValue = value.trim();
    
    // Basic color patterns
    const patterns = [
      /^#[0-9A-F]{6}$/i,                                    // #hex6
      /^#[0-9A-F]{3}$/i,                                    // #hex3
      /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/,          // rgb(r,g,b)
      /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$/, // rgba(r,g,b,a)
      /^hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/,        // hsl(h,s,l)
      /^hsla\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*,\s*[\d.]+\s*\)$/, // hsla(h,s,l,a)
      /^var\(--[\w-]+\)$/,                                  // var(--variable)
      /^rgb\(\s*var\(--[\w-]+\)\s*\)$/,                    // rgb(var(--rgb-variable))
      /^rgba\(\s*var\(--[\w-]+\)\s*,\s*[\d.]+\s*\)$/      // rgba(var(--rgb-var), alpha)
    ];
    
    // CSS color keywords
    const colorKeywords = [
      'transparent', 'currentColor', 'inherit', 'initial', 'unset',
      'red', 'green', 'blue', 'white', 'black', 'gray', 'grey'
    ];
    
    return patterns.some(pattern => pattern.test(cleanValue)) || 
           colorKeywords.includes(cleanValue.toLowerCase());
  }
  
  isValidRGB(value) {
    const cleanValue = value.trim();
    
    const patterns = [
      /^\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*$/,      // "r, g, b"
      /^var\(--[\w-]+\)$/,                                  // var(--rgb-variable)
      /^\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}$/            // "r,g,b" (no spaces)
    ];
    
    return patterns.some(pattern => pattern.test(cleanValue));
  }
  
  isCSSDFunction(value) {
    const cleanValue = value.trim();
    
    // CSS functions that are valid but might not match specific patterns
    const functionPatterns = [
      /^var\(--[\w-]+\)$/,                                  // var(--variable)
      /^rgb\(\s*var\(--[\w-]+\)\s*\)$/,                    // rgb(var(--variable))
      /^rgba\(\s*var\(--[\w-]+\)\s*,\s*[\d.]+\s*\)$/,     // rgba(var(--variable), alpha)
      /^calc\([^)]+\)$/,                                    // calc(expression)
      /^color-mix\([^)]+\)$/,                              // color-mix()
      /^hsl\(\s*var\(--[\w-]+\)\s*\)$/,                    // hsl(var(--variable))
      /^hsla\(\s*var\(--[\w-]+\)\s*,\s*[\d.]+\s*\)$/      // hsla(var(--variable), alpha)
    ];
    
    return functionPatterns.some(pattern => pattern.test(cleanValue));
  }
}

// Toggle edit mode
function toggleEditMode() {
  const textarea = document.getElementById('cssOutput');
  const editBtn = document.getElementById('editModeBtn');
  const applyBtn = document.getElementById('applyBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const separator = document.getElementById('editSeparator');
  const indicator = document.getElementById('editIndicator');
  const helpText = document.getElementById('editHelp');
  
  editMode = !editMode;
  
  if (editMode) {
    // Enter edit mode
    originalCSS = textarea.value;
    textarea.readOnly = false;
    textarea.classList.add('border-warning', 'shadow-sm');
    textarea.style.background = '#ffffff';
    
    // Show edit controls
    editBtn.classList.add('d-none');
    applyBtn.classList.remove('d-none');
    cancelBtn.classList.remove('d-none');
    separator.classList.remove('d-none');
    indicator.classList.remove('d-none');
    helpText.classList.remove('d-none');
    
    // Focus and select content
    textarea.focus();
    textarea.setSelectionRange(0, 0);
    
    // Clear any previous validation
    clearValidation();
  } else {
    // Exit edit mode
    exitEditMode();
  }
}

function exitEditMode() {
  const textarea = document.getElementById('cssOutput');
  const editBtn = document.getElementById('editModeBtn');
  const applyBtn = document.getElementById('applyBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const separator = document.getElementById('editSeparator');
  const indicator = document.getElementById('editIndicator');
  const helpText = document.getElementById('editHelp');
  
  textarea.readOnly = true;
  textarea.classList.remove('border-warning', 'shadow-sm');
  textarea.style.background = '#f8f9fa';
  
  // Hide edit controls
  editBtn.classList.remove('d-none');
  applyBtn.classList.add('d-none');
  cancelBtn.classList.add('d-none');
  separator.classList.add('d-none');
  indicator.classList.add('d-none');
  helpText.classList.add('d-none');
  
  editMode = false;
  clearValidation();
}

function cancelEdit() {
  document.getElementById('cssOutput').value = originalCSS;
  exitEditMode();
  showToast('Edit cancelled', 'secondary');
}

// Apply CSS changes
function applyCSSChanges() {
  const cssText = document.getElementById('cssOutput').value;
  
  // Initialize validator and extract variables
  if (!cssValidator) {
    cssValidator = new CSSValidator();
  }
  
  const { variables, errors, warnings } = cssValidator.validate(cssText);
  
  // Check if this is likely the original generated CSS (skip strict validation)
  const isOriginalCSS = cssText === originalCSS || cssText === window.rawCssOutput;
  
  if (!isOriginalCSS) {
    // Only validate and show errors if user has actually changed the CSS
    if (errors.length > 0) {
      // Filter out errors that are actually valid CSS functions
      const criticalErrors = errors.filter(error => {
        return !cssValidator.isCSSDFunction(error.value || '');
      });
      
      if (criticalErrors.length > 0) {
        showValidationErrors(criticalErrors, warnings);
        return;
      }
    }
    
    // Show warnings if any (but still apply)
    if (warnings.length > 0) {
      showValidationWarnings(warnings);
    }
  }
  
  // Apply variables to DOM
  Object.entries(variables).forEach(([name, value]) => {
    document.documentElement.style.setProperty(name, value);
  });
  
  // Update form inputs based on imported variables
  updateFormFromVariables(variables);
  
  // Trigger theme update
  if (window.updateTheme) {
    window.updateTheme();
  }
  
  // Exit edit mode
  exitEditMode();
  
  // Show success message
  showToast('CSS variables applied successfully!', 'success');
  
  // Update React preview if available
  if (window.reactPreviewManager) {
    setTimeout(() => {
      window.reactPreviewManager.updateTheme();
    }, 100);
  }
}

// Update form inputs from CSS variables
function updateFormFromVariables(variables) {
  // Map CSS variables to form inputs
  const mappings = {
    '--bs-primary': 'primary',
    '--bs-secondary': 'secondary',
    '--bs-success': 'success',
    '--bs-danger': 'danger',
    '--bs-warning': 'warning',
    '--bs-info': 'info',
    '--bs-light': 'light',
    '--bs-dark': 'dark',
    '--bs-border-radius': 'borderRadius',
    '--bs-font-family': 'fontFamily',
    '--bs-heading-font-family': 'headingFontFamily'
  };
  
  Object.entries(mappings).forEach(([cssVar, inputId]) => {
    if (variables[cssVar]) {
      const input = document.getElementById(inputId);
      if (input) {
        let value = variables[cssVar];
        
        // Clean up values
        if (cssVar.includes('color') || cssVar.includes('primary') || cssVar.includes('secondary') || 
            cssVar.includes('success') || cssVar.includes('danger') || cssVar.includes('warning') || 
            cssVar.includes('info') || cssVar.includes('light') || cssVar.includes('dark')) {
          // Ensure hex format for color inputs
          if (value.startsWith('#')) {
            input.value = value;
          }
        } else if (cssVar === '--bs-border-radius') {
          // Extract numeric value from rem/px
          const numMatch = value.match(/^([\d.]+)/);
          if (numMatch) {
            input.value = numMatch[1];
          }
        } else if (cssVar.includes('font-family')) {
          // Handle font family
          const fontValue = value.replace(/["']/g, '').split(',')[0].trim();
          
          // Try to find matching option
          const options = Array.from(input.options);
          const matchingOption = options.find(opt => 
            opt.value.toLowerCase().includes(fontValue.toLowerCase()) ||
            fontValue.toLowerCase().includes(opt.value.toLowerCase())
          );
          
          if (matchingOption) {
            input.value = matchingOption.value;
          }
        } else {
          input.value = value;
        }
        
        // Trigger change event
        const event = new Event('input', { bubbles: true });
        input.dispatchEvent(event);
      }
    }
  });
}

// Validation UI
function showValidationErrors(errors, warnings = []) {
  const panel = document.getElementById('validationPanel');
  panel.classList.remove('d-none');
  
  let html = '<div class="alert alert-danger">';
  html += '<h6 class="alert-heading"><i class="bi bi-exclamation-triangle me-2"></i>Validation Errors</h6>';
  html += '<ul class="mb-0">';
  errors.forEach(error => {
    html += `<li><strong>${error.variable || 'CSS'}</strong>: ${error.message}</li>`;
  });
  html += '</ul>';
  html += '</div>';
  
  if (warnings.length > 0) {
    html += '<div class="alert alert-warning">';
    html += '<h6 class="alert-heading"><i class="bi bi-info-circle me-2"></i>Warnings</h6>';
    html += '<ul class="mb-0">';
    warnings.forEach(warning => {
      html += `<li><strong>${warning.variable}</strong>: ${warning.message}</li>`;
    });
    html += '</ul>';
    html += '</div>';
  }
  
  panel.innerHTML = html;
}

function showValidationWarnings(warnings) {
  const panel = document.getElementById('validationPanel');
  panel.classList.remove('d-none');
  
  let html = '<div class="alert alert-warning">';
  html += '<h6 class="alert-heading"><i class="bi bi-info-circle me-2"></i>Warnings</h6>';
  html += '<ul class="mb-0">';
  warnings.forEach(warning => {
    html += `<li><strong>${warning.variable}</strong>: ${warning.message}</li>`;
  });
  html += '</ul>';
  html += '<p class="mt-2 mb-0 small">The CSS has been applied despite these warnings.</p>';
  html += '</div>';
  
  panel.innerHTML = html;
  
  // Auto-hide warnings after 5 seconds
  setTimeout(() => {
    if (!editMode) {
      clearValidation();
    }
  }, 5000);
}

function clearValidation() {
  const panel = document.getElementById('validationPanel');
  panel.classList.add('d-none');
  panel.innerHTML = '';
}

// Toast notifications
function showToast(message, type = 'info') {
  // Create toast container if it doesn't exist
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    toastContainer.style.zIndex = '9999';
    document.body.appendChild(toastContainer);
  }
  
  // Create toast
  const toastId = 'toast-' + Date.now();
  const toast = document.createElement('div');
  toast.id = toastId;
  toast.className = `toast align-items-center text-white bg-${type} border-0`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  toast.setAttribute('aria-atomic', 'true');
  
  const icon = type === 'success' ? 'check-circle' : 
               type === 'danger' ? 'exclamation-triangle' : 
               type === 'warning' ? 'exclamation-circle' : 
               'info-circle';
  
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        <i class="bi bi-${icon} me-2"></i>${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;
  
  toastContainer.appendChild(toast);
  
  // Show toast
  const bsToast = new bootstrap.Toast(toast, {
    delay: 3000
  });
  bsToast.show();
  
  // Remove toast after it's hidden
  toast.addEventListener('hidden.bs.toast', () => {
    toast.remove();
  });
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Only if CSS tab is active
  const cssTab = document.getElementById('css-code-tab');
  if (!cssTab || !cssTab.classList.contains('active')) {
    return;
  }
  
  // Ctrl/Cmd + E = Toggle Edit Mode
  if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
    e.preventDefault();
    toggleEditMode();
  }
  
  // Ctrl/Cmd + S = Apply (when in edit mode)
  if (editMode && (e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    applyCSSChanges();
  }
  
  // ESC = Cancel edit
  if (editMode && e.key === 'Escape') {
    e.preventDefault();
    cancelEdit();
  }
});

// Helper function to format CSS for display
function formatCSS(cssText) {
  // Ensure proper formatting
  return cssText
    .replace(/}\s*/g, '}\n')
    .replace(/{\s*/g, ' {\n  ')
    .replace(/;\s*/g, ';\n  ')
    .replace(/\n\s*\n/g, '\n')
    .trim();
}

// Export for use in other scripts
window.cssEditor = {
  toggleEditMode,
  applyCSSChanges,
  cancelEdit,
  formatCSS
};

console.log('✅ CSS Editor initialized');