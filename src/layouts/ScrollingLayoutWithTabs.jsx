import React from 'react';

export default function ScrollingLayoutWithTabs({ headerRenderer, tabRenderer, contentRenderer }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: '[left] 5% [left-mid] 90% [right-mid] 5% [right]',
        gridTemplateRows: '[top] 125px [tab-top] 50px [tab-bottom] auto [bottom]'
      }}
    >
      <div
        style={{
          gridColumnStart: 'left',
          gridColumnEnd: 'right',
          gridRowStart: 'top',
          gridRowEnd: 'tab-top'
        }}
      >
        {headerRenderer()}
      </div>
      <div
        style={{
          gridColumnStart: 'left',
          gridColumnEnd: 'right',
          gridRowStart: 'tab-top',
          gridRowEnd: 'tab-bottom'
        }}
      >
        {tabRenderer()}
      </div>
      <div
        style={{
          gridColumnStart: 'left-mid',
          gridColumnEnd: 'right-mid',
          gridRowStart: 'tab-bottom',
          gridRowEnd: 'bottom',
          overflow: 'auto'
        }}
      >
        {contentRenderer()}
      </div>
    </div>
  );
}
