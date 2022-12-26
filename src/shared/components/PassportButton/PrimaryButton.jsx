import React from 'react';
import { Button } from '@mui/material';

export default function PrimaryButton({ text, disabled, onClick }) {
  return (
    <Button type="button" variant="contained" onClick={onClick} disabled={disabled}>
      {text}
    </Button>
  );
}
