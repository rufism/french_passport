import React from 'react';
import { Language } from '@mui/icons-material';
import { Button } from '@mui/material';
import LoginLayout from '../layouts/LoginLayout';

export default function Home() {
  const handleEnter = () => {
    window.location.href =
      'https://french-passport.auth.us-east-2.amazoncognito.com/login?client_id=70lkb2kb4f9rubgbp07ueeqv8f&response_type=code&scope=french_passport/all&redirect_uri=http://localhost:3000/login';
  };

  return (
    <LoginLayout>
      <div
        style={{
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
          <div
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
          >
            <Language />
            <div style={{ fontSize: '18pt' }}>French Passport</div>
          </div>
        </div>

        <Button variant="outlined" type="button" onClick={handleEnter}>
          Enter
        </Button>
      </div>
    </LoginLayout>
  );
}
