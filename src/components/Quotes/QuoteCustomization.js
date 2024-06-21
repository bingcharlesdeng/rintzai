// QuoteCustomization.js
import React from 'react';
import './quoteCustomization.css';

const QuoteCustomization = ({ customization, onCustomizationChange }) => {
  return (
    <div className="quote-customization">
      <h3>Customize Display</h3>
      <div className="customization-options">
        <div className="option">
          <label htmlFor="font-select">Font:</label>
          <select
            id="font-select"
            value={customization.font}
            onChange={(e) => onCustomizationChange('font', e.target.value)}
          >
            <option value="Arial">Arial</option>
            <option value="Verdana">Verdana</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>
        </div>
        <div className="option">
          <label htmlFor="color-picker">Text Color:</label>
          <input
            id="color-picker"
            type="color"
            value={customization.color}
            onChange={(e) => onCustomizationChange('color', e.target.value)}
          />
        </div>
        <div className="option">
          <label htmlFor="bg-color-picker">Background Color:</label>
          <input
            id="bg-color-picker"
            type="color"
            value={customization.backgroundColor}
            onChange={(e) => onCustomizationChange('backgroundColor', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default QuoteCustomization;