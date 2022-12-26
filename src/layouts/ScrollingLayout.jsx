import React from 'react';

export default function ScrollingLayout({ headerRenderer, contentRenderer }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: '[left] 5% [left-mid] 90% [right-mid] 5% [right]',
        gridTemplateRows: '[top] 100px [mid] auto [bottom]'
      }}
    >
      <div
        style={{
          gridColumnStart: 'left',
          gridColumnEnd: 'right',
          gridRowStart: 'top',
          gridRowEnd: 'mid'
        }}
      >
        {headerRenderer()}
      </div>
      <div
        style={{
          gridColumnStart: 'left-mid',
          gridColumnEnd: 'right-mid',
          gridRowStart: 'mid',
          gridRowEnd: 'bottom',
          overflow: 'auto'
        }}
      >
        {contentRenderer()}
      </div>
    </div>
  );
}
