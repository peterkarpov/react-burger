import { useAuth } from '../services/auth';
import { Redirect, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Loader from './pages/Loader';

export function ProtectedRoute({ children, ...rest }: React.PropsWithChildren<{ [key: string]: any }>) {

  let { user, ...auth } = useAuth();
  const [isUserLoaded, setUserLoaded] = useState(false);

  useEffect(() => {

    setUserLoaded(!!user);

  }, [user]);

  const isHas = auth.isHasCookie();

  if (isHas && !isUserLoaded) {

    return (
      <Loader />
    );
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isUserLoaded ? (
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
