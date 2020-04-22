import React from 'react';

function FormOptions() {
  const { getChannel, createChannel } = this.props;
  return (
    <div className='formoptions'>
      <button onClick={getChannel}>Find Channel</button>
      <p>Or</p>
      <button onClick={createChannel}>Create Channel</button>
    </div>
  );
}

export default FormOptions;
