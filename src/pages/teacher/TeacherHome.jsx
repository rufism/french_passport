import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import ScrollingLayoutWithTabs from '../../layouts/ScrollingLayoutWithTabs';
import StandardHeader from '../../shared/components/StandardHeader/StandardHeader';
import PassportCard from '../../shared/components/PassportCard/PassportCard';
import NewEntityCard from '../../shared/components/NewEntityCard';
import StudentCard from '../../shared/components/StudentCard';
import TeacherCard from '../../shared/components/TeacherCard';
import * as api from '../../api/base';

export default function TeacherHome() {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [items, setItems] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function getData() {
      if (!loading) {
        setLoading(true);

        const studentsRes = await api.getStudents();
        setStudents(studentsRes.students);

        const groupsRes = await api.getGroups();
        setGroups(groupsRes.groups);

        const itemsRes = await api.getItems();
        setItems(itemsRes.items);

        const teachersRes = await api.getTeachers();
        setTeachers(teachersRes.teachers);

        setLoading(false);
      }
    }

    getData();
  }, []);

  useEffect(() => {
    if (location.state && location.state.snack) {
      setSnackOpen(true);
    }
  }, []);

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };

  let contentMarkup;
  if (loading) {
    contentMarkup = <div>Loading</div>;
  } else if (activeTabIndex === 0) {
    contentMarkup = students.map((student) => (
      <StudentCard
        firstName={student.firstName}
        lastName={student.lastName}
        onClick={() =>
          navigate('/teacher/student/view', {
            state: {
              id: student.id
            }
          })
        }
        onEdit={() =>
          navigate('/teacher/student/edit', {
            state: {
              id: student.id,
              currFirstName: student.firstName,
              currLastName: student.lastName
            }
          })
        }
      />
    ));
    contentMarkup.unshift(
      <NewEntityCard label="New Student" onClick={() => navigate('/teacher/student/new')} />
    );
  } else if (activeTabIndex === 1) {
    // organize groups

    contentMarkup = items.map((item) => (
      <PassportCard
        title={item.title}
        desc={item.desc}
        iconSelection={item.icon}
        teacherView
        onClick={() =>
          navigate('/teacher/item/view', {
            state: {
              id: item.id
            }
          })
        }
        onEdit={() =>
          navigate('/teacher/item/edit', {
            state: {
              id: item.id,
              currName: item.title,
              currGroup: item.group,
              currDescription: item.desc,
              currCompletionText: item.completionText,
              currIconSelection: item.icon
            }
          })
        }
      />
    ));
    contentMarkup.unshift(
      <NewEntityCard label="New Item" onClick={() => navigate('/teacher/item/new')} />
    );
  } else if (activeTabIndex === 2) {
    contentMarkup = teachers.map((teacher) => (
      <TeacherCard
        firstName={teacher.firstName}
        lastName={teacher.lastName}
        onClick={() =>
          navigate('/teacher/teacher/view', {
            state: {
              id: teacher.id
            }
          })
        }
        onEdit={() =>
          navigate('/teacher/teacher/edit', {
            state: {
              id: teacher.id,
              currFirstName: teacher.firstName,
              currLastName: teacher.lastName
            }
          })
        }
      />
    ));
    contentMarkup.unshift(
      <NewEntityCard label="New Teacher" onClick={() => navigate('/teacher/teacher/new')} />
    );
  }

  const headerRenderer = () => <StandardHeader subHeaderText="Teacher Home" />;
  const tabRenderer = () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        height: '100%',
        alignItems: 'center'
      }}
    >
      <span
        style={{
          textDecoration: activeTabIndex === 0 ? 'underline' : 'none'
        }}
        role="tab"
        tabIndex={0}
        onClick={() => setActiveTabIndex(0)}
        onKeyDown={() => setActiveTabIndex(0)}
      >
        Students
      </span>
      <span
        style={{
          textDecoration: activeTabIndex === 1 ? 'underline' : 'none'
        }}
        role="tab"
        tabIndex={0}
        onClick={() => setActiveTabIndex(1)}
        onKeyDown={() => setActiveTabIndex(1)}
      >
        Items
      </span>
      <span
        style={{
          textDecoration: activeTabIndex === 2 ? 'underline' : 'none'
        }}
        role="tab"
        tabIndex={0}
        onClick={() => setActiveTabIndex(2)}
        onKeyDown={() => setActiveTabIndex(2)}
      >
        Teachers
      </span>
    </div>
  );
  const contentRenderer = () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        marginBottom: '20px',
        width: '100%',
        alignItems: 'center'
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackOpen}
        autoHideDuration={3000}
        onClose={handleSnackClose}
        message={location.state ? location.state.snack.message : ''}
      />
      {contentMarkup}
    </div>
  );

  return (
    <ScrollingLayoutWithTabs
      headerRenderer={headerRenderer}
      tabRenderer={tabRenderer}
      contentRenderer={contentRenderer}
    />
  );
}
