import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export class Courses extends Component {
  render() {
    const { videos } = this.props;
    if (videos.length > 0) {
      return videos.map(item => <VideoList item={item} key={item.id} />);
    } else {
      return <div>Loading</div>;
    }
  }
}

const VideoList = ({ item }) => {
  return item.map(video => (
    <>
      <Link to={`/videos/${video.id}`}>
        <div className='course' key={video.id}>
          <img src={video.snippet.thumbnails.default.url} alt='' />
          <p className='info'> {video.snippet.title}</p>
        </div>
      </Link>
    </>
  ));
};

export default Courses;
