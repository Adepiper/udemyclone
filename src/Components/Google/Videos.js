import React, { Component } from 'react';

export class Videos extends Component {
  render() {
    const { items } = this.props;
    if (items.length === 0) {
      return <div>loading</div>;
    } else {
      return items.map(item => <div>loading</div>);
    }
  }
}

export default Videos;
