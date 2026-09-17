import React from 'react';
import Loader from './Loader';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const variants = {
    primary: 'btn-primary',
    ghost: 'btn-ghost',
    danger: 'bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${variants[variant]} flex items-center justify-center gap-2 ${className}`}
      {...props}
    >
      {loading && <Loader size="sm" />}
      {children}
    </button>
  );
};

export default Button;