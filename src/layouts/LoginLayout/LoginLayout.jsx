import React from 'react';
import './loginLayout.scss';

export default function LoginLayout({ children }) {
  return (
    <div className="login-layout">
      <div className="login-layout-island">{children}</div>
    </div>
  );
}
