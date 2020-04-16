/* eslint-disable jsx-a11y/iframe-has-title */
import React, { Component } from 'react';

export class Videos extends Component {
  render() {
    const { items } = this.props;

    if (items.length === 0) {
      return <div>loading</div>;
    } else {
      items.forEach(item => {
        const videoId = item.snippet.resourceId.videoId;

        return (
          // eslint-disable-next-line react/jsx-no-comment-textnodes
          <div className='col-s3'>
            {
              // eslint-disable-next-line jsx-a11y/iframe-has-title
            }
            <iframe
              width='100%'
              height='auto'
              src={`https://www.youtube.com/embed/${videoId}`}
              frameForder='0'
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          </div>
        );
      });
    }
  }
}

export default Videos;
