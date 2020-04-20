import React, { Component } from 'react';
import './Home.css';
import Courses from './Courses';
import Login from '../Login/Login';

export class Home extends Component {
  render() {
    const { isSignedIn, loginUser } = this.props;

    if (isSignedIn) {
      return (
        <div className='container-fluid'>
          <div className='container'>
            <header className='header'>
              <div className='jumbotron text-center'>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Ratione hic repudiandae harum asperiores iure ipsum dolore
                  odit. Praesentium, quasi ipsum!
                </p>
                <button className='btn btn-outline-primary'>
                  Go to courses
                </button>
              </div>
            </header>

            <div className=' courses'>
              <Courses />
            </div>
          </div>
        </div>
      );
    } else {
      return <Login loginUser={loginUser} />;
    }
  }
}

export default Home;
