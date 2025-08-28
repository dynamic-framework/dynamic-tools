// react-preview.js
(async function initReactPreview() {
  console.log('🚀 Starting React Preview initialization...');
  
  let React, ReactDOM, DynamicUI;
  
  try {
    // Skip ESM for now and use UMD directly for better compatibility
    console.log('🔄 Loading React via UMD scripts...');
    
    // Wait for UMD scripts to load
    await new Promise((resolve, reject) => {
      let attempts = 0;
      const maxAttempts = 50; // 5 seconds max wait
      
      const checkUMD = () => {
        attempts++;
        
        if (window.React && window.ReactDOM) {
          React = window.React;
          ReactDOM = window.ReactDOM;
          console.log('✅ React and ReactDOM loaded via UMD');
          resolve();
        } else if (attempts >= maxAttempts) {
          reject(new Error('React UMD scripts failed to load after 5 seconds'));
        } else {
          setTimeout(checkUMD, 100);
        }
      };
      
      checkUMD();
    });
    
    // Skip Dynamic UI ESM import due to JSX runtime issues
    // Create mock Dynamic UI components using Bootstrap classes
    console.log('🔄 Creating Bootstrap-compatible React components...');
    
    DynamicUI = createMockDynamicUI(React);
    
    console.log('✅ Mock Dynamic UI components created:', Object.keys(DynamicUI));
    
    // Make available globally
    window.React = React;
    window.ReactDOM = ReactDOM;
    window.DynamicUI = DynamicUI;
    
    // Initialize preview manager
    window.reactPreviewManager = new ReactPreviewManager();
    
    console.log('✅ React Preview Manager initialized successfully');
    
  } catch (error) {
    console.error('❌ Error loading React modules:', error);
    showReactLoadError(error);
  }
})();

// Create mock Dynamic UI components using Bootstrap classes
function createMockDynamicUI(React) {
  const createElement = React.createElement;
  
  // DButton component
  const DButton = ({ theme = 'primary', text, children, ...props }) => {
    return createElement('button', {
      className: `btn btn-${theme}`,
      ...props
    }, text || children);
  };
  
  // DCard component with subcomponents
  const DCard = ({ children, ...props }) => {
    return createElement('div', {
      className: 'card',
      ...props
    }, children);
  };
  
  DCard.Header = ({ children, ...props }) => {
    return createElement('div', {
      className: 'card-header',
      ...props
    }, children);
  };
  
  DCard.Body = ({ children, ...props }) => {
    return createElement('div', {
      className: 'card-body',
      ...props
    }, children);
  };
  
  DCard.Footer = ({ children, ...props }) => {
    return createElement('div', {
      className: 'card-footer',
      ...props
    }, children);
  };
  
  // DAlert component
  const DAlert = ({ theme = 'primary', children, showClose = true, ...props }) => {
    return createElement('div', {
      className: `alert alert-${theme}${showClose ? ' alert-dismissible' : ''}`,
      role: 'alert',
      ...props
    }, children);
  };
  
  // DBadge component
  const DBadge = ({ theme = 'primary', text, children, soft = false, ...props }) => {
    const className = soft ? `badge text-bg-${theme} bg-opacity-25 text-${theme}` : `badge text-bg-${theme}`;
    return createElement('span', {
      className,
      ...props
    }, text || children);
  };
  
  // DInput component
  const DInput = ({ label, type = 'text', placeholder, ...props }) => {
    const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;
    
    return createElement('div', { className: 'mb-3' }, [
      label && createElement('label', {
        key: 'label',
        htmlFor: inputId,
        className: 'form-label'
      }, label),
      createElement('input', {
        key: 'input',
        type,
        className: 'form-control',
        id: inputId,
        placeholder,
        ...props
      })
    ]);
  };
  
  // DSelect component
  const DSelect = ({ label, options = [], ...props }) => {
    const selectId = `select-${Math.random().toString(36).substr(2, 9)}`;
    
    return createElement('div', { className: 'mb-3' }, [
      label && createElement('label', {
        key: 'label',
        htmlFor: selectId,
        className: 'form-label'
      }, label),
      createElement('select', {
        key: 'select',
        className: 'form-select',
        id: selectId,
        ...props
      }, options.map((option, index) => 
        createElement('option', {
          key: index,
          value: option.value
        }, option.label)
      ))
    ]);
  };
  
  // DContextProvider - simple pass-through
  const DContextProvider = ({ children, ...props }) => {
    return children;
  };
  
  return {
    DButton,
    DCard,
    DAlert,
    DBadge,
    DInput,
    DSelect,
    DContextProvider
  };
}

