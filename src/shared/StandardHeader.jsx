import React from 'react';
import { Menu, Language } from '@mui/icons-material';

export default function StandardHeader({ subHeaderText }) {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '125px',
        borderBottom: '1px solid grey'
      }}
    >
      <div style={{ margin: '10px' }}>
        <Language />
      </div>
      <div style={{ textAlign: 'left', flexGrow: '1' }}>
        <div style={{ fontSize: '18pt' }}>French Passport</div>
        <div style={{ fontSize: '12pt' }}>{subHeaderText}</div>
      </div>
      <div style={{ margin: '10px' }}>
        <Menu />
      </div>
    </div>
  );
}
