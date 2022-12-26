import React from 'react';
import { Add } from '@mui/icons-material';
import './newEntityCard.scss';

export default function NewEntityCard({ label, onClick }) {
  return (
    <div
      role="button"
      tabIndex={0}
      className="new-entity-card"
      onClick={onClick}
      onKeyDown={onClick}
    >
      <div className="new-entity-card-icon">
        <Add />
      </div>
      <div className="new-entity-card-label">
        <div>{label}</div>
      </div>
    </div>
  );
}
