import React from 'react';

const gapClasses = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  8: 'gap-8',
  10: 'gap-10',
  12: 'gap-12',
};

const directionClasses = {
  row: 'flex-row',
  col: 'flex-col',
};

function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Stack({
  children,
  as = 'div',
  direction = 'col',
  gap = 4,
  className = '',
  ...props
}) {
  const resolvedDirection = directionClasses[direction] ?? directionClasses.col;
  const resolvedGap = gapClasses[gap] ?? gapClasses[4];

  return React.createElement(
    as,
    {
      className: joinClasses('flex', resolvedDirection, resolvedGap, className),
      ...props,
    },
    children,
  );
}
