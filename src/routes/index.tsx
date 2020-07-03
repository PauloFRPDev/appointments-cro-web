import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/User/Dashboard';
import MyAppointments from '../pages/User/MyAppointments';

import Appointments from '../pages/UserProvider/Appointments';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />

    <Route path="/user/dashboard" component={Dashboard} isPrivate />
    <Route path="/user/my_appointments" component={MyAppointments} isPrivate />

    <Route
      path="/provider/appointments"
      component={Appointments}
      isPrivate
      isProvider
    />
  </Switch>
);

export default Routes;
