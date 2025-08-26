import React from 'react';
import './Input.css';

const Input = ({ 
  label,
  error,
  helperText,
  variant = 'default',
  size = 'medium',
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const inputClassName = `input input--${variant} input--${size} ${fullWidth ? 'input--full-width' : ''} ${error ? 'input--error' : ''} ${className}`;

  return (
    <div className="input-wrapper">
      {label && (
        <label className="input-label" htmlFor={props.id}>
          {label}
          {props.required && <span className="input-required">*</span>}
        </label>
      )}
      <input
        className={inputClassName}
        {...props}
      />
      {error && <span className="input-error-message">{error}</span>}
      {helperText && !error && <span className="input-helper-text">{helperText}</span>}
    </div>
  );
};

export default Input;