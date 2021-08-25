import { useContext, useState, createContext } from 'react';
import { deleteCookie, setCookie } from './utils';
import React from 'react';
import {
  loginRequest,
  getUserRequest,
  logoutRequest,
  refreshTokenRequest,
  registerRequest,
  restorePasswordRequest,
  resetPasswordRequest,
  updateUserRequest
} from './authApi';
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
    const data = await getUserRequest()
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser({ ...data.user, id: data.user.email });
        }
        return data.success;
      })
      .catch((error) => {
        if (error.message === 'jwt expired') {
          return refreshToken(getUser);
        } else {
          console.log(error);
        }
      });

      return data;
  };

  const refreshToken = async (callback: Function) => {

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

    callback();

  };

  const signIn = async (form: { email: string, password: string }) => {

    const data = await loginRequest(form)
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

        return data;
      })
      .catch((error) => {
        console.log(error);
      });

    if (data?.success) {
      setUser({ ...data.user, id: data.user.email });
    }

  };

  const signOut = async () => {

    const token = getCookie('refresh-token') || '';

    setUser(null);

    deleteCookie('token');
    deleteCookie('refresh-token');

    await logoutRequest({ token: token })
      .catch((error) => {
        if (error.message === 'jwt expired') {
          return refreshToken(signOut);
        }
      });;
  };

  const signUp = async (form: { name: string, password: string, email: string }) => {

    const data = await registerRequest(form)
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

        if (!data.success) {
          console.log(data.message)
        }

        return data;
      })
      .catch((error) => {
        console.log(error)
      });

    if (data?.success) {
      setUser({ ...data.user, id: data.user.email });
    }
  }

  const restorePassword = async (form: { email: string }) => {

    const data = await restorePasswordRequest(form)
      .then(res => {
        return res.json();
      })
      .then(data => {

        if (!data.success) {
          console.log(data.message)
        }

        return data;
      })
      .catch((error) => {
        console.log(error)
      });

    return data;
  }

  const resetPassword = async (form: { token: string, password: string }) => {

    const data = await resetPasswordRequest(form)
      .then(res => {
        return res.json();
      })
      .then(data => {

        if (!data.success) {
          console.log(data.message)
        }

        return data;
      })
      .catch((error) => {
        console.log(error)
      });

    return data;
  }

  const updateUser = async (form: { name: string, email: string, password: string }) => {
    const data = await updateUserRequest(form)
      .then(res => {
        return res.json();
      })
      .then(data => {

        if (!data.success) {
          console.log(data.message)
        }

        return data;
      })
      .then(async (data) => {

        if (data.success) {
          await signOut();

          await signIn({ email: form.email, password: form.password });
        }

        return data;
      })
      .catch((error) => {
        if (error.message === 'jwt expired') {
          return refreshToken(signOut);
        }
        console.log(error)
      });

    return data;
  }

  return {
    user,
    getUser,
    signIn,
    signOut,
    signUp,
    isHasCookie,
    refreshToken,
    registerRequest,
    restorePassword,
    resetPassword,
    updateUser
  };
}
