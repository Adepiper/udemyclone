import React, { Component } from 'react';

export class Channeldata extends Component {
  render() {
    const { channel } = this.props;
    console.log(channel);
    if (channel) {
      return <div></div>;
    } else {
      return <div>Loading</div>;
    }
  }
}

export default Channeldata;
