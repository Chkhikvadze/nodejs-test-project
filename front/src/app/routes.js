import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import TimeList from './components/times/TimeList';
import Report from './components/times/Report';
import TimeEditForm from './components/times/TimeEditForm';
import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';
import Signup from './components/auth/Signup';

import requireAuth from './components/hoc/RequireAuth';
import requireNotAuth from './components/hoc/RequireNotAuth';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={requireNotAuth(Signup)} />
    <Route path="signin" component={requireNotAuth(Signin)} />
    <Route path="signup" component={requireNotAuth(Signup)} />
    <Route path="signout" component={Signout} />
    <Route path="times" component={requireAuth(TimeList)} />
    <Route path="add" component={requireAuth(TimeEditForm)} />
    <Route path="edit(/:timeId)" component={requireAuth(TimeEditForm)} />
    <Route path="report" component={requireAuth(Report)} />
  </Route>
)
