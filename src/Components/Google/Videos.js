/* eslint-disable jsx-a11y/iframe-has-title */
import React, { Component } from 'react';

export class Videos extends Component {
  render() {
    const { items } = this.props;

    if (items.length === 0) {
      return <div>loading</div>;
    } else {
      items.map(item => {
        const videoId = item.snippet.resourceId.videoId;
        console.log(videoId);
        return <div className='col-s3'>okay</div>;
      });
    }
  }
}

export default Videos;
