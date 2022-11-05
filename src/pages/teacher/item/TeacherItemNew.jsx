import React, { useState } from 'react';
import { Book, Person, Home, Key } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import SingleEditLayout from '../../../layouts/SingleEditLayout';
import StandardHeader from '../../../shared/StandardHeader';
import MobilePassportItem from '../../../shared/MobilePassportItem';
import IconOption from '../../../shared/IconOption';
import * as api from '../../../api/base';

export default function TeacherItemNew() {
  const [saving, setSaving] = useState(false);
  const [enteredName, setEnteredName] = useState('');
  const [enteredGroup, setEnteredGroup] = useState('');
  const [enteredDescription, setEnteredDescription] = useState('');
  const [enteredCompletionText, setEnteredCompletionText] = useState('');
  const [iconSelection, setIconSelection] = useState(0);
  const navigate = useNavigate();

  const handleSave = async () => {
    setSaving(true);

    await api.createItem({
      title: enteredName,
      desc: enteredDescription,
      icon: iconSelection,
      submissionType: 'text',
      submissionMessage: enteredCompletionText
    });

    setSaving(false);
    navigate('/teacher', {
      state: { snack: { error: false, message: 'Successfully created item' } }
    });
  };

  const headerRenderer = () => <StandardHeader subHeaderText="Item New" />;
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
      <MobilePassportItem
        title={enteredName}
        desc={enteredDescription}
        iconSelection={iconSelection}
      />

      {/* Label */}
      <div>
        <div style={{ textAlign: 'left' }}>
          <label htmlFor="itemName">Name ({enteredName.length}/64)</label>
        </div>
        <div style={{ textAlign: 'left' }}>
          <input
            style={{ width: '100%', padding: '0.5em' }}
            name="itemName"
            placeholder="New Passport Item"
            value={enteredName}
            onChange={(e) => setEnteredName(e.target.value)}
          />
        </div>
      </div>

      {/* Group  */}
      <div>
        <div style={{ textAlign: 'left' }}>
          <label htmlFor="itemGroup">Group ({enteredGroup.length}/64)</label>
        </div>
        <div style={{ textAlign: 'left' }}>
          <input
            style={{ width: '100%', padding: '0.5em' }}
            name="itemGroup"
            placeholder="Grade 10"
            value={enteredGroup}
            onChange={(e) => setEnteredGroup(e.target.value)}
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <div style={{ textAlign: 'left' }}>
          <label htmlFor="itemName">Description ({enteredDescription.length}/256)</label>
        </div>
        <div style={{ textAlign: 'left' }}>
          <textarea
            placeholder="An example description"
            style={{ width: '100%', padding: '0.5em', fontFamily: 'inherit' }}
            name="itemName"
            value={enteredDescription}
            onChange={(e) => setEnteredDescription(e.target.value)}
          />
        </div>
      </div>

      {/* Completion Text */}
      <div>
        <div style={{ textAlign: 'left' }}>
          <label htmlFor="itemName">Completion Text ({enteredCompletionText.length}/256)</label>
        </div>
        <div style={{ textAlign: 'left' }}>
          <textarea
            style={{ width: '100%', padding: '0.5em', fontFamily: 'inherit' }}
            name="itemName"
            value={enteredCompletionText}
            onChange={(e) => setEnteredCompletionText(e.target.value)}
          />
        </div>
      </div>

      {/* Icon */}
      <div>
        <div style={{ textAlign: 'left' }}>
          <span>Icon </span>
        </div>
        <div style={{ textAlign: 'left', display: 'flex', flexWrap: 'wrap' }}>
          <IconOption onClick={() => setIconSelection(0)}>
            <Book />
          </IconOption>
          <IconOption onClick={() => setIconSelection(1)}>
            <Person />
          </IconOption>
          <IconOption onClick={() => setIconSelection(2)}>
            <Home />
          </IconOption>
          <IconOption onClick={() => setIconSelection(3)}>
            <Key />
          </IconOption>
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
