import React from 'react';
import { Book, Home, Key, Person } from '@mui/icons-material';
import './studentPassportCard.scss';

export default function StudentPassportCard({
  title,
  desc,
  iconSelection,
  completed,
  onClick,
  onCheck
}) {
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
    <div
      className="student-passport-card"
      role="button"
      tabIndex={0}
      onKeyDown={onClick}
      onClick={onClick}
    >
      <div
        style={{
          padding: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          gap: '5px'
        }}
      >
        {iconMarkup}
        <div style={{ fontSize: '14pt', textDecoration: completed ? 'line-through' : 'none' }}>
          {title}
        </div>
        <input type="checkbox" checked={completed} onClick={onCheck} />
      </div>
      <div style={{ margin: '10px', width: '100%' }}>
        <div style={{ fontSize: '10pt', textAlign: 'left' }}>{desc}</div>
      </div>
    </div>
  );
}
