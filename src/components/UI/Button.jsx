import React from 'react';

const variantClasses = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
  outline: 'border border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50',
  danger: 'bg-red-500 text-white hover:bg-red-600',
  ghost: 'bg-transparent text-primary hover:text-blue-600',
  gradient: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700',
};

const sizeClasses = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3',
  xl: 'px-8 py-3 text-lg',
  icon: 'p-2',
};

function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Button({
  children,
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  fullWidth = false,
  type = 'button',
  ...props
}) {
  const resolvedVariant = variantClasses[variant] || variantClasses.primary;
  const resolvedSize = sizeClasses[size] || sizeClasses.md;

  const buttonClasses = joinClasses(
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    fullWidth && 'w-full',
    resolvedSize,
    resolvedVariant,
    className,
  );

  if (Component === 'button') {
    return (
      <button type={type} className={buttonClasses} {...props}>
        {children}
      </button>
    );
  }

  return (
    <Component className={buttonClasses} {...props}>
      {children}
    </Component>
  );
}
