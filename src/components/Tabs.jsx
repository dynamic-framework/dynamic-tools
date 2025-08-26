import React, { useState } from 'react';
import './Tabs.css';

const Tabs = ({ 
  tabs = [],
  defaultTab = 0,
  variant = 'default',
  size = 'medium',
  className = '',
  onChange,
  ...props 
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (index) => {
    setActiveTab(index);
    if (onChange) {
      onChange(index);
    }
  };

  const tabsClassName = `tabs tabs--${variant} tabs--${size} ${className}`;

  return (
    <div className={tabsClassName} {...props}>
      <div className="tabs__header">
        {tabs.map((tab, index) => (
          <button
            key={index}
            type="button"
            className={`tabs__tab ${activeTab === index ? 'tabs__tab--active' : ''} ${tab.disabled ? 'tabs__tab--disabled' : ''}`}
            onClick={() => !tab.disabled && handleTabClick(index)}
            disabled={tab.disabled}
          >
            {tab.icon && <span className="tabs__icon">{tab.icon}</span>}
            <span className="tabs__label">{tab.label}</span>
            {tab.badge && <span className="tabs__badge">{tab.badge}</span>}
          </button>
        ))}
      </div>
      <div className="tabs__content">
        {tabs[activeTab] && tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;