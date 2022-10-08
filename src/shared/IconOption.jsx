import React from 'react';

export default function IconOption({ children, onClick }) {
  return (
    <div
      tabIndex="0"
      role="menuitem"
      onClick={onClick}
      onKeyDown={onClick}
      style={{
        width: '3em',
        height: '3em',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid black',
        margin: '0.3em',
        cursor: 'pointer'
      }}
    >
      {children}
    </div>
  );
}
