/* eslint-disable jsx-a11y/iframe-has-title */
import React, { Component } from 'react';

export class Videos extends Component {
  render() {
    const { items } = this.props;
    if (items.length === 0) {
      return <div>loading</div>;
    } else {
      console.log(items);
      items.map(item => {
        console.log(item);
        return <div>confirm</div>;
      });
    }
  }
}

export default Videos;
