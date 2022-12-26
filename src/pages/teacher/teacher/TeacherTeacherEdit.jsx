import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Button } from '@mui/material';
import SingleEditLayout from '../../../layouts/SingleEditLayout';
import MobileStudentCard from '../../../shared/MobileStudentCard';
import StandardHeader from '../../../shared/components/StandardHeader/StandardHeader';
import DeleteConfirmationModal from '../../../shared/DeleteConfirmationModal';
import * as api from '../../../api/base';

export default function TeacherTeacherEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const [saving, setSaving] = useState(false);
  const [enteredFirstName, setEnteredFirstName] = useState(location.state.currFirstName || '');
  const [enteredLastName, setEnteredLastName] = useState(location.state.currLastName || '');
  const [showModal, setShowModal] = useState(false);

  const handleSave = async () => {
    setSaving(true);

    await api.updateTeacher(location.state.id, {
      firstName: enteredFirstName,
      lastName: enteredLastName
    });

    setSaving(false);
    navigate('/teacher', {
      state: { snack: { error: false, message: 'Successfully updated teacher' } }
    });
  };

  const handleDelete = async () => {
    setShowModal(true);
  };

  const headerRenderer = () => <StandardHeader subHeaderText="Teacher Edit" />;
  const contentRenderer = () => (
    <>
      {ReactDOM.createPortal(
        <DeleteConfirmationModal
          show={showModal}
          onCancel={() => setShowModal(false)}
          onDelete={() => setShowModal(false)}
        />,
        document.getElementById('root')
      )}
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
    </>
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
      <Button
        type="button"
        variant="outlined"
        color="error"
        disabled={saving}
        onClick={handleDelete}
      >
        Delete
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
