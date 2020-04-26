import React, { Component } from 'react';

export class InstructorDetails extends Component {
  render() {
    const { channel, video } = this.props;
    if (channel.length > 0) {
      return (
        <div className='collection'>
          <ul>
            <li className='collection-item'>
              <strong>Title:</strong>
              {channel[0].snippet.title}
            </li>
            <li className='collection-item'>
              <strong>Id:</strong> {channel[0].id}
            </li>
            <li className='collection-item'>
              {' '}
              <strong>Subscribers:</strong>
              {channel[0].statistics.subscriberCount}
            </li>
            <li className='collection-item'>
              {' '}
              <strong>Videos:</strong>
              {channel[0].statistics.videoCount}
            </li>
            <li className='collection-item'>
              {' '}
              <strong>Statistics:</strong>
              {channel[0].statistics.viewCount}
            </li>
          </ul>
          <label htmlFor='Description'>
            <strong>Description:</strong>{' '}
          </label>
          <p>{channel[0].snippet.description}</p>
          {video.length === 0 ? (
            <NoVideos />
          ) : (
            <InstructorVideoList video={video} />
          )}
        </div>
      );
    } else {
      return false;
    }
  }
}

const NoVideos = () => <div>No videos</div>;

const InstructorVideoList = ({ video }) => console.log(video);

export default InstructorDetails;
