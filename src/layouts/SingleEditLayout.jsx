import React from 'react';

export default function SingleEditLayout({ headerRenderer, contentRenderer, footerRenderer }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: '[left] 100% [right]',
        gridTemplateRows: '[top] 125px [mid] auto [footer-top] 50px [bottom]'
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
          gridColumnStart: 'left',
          gridColumnEnd: 'right',
          gridRowStart: 'mid',
          gridRowEnd: 'footer-top',
          overflow: 'auto'
        }}
      >
        {contentRenderer()}
      </div>
      <div
        style={{
          gridColumnStart: 'left',
          gridColumnEnd: 'right',
          gridRowStart: 'footer-top',
          gridRowEnd: 'bottom'
        }}
      >
        {footerRenderer()}
      </div>
    </div>
  );
}
