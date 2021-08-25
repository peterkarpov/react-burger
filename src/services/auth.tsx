import { useContext, useState, createContext } from 'react';
import { deleteCookie, setCookie } from './utils';
import React from 'react';
import { loginRequest, getUserRequest, logoutRequest, refreshTokenRequest } from './authApi';
import { getCookie } from './utils';

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

  const [user, setUser] = useState(null);

  const isHasCookie = () => {
    
    const isHas = !!(getCookie('token') && getCookie('refresh-token'));
    
    return isHas;
  }

  const getUser = async () => {
    return await getUserRequest()
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser({ ...data.user, id: data.user._id });
        }
        return data.success;
      });
  };

  const refreshToken = async () => {

    const data = await refreshTokenRequest({ token: getCookie('refresh-token') || '' })
      .then(res => {
        return res.json();
      })
      .then(data => {

        if (data.accessToken) {
          const authToken = data.accessToken.split('Bearer ')[1];

          if (authToken) {
            setCookie('token', authToken, null);
          }
        }

        if (data.refreshToken) {
          setCookie('refresh-token', data.refreshToken, null);
        }

        return data
      });

    if (data.success && data.user) {
      setUser({ ...data.user, id: data.user.email });
    }

  };

  const signIn = async (form: any) => {

    const data = await loginRequest(form)
      .then(res => {

        // let authToken;
        // res.headers.forEach(header => {
        //   if (header.indexOf('Bearer') === 0) {
        //     authToken = header.split('Bearer ')[1];
        //   }
        // });
        // if (authToken) {
        //   setCookie('token', authToken, null);
        // }

        return res.json();
      })
      .then(data => {

        if (data.accessToken) {
          const authToken = data.accessToken.split('Bearer ')[1];

          if (authToken) {
            setCookie('token', authToken, null);
          }
        }

        if (data.refreshToken) {
          setCookie('refresh-token', data.refreshToken, null);
        }

        return data
      });

    if (data.success) {
      setUser({ ...data.user, id: data.user.email });
    }
    
  };

  const signOut = async () => {

    const token = getCookie('refresh-token') || '';

    setUser(null);

    deleteCookie('token');
    deleteCookie('refresh-token');

    await logoutRequest({ token: token });    
  };


  return {
    user,
    getUser,
    signIn,
    signOut,
    isHasCookie,
    refreshToken
  };
}
