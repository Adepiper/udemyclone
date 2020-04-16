import React, { Component } from 'react';

export class Videos extends Component {
  render() {
    const { items } = this.props;
    if (items.length === 0) {
      return <div>loading</div>;
    } else {
      return items.map(item => (
        <div className='col-3'>
          <iframe
            width='100%'
            height='auto'
            src={`https://www.youtube.com/embed/${item.snippet.resourceId.videoId}`}
            frameBorder='0'
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </div>
      ));
    }
  }
}

export default Videos;
