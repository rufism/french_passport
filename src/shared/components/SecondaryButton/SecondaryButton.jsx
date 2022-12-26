import React from 'react';
import { Button } from '@mui/material';

export default function SecondaryButton({ text, disabled, onClick }) {
  return (
    <Button type="button" variant="outlined" onClick={onClick} disabled={disabled}>
      {text}
    </Button>
  );
}
