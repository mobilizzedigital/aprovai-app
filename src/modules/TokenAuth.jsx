import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import { UserAPI } from '../api';
import ROUTES from '../routes';

const TokenAuth = ({ children }) => {
  const [allowRender, setAllowRender] = useState(false);
  const { search } = useLocation();
  const urlParams = new URLSearchParams(search);
  const token = urlParams.get('token');
  const history = useHistory();
  const { addToast } = useToasts();

  useEffect(() => {
    const autoLogin = async () => {
      try {
        const {
          data: { token: userToken }
        } = await UserAPI.tokenLogin(token);

        localStorage.setItem('aprovaai_user_token', userToken);
        setAllowRender(true);
      } catch (e) {
        addToast('Token inválido', { appearance: 'info' });
        history.push(ROUTES.login);
      }
    };

    if (token) {
      autoLogin();
    }
  }, [token, history, addToast]);

  if (!token || allowRender) {
    return children;
  }

  return null;
};

export default TokenAuth;
