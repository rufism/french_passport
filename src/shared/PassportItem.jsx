import React from 'react';
import { Book } from '@mui/icons-material';

export default function PassportItem({ title, desc }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        minHeight: '75px',
        width: '100%',
        cursor: 'pointer',
        border: '1px solid grey'
      }}
    >
      <div style={{ margin: '10px' }}>
        <Book />
      </div>
      <div style={{ textAlign: 'left', flexGrow: '1' }}>
        <div style={{ fontSize: '14pt' }}>{title}</div>
        <div style={{ fontSize: '10pt' }}>{desc}</div>
      </div>
      <div style={{ margin: '10px' }}>
        <button type="button">Complete</button>
      </div>
    </div>
  );
}
