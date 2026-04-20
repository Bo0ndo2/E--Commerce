import React from 'react';

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const shadowClasses = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
};

function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Card({
  children,
  as = 'div',
  className = '',
  padding = 'md',
  shadow = 'md',
  overflowHidden = false,
  ...props
}) {
  const resolvedPadding = paddingClasses[padding] ?? paddingClasses.md;
  const resolvedShadow = shadowClasses[shadow] ?? shadowClasses.md;

  return React.createElement(
    as,
    {
      className: joinClasses(
        'bg-white rounded-lg border border-gray-200',
        resolvedPadding,
        resolvedShadow,
        overflowHidden && 'overflow-hidden',
        className,
      ),
      ...props,
    },
    children,
  );
}
