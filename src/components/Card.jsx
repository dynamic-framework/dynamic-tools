import React from 'react';
import './Card.css';

const Card = ({ 
  children, 
  title, 
  subtitle, 
  image, 
  variant = 'default',
  className = '',
  ...props 
}) => {
  return (
    <div className={`card card--${variant} ${className}`} {...props}>
      {image && (
        <div className="card__image">
          <img src={image} alt={title || 'Card image'} />
        </div>
      )}
      <div className="card__content">
        {title && <h3 className="card__title">{title}</h3>}
        {subtitle && <p className="card__subtitle">{subtitle}</p>}
        <div className="card__body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;