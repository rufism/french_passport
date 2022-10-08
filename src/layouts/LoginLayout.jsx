import React from 'react';

export default function LoginLayout({ children }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: '[top] 25% [mid-top] 50% [mid-bottom] 25% [bottom]',
        gridTemplateColumns: '[left] 10% [mid-left] 80% [mid-right] 10% [right]',
        height: '100%',
        width: '100%'
      }}
    >
      <div
        style={{
          gridColumnStart: 'mid-left',
          gridColumnEnd: 'mid-right',
          gridRowStart: 'mid-top',
          gridRowEnd: 'mid-bottom'
        }}
      >
        {children}
      </div>
    </div>
  );
}
