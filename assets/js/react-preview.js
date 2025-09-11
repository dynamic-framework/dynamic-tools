// react-preview.js
console.log('📁 react-preview.js loaded');

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReactPreview);
} else {
  // DOM is already ready
  initReactPreview();
}

async function initReactPreview() {
  console.log('🚀 Starting React Preview initialization...');
  console.log('React available?', typeof window.React !== 'undefined');
  console.log('ReactDOM available?', typeof window.ReactDOM !== 'undefined');
  
  let React, ReactDOM, DynamicUI;
  
  try {
    // Use React from window (already loaded by UMD scripts)
    if (window.React && window.ReactDOM) {
      React = window.React;
      ReactDOM = window.ReactDOM;
      console.log('✅ React and ReactDOM available from window');
    } else {
      throw new Error('React or ReactDOM not available on window');
    }
    
    // Try to load real Dynamic Framework components
    console.log('🔄 Attempting to load Dynamic Framework components...');
    
    try {
      // Try to load real Dynamic Framework components from ESM
      const dynamicModule = await loadDynamicFrameworkComponents();
      
      if (dynamicModule && Object.keys(dynamicModule).length > 0) {
        console.log('✅ Real Dynamic Framework components loaded:', Object.keys(dynamicModule));
        DynamicUI = dynamicModule;
        window.usingRealDynamic = true;
      } else {
        throw new Error('Dynamic Framework ESM loaded but no components found');
      }
    } catch (error) {
      console.log('⚠️ Could not load real Dynamic Framework, using mock components');
      console.log('Error:', error.message);
      window.usingRealDynamic = false;
      
      DynamicUI = createMockDynamicUI(React);
      
      if (!DynamicUI) {
        console.error('❌ Failed to create mock Dynamic UI components');
        DynamicUI = {}; // Fallback to empty object
      } else {
        console.log('✅ Mock Dynamic UI components created:', Object.keys(DynamicUI));
      }
    }
    
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
}

// Function to load Dynamic Framework components
async function loadDynamicFrameworkComponents() {
  console.log('🔄 Loading Dynamic Framework React components from ESM...');
  
  // Load the specific ESM distribution
  const dynamicEsmUrl = 'https://unpkg.com/@dynamic-framework/ui-react@1.36.2/dist/index.esm.js';
  
  try {
    console.log(`🔄 Loading Dynamic Framework from: ${dynamicEsmUrl}`);
    
    // Use dynamic import for ESM modules
    const dynamicModule = await import(dynamicEsmUrl);
    
    console.log('✅ Dynamic Framework ESM loaded successfully');
    console.log('Available exports:', Object.keys(dynamicModule));
    
    // Store in window for global access
    window.DynamicFramework = dynamicModule;
    
    return dynamicModule;
    
  } catch (error) {
    console.error('❌ Failed to load Dynamic Framework ESM:', error);
    throw error;
  }
}

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
  
  // DAlert component - Updated for Dynamic Framework styling
  const DAlert = ({ theme = 'primary', children, showClose = true, ...props }) => {
    const style = {
      // Dynamic Framework alerts use body text color
      color: 'var(--bs-body-color)',
      backgroundColor: `rgba(var(--bs-${theme}-rgb), 0.1)`,
      borderColor: `rgba(var(--bs-${theme}-rgb), 0.2)`,
      ...props.style
    };
    
    return createElement('div', {
      className: `alert alert-${theme}${showClose ? ' alert-dismissible' : ''}`,
      role: 'alert',
      style,
      ...props
    }, children);
  };
  
  // DBadge component - Updated to use Dynamic Framework styling
  const DBadge = ({ theme = 'primary', text, children, soft = false, ...props }) => {
    // Use Dynamic Framework's badge classes and CSS variables
    const className = `badge ${soft ? `text-${theme} bg-${theme}-subtle` : ''}`;
    
    const style = {
      // Primary badge uses --bs-badge-bg for Dynamic Framework compatibility
      backgroundColor: theme === 'primary' && !soft ? 
        `var(--bs-badge-bg, var(--bs-${theme}))` : 
        soft ? `var(--bs-${theme}-bg-subtle, rgba(var(--bs-${theme}-rgb, 13, 110, 253), 0.1))` : `var(--bs-${theme})`,
      color: soft ? `var(--bs-${theme}-text-emphasis, var(--bs-${theme}))` : `var(--bs-badge-color, #fff)`,
      fontSize: 'var(--bs-badge-font-size, 0.75em)',
      fontWeight: 'var(--bs-badge-font-weight, 700)',
      padding: 'var(--bs-badge-padding-y, 0.35em) var(--bs-badge-padding-x, 0.65em)',
      borderRadius: 'var(--bs-badge-border-radius, 0.375rem)',
      display: 'inline-block',
      lineHeight: '1',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      verticalAlign: 'baseline',
      ...props.style
    };
    
    return createElement('span', {
      className,
      style,
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
      
      // Check if we're using real Dynamic Framework components
      const usingReal = window.usingRealDynamic;
      console.log(`🎯 Rendering with ${usingReal ? 'REAL' : 'MOCK'} Dynamic Framework components`);
      
      if (usingReal) {
        // Use real Dynamic Framework components
        this.renderRealDynamicComponents();
      } else {
        // Use mock components
        this.renderMockComponents();
      }
      
    } catch (error) {
      console.error('❌ Error rendering React components:', error);
      this.showError(error);
    }
  }
  
  renderRealDynamicComponents() {
    const { React, ReactDOM, DynamicUI } = this;
    
    console.log('🎯 Attempting to render REAL Dynamic Framework components');
    console.log('DynamicUI keys:', Object.keys(DynamicUI || {}).slice(0, 10));
    
    // First, let's just render a simple React element to verify React works
    const testElement = React.createElement('div', { className: 'alert alert-success' }, 
      '✅ React is working! Now loading Dynamic Framework components...'
    );
    
    // Clear and render test
    this.container.innerHTML = '';
    const root = ReactDOM.createRoot(this.container);
    root.render(testElement);
    
    // Now try to extract Dynamic components
    const {
      Badge,
      Button,
      Card,
      Alert,
      Input,
      Select,
      DButton,
      DBadge,
      DCard,
      // Try various possible naming conventions
      ...otherComponents
    } = DynamicUI || {};
    
    console.log('🎯 Component check:', {
      Badge: !!Badge,
      Button: !!Button,
      DButton: !!DButton,
      DBadge: !!DBadge,
      hasAnyComponents: Object.keys(DynamicUI || {}).length > 0
    });
    
    // If we have ANY components, try to use them
    if (Object.keys(DynamicUI || {}).length > 0) {
      setTimeout(() => {
        const App = this.createRealDynamicApp(React, DynamicUI);
        root.render(App);
      }, 1000);
    }
  }
  
  createRealDynamicApp(React, components) {
    const { Badge, Button, Card, Alert, Input } = components;
    
    return React.createElement('div', { className: 'preview-sections' }, [
      
      // Real Dynamic Framework Badges Section
      Badge && React.createElement('div', { key: 'badges', className: 'mb-4' }, [
        React.createElement('h4', { key: 'title', className: 'mb-3' }, 'Dynamic Framework Badges'),
        React.createElement('p', { key: 'note', className: 'text-muted small mb-3' }, 
          'Real Dynamic Framework Badge components using --bs-badge-bg CSS variable'),
        React.createElement('div', { key: 'content', className: 'd-flex gap-2 flex-wrap' }, [
          React.createElement(Badge, {
            key: 'badge-primary',
            theme: 'primary'
          }, 'Primary Badge'),
          React.createElement(Badge, {
            key: 'badge-success',
            theme: 'success'
          }, 'Success Badge'),
          React.createElement(Badge, {
            key: 'badge-danger',
            theme: 'danger'
          }, 'Danger Badge'),
          React.createElement(Badge, {
            key: 'badge-warning',
            theme: 'warning'
          }, 'Warning Badge')
        ])
      ]),
      
      // Real Dynamic Framework Buttons Section
      Button && React.createElement('div', { key: 'buttons', className: 'mb-4' }, [
        React.createElement('h4', { key: 'title', className: 'mb-3' }, 'Dynamic Framework Buttons'),
        React.createElement('div', { key: 'content', className: 'd-flex gap-2 flex-wrap' }, [
          React.createElement(Button, {
            key: 'btn-primary',
            theme: 'primary'
          }, 'Primary'),
          React.createElement(Button, {
            key: 'btn-secondary',
            theme: 'secondary'
          }, 'Secondary'),
          React.createElement(Button, {
            key: 'btn-success',
            theme: 'success'
          }, 'Success'),
          React.createElement(Button, {
            key: 'btn-danger',
            theme: 'danger'
          }, 'Danger')
        ])
      ]),
      
      // Real Dynamic Framework Card Section
      Card && React.createElement('div', { key: 'cards', className: 'mb-4' }, [
        React.createElement('h4', { key: 'title', className: 'mb-3' }, 'Dynamic Framework Cards'),
        React.createElement('div', { key: 'content', className: 'row' }, [
          React.createElement('div', { key: 'col1', className: 'col-md-6' }, 
            React.createElement(Card, { key: 'card1' }, [
              React.createElement('div', { key: 'header', className: 'card-header' }, 'Card Header'),
              React.createElement('div', { key: 'body', className: 'card-body' }, [
                React.createElement('h5', { key: 'title', className: 'card-title' }, 'Real Dynamic Card'),
                React.createElement('p', { key: 'text', className: 'card-text' }, 
                  'This card uses real Dynamic Framework components with theme colors')
              ])
            ])
          )
        ])
      ]),
      
      // Fallback message if no recognizable components
      !Badge && !Button && !Card && React.createElement('div', { key: 'fallback', className: 'alert alert-info' }, [
        React.createElement('h5', { key: 'title' }, 'Dynamic Framework Loaded'),
        React.createElement('p', { key: 'text' }, 
          'Real Dynamic Framework components were loaded but with different naming conventions.'),
        React.createElement('details', { key: 'details' }, [
          React.createElement('summary', { key: 'summary' }, 'Available components:'),
          React.createElement('pre', { key: 'list', className: 'mt-2 small' }, 
            Object.keys(components).join(', '))
        ])
      ])
    ]);
  }
  
  renderMockComponents() {
    const { React, ReactDOM, DynamicUI } = this;
    
    // Extraer componentes mock
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
        
        // Sección Badges - Using Dynamic Framework CSS variables
        React.createElement('div', { key: 'badges', className: 'mb-4' }, [
          React.createElement('h4', { key: 'title', className: 'mb-3' }, 'Badges'),
          React.createElement('p', { key: 'note', className: 'text-muted small mb-3' }, 
            'These badges use Dynamic Framework CSS variables like --bs-badge-bg'),
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
      
      console.log('✅ Mock React components rendered successfully');
  }
  
  updateTheme() {
    console.log('🎨 Updating React theme...');
    
    // Log current CSS variables for debugging
    const root = getComputedStyle(document.documentElement);
    const primaryColor = root.getPropertyValue('--bs-primary').trim();
    const badgeBg = root.getPropertyValue('--bs-badge-bg').trim();
    
    console.log('Current CSS variables:', {
      '--bs-primary': primaryColor,
      '--bs-badge-bg': badgeBg || 'not set, fallback to primary'
    });
    
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