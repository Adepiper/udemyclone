import React, { Component } from 'react';

export class Videos extends Component {
  render() {
    const { items } = this.props;
    console.log(items);

    if (items.length === 0) {
      return <div>loading</div>;
    } else {
      return <div>Confirm</div>;
    }
  }
}

export default Videos;
