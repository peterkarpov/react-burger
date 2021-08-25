import { useAuth } from '../services/auth';
import { Redirect, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCallback } from 'react';

export function ProtectedRoute({ children, ...rest }) {

  let { getUser, ...auth } = useAuth();
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = useCallback(() => async () => {
    await getUser();
    setUserLoaded(true);
  }, [getUser]);

  useEffect(() => {
    init();
  }, [init]);

  if (!isUserLoaded) {
    // return null;
  }

  const isHas = auth.isHasCookie() || auth.user;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isHas ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
