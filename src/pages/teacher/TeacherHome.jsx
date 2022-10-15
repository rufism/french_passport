import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollingLayoutWithTabs from '../../layouts/ScrollingLayoutWithTabs';
import StandardHeader from '../../shared/StandardHeader';
import MobileStudentCard from '../../shared/MobileStudentCard';
import MobilePassportItem from '../../shared/MobilePassportItem';
import NewEntityCard from '../../shared/NewEntityCard';
import * as api from '../../api/base';

export default function TeacherHome() {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [items, setItems] = useState([]);

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      setLoading(true);

      const studentsRes = await api.getStudents();
      setStudents(studentsRes.students);

      const itemsRes = await api.getItems();
      setItems(itemsRes.items);

      const teachersRes = await api.getTeachers();
      setTeachers(teachersRes.teachers);

      setLoading(false);
    }

    getData();
  }, []);

  let contentMarkup;
  if (loading) {
    contentMarkup = <div>Loading</div>;
  } else if (activeTabIndex === 0) {
    contentMarkup = students.map((student) => (
      <MobileStudentCard
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
    contentMarkup = items.map((item) => (
      <MobilePassportItem
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
      <MobileStudentCard
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
