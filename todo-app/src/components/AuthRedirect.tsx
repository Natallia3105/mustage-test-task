import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { JWT_TOKEN_KEY_NAME, ROUTES } from '../constants';

const AuthRedirect = (): ReactElement => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(JWT_TOKEN_KEY_NAME);

    if (token) {
      navigate(ROUTES.Dashboard);
    } else {
      navigate(ROUTES.SignIn);
    }
  }, [navigate]);

  return null;
};

export default AuthRedirect;
