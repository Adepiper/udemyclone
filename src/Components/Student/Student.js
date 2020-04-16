import React, { Component } from 'react';
import './Student.css';

export class Student extends Component {
  render() {
    return (
      <div className='container-fluid student'>
        <div className='container'>
          <header>
            <h2></h2>
          </header>

          <div>
            <iframe
              className='screen'
              src={`https://www.youtube.com/embed/$`}
              allowFullScreen
            ></iframe>
          </div>

          <div className='about'>
            <h2>About Course</h2>
            <div className='stack'>
              <h3>Stack</h3>
              <p></p>
            </div>
            <div className='description'>
              <h3>Description</h3>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Student;
