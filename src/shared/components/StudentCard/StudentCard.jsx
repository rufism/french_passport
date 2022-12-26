import React from 'react';
import { Person } from '@mui/icons-material';
import SecondaryButton from '../SecondaryButton';
import './studentCard.scss';

export default function StudentCard({ firstName, lastName, onEdit, onClick }) {
  return (
    <div className="student-card" role="button" tabIndex={0} onKeyDown={onClick}>
      <div className="student-card-left">
        <div>
          {firstName} {lastName.charAt(0)}.
        </div>
        <div className="student-card-left-button-group">
          <SecondaryButton text="View" onClick={onClick} />
          <SecondaryButton text="Edit" onClick={onEdit} />
        </div>
      </div>
      <div className="student-card-right">
        <Person fontSize="large" className="student-card-icon" />
      </div>
    </div>
  );
}