class ReactPreviewManager {
  constructor() {
    this.container = document.getElementById('react-preview-container');
    this.React = window.React;
    this.ReactDOM = window.ReactDOM;
    this.DynamicUI = window.DynamicUI;
    
    if (!this.container) {
      console.error('❌ React preview container not found');
      return;
    }
    
    if (!this.React || !this.ReactDOM || !this.DynamicUI) {
      console.error('❌ Required React modules not loaded');
      return;
    }
    
    // Log componentes disponibles
    console.log('🎯 Dynamic UI Components loaded:', Object.keys(this.DynamicUI));
    
    // Renderizar inicial
    this.render();
  }
  
  render() {
    try {
      const { React, ReactDOM, DynamicUI } = this;
      
      // Extraer componentes específicos
      const { 
        DButton, 
        DCard, 
        DAlert, 
        DBadge, 
        DInput, 
        DSelect,
        DContextProvider 
      } = DynamicUI;
      
      // Crear app con componentes
      const App = React.createElement('div', { className: 'preview-sections' }, [
        
        // Sección Buttons
        React.createElement('div', { key: 'buttons', className: 'mb-4' }, [
          React.createElement('h4', { key: 'title', className: 'mb-3' }, 'Buttons'),
          React.createElement('div', { key: 'content', className: 'd-flex gap-2 flex-wrap' }, [
            React.createElement(DButton, {
              key: 'btn-primary',
              theme: 'primary',
              text: 'Primary'
            }),
            React.createElement(DButton, {
              key: 'btn-secondary',
              theme: 'secondary',
              text: 'Secondary'
            }),
            React.createElement(DButton, {
              key: 'btn-success',
              theme: 'success',
              text: 'Success'
            }),
            React.createElement(DButton, {
              key: 'btn-danger',
              theme: 'danger',
              text: 'Danger'
            }),
            React.createElement(DButton, {
              key: 'btn-warning',
              theme: 'warning',
              text: 'Warning'
            }),
            React.createElement(DButton, {
              key: 'btn-info',
              theme: 'info',
              text: 'Info'
            })
          ])
        ]),
        
        // Sección Cards
        React.createElement('div', { key: 'cards', className: 'mb-4' }, [
          React.createElement('h4', { key: 'title', className: 'mb-3' }, 'Cards'),
          React.createElement('div', { key: 'content', className: 'row' }, [
            React.createElement('div', { key: 'col1', className: 'col-md-6' }, 
              React.createElement(DCard, { key: 'card1' }, [
                React.createElement(DCard.Header, { key: 'header' }, 'Card Header'),
                React.createElement(DCard.Body, { key: 'body' }, [
                  React.createElement('h5', { key: 'title', className: 'card-title' }, 'Card Title'),
                  React.createElement('p', { key: 'text', className: 'card-text' }, 
                    'This card uses the current theme colors')
                ]),
                React.createElement(DCard.Footer, { key: 'footer' }, 'Card Footer')
              ])
            ),
            React.createElement('div', { key: 'col2', className: 'col-md-6' }, 
              React.createElement(DCard, { key: 'card2' }, [
                React.createElement(DCard.Body, { key: 'body' }, [
                  React.createElement('h5', { key: 'title', className: 'card-title' }, 'Simple Card'),
                  React.createElement('p', { key: 'text', className: 'card-text' }, 
                    'Another card with theme colors applied')
                ])
              ])
            )
          ])
        ]),
        
        // Sección Alerts
        React.createElement('div', { key: 'alerts', className: 'mb-4' }, [
          React.createElement('h4', { key: 'title', className: 'mb-3' }, 'Alerts'),
          React.createElement(DAlert, {
            key: 'alert-info',
            theme: 'info',
            showClose: false
          }, 'This is an info alert with Dynamic components'),
          React.createElement(DAlert, {
            key: 'alert-primary',
            theme: 'primary',
            showClose: false
          }, 'This is a primary alert using theme colors')
        ]),
        
        // Sección Badges
        React.createElement('div', { key: 'badges', className: 'mb-4' }, [
          React.createElement('h4', { key: 'title', className: 'mb-3' }, 'Badges'),
          React.createElement('div', { key: 'content', className: 'd-flex gap-2 flex-wrap' }, [
            React.createElement(DBadge, {
              key: 'badge-primary',
              text: 'Primary',
              theme: 'primary'
            }),
            React.createElement(DBadge, {
              key: 'badge-success',
              text: 'Success',
              theme: 'success',
              soft: true
            }),
            React.createElement(DBadge, {
              key: 'badge-danger',
              text: 'Danger',
              theme: 'danger'
            }),
            React.createElement(DBadge, {
              key: 'badge-warning',
              text: 'Warning',
              theme: 'warning',
              soft: true
            })
          ])
        ]),
        
        // Sección Forms
        React.createElement('div', { key: 'forms', className: 'mb-4' }, [
          React.createElement('h4', { key: 'title', className: 'mb-3' }, 'Form Elements'),
          React.createElement('div', { key: 'form-content', className: 'row' }, [
            React.createElement('div', { key: 'col1', className: 'col-md-6 mb-3' },
              React.createElement(DInput, {
                key: 'input-email',
                label: 'Email Address',
                placeholder: 'name@example.com',
                type: 'email'
              })
            ),
            React.createElement('div', { key: 'col2', className: 'col-md-6 mb-3' },
              React.createElement(DInput, {
                key: 'input-text',
                label: 'Full Name',
                placeholder: 'Enter your full name',
                type: 'text'
              })
            )
          ])
        ])
      ]);
      
      // App con contexto de Dynamic Framework
      const AppWithContext = React.createElement(
        DContextProvider,
        {
          key: 'context',
          language: 'en',
          currency: { symbol: '$', precision: 2 }
        },
        App
      );
      
      // Limpiar container y crear root
      this.container.innerHTML = '';
      const root = ReactDOM.createRoot(this.container);
      root.render(AppWithContext);
      
      console.log('✅ React components rendered successfully');
      
    } catch (error) {
      console.error('❌ Error rendering React components:', error);
      this.showError(error);
    }
  }
  
