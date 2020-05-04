import React, { Component } from 'react';
import './Home.css';
import Courses from './Courses';

export class Home extends Component {
  render() {
    const { videos } = this.props;
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
            </div>
          </header>

          <div className=' courses'>
            <Courses videos={videos} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
