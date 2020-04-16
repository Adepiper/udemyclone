/* eslint-disable jsx-a11y/iframe-has-title */
import React, { Component } from 'react';

export class Videos extends Component {
  render() {
    const { items } = this.props;
    if (items.length > 0) {
      console.log(items);
      return <div>okay</div>;
    }
  }
}

export default Videos;
