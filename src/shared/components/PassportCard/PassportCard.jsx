import React from 'react';
import { Book, Home, Key, Person } from '@mui/icons-material';
import SecondaryButton from '../SecondaryButton';
import './passportCard.scss';

export default function PassportCard({ title, desc, iconSelection, completed, onClick, onEdit }) {
  let iconMarkup;
  switch (iconSelection) {
    case 0:
      iconMarkup = (
        <Book
          style={{
            backgroundColor: 'black',
            color: 'white',
            padding: '0.2em 0.2em',
            borderRadius: '0.2em'
          }}
        />
      );
      break;

    case 1:
      iconMarkup = (
        <Person
          style={{
            backgroundColor: 'black',
            color: 'white',
            padding: '0.2em 0.2em',
            borderRadius: '0.2em'
          }}
        />
      );
      break;

    case 2:
      iconMarkup = (
        <Home
          style={{
            backgroundColor: 'black',
            color: 'white',
            padding: '0.2em 0.2em',
            borderRadius: '0.2em'
          }}
        />
      );
      break;

    case 3:
      iconMarkup = (
        <Key
          style={{
            backgroundColor: 'black',
            color: 'white',
            padding: '0.2em 0.2em',
            borderRadius: '0.2em'
          }}
        />
      );
      break;

    default:
      iconMarkup = (
        <Book
          style={{
            backgroundColor: 'black',
            color: 'white',
            padding: '0.2em 0.2em',
            borderRadius: '0.2em'
          }}
        />
      );
  }

  return (
    <div className="passport-card" role="button" tabIndex={0} onKeyDown={onClick} onClick={onClick}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          gap: '5px'
        }}
      >
        <div style={{ fontSize: '14pt', textDecoration: completed ? 'line-through' : 'none' }}>
          {title}
        </div>
        {iconMarkup}
      </div>
      <div style={{ fontSize: '10pt', textAlign: 'left' }}>{desc}</div>
      <div>
        <SecondaryButton text="View" onClick={onClick} />
        <SecondaryButton text="Edit" onClick={onEdit} />
      </div>
    </div>
  );
}
