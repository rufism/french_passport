import React from 'react';
import { Person } from '@mui/icons-material';

export default function MobileStudentCard({ firstName, lastName, onEdit, onClick }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        minHeight: '75px',
        width: '80%',
        cursor: 'pointer',
        border: '1px solid black',
        borderRadius: '0.3em',
        padding: '1em'
      }}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onClick}
    >
      <Person
        style={{
          backgroundColor: 'black',
          color: 'white',
          padding: '0.2em',
          borderRadius: '1em'
        }}
      />
      <div style={{ textAlign: 'left', flexGrow: '1', paddingLeft: '0.3em' }}>
        <div style={{ fontSize: '14pt' }}>
          {firstName} {lastName.charAt(0)}.
        </div>
      </div>
      <div style={{ margin: '10px' }}>
        <button type="button" onClick={onEdit}>
          Edit
        </button>
      </div>
    </div>
  );
}
