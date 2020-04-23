import React, { Component } from 'react';

export class InstructorDetails extends Component {
  render() {
    const { channel } = this.props;
    return (
      <div>
        <ul className='collection'>
          <li className='collection-item'>{channel[0].snippet.title}</li>
          <li className='collection-item'>{channel[0].id}</li>
          <li className='collection-item'>
            {channel[0].statistics.subscriberCount}
          </li>
          <li className='collection-item'>
            {channel[0].statistics.videoCount}
          </li>
          <li className='collection-item'>{channel[0].statistics.viewCount}</li>
        </ul>
        <p>{channel[0].snippet.description}</p>
      </div>
    );
  }
}

export default InstructorDetails;
