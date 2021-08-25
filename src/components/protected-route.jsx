import { useAuth } from '../services/auth';
import { Redirect, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import loader from './../images/loader.gif';
import AppHeader from './AppHeader/AppHeader';

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
    
    //TODO убрать в отдельный компонент
    
    return (
      <> 
        <AppHeader />
        <style>{"\
        body{\
          overflow:hidden;\
        }\
      "}</style>
        <img
          style={{
            width: '100%',
            height: '100vh',
            objectFit: 'contain',
            backgroundColor: 'black',
            overflow: 'hidden'
          }}
          alt={'loading...'}
          src={loader} />
      </>
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
