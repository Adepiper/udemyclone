import React, { Component } from 'react';

export class Videos extends Component {
  render() {
    const { items } = this.props;
    if (items.length === 0) {
      return <div>loading</div>;
    } else {
      console.log(items);
      items.map(item => {
        if (item.length === 0) {
          return null;
        } else {
          console.log(item);
          return <div>okay...</div>;
        }
      });
    }
  }
}

export default Videos;
