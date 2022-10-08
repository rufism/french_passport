import React from 'react';
import { Add } from '@mui/icons-material';

export default function NewEntityCard({ label, onClick }) {
  return (
    <div
      role="button"
      tabIndex={0}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '35px',
        width: '80%',
        cursor: 'pointer',
        border: '1px solid black',
        borderRadius: '0.3em',
        padding: '1em'
      }}
      onClick={onClick}
      onKeyDown={onClick}
    >
      <div style={{ display: 'flex' }}>
        <Add />
      </div>
      <div style={{ textAlign: 'left', flexGrow: '1' }}>
        <div style={{ fontSize: '14pt' }}>{label}</div>
      </div>
    </div>
  );
}
