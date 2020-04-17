/* global gapi */
import React, { Component } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { withGoogle } from '../../Google';

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };
  }

  loginIn = () => {
    const { google } = this.props;
    google.initClient().then(() => {
      console.log(gapi.auth2.getAuthInstance().currentUser);
      google.handleAuthClick();
      this.handleSignoutClick();
    });
    google.handleAuthClick();
  };

  toggleBtn() {
    document.body.classList.toggle('show-nav');
  }

  render() {
    return (
      <div>
        <div className='topnav' id='myTopnav'>
          <ul>
            <li>
              <a href='#' className='icon' onClick={this.toggleBtn}>
                &#9776;
              </a>
            </li>
            <li className='home'>
              <Link to='/'>Piperland</Link>
            </li>
            <li>
              <form className='form'>
                <input
                  type='text'
                  placeholder='Search Courses'
                  className='formControl'
                />
                <button className=''>
                  <i className='fa fa-search'></i>
                </button>
              </form>
            </li>
            <li className='float-right'>
              <button onClick={this.loginIn}>Login</button>
            </li>
            <li className='float-right'>
              <Link to='/courses'>Register</Link>
            </li>
            <li className='float-right'>
              <Link to='/instructor'>Instructor</Link>
            </li>
            <li className='float-right'>
              <Link to='/courses'>Courses</Link>
            </li>
          </ul>
        </div>
        <div className='responsive'>
          <ul>
            <div>
              <li className=''>
                <Link to='/instructor'>Login</Link>
              </li>
              <li className=''>
                <Link to='/instructor'>Register</Link>
              </li>
            </div>

            <li>
              <form className='form'>
                <input
                  type='text'
                  placeholder='Search Courses'
                  className='formControl'
                />
                <button className=''>
                  <i className='fa fa-search'></i>
                </button>
              </form>
            </li>
            <li className=''>
              <Link to='/instructor'>Instructor</Link>
            </li>
            <li className=''>
              <Link to='/courses'>Courses</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default withGoogle(Navbar);
