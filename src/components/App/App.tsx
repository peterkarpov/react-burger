import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  HomePage,
  LoginPage,
  RegistrationPage,
  ProfilePage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ModalSwitch,
  FeedPage,
  ModalSwitchForOrderInfo,
  Page404
} from './../pages';
import { ProvideAuth } from '../../services/auth';
import AppHeader from '../AppHeader/AppHeader';
import { ProtectedRoute } from '../ProtectedRoute';
// import HomeOrIngredientPage from '../pages/HomeOrIngredientPage';

function App() {

  return (
    <ProvideAuth>

      <Router>

        <AppHeader />

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

          <Route path="/ingredients/:id" exact={true}>
            {/* <HomeOrIngredientPage /> */}
            <ModalSwitch />
          </Route>


          <Route path="/feed" exact={true}>
            <FeedPage />
          </Route>

          <Route path="/feed/:number" exact={true}>
            {/* TODO page and modal */}
            {/* <OrderInfoPage /> */}
            <ModalSwitchForOrderInfo route={"/feed"}>
              <FeedPage />
            </ModalSwitchForOrderInfo>
          </Route>

          <ProtectedRoute path="/profile/orders" exact={true}>
            <ProfilePage />
          </ProtectedRoute>

          <ProtectedRoute path="/profile/orders/:number" exact={true}>
            {/* TODO page and modal */}
            {/* <OrderInfoPage /> */}
            <ModalSwitchForOrderInfo route={"/profile/orders"}>
              <ProfilePage />
            </ModalSwitchForOrderInfo>
          </ProtectedRoute>

          <Route path="/" exact={true}>
            <HomePage />
          </Route>

          <Route>

            {/* <h1>Oops! 404 Error</h1>
            <p>The page you requested does not exist</p>
            <br />
            <p>check the address or try <Link to='/' >homepage</Link></p> */}

            <Page404 />

          </Route>

        </Switch>
      </Router>

    </ProvideAuth>
  );
}

export default App;
