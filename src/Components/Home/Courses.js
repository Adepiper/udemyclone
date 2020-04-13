import React, { Component } from 'react';
import './Home.css';
import { withRouter, Link } from 'react-router-dom';

export class Courses extends Component {
  openDiv(e) {
    console.log(e.path);
  }
  render() {
    const { courses } = this.props;
    return courses.map(course => (
      <div
        className='course'
        to={`/courses/${course.id}`}
        course={course}
        key={course.id}
        data-id={course.id}
        onClick={this.openDiv}
      >
        <img src={course.courseCover} />
        <p className='info'> {course.title}</p>
      </div>
    ));
  }
}

export default withRouter(Courses);
