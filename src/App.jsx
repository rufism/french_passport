import './App.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import Home from './pages/Home/Home';
import LoginPage from './pages/LoginPage';
import StudentPassportPage from './pages/student/StudentPassportPage';
import LoginHelp from './pages/LoginHelp';
import TeacherHome from './pages/teacher/TeacherHome';
import TeacherItemEdit from './pages/teacher/item/TeacherItemEdit';
import TeacherItemNew from './pages/teacher/item/TeacherItemNew';
import TeacherStudentEdit from './pages/teacher/student/TeacherStudentEdit';
import TeacherStudentNew from './pages/teacher/student/TeacherStudentNew';
import TeacherTeacherEdit from './pages/teacher/teacher/TeacherTeacherEdit';
import TeacherTeacherNew from './pages/teacher/teacher/TeacherTeacherNew';
import TeacherItemView from './pages/teacher/item/TeacherItemView';
import TeacherStudentView from './pages/teacher/student/TeacherStudentView';
import TeacherTeacherView from './pages/teacher/teacher/TeacherTeacherView';
import theme from './shared/styles/theme';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/help',
      element: <LoginHelp />
    },
    {
      path: '/student',
      element: <StudentPassportPage />
    },
    {
      path: '/teacher',
      element: <TeacherHome />
    },
    {
      path: '/teacher/item/new',
      element: <TeacherItemNew />
    },
    {
      path: '/teacher/student/new',
      element: <TeacherStudentNew />
    },
    {
      path: '/teacher/teacher/new',
      element: <TeacherTeacherNew />
    },
    {
      path: '/teacher/item/edit',
      element: <TeacherItemEdit />
    },
    {
      path: '/teacher/student/edit',
      element: <TeacherStudentEdit />
    },
    {
      path: '/teacher/teacher/edit',
      element: <TeacherTeacherEdit />
    },
    {
      path: '/teacher/item/view',
      element: <TeacherItemView />
    },
    {
      path: '/teacher/student/view',
      element: <TeacherStudentView />
    },
    {
      path: '/teacher/teacher/view',
      element: <TeacherTeacherView />
    }
  ]);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
