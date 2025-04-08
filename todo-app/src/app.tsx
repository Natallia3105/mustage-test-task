import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import DashboardPage from './pages/DashboardPage';
import SignUpPage from './pages/SignUpPage';
import AuthRedirect from './components/AuthRedirect';
import { ROUTES } from './constants';

const root = createRoot(document.body);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path={ROUTES.Root} element={<AuthRedirect />} />
      <Route path={ROUTES.SignIn} element={<SignInPage />} />
      <Route path={ROUTES.SignUp} element={<SignUpPage />} />
      <Route path={ROUTES.Dashboard} element={<DashboardPage />} />
    </Routes>
  </BrowserRouter>,
);
