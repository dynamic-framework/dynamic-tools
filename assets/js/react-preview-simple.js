// react-preview-simple.js - Simplified version for debugging
console.log('🚀 React Preview Simple loaded');

// Wait for everything to load
window.addEventListener('load', function() {
    console.log('Window loaded - initializing React Preview');
    
    const container = document.getElementById('react-preview-container');
    if (!container) {
        console.error('React preview container not found!');
        return;
    }
    
    if (!window.React || !window.ReactDOM) {
        console.error('React or ReactDOM not loaded!');
        container.innerHTML = '<div class="alert alert-danger">React not loaded!</div>';
        return;
    }
    
    console.log('✅ React and container found, rendering...');
    
    const React = window.React;
    const ReactDOM = window.ReactDOM;
    const e = React.createElement;
    
    // Create a simple component to test
    function SimpleApp() {
        const [count, setCount] = React.useState(0);
        const [primaryColor, setPrimaryColor] = React.useState('#d81b60');
        
        React.useEffect(() => {
            // Listen for theme changes
            const updateColors = () => {
                const root = getComputedStyle(document.documentElement);
                const primary = root.getPropertyValue('--bs-primary').trim() || '#d81b60';
                setPrimaryColor(primary);
                console.log('Theme updated, primary:', primary);
            };
            
            updateColors();
            // Listen for changes
            const interval = setInterval(updateColors, 1000);
            return () => clearInterval(interval);
        }, []);
        
        return e('div', { className: 'p-4' }, [
            e('h3', { key: 'title' }, '✅ React Components are Working!'),
            e('p', { key: 'desc' }, 'This is a real React component with state and hooks.'),
            
            e('div', { key: 'counter', className: 'mb-4' }, [
                e('button', {
                    key: 'btn',
                    className: 'btn btn-primary me-2',
                    onClick: () => setCount(count + 1),
                    style: { backgroundColor: primaryColor, borderColor: primaryColor }
                }, `Clicked ${count} times`),
                e('span', { key: 'text' }, 'This button uses the theme primary color')
            ]),
            
            e('div', { key: 'badges', className: 'mb-4' }, [
                e('h5', { key: 'title' }, 'Theme-aware Badges'),
                e('div', { key: 'badges-row', className: 'd-flex gap-2' }, [
                    e('span', {
                        key: 'badge1',
                        className: 'badge',
                        style: {
                            backgroundColor: primaryColor,
                            color: '#fff',
                            padding: '0.35em 0.65em',
                            fontSize: '0.75em',
                            fontWeight: '700'
                        }
                    }, 'Primary Badge'),
                    e('span', {
                        key: 'badge2',
                        className: 'badge bg-success'
                    }, 'Success Badge'),
                    e('span', {
                        key: 'badge3',
                        className: 'badge bg-danger'
                    }, 'Danger Badge')
                ])
            ]),
            
            e('div', { key: 'alerts', className: 'mb-4' }, [
                e('h5', { key: 'title' }, 'Dynamic Framework Alerts'),
                e('div', { key: 'alert-info', className: 'alert alert-info mb-2' }, [
                    e('strong', { key: 'strong' }, 'Info Alert: '),
                    'This should use body text color, not blue! (Dynamic Framework style)'
                ]),
                e('div', { key: 'alert-primary', className: 'alert alert-primary mb-2' }, [
                    e('strong', { key: 'strong' }, 'Primary Alert: '),
                    'This alert uses the primary color background with body text color'
                ]),
                e('div', { key: 'alert-success', className: 'alert alert-success' }, [
                    e('strong', { key: 'strong' }, 'Success Alert: '),
                    'Text should be in body color, not theme color'
                ])
            ]),
            
            e('div', { key: 'info', className: 'alert alert-light border' }, [
                e('strong', { key: 'strong' }, 'Current Primary Color: '),
                e('span', { key: 'color' }, primaryColor)
            ])
        ]);
    }
    
    // Clear the container and render
    container.innerHTML = '';
    const root = ReactDOM.createRoot(container);
    root.render(e(SimpleApp));
    
    console.log('✅ React app rendered successfully');
    
    // Make it available globally for theme updates
    window.updateReactPreview = function() {
        console.log('Updating React preview...');
        root.render(e(SimpleApp));
    };
});