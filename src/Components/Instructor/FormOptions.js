import React, { Component } from 'react';

export class FormOptions extends Component {
  render() {
    const { getChannel, createChannel } = this.props;
    return (
      <div className='formoptions'>
        <button onClick={getChannel}>Get Channel</button>
        <p>Or</p>
        <button onClick={createChannel}>Create Channel</button>
      </div>
    );
  }
}

export default FormOptions;
