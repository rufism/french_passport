import React from 'react';
import { Language } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import LoginLayout from '../layouts/LoginLayout';

export default function LoginPage() {
  // const navigate = useNavigate();
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

        {/* email */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span>Email </span>
          <input id="email" style={{ padding: '0.3em' }} />
        </div>

        {/* pass */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span>Password </span>
          <input type="password" id="password" style={{ padding: '0.3em' }} />
        </div>

        <div>
          <button type="button">Login</button>
          <div>
            <Link to="teacher">View Teacher Dashboard</Link>
          </div>
          <div>
            <Link to="student">View Student Passport</Link>
          </div>
        </div>

        {/* footer */}
        <div
          style={{
            paddingBottom: '1em'
          }}
        >
          <Link to="/help">Help</Link>
        </div>
      </div>
    </LoginLayout>
  );
}
