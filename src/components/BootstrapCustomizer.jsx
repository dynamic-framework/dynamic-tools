import React, { useState, useEffect } from 'react';
import './BootstrapCustomizer.css';

const BootstrapCustomizer = () => {
  const [variables, setVariables] = useState(new Map());
  const [cssOutput, setCssOutput] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  // Default Bootstrap values
  const defaultValues = {
    '--bs-primary': '#0d6efd',
    '--bs-secondary': '#6c757d',
    '--bs-success': '#198754',
    '--bs-warning': '#ffc107',
    '--bs-danger': '#dc3545',
    '--bs-info': '#0dcaf0',
    '--bs-font-sans-serif': 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',
    '--bs-body-font-size': '16px',
    '--bs-border-radius': '6px'
  };

  // Initialize variables with defaults
  useEffect(() => {
    const initVariables = new Map();
    Object.entries(defaultValues).forEach(([key, value]) => {
      initVariables.set(key, value);
    });
    setVariables(initVariables);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // defaultValues is constant, no need to include in deps

  // Update CSS output when variables change
  useEffect(() => {
    const generateCSSOutput = () => {
      let css = ':root {\n';
      variables.forEach((value, variable) => {
        css += `  ${variable}: ${value};\n`;
      });
      css += '}';
      
      css += '\n\n/* \n * Copia este CSS y añádelo a tu hoja de estilos personalizada\n * para aplicar estos cambios a Bootstrap.\n */';
      
      setCssOutput(css);
    };

    const applyCSSVariables = () => {
      const root = document.documentElement;
      variables.forEach((value, variable) => {
        root.style.setProperty(variable, value);
      });
    };

    generateCSSOutput();
    applyCSSVariables();
  }, [variables]);

  const updateVariable = (variable, value) => {
    const newVariables = new Map(variables);
    newVariables.set(variable, value);
    setVariables(newVariables);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateCSS());
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = generateCSS();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const generateCSS = () => {
    let css = ':root {\n';
    variables.forEach((value, variable) => {
      css += `  ${variable}: ${value};\n`;
    });
    css += '}';
    return css;
  };

  const downloadCSS = () => {
    const css = generateCSS();
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bootstrap-custom-variables.css';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetToDefaults = () => {
    const newVariables = new Map();
    Object.entries(defaultValues).forEach(([key, value]) => {
      newVariables.set(key, value);
    });
    setVariables(newVariables);
  };

  const ColorInput = ({ label, variable, value }) => (
    <div className="bootstrap-form-group">
      <label className="bootstrap-label">{label}</label>
      <div className="bootstrap-color-input-group">
        <input
          type="color"
          value={value}
          onChange={(e) => updateVariable(variable, e.target.value)}
          className="bootstrap-color-input"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => {
            if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(e.target.value)) {
              updateVariable(variable, e.target.value);
            }
          }}
          className="bootstrap-text-input"
        />
      </div>
    </div>
  );

  const RangeInput = ({ label, variable, value, min, max, unit = 'px' }) => {
    const numericValue = parseInt(value) || 0;
    return (
      <div className="bootstrap-form-group">
        <label className="bootstrap-label">{label}</label>
        <div className="bootstrap-range-group">
          <input
            type="range"
            min={min}
            max={max}
            value={numericValue}
            onChange={(e) => updateVariable(variable, e.target.value + unit)}
            className="bootstrap-range-input"
          />
          <span className="bootstrap-range-value">{value}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="bootstrap-customizer">
      <div className="bootstrap-customizer-container">
        {/* Sidebar with Controls */}
        <div className="bootstrap-sidebar">
          <h3 className="bootstrap-title">Bootstrap Customizer</h3>
          
          {/* Theme Colors Section */}
          <div className="bootstrap-section">
            <h4 className="bootstrap-section-title">Colores del Tema</h4>
            <ColorInput label="Primary" variable="--bs-primary" value={variables.get('--bs-primary') || defaultValues['--bs-primary']} />
            <ColorInput label="Secondary" variable="--bs-secondary" value={variables.get('--bs-secondary') || defaultValues['--bs-secondary']} />
            <ColorInput label="Success" variable="--bs-success" value={variables.get('--bs-success') || defaultValues['--bs-success']} />
            <ColorInput label="Warning" variable="--bs-warning" value={variables.get('--bs-warning') || defaultValues['--bs-warning']} />
            <ColorInput label="Danger" variable="--bs-danger" value={variables.get('--bs-danger') || defaultValues['--bs-danger']} />
            <ColorInput label="Info" variable="--bs-info" value={variables.get('--bs-info') || defaultValues['--bs-info']} />
          </div>

          {/* Typography Section */}
          <div className="bootstrap-section">
            <h4 className="bootstrap-section-title">Tipografía</h4>
            <div className="bootstrap-form-group">
              <label className="bootstrap-label">Familia de Fuente</label>
              <select
                value={variables.get('--bs-font-sans-serif') || defaultValues['--bs-font-sans-serif']}
                onChange={(e) => updateVariable('--bs-font-sans-serif', e.target.value)}
                className="bootstrap-select"
              >
                <option value="system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif">Sistema (Predeterminada)</option>
                <option value="'Times New Roman', Times, serif">Times New Roman</option>
                <option value="'Arial', sans-serif">Arial</option>
                <option value="'Helvetica Neue', Helvetica, Arial, sans-serif">Helvetica</option>
                <option value="'Georgia', serif">Georgia</option>
                <option value="'Roboto', sans-serif">Roboto</option>
              </select>
            </div>
            <RangeInput
              label="Tamaño Base"
              variable="--bs-body-font-size"
              value={variables.get('--bs-body-font-size') || defaultValues['--bs-body-font-size']}
              min="12"
              max="20"
              unit="px"
            />
          </div>

          {/* Border Radius Section */}
          <div className="bootstrap-section">
            <h4 className="bootstrap-section-title">Bordes</h4>
            <RangeInput
              label="Radio de Borde"
              variable="--bs-border-radius"
              value={variables.get('--bs-border-radius') || defaultValues['--bs-border-radius']}
              min="0"
              max="20"
              unit="px"
            />
          </div>

          {/* Actions */}
          <div className="bootstrap-actions">
            <button
              onClick={copyToClipboard}
              className={`bootstrap-btn bootstrap-btn-primary ${copySuccess ? 'copy-success' : ''}`}
            >
              {copySuccess ? '✅ ¡Copiado!' : '📋 Copiar CSS'}
            </button>
            <button onClick={resetToDefaults} className="bootstrap-btn bootstrap-btn-secondary">
              🔄 Restablecer
            </button>
            <button onClick={downloadCSS} className="bootstrap-btn bootstrap-btn-info">
              💾 Descargar CSS
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bootstrap-main-content">
          <div className="bootstrap-content">
            <h2 className="bootstrap-preview-title">Vista Previa de Bootstrap Personalizado</h2>
            
            {/* Preview Components */}
            <div className="bootstrap-preview-grid">
              <div className="bootstrap-preview-section">
                <h3>Botones</h3>
                <div className="bootstrap-button-group">
                  <button className="btn-preview btn-primary">Primary</button>
                  <button className="btn-preview btn-secondary">Secondary</button>
                  <button className="btn-preview btn-success">Success</button>
                  <button className="btn-preview btn-warning">Warning</button>
                  <button className="btn-preview btn-danger">Danger</button>
                  <button className="btn-preview btn-info">Info</button>
                </div>
              </div>

              <div className="bootstrap-preview-section">
                <h3>Alertas</h3>
                <div className="alert-preview alert-primary">Esta es una alerta primary</div>
                <div className="alert-preview alert-success">Esta es una alerta success</div>
                <div className="alert-preview alert-warning">Esta es una alerta warning</div>
                <div className="alert-preview alert-danger">Esta es una alerta danger</div>
              </div>

              <div className="bootstrap-preview-section">
                <h3>Tarjetas</h3>
                <div className="card-preview">
                  <div className="card-preview-header">Encabezado de tarjeta</div>
                  <div className="card-preview-body">
                    <h5>Título de tarjeta</h5>
                    <p>Contenido de ejemplo para la tarjeta.</p>
                    <button className="btn-preview btn-primary">Ir a algún lugar</button>
                  </div>
                </div>
              </div>

              <div className="bootstrap-preview-section">
                <h3>Formularios</h3>
                <form className="form-preview">
                  <div className="form-group-preview">
                    <label>Correo electrónico</label>
                    <input type="email" placeholder="nombre@ejemplo.com" className="form-input-preview" />
                  </div>
                  <div className="form-group-preview">
                    <label>Seleccionar opción</label>
                    <select className="form-select-preview">
                      <option>Opción 1</option>
                      <option>Opción 2</option>
                      <option>Opción 3</option>
                    </select>
                  </div>
                  <button type="button" className="btn-preview btn-primary">Enviar</button>
                </form>
              </div>
            </div>

            {/* CSS Output */}
            <div className="bootstrap-css-section">
              <h3>CSS Generado</h3>
              <div className="bootstrap-css-card">
                <div className="bootstrap-css-header">
                  <span>Personalización CSS</span>
                  <button onClick={copyToClipboard} className="bootstrap-btn-small">
                    Copiar
                  </button>
                </div>
                <div className="bootstrap-css-body">
                  <pre className="bootstrap-css-output">{cssOutput}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BootstrapCustomizer;