import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

const Dropdown = ({ 
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  error,
  disabled = false,
  size = 'medium',
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    options.find(option => option.value === value) || null
  );
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option.value);
    }
  };

  const dropdownClassName = `dropdown dropdown--${size} ${fullWidth ? 'dropdown--full-width' : ''} ${error ? 'dropdown--error' : ''} ${disabled ? 'dropdown--disabled' : ''} ${className}`;

  return (
    <div className="dropdown-wrapper">
      {label && (
        <label className="dropdown-label">
          {label}
          {props.required && <span className="dropdown-required">*</span>}
        </label>
      )}
      <div className={dropdownClassName} ref={dropdownRef}>
        <button
          type="button"
          className={`dropdown__trigger ${isOpen ? 'dropdown__trigger--open' : ''}`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <span className="dropdown__value">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className={`dropdown__arrow ${isOpen ? 'dropdown__arrow--open' : ''}`}>
            ▼
          </span>
        </button>
        {isOpen && (
          <div className="dropdown__menu">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`dropdown__option ${selectedOption?.value === option.value ? 'dropdown__option--selected' : ''}`}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <span className="dropdown-error-message">{error}</span>}
    </div>
  );
};

export default Dropdown;