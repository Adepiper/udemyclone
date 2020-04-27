import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export class Courses extends Component {
  render() {
    const { videos } = this.props;
    if (videos.length > 0) {
      return videos.map((video, index) => (
        <>
          <Link to={`/courses/${video.id}`}>
            <div className='course'>
              <img src={video.snippet.thumbnails.default.url} alt='' />
              <p className='info'> {video.snippet.title}</p>
            </div>
          </Link>
        </>
      ));
    } else {
      return <div>Loading</div>;
    }
  }
}

export default Courses;
