import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {
  HomePage,
  LoginPage,
  RegistrationPage,
  ProfilePage,
  ForgotPasswordPage,
  ResetPasswordPage
} from './../pages';
import { ProtectedRoute } from '../protected-route';
import { ProvideAuth } from '../../services/auth';

function App() {

  return (
    <ProvideAuth>

      <Router>
        <Switch>

          <Route path="/login" exact={true}>
            <LoginPage />
          </Route>

          <Route path="/register" exact={true}>
            <RegistrationPage />
          </Route>

          <Route path="/forgot-password" exact={true}>
            <ForgotPasswordPage />
          </Route>

          <Route path="/reset-password" exact={true}>
            <ResetPasswordPage />
          </Route>

          <ProtectedRoute path="/profile" exact={true}>
            <ProfilePage />
          </ProtectedRoute>

          <ProtectedRoute path="/" exact={true}>
            <HomePage />
          </ProtectedRoute>

          <Route>
            <h1>Oops! 404 Error</h1>
            <p>The page you requested does not exist</p>
            <br />
            <p>check the address or try <Link to='/' >homepage</Link></p>
          </Route>

        </Switch>
      </Router>

    </ProvideAuth>
  );
}

export default App;
