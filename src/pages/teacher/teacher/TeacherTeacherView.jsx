import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import SingleEditLayout from '../../../layouts/SingleEditLayout';
import StandardHeader from '../../../shared/components/StandardHeader/StandardHeader';
import * as api from '../../../api/base';

export default function TeacherTeacherView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [teacher, setTeacher] = useState({});

  useEffect(() => {
    async function getItem() {
      setLoading(true);

      const res = await api.getTeacher(location.state.id);
      setTeacher(res);

      setLoading(false);
    }

    getItem();
  }, []);

  let contentMarkup;
  if (loading) {
    contentMarkup = <div>Loading</div>;
  } else {
    contentMarkup = (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '80%',
          height: '100%'
        }}
      >
        {/* Label */}
        <div>
          <div style={{ textAlign: 'left' }}>
            <div>First Name</div>
            <div>{teacher.firstName}</div>
          </div>
        </div>

        {/* Group  */}
        <div>
          <div style={{ textAlign: 'left' }}>
            <div>Last Name</div>
            <div>{teacher.lastName}</div>
          </div>
        </div>

        {/*  */}
      </div>
    );
  }

  const headerRenderer = () => <StandardHeader subHeaderText="Teacher View" />;
  const contentRenderer = () => contentMarkup;
  const footerRenderer = () => (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Button type="button" variant="outlined" onClick={() => navigate('/teacher')}>
        Back
      </Button>
      <Button
        type="button"
        variant="outlined"
        onClick={() => {
          navigate('/teacher/teacher/edit', {
            state: {
              id: teacher.id,
              currFirstName: teacher.firstName,
              currLastName: teacher.lastName
            }
          });
        }}
      >
        Edit
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
