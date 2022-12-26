import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import SingleEditLayout from '../../../layouts/SingleEditLayout';
import MobileStudentCard from '../../../shared/MobileStudentCard';
import StandardHeader from '../../../shared/components/StandardHeader/StandardHeader';
import * as api from '../../../api/base';

export default function TeacherStudentNew() {
  const [saving, setSaving] = useState(false);
  const [enteredFirstName, setEnteredFirstName] = useState('');
  const [enteredLastName, setEnteredLastName] = useState('');
  const navigate = useNavigate();

  const handleSave = async () => {
    setSaving(true);

    await api.createStudent({
      firstName: enteredFirstName,
      lastName: enteredLastName
    });

    setSaving(false);
    navigate('/teacher', {
      state: { snack: { error: false, message: 'Successfully created student' } }
    });
  };

  const headerRenderer = () => <StandardHeader subHeaderText="Student New" />;
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
    <div style={{ display: 'flex', gap: '10px' }}>
      <Button
        type="button"
        variant="outlined"
        disabled={saving}
        onClick={() => navigate('/teacher')}
      >
        Cancel
      </Button>
      <Button type="button" variant="outlined" disabled={saving} onClick={handleSave}>
        Save
      </Button>
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
