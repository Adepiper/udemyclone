import React, { Component } from 'react';
import './Student.css';

export class Student extends Component {
  render() {
    const { video } = this.props;
    console.log(video);
    if (!video) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className='container-fluid student'>
          <div className='container'>
            <header>
              <h2>{video.snippet.title}</h2>
            </header>

            <div>
              <iframe
                className='screen'
                src={`https://www.youtube.com/embed/${video.id.videoid}`}
                allowFullScreen
              ></iframe>
            </div>

            <div className='about'>
              <h2>About Course</h2>
              <div className='stack'>
                <h3>Stack</h3>
                <p>{video.snippet.channelTitle}</p>
              </div>
              <div className='description'>
                <h3>Description</h3>
                <p>{video.snippet.description}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Student;
