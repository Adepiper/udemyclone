/* global gapi */
import React, { Component } from 'react';
import './Instructor.css';

export class Instructor extends Component {
  createChannel = () => {
    const { user } = this.props;
  };

  getChannel = () => {
    return gapi.client.youtube.channels
      .list({
        part: 'snippet, contentDetails, statistics',
        id: 'UCz3-6QUWq5fdPHW0P8Yb-nQ'
      })
      .then(res => {
        const channel = res.result.items[0];
        console.log(channel);
      })
      .catch(err => alert('No channel by that name'));
  };
  render() {
    const { user } = this.props;
    if (user.length > 0) {
      console.log(user);
      return (
        <div className='container-fluid'>
          <div className='container'>
            <div className='instructor'>
              <button onClick={this.getChannel}>okay</button>
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
      return false;
    }
  }
}

export default Instructor;
