import { useAuth } from '../services/auth';
import { Redirect, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from './pages/Loader';

export function ProtectedRoute({ children, ...rest }) {

  let { getUser, user, ...auth } = useAuth();
  const [isUserLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    getUser()
      .then((result) => {
        setUserLoaded(result);
      });
  }, [getUser]);

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
