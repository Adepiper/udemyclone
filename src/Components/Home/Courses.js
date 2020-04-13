import React, { Component } from 'react';
import './Home.css';

export class Courses extends Component {
  render() {
    const { Videos, onUserSelected } = this.props;
    return Videos.map(video => (
      <div className='course' key={video.etag} onClick={onUserSelected(video)}>
        <img src={video.snippet.thumbnails.default.url} />
        <p className='info'> {video.snippet.title}</p>
      </div>
    ));
  }
}

export default Courses;
