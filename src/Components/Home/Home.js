import React, { Component } from 'react';
import './Home.css';

export class Home extends Component {
  render() {
    return (
      <div className='container-fluid'>
        <div className='container'>
          <header className='header'>
            <div className='jumbotron text-center'>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Ratione hic repudiandae harum asperiores iure ipsum dolore odit.
                Praesentium, quasi ipsum!
              </p>
              <button className='btn btn-outline-primary'>Go to courses</button>
            </div>
          </header>

          <div className=' courses'>
            <div className='course'>
              <img alt='' />
              <p className='info'></p>
            </div>
            <div className='course'>
              <img alt='' />
              <p className='info'></p>
            </div>
            <div className='course'>
              <img alt='' />
              <p className='info'></p>
            </div>
            <div className='course'>
              <img alt='' />
              <p className='info'>hello</p>
            </div>
            <div className='course'>
              <img alt='' />
              <p className='info'></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