  updateTheme() {
    console.log('🎨 Updating React theme...');
    // Los componentes React usan las mismas variables CSS
    // Solo necesitamos re-renderizar para refrescar
    this.render();
  }
  
  showError(error) {
    this.container.innerHTML = `
      <div class="alert alert-warning">
        <h5><i class="bi bi-exclamation-triangle me-2"></i>React Preview Error</h5>
        <p>The React components could not be rendered properly.</p>
        <details class="mt-2">
          <summary class="btn btn-sm btn-outline-secondary">Technical Details</summary>
          <pre class="mt-2 text-muted small">${error.stack || error.message}</pre>
        </details>
      </div>
    `;
  }
}

// Función de error global
function showReactLoadError(error) {
  const container = document.getElementById('react-preview-container');
  if (container) {
    container.innerHTML = `
      <div class="alert alert-info">
        <h5><i class="bi bi-info-circle me-2"></i>React Preview Loading...</h5>
        <p>If this message persists, the React components could not be loaded from the CDN.</p>
        <div class="mt-3">
          <strong>Loading from:</strong>
          <ul class="mt-2">
            <li><code>https://unpkg.com/react@18/umd/react.production.min.js</code></li>
            <li><code>https://unpkg.com/react-dom@18/umd/react-dom.production.min.js</code></li>
            <li>Bootstrap-compatible React components (built-in)</li>
          </ul>
        </div>
        <details class="mt-3">
          <summary class="btn btn-sm btn-outline-secondary">Technical Details</summary>
          <pre class="mt-2 text-muted small">${error.stack || error.message}</pre>
        </details>
      </div>
    `;
  }
}