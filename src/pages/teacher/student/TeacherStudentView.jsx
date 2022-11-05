import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import SingleEditLayout from '../../../layouts/SingleEditLayout';
import StandardHeader from '../../../shared/StandardHeader';
import * as api from '../../../api/base';

export default function TeacherStudentView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState({});

  useEffect(() => {
    async function getItem() {
      setLoading(true);

      const res = await api.getStudent(location.state.id);
      setStudent(res);

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
            <div>{student.firstName}</div>
          </div>
        </div>

        {/* Group  */}
        <div>
          <div style={{ textAlign: 'left' }}>
            <div>Last Name</div>
            <div>{student.lastName}</div>
          </div>
        </div>

        {/*  */}
      </div>
    );
  }

  const headerRenderer = () => <StandardHeader subHeaderText="Student View" />;
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
          navigate('/teacher/student/edit', {
            state: {
              id: student.id,
              currFirstName: student.firstName,
              currLastName: student.lastName
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
