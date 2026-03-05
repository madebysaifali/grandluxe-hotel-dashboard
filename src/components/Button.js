import React from 'react';

const Button = React.memo(function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant}${fullWidth ? ' btn-full' : ''}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && (
        <span
          className={`spinner${variant !== 'primary' ? ' spinner-dark' : ''}`}
        />
      )}
      {children}
    </button>
  );
});

export default Button;
