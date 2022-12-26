import React from 'react';
import { Person } from '@mui/icons-material';
import SecondaryButton from '../SecondaryButton';
import './teacherCard.scss';

export default function TeacherCard({ firstName, lastName, onEdit, onClick }) {
  return (
    <div className="teacher-card" role="button" tabIndex={0} onKeyDown={onClick}>
      <div className="teacher-card-left">
        <div>
          {firstName} {lastName.charAt(0)}.
        </div>
        <div className="teacher-card-left-button-group">
          <SecondaryButton text="View" onClick={onClick} />
          <SecondaryButton text="Edit" onClick={onEdit} />
        </div>
      </div>
      <div className="teacher-card-right">
        <Person fontSize="large" className="teacher-card-icon" />
      </div>
    </div>
  );
}
