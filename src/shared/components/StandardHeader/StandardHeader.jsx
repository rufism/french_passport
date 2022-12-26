import React from 'react';
import { Menu, Language } from '@mui/icons-material';
import './standardHeader.scss';

export default function StandardHeader({ subHeaderText }) {
  return (
    <div className="standard-header">
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
