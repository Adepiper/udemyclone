import React, { Component } from 'react';
import './Instructor.css';
import FormOptions from './FormOptions';
import InstructorDetails from './InstructorDetails';

const newChannel =
  'https://m.youtube.com/create_channel?chromeless=1&next=/channel_creation_done';

export class Instructor extends Component {
  onChange = e => {
    this.setState({
      name: e.target.value
    });
  };
  createChannel = () => {
    window.open(newChannel);
  };

  render() {
    const { user, getChannelData, channel, video } = this.props;
    if (user.length > 0) {
      return (
        <div className='container-fluid'>
          <div className='container'>
            <div className='options'>
              <header>
                <h4>Hi {user[0].firstname}, Welcome.</h4>
              </header>
              {channel.length === 0 ? (
                <FormOptions
                  getChannel={getChannelData}
                  createChannel={this.createChannel}
                />
              ) : (
                <InstructorDetails channel={channel} video={video} />
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className='container-fluid'>
          <div className='container'>
            <p>Loading User</p>
          </div>
        </div>
      );
    }
  }
}

export default Instructor;
