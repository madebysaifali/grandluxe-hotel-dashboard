import React from 'react';

const Input = React.memo(function Input({ label, error, ...props }) {
  return (
    <div className="field">
      {label && <label>{label}</label>}
      <input {...props} />
      {error && <div className="err">{error}</div>}
    </div>
  );
});

export default Input;
