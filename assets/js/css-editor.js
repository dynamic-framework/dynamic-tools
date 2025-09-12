// css-editor.js - Bidirectional CSS editor for Theme Generator
let originalCSS = '';
let editMode = false;
let cssValidator = null;

// Initialize validator
class CSSValidator {
  constructor(strictMode = false) {
    this.strictMode = strictMode; // Disable strict mode by default for Dynamic Framework
    this.knownVariables = new Set([
      // Core Bootstrap colors and Dynamic Framework extended colors
      '--bs-primary', '--bs-primary-rgb',
      '--bs-secondary', '--bs-secondary-rgb',
      '--bs-success', '--bs-success-rgb',
      '--bs-danger', '--bs-danger-rgb',
      '--bs-warning', '--bs-warning-rgb',
      '--bs-info', '--bs-info-rgb',
      '--bs-light', '--bs-light-rgb',
      '--bs-dark', '--bs-dark-rgb',
      
      // Extended color palette for Dynamic Framework
      '--bs-blue', '--bs-blue-rgb',
      '--bs-indigo', '--bs-indigo-rgb',
      '--bs-purple', '--bs-purple-rgb',
      '--bs-pink', '--bs-pink-rgb',
      '--bs-red', '--bs-red-rgb',
      '--bs-orange', '--bs-orange-rgb',
      '--bs-yellow', '--bs-yellow-rgb',
      '--bs-green', '--bs-green-rgb',
      '--bs-teal', '--bs-teal-rgb',
      '--bs-cyan', '--bs-cyan-rgb',
      '--bs-black', '--bs-black-rgb',
      '--bs-white', '--bs-white-rgb',
      '--bs-gray', '--bs-gray-rgb',
      '--bs-gray-dark', '--bs-gray-dark-rgb',
      
      // Gray scale variants
      '--bs-gray-25', '--bs-gray-25-rgb',
      '--bs-gray-50', '--bs-gray-50-rgb',
      '--bs-gray-100', '--bs-gray-100-rgb',
      '--bs-gray-200', '--bs-gray-200-rgb',
      '--bs-gray-300', '--bs-gray-300-rgb',
      '--bs-gray-400', '--bs-gray-400-rgb',
      '--bs-gray-500', '--bs-gray-500-rgb',
      '--bs-gray-600', '--bs-gray-600-rgb',
      '--bs-gray-700', '--bs-gray-700-rgb',
      '--bs-gray-800', '--bs-gray-800-rgb',
      '--bs-gray-900', '--bs-gray-900-rgb',
      
      // Surface colors
      '--bs-surface-gray', '--bs-surface-gray-rgb',
      '--bs-surface-primary', '--bs-surface-primary-rgb',
      '--bs-surface-secondary', '--bs-surface-secondary-rgb',
      '--bs-surface-success', '--bs-surface-success-rgb',
      '--bs-surface-info', '--bs-surface-info-rgb',
      '--bs-surface-warning', '--bs-surface-warning-rgb',
      '--bs-surface-danger', '--bs-surface-danger-rgb',
      
      // Soft colors
      '--bs-gray-soft', '--bs-gray-soft-rgb',
      '--bs-primary-soft', '--bs-primary-soft-rgb',
      '--bs-secondary-soft', '--bs-secondary-soft-rgb',
      '--bs-success-soft', '--bs-success-soft-rgb',
      '--bs-info-soft', '--bs-info-soft-rgb',
      '--bs-warning-soft', '--bs-warning-soft-rgb',
      '--bs-danger-soft', '--bs-danger-soft-rgb',
      
      // Color scales (25-900 for primary, secondary, success, info, warning, danger)
      ...this.generateColorScales(),
      
      // Typography
      '--bs-font-family', '--bs-heading-font-family',
      '--bs-font-sans-serif', '--bs-font-monospace',
      '--bs-body-font-family', '--bs-body-font-size', '--bs-body-font-weight',
      '--bs-body-line-height', '--bs-letter-spacing',
      '--bs-root-font-size', '--bs-gradient',
      '--bs-h1-font-size', '--bs-h2-font-size', '--bs-h3-font-size',
      '--bs-h4-font-size', '--bs-h5-font-size', '--bs-h6-font-size',
      '--bs-heading-font-weight', '--bs-heading-line-height', '--bs-heading-color',
      
      // Font sizes
      '--bs-fs-1', '--bs-fs-2', '--bs-fs-3', '--bs-fs-4', '--bs-fs-5', '--bs-fs-6',
      '--bs-fs-small', '--bs-fs-body-large', '--bs-fs-body-medium', 
      '--bs-fs-body-normal', '--bs-fs-body-small', '--bs-fs-body-tiny',
      '--bs-fs-display-1', '--bs-fs-display-2', '--bs-fs-display-3',
      '--bs-fs-display-4', '--bs-fs-display-5', '--bs-fs-display-6',
      
      // RFS variants
      '--bs-rfs-fs-1', '--bs-rfs-fs-2', '--bs-rfs-fs-3', '--bs-rfs-fs-4', 
      '--bs-rfs-fs-5', '--bs-rfs-fs-6', '--bs-rfs-fs-small',
      '--bs-rfs-fs-body-large', '--bs-rfs-fs-body-medium', '--bs-rfs-fs-body-normal',
      '--bs-rfs-fs-body-small', '--bs-rfs-fs-body-tiny',
      '--bs-rfs-display-1', '--bs-rfs-display-2', '--bs-rfs-display-3',
      '--bs-rfs-display-4', '--bs-rfs-display-5', '--bs-rfs-display-6',
      
      // Font weights
      '--bs-fw-lighter', '--bs-fw-light', '--bs-fw-normal',
      '--bs-fw-semibold', '--bs-fw-bold', '--bs-fw-bolder',
      
      // Line heights
      '--bs-lh-base', '--bs-lh-sm', '--bs-lh-lg',
      
      // Borders and shadows
      '--bs-border-radius', '--bs-border-radius-sm', '--bs-border-radius-lg',
      '--bs-border-radius-xl', '--bs-border-radius-xxl', '--bs-border-radius-2xl',
      '--bs-border-radius-pill', '--bs-border-width', '--bs-border-color',
      '--bs-border-style', '--bs-border-color-translucent',
      '--bs-box-shadow', '--bs-box-shadow-sm', '--bs-box-shadow-lg',
      '--bs-box-shadow-inset',
      
      // Body and text
      '--bs-body-bg', '--bs-body-bg-rgb',
      '--bs-body-color', '--bs-body-color-rgb',
      '--bs-emphasis-color', '--bs-emphasis-color-rgb',
      '--bs-secondary-color', '--bs-secondary-color-rgb',
      '--bs-secondary-bg', '--bs-secondary-bg-rgb',
      '--bs-tertiary-color', '--bs-tertiary-color-rgb',
      '--bs-tertiary-bg', '--bs-tertiary-bg-rgb',
      '--bs-code-color', '--bs-code-color-rgb',
      '--bs-highlight-bg',
      
      // Text emphasis and backgrounds
      '--bs-primary-text-emphasis', '--bs-secondary-text-emphasis',
      '--bs-success-text-emphasis', '--bs-info-text-emphasis',
      '--bs-warning-text-emphasis', '--bs-danger-text-emphasis',
      '--bs-light-text-emphasis', '--bs-dark-text-emphasis',
      '--bs-primary-bg-subtle', '--bs-secondary-bg-subtle',
      '--bs-success-bg-subtle', '--bs-info-bg-subtle',
      '--bs-warning-bg-subtle', '--bs-danger-bg-subtle',
      '--bs-light-bg-subtle', '--bs-dark-bg-subtle',
      '--bs-primary-border-subtle', '--bs-secondary-border-subtle',
      '--bs-success-border-subtle', '--bs-info-border-subtle',
      '--bs-warning-border-subtle', '--bs-danger-border-subtle',
      '--bs-light-border-subtle', '--bs-dark-border-subtle',
      
      // Focus ring
      '--bs-focus-ring-width', '--bs-focus-ring-opacity',
      '--bs-focus-ring-border-color-rgb', '--bs-focus-ring-border-color',
      '--bs-focus-ring-base-color-rgb', '--bs-focus-ring-base-color',
      '--bs-focus-ring-color',
      
      // Forms
      '--bs-form-valid-color', '--bs-form-valid-border-color',
      '--bs-form-invalid-color', '--bs-form-invalid-border-color',
      '--bs-form-feedback-icon-valid', '--bs-form-feedback-icon-invalid',
      
      // Labels
      '--bs-label-padding-y', '--bs-label-padding-x',
      '--bs-label-margin-bottom', '--bs-label-font-size',
      '--bs-label-font-weight', '--bs-label-color',
      
      // Button variables
      '--bs-btn-border-radius', '--bs-btn-lg-border-radius', '--bs-btn-sm-border-radius',
      ...this.generateButtonVariables(),
      
      // Links
      '--bs-link-color', '--bs-link-color-rgb',
      '--bs-link-hover-color', '--bs-link-hover-color-rgb',
      '--bs-link-decoration', '--bs-link-hover-decoration',
      
      // Components
      '--bs-card-bg', '--bs-card-border-color',
      '--bs-nav-link-color', '--bs-nav-link-hover-color',
      '--bs-nav-tabs-border-color', '--bs-nav-tabs-link-active-color',
      '--bs-navbar-color', '--bs-navbar-hover-color',
      '--bs-navbar-active-color', '--bs-navbar-brand-color',
      
      // Spacers
      ...Array.from({length: 31}, (_, i) => `--bs-ref-spacer-${i}`),
      
      // Accordion
      '--bs-default-placeholder-bg',
      '--bs-default-accordion-padding-x', '--bs-default-accordion-padding-y',
      '--bs-default-accordion-color', '--bs-default-accordion-bg',
      '--bs-default-accordion-transition', '--bs-default-accordion-border-color',
      '--bs-default-accordion-border-width', '--bs-default-accordion-border-radius',
      '--bs-default-accordion-inner-border-radius',
      '--bs-default-accordion-btn-padding-x', '--bs-default-accordion-btn-padding-y',
      '--bs-default-accordion-btn-color', '--bs-default-accordion-btn-bg',
      '--bs-default-accordion-btn-icon', '--bs-default-accordion-btn-icon-width',
      '--bs-default-accordion-btn-icon-transform', '--bs-default-accordion-btn-icon-transition',
      '--bs-default-accordion-btn-active-icon', '--bs-default-accordion-btn-focus-box-shadow',
      '--bs-default-accordion-btn-font-weight', '--bs-default-accordion-btn-font-size',
      '--bs-default-accordion-body-padding-top', '--bs-default-accordion-body-padding-x',
      '--bs-default-accordion-body-padding-y',
      '--bs-default-accordion-active-color', '--bs-default-accordion-active-bg'
    ]);
  }
  
