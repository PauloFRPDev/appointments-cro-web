import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import Dashboard from '../pages/User/Dashboard';
import MyAppointments from '../pages/User/MyAppointments';

import Appointments from '../pages/UserProvider/Appointments';
import ServiceQueue from '../pages/UserProvider/ServiceQueue';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password" component={ResetPassword} />

    <Route path="/user/dashboard" component={Dashboard} isPrivate />
    <Route path="/user/my_appointments" component={MyAppointments} isPrivate />

    <Route
      path="/provider/appointments"
      component={Appointments}
      isPrivate
      isProvider
    />
    <Route
      path="/provider/service_queue"
      component={ServiceQueue}
      isPrivate
      isProvider
    />
  </Switch>
);

export default Routes;
