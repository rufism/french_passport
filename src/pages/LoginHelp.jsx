import React from 'react';
import { Language } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import LoginLayout from '../layouts/LoginLayout';

export default function LoginHelp() {
  return (
    <LoginLayout>
      <div
        style={{
          border: '1px solid black',
          borderRadius: '0.3em',
          padding: '0 1em',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        {/* header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '1em'
          }}
        >
          <div style={{ margin: '10px' }}>
            <Language />
          </div>
          <div style={{ textAlign: 'left', flexGrow: '1' }}>
            <div style={{ fontSize: '18pt' }}>French Passport</div>
            <div style={{ fontSize: '12pt' }}>Welcome</div>
          </div>
        </div>

        {/* content */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p>
            This is some help text for students. Let&apos;s them know where to go if they have
            issues
          </p>
        </div>

        {/* footer */}
        <div
          style={{
            paddingBottom: '1em'
          }}
        >
          <Link to="/">Back</Link>
        </div>
      </div>
    </LoginLayout>
  );
}
