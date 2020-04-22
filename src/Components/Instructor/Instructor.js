/* global gapi */
import React, { Component } from 'react';
import './Instructor.css';
import { Link } from 'react-router-dom';
import Login from '../Login/Login';

const newChannel =
  'https://m.youtube.com/create_channel?chromeless=1&next=/channel_creation_done';

export class Instructor extends Component {
  state = {
    name: ''
  };
  createChannel = () => {
    const { user } = this.props;
  };

  onChange = e => {
    this.setState({
      name: e.target.value
    });
  };
  createChannel = () => {
    window.open(newChannel);
  };

  submit = e => {
    e.preventDefault();
    const { getChannel } = this.props;
    getChannel();
  };

  render() {
    const { user, loginUser } = this.props;
    const { name } = this.state;
    if (user.length > 0) {
      console.log(user);
      return (
        <div className='container-fluid'>
          <div className='container'>
            <div className='options'>
              <header>
                <h4>hi {/*user.firstname*/}, Welcome.</h4>
              </header>
              <div className='formoptions'>
                <form onSubmit={this.submit}>
                  <input
                    type='text'
                    placeholder='Enter channel name'
                    onChange={this.onChange}
                    value={name}
                  />

                  <button>Find Channel</button>
                </form>
                <p>Or</p>
                <button>Create Channel</button>
              </div>
            </div>
            <div className='instructor'>
              {/*<header>
                <h3>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae,
                  iste?
                </h3>
              </header>
              <div className='form'>
                <form action=''>
                  <div className='formgroup'>
                    <label htmlFor='Name'>Course Title:</label>
                    <input type='text' />
                  </div>
                  <div className='formgroup'>
                    <label htmlFor='Name'>About Course:</label>
                    <input type='text' />
                  </div>
                  <div className='formgroup'>
                    <label htmlFor='Name'>Course Description:</label>
                    <input type='text' />
                  </div>
                  <div className='formgroup'>
                    <label htmlFor='Name'>Stack</label>
                    <select name='Stack' id=''>
                      <option value=''>Front-End</option>
                      <option value=''>Python</option>
                      <option value=''>Dev-Ops</option>
                      <option value=''>Java</option>
                      <option value=''>C#</option>
                      <option value=''>Software Quality Assurance</option>
                      <option value=''>Visual And User Experience</option>
                    </select>
                  </div>
                  <div className='formgroup image'>
                    <label htmlFor='Image'>Course Cover:</label>
                    <input type='text' />
                    <input type='file' name='CoverImage' id='coverImage' />
                  </div>
                  <div className='formgroup'>
                    <label htmlFor='Course Video'>Course Video:</label>
                    <input type='file' name='video' id='video' />
                  </div>
                  <button className='instructor-btn'>Submit</button>
                </form>
              </div>
                  */}
            </div>
          </div>
        </div>
      );
    } else {
      return <Login loginUser={loginUser} />;
    }
  }
}

export default Instructor;
