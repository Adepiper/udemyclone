import React, { Component } from 'react';

export class InstructorDetails extends Component {
  render() {
    const { channel } = this.props;
    return (
      <div>
        <ul className='collection'>
          <li className='collection-item'>{channel.snippet.title}</li>
          <li className='collection-item'>{channel.id}</li>
          <li className='collection-item'>
            {channel.statistics.subscriberCount}
          </li>
          <li className='collection-item'>{channel.statistics.videoCount}</li>
          <li className='collection-item'>{channel.statistics.viewCount}</li>
        </ul>
        <p>{channel.snippet.description}</p>
      </div>
    );
  }
}

export default InstructorDetails;