  generateColorScales() {
    const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'];
    const scales = ['25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
    const result = [];
    
    colors.forEach(color => {
      scales.forEach(scale => {
        result.push(`--bs-${color}-${scale}`);
        result.push(`--bs-${color}-${scale}-rgb`);
      });
    });
    
    return result;
  }
  
  generateButtonVariables() {
    const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark'];
    const variants = ['', 'outline-', 'link-'];
    const states = [
      'color', 'bg', 'border-color', 'box-shadow',
      'hover-color', 'hover-bg', 'hover-border-color',
      'focus-color', 'focus-bg', 'focus-border-color', 'focus-shadow-rgb',
      'active-color', 'active-bg', 'active-border-color', 'active-box-shadow',
      'disabled-color', 'disabled-bg', 'disabled-border-color', 'disabled-opacity'
    ];
    const result = [];
    
    colors.forEach(color => {
      variants.forEach(variant => {
        states.forEach(state => {
          result.push(`--bs-btn-${variant}${color}-${state}`);
        });
      });
    });
    
    return result;
  }
  
  validate(cssText) {
    const errors = [];
    const warnings = [];
    const variables = {};
    
    // Extract :root section - support various Dynamic Framework selector formats
    // More flexible regex that matches any selector containing :root
    const rootMatch = cssText.match(/([^{]*:root[^{]*)\s*{([^}]*)}/s);
    if (!rootMatch) {
      errors.push({
        type: 'structure',
        message: 'No :root selector found. CSS variables must be defined within :root { } or [data-bs-theme] :root { }'
      });
      return { variables, errors, warnings };
    }
    
    const content = rootMatch[2]; // Use the second capture group for the content
    
    // Parse variables
    const varRegex = /(--[\w-]+):\s*([^;]+);/g;
    let match;
    
    while ((match = varRegex.exec(content)) !== null) {
      const [, name, value] = match;
      variables[name] = value.trim();
      
      // Check if it's a known variable (only warn if strict mode is enabled)
      // For Dynamic Framework, we allow many extended variables
      if (!this.knownVariables.has(name) && name.startsWith('--bs-') && this.strictMode) {
        warnings.push({
          type: 'unknown',
          variable: name,
          message: `"${name}" is not a standard Bootstrap/Dynamic Framework variable`
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
    // Variables that are NOT colors despite their names
    const nonColorVariables = [
      'box-shadow', 'opacity', 'weight', 'width', 'height', 'size', 'radius',
      'padding', 'margin', 'font', 'line', 'letter', 'spacing', 'index', 'duration',
      'delay', 'timing', 'transition', 'transform', 'scale', 'rotate', 'translate'
    ];
    
    // Check if variable contains non-color keywords
    if (nonColorVariables.some(keyword => name.includes(keyword))) {
      return false;
    }
    
    // Check for actual color variables
    return name.includes('color') || 
           ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'].some(color => 
             name.includes(color) && !name.endsWith('-rgb')
           );
  }
  
  isValidColor(value) {
    const cleanValue = value.trim();
    
    // For non-color variables that got through, accept any value
    if (cleanValue === 'transparent' || cleanValue === '0 0 0 transparent' || 
        cleanValue === 'none' || cleanValue === 'lighter' || 
        /^\d+$/.test(cleanValue) || /^[\d.]+$/.test(cleanValue)) {
      return true;
    }
    
    // Basic color patterns
    const patterns = [
      /^#[0-9A-F]{6}$/i,                                    // #hex6
      /^#[0-9A-F]{3}$/i,                                    // #hex3
      /^#[0-9A-F]{8}$/i,                                    // #hex8 with alpha
      /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/,          // rgb(r,g,b)
      /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$/, // rgba(r,g,b,a)
      /^hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/,        // hsl(h,s,l)
      /^hsla\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*,\s*[\d.]+\s*\)$/, // hsla(h,s,l,a)
      /^var\(--[\w-]+\)$/,                                  // var(--variable)
      /^rgb\(\s*var\(--[\w-]+\)\s*\)$/,                    // rgb(var(--rgb-variable))
      /^rgba\(\s*var\(--[\w-]+\)\s*,\s*[\w\s(),.-]+\)$/   // rgba with complex var
    ];
    
    // CSS color keywords
    const colorKeywords = [
      'transparent', 'currentColor', 'inherit', 'initial', 'unset',
      'red', 'green', 'blue', 'white', 'black', 'gray', 'grey',
      'silver', 'maroon', 'olive', 'lime', 'aqua', 'teal', 'navy',
      'fuchsia', 'purple', 'yellow', 'orange'
    ];
    
    return patterns.some(pattern => pattern.test(cleanValue)) || 
           colorKeywords.includes(cleanValue.toLowerCase()) ||
           this.isCSSDFunction(value);  // Accept any CSS function
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
      /^rgba\([^)]+\)$/,                                    // rgba with any content
      /^calc\([^)]+\)$/,                                    // calc(expression)
      /^color-mix\([^)]+\)$/,                              // color-mix()
      /^hsl\(\s*var\(--[\w-]+\)\s*\)$/,                    // hsl(var(--variable))
      /^hsla\([^)]+\)$/,                                    // hsla with any content
      /^url\([^)]+\)$/,                                     // url() for images
      /^linear-gradient\([^)]+\)$/,                        // gradients
      /^radial-gradient\([^)]+\)$/,
      /^conic-gradient\([^)]+\)$/,
      /^min\([^)]+\)$/,                                     // CSS math functions
      /^max\([^)]+\)$/,
      /^clamp\([^)]+\)$/
    ];
    
    // Check if it contains any CSS function keyword
    const functionKeywords = ['var(', 'rgb(', 'rgba(', 'hsl(', 'hsla(', 'calc(', 
                             'url(', 'gradient(', 'min(', 'max(', 'clamp('];
    
    return functionPatterns.some(pattern => pattern.test(cleanValue)) ||
           functionKeywords.some(keyword => cleanValue.includes(keyword));
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
  
  // Trigger theme update - check for both possible update functions
  if (window.updateCssVariables) {
    window.updateCssVariables();
  } else if (window.updateTheme) {
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

// Convert any CSS color format to hex
function convertToHex(color) {
  if (!color) return null;
  
  // Trim and clean the color value
  color = color.trim();
  
  // If already hex, return as-is
  if (/^#[0-9A-F]{6}$/i.test(color)) {
    return color.toUpperCase();
  }
  
  // If it's a short hex, expand it
  if (/^#[0-9A-F]{3}$/i.test(color)) {
    const r = color[1];
    const g = color[2];
    const b = color[3];
    return '#' + r + r + g + g + b + b;
  }
  
  // Handle rgb(var(--bs-*-rgb)) format
  if (color.includes('rgb(var(')) {
    // Extract the variable name and try to get its value
    const varMatch = color.match(/var\((--bs-[\w-]+-rgb)\)/);
    if (varMatch) {
      const rgbVar = getComputedStyle(document.documentElement).getPropertyValue(varMatch[1]).trim();
      if (rgbVar) {
        const [r, g, b] = rgbVar.split(',').map(v => parseInt(v.trim()));
        if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
          return '#' + [r, g, b].map(x => {
            const hex = x.toString(16).toUpperCase();
            return hex.length === 1 ? '0' + hex : hex;
          }).join('');
        }
      }
    }
  }
  
  // Named colors map (common CSS colors)
  const namedColors = {
    'green': '#008000',
    'red': '#FF0000',
    'blue': '#0000FF',
    'yellow': '#FFFF00',
    'cyan': '#00FFFF',
    'magenta': '#FF00FF',
    'black': '#000000',
    'white': '#FFFFFF',
    'gray': '#808080',
    'grey': '#808080',
    'orange': '#FFA500',
    'purple': '#800080',
    'brown': '#A52A2A',
    'pink': '#FFC0CB',
    'lime': '#00FF00',
    'navy': '#000080',
    'teal': '#008080',
    'olive': '#808000',
    'maroon': '#800000',
    'aqua': '#00FFFF'
  };
  
  // Check if it's a named color
  if (namedColors[color.toLowerCase()]) {
    return namedColors[color.toLowerCase()];
  }
  
  // Try to compute the color using a temporary element
  const tempElem = document.createElement('div');
  tempElem.style.color = color;
  tempElem.style.display = 'none';
  document.body.appendChild(tempElem);
  
  const computedColor = getComputedStyle(tempElem).color;
  document.body.removeChild(tempElem);
  
  // Parse rgb/rgba format
  const rgbMatch = computedColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1]);
    const g = parseInt(rgbMatch[2]);
    const b = parseInt(rgbMatch[3]);
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16).toUpperCase();
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }
  
  // Return null if we couldn't convert the color
  return null;
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
          // Convert color value to hex if possible
          const hexColor = convertToHex(value);
          if (hexColor) {
            input.value = hexColor;
            // Also update the associated text input if it exists
            const textInput = input.nextElementSibling;
            if (textInput && textInput.classList && textInput.classList.contains('color-value')) {
              textInput.value = hexColor;
            }
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