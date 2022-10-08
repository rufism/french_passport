import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollingLayoutWithTabs from '../../layouts/ScrollingLayoutWithTabs';
import StandardHeader from '../../shared/StandardHeader';
import MobileStudentCard from '../../shared/MobileStudentCard';
import MobilePassportItem from '../../shared/MobilePassportItem';
import NewEntityCard from '../../shared/NewEntityCard';

import accounts from '../../accounts.json';
import items from '../../items.json';

export default function TeacherHome() {
  const defaultStudents = accounts.accounts.filter((account) => account.role === 'student');
  const defaultTeachers = accounts.accounts.filter((account) => account.role === 'teacher');
  const defaultItems = items.items;

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const navigate = useNavigate();

  let contentMarkup;
  if (activeTabIndex === 0) {
    contentMarkup = defaultStudents.map((student) => (
      <MobileStudentCard
        firstName={student.firstName}
        lastName={student.lastName}
        onEdit={() =>
          navigate('/teacher/student/edit', {
            state: {
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
    contentMarkup = defaultItems.map((item) => (
      <MobilePassportItem
        title={item.title}
        desc={item.desc}
        iconSelection={item.icon}
        teacherView
        onEdit={() =>
          navigate('/teacher/item/edit', {
            state: {
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
    contentMarkup = defaultTeachers.map((teacher) => (
      <MobileStudentCard
        firstName={teacher.firstName}
        lastName={teacher.lastName}
        onEdit={() =>
          navigate('/teacher/teacher/edit', {
            state: {
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
