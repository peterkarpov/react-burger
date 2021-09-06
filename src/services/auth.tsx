import { useContext, createContext, useEffect } from 'react';

import { getCookie } from './utils';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './actions/auth';

const AuthContext = createContext<any>(undefined);

export function ProvideAuth(obj: any) {

  const { children } = obj;

  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useProvideAuth() {

  const { user } = useSelector<any, any>(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getUser());

  }, [dispatch]);

  const isHasCookie = () => {

    const isHas = !!(getCookie('token') && getCookie('refresh-token'));

    return isHas;
  }

  return {
    user,
    isHasCookie,
  };
}
