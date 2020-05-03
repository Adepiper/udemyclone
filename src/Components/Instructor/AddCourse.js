/* global gapi */

import React, { Component } from 'react';
import './Instructor.css';

export class AddCourse extends Component {
  state = {
    courseTitle: '',
    about: '',
    description: '',
    stack: '',
    CoverImage: '',
    video: '',
    coverImageUrl: '',
    overallError: ''
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  addVideo = e => {
    const { name } = e.target;
    e.preventDefault();
    const {
      CoverImage,
      description,
      courseTitle,
      coverImageUrl,
      stack,
      about,
      video
    } = this.state;

    const invalid =
      courseTitle === '' ||
      about === '' ||
      description === '' ||
      stack === '' ||
      CoverImage === '' ||
      video === '';

    if (invalid) {
      this.setState({
        overallError: `Please fill the all fields!`
      });
    } else {
      console.log(true);
    }
    // const resource = {
    //   kind: 'youtube#playlistItem',
    //   etag: '',
    //   id: '',
    //   snippet: {
    //     publishedAt: '',
    //     channelId: '',
    //     title: '',
    //     description: '',
    //     thumbnails: {
    //       default: {
    //         url: 'https://i.ytimg.com/vi/Gx_7GQtSdpc/default.jpg',
    //         width: 120,
    //         height: 90
    //       }
    //     },
    //     channelTitle: '',
    //     playlistId: '',
    //     position: 0,
    //     resourceId: {
    //       kind: 'youtube#video',
    //       videoId: 'Gx_7GQtSdpc'
    //     }
    //   }
    // };

    // const requestOptions = {
    //   path: 'upload/youtube/v3/videos',
    //   method: 'POST',
    //   params: {
    //     part: 'snippet',
    //     mine: true
    //   }
    // };

    // const request = gapi.client.request(requestOptions);
    // request.execute(res => {
    //   if ('error' in res) {
    //     console.log(res.err.message);
    //   } else {
    //   }
    // });
  };

  render() {
    const {
      CoverImage,
      about,
      stack,
      video,
      courseTitle,
      description,
      coverImageUrl,
      errors,
      overallError
    } = this.state;

    return (
      <div className='container-fluid'>
        <div className='container'>
          <div className='instructor'>
            <header>
              <h3>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae,
                iste?
              </h3>
            </header>
            <div className='form'>
              <form action='' onSubmit={this.addVideo}>
                {overallError.length > 0 && (
                  <span className='errors'>{overallError}</span>
                )}
                <div className='formgroup'>
                  <label htmlFor='Name'>Course Title:</label>
                  <input
                    type='text'
                    name='courseTitle'
                    onChange={this.onChange}
                    value={courseTitle}
                  />
                </div>
                <div className='formgroup'>
                  <label htmlFor='Name'>About Course:</label>
                  <input
                    type='text'
                    name='about'
                    onChange={this.onChange}
                    value={about}
                  />
                </div>
                <div className='formgroup'>
                  <label htmlFor='Name'>Course Description:</label>
                  <input
                    type='text'
                    name='description'
                    onChange={this.onChange}
                    title={description}
                  />
                </div>
                <div className='formgroup'>
                  <label htmlFor='Name'>Stack</label>
                  <select
                    name='stack'
                    id=''
                    onChange={this.onChange}
                    title={stack}
                  >
                    <option value='Front-End'>Front-End</option>
                    <option value='Python'>Python</option>
                    <option value='Dev-Ops'>Dev-Ops</option>
                    <option value='Java'>Java</option>
                    <option value='C#'>C#</option>
                    <option value='Software-Quality'>
                      Software Quality Assurance
                    </option>
                    <option value='User-Experience'>
                      Visual And User Experience
                    </option>
                  </select>
                </div>
                <div className='formgroup image'>
                  <label htmlFor='Image'>Course Cover:</label>
                  <input
                    type='text'
                    onChange={this.onChange}
                    name='coverImageUrl'
                    title={coverImageUrl}
                  />
                  <input
                    type='file'
                    name='CoverImage'
                    id='coverImage'
                    title={CoverImage}
                    onChange={this.onChange}
                  />
                </div>
                <div className='formgroup'>
                  <label htmlFor='Course Video'>Course Video:</label>
                  <input
                    type='file'
                    onChange={this.onChange}
                    name='video'
                    id='video'
                    value={video}
                  />
                </div>
                <button className='instructor-btn'>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddCourse;
