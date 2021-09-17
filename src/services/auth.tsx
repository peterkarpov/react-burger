import { useContext, createContext, useEffect } from 'react';

import { getCookie } from './utils';
import { getUser } from './actions/auth';
import { useAppDispatch, useAppSelector } from '../utils/hooks';

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

  const { user } = useAppSelector(state => state.auth);

  const dispatch = useAppDispatch();

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
