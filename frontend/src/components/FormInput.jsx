import { useState } from 'react';

const FormInput = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  error, 
  placeholder,
  required = false 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="form-group">
      <label className="form-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={`form-input ${error ? 'error' : ''} ${isFocused ? 'focused' : ''}`}
        required={required}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default FormInput; 