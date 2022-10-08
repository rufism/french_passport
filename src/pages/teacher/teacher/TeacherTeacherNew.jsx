import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SingleEditLayout from '../../../layouts/SingleEditLayout';
import MobileStudentCard from '../../../shared/MobileStudentCard';
import StandardHeader from '../../../shared/StandardHeader';

export default function TeacherTeacherNew() {
  const navigate = useNavigate();
  const [enteredFirstName, setEnteredFirstName] = useState('');
  const [enteredLastName, setEnteredLastName] = useState('');

  const headerRenderer = () => <StandardHeader subHeaderText="Teacher New" />;
  const contentRenderer = () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '80%',
        height: '100%'
      }}
    >
      {/* Preview */}
      <MobileStudentCard firstName={enteredFirstName} lastName={enteredLastName} />

      {/* First Name */}
      <div>
        <div style={{ textAlign: 'left' }}>
          <label htmlFor="itemName">First Name ({enteredFirstName.length}/64)</label>
        </div>
        <div style={{ textAlign: 'left' }}>
          <input
            style={{ width: '100%', padding: '0.5em' }}
            name="itemName"
            placeholder="Jane"
            value={enteredFirstName}
            onChange={(e) => setEnteredFirstName(e.target.value)}
          />
        </div>
      </div>

      {/* Last Name */}
      <div>
        <div style={{ textAlign: 'left' }}>
          <label htmlFor="itemName">Last Name ({enteredLastName.length}/64)</label>
        </div>
        <div style={{ textAlign: 'left' }}>
          <input
            style={{ width: '100%', padding: '0.5em' }}
            name="itemName"
            placeholder="Doe"
            value={enteredLastName}
            onChange={(e) => setEnteredLastName(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
  const footerRenderer = () => (
    <div>
      <button type="button" onClick={() => navigate('/teacher')}>
        Cancel
      </button>
      <button type="button" onClick={() => navigate('/teacher')}>
        Save
      </button>
    </div>
  );

  return (
    <SingleEditLayout
      headerRenderer={headerRenderer}
      contentRenderer={contentRenderer}
      footerRenderer={footerRenderer}
    />
  );
}