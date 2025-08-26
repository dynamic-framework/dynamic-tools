import React, { useState } from 'react';
import Button from './components/Button';
import Card from './components/Card';
import Input from './components/Input';
import Dropdown from './components/Dropdown';
import Tabs from './components/Tabs';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  // Sample data for dropdowns
  const dropdownOptions = [
    { value: 'option1', label: 'Opción 1' },
    { value: 'option2', label: 'Opción 2' },
    { value: 'option3', label: 'Opción 3' },
    { value: 'option4', label: 'Opción 4' },
  ];

  // Sample data for tabs
  const tabsData = [
    {
      label: 'Botones',
      icon: '🔘',
      content: (
        <div className="component-showcase">
          <h3>Ejemplos de Botones</h3>
          <div className="showcase-section">
            <h4>Variantes</h4>
            <div className="component-row">
              <Button variant="primary">Primario</Button>
              <Button variant="secondary">Secundario</Button>
              <Button variant="success">Éxito</Button>
              <Button variant="danger">Peligro</Button>
              <Button variant="warning">Advertencia</Button>
            </div>
          </div>
          <div className="showcase-section">
            <h4>Tamaños</h4>
            <div className="component-row">
              <Button size="small">Pequeño</Button>
              <Button size="medium">Mediano</Button>
              <Button size="large">Grande</Button>
            </div>
          </div>
          <div className="showcase-section">
            <h4>Estados</h4>
            <div className="component-row">
              <Button>Normal</Button>
              <Button disabled>Deshabilitado</Button>
            </div>
          </div>
        </div>
      )
    },
    {
      label: 'Tarjetas',
      icon: '🃏',
      content: (
        <div className="component-showcase">
          <h3>Ejemplos de Tarjetas</h3>
          <div className="cards-grid">
            <Card 
              title="Tarjeta Básica" 
              subtitle="Subtítulo de ejemplo"
            >
              <p>Esta es una tarjeta básica con contenido de ejemplo. Puedes agregar cualquier contenido aquí.</p>
              <Button size="small">Acción</Button>
            </Card>
            <Card 
              title="Tarjeta con Imagen" 
              subtitle="Con imagen de ejemplo"
              image="https://via.placeholder.com/300x200"
              variant="elevated"
            >
              <p>Tarjeta con imagen y efecto de elevación.</p>
              <Button size="small" variant="secondary">Ver más</Button>
            </Card>
            <Card 
              title="Tarjeta Compacta" 
              variant="compact"
              className="card-outline"
            >
              <p>Una tarjeta más compacta con menos padding.</p>
            </Card>
          </div>
        </div>
      )
    },
    {
      label: 'Inputs',
      icon: '📝',
      content: (
        <div className="component-showcase">
          <h3>Ejemplos de Inputs</h3>
          <div className="showcase-section">
            <h4>Tipos básicos</h4>
            <div className="inputs-grid">
              <Input
                label="Nombre"
                placeholder="Ingresa tu nombre"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                helperText="Este campo es obligatorio"
                required
              />
              <Input
                label="Email"
                type="email"
                placeholder="tu@email.com"
                variant="outlined"
              />
              <Input
                label="Contraseña"
                type="password"
                placeholder="••••••••"
                variant="filled"
              />
              <Input
                label="Campo con Error"
                placeholder="Campo inválido"
                error="Este campo contiene errores"
              />
              <Input
                label="Campo Deshabilitado"
                placeholder="No editable"
                disabled
                value="Contenido fijo"
              />
            </div>
          </div>
          <div className="showcase-section">
            <h4>Tamaños</h4>
            <div className="inputs-grid">
              <Input size="small" placeholder="Pequeño" />
              <Input size="medium" placeholder="Mediano" />
              <Input size="large" placeholder="Grande" />
            </div>
          </div>
        </div>
      )
    },
    {
      label: 'Dropdowns',
      icon: '⬇️',
      content: (
        <div className="component-showcase">
          <h3>Ejemplos de Dropdowns</h3>
          <div className="showcase-section">
            <h4>Básico</h4>
            <div className="inputs-grid">
              <Dropdown
                label="Selecciona una opción"
                options={dropdownOptions}
                value={dropdownValue}
                onChange={setDropdownValue}
                placeholder="Elige una opción..."
              />
              <Dropdown
                label="Con error"
                options={dropdownOptions}
                error="Debes seleccionar una opción"
                placeholder="Campo requerido"
              />
              <Dropdown
                label="Deshabilitado"
                options={dropdownOptions}
                disabled
                placeholder="No disponible"
              />
            </div>
          </div>
          <div className="showcase-section">
            <h4>Tamaños</h4>
            <div className="inputs-grid">
              <Dropdown
                size="small"
                options={dropdownOptions}
                placeholder="Pequeño"
              />
              <Dropdown
                size="medium"
                options={dropdownOptions}
                placeholder="Mediano"
              />
              <Dropdown
                size="large"
                options={dropdownOptions}
                placeholder="Grande"
              />
            </div>
          </div>
        </div>
      )
    },
    {
      label: 'Más Componentes',
      icon: '🧩',
      badge: '4',
      content: (
        <div className="component-showcase">
          <h3>Componentes Adicionales</h3>
          <div className="showcase-section">
            <h4>Tabs Anidados</h4>
            <Tabs
              variant="pills"
              size="small"
              tabs={[
                {
                  label: 'Tab 1',
                  content: <div className="nested-content"><p>Contenido del Tab 1 anidado</p></div>
                },
                {
                  label: 'Tab 2',
                  content: <div className="nested-content"><p>Contenido del Tab 2 anidado</p></div>
                },
                {
                  label: 'Disabled',
                  disabled: true,
                  content: <div><p>Este tab está deshabilitado</p></div>
                }
              ]}
            />
          </div>
          <div className="showcase-section">
            <h4>Combinación de Componentes</h4>
            <Card title="Formulario de Ejemplo" subtitle="Combinando múltiples componentes">
              <div className="form-example">
                <Input
                  label="Nombre completo"
                  placeholder="Juan Pérez"
                  fullWidth
                />
                <Dropdown
                  label="País"
                  options={[
                    { value: 'mx', label: 'México' },
                    { value: 'us', label: 'Estados Unidos' },
                    { value: 'ca', label: 'Canadá' },
                    { value: 'es', label: 'España' }
                  ]}
                  placeholder="Selecciona tu país"
                  fullWidth
                />
                <div className="form-actions">
                  <Button variant="secondary">Cancelar</Button>
                  <Button variant="primary">Guardar</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="app">
      <header className="app-header">
        <h1>🧰 Dynamic Tools - Showcase de Componentes</h1>
        <p>Biblioteca de componentes UI reutilizables para aplicaciones web modernas</p>
      </header>
      
      <main className="app-main">
        <Tabs
          tabs={tabsData}
          defaultTab={activeTab}
          onChange={setActiveTab}
          variant="default"
          size="medium"
        />
      </main>
      
      <footer className="app-footer">
        <p>© 2024 Dynamic Framework - Componentes de UI</p>
      </footer>
    </div>
  );
}

export default App;
