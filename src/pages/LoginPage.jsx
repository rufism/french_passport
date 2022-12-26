import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { Language } from '@mui/icons-material';
import LoginLayout from '../layouts/LoginLayout/LoginLayout';
import * as api from '../api/base';

export default function LoginPage() {
  const [granting, setGranting] = useState(false);

  useEffect(() => {
    async function grant() {
      setGranting(true);
      if (!granting) {
        const query = window.location.search.substring(1);
        const queryParams = query.split('&').reduce((acc, param) => {
          const [key, value] = param.split('=');
          acc[key] = value;
          return acc;
        }, {});

        console.log(queryParams);

        const response = await api.grant(queryParams.code);

        console.log(response.access_token);

        localStorage.setItem('authToken', response.access_token);
        setGranting(false);

        const decoded = jwtDecode(response.access_token);
        let group;
        try {
          [group] = decoded['cognito:groups'];
        } catch (error) {
          console.log('error retrieving account group');
          console.log(error);
        }

        console.log(decoded);

        localStorage.setItem('group', group);
        localStorage.setItem('exp', decoded.exp);

        if (group === 'teachers') {
          window.location.href = 'http://localhost:3000/teacher';
        } else {
          window.location.href = 'http://localhost:3000/student';
        }
      }
    }

    grant();
  }, []);

  return (
    <LoginLayout>
      <div
        style={{
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}
      >
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

        <p>Setting up...</p>
      </div>
    </LoginLayout>
  );
}
