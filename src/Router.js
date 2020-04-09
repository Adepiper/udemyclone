import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Student from './Components/Student/Student';
import Instructor from './Components/Instructor/Instructor';
import { Navbar } from './Components/Navbar/Navbar';

function Router() {
  return (
    <div>
      <Navbar />
      <Route
        exact
        path='/'
        render={prop => (
          <React.Fragment>
            <Home />
          </React.Fragment>
        )}
      ></Route>
      <Route path='/courses' component={Student}></Route>
      <Route path='/Instructor' component={Instructor}></Route>
    </div>
  );
}

export default Router;
