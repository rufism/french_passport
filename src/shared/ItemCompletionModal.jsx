import React from 'react';
import { Button } from '@mui/material';

export default function ItemCompletionModal({ completionText, show, onComplete, onCancel }) {
  if (!show) {
    return null;
  }

  return (
    <div
      style={{
        zIndex: '5',
        position: 'absolute',
        top: '0',
        width: '100%',
        height: '100%',
        background: '#00000066',
        display: 'grid',
        gridTemplateRows: '[top] 25% [mid-top] 50% [mid-bottom] 25% [bottom]',
        gridTemplateColumns: '[left] 10% [mid-left] 80% [mid-right] 10% [right]',
        backdropFilter: 'blur(3px)'
      }}
    >
      <div
        style={{
          background: 'white',
          gridColumnStart: 'mid-left',
          gridColumnEnd: 'mid-right',
          gridRowStart: 'mid-top',
          gridRowEnd: 'mid-bottom',
          display: 'flex',
          flexDirection: 'column',
          padding: '1em',
          borderRadius: '0.3em',
          filter: 'drop-shadow(0 10px 10px #555555)'
        }}
      >
        {/* Header */}
        <div style={{ height: '35px' }}>Complete Item</div>

        {/* Body */}
        <div style={{ flexGrow: '1' }}>{completionText}</div>

        {/* Footer */}
        <div style={{ justifySelf: 'flex-end' }}>
          <Button type="button" onClick={onComplete}>
            Cancel
          </Button>
          <Button type="button" onClick={onCancel}>
            Complete
          </Button>
        </div>
      </div>
    </div>
  );
}
