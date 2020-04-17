/* global gapi */
import React, { Component } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { withGoogle } from '../../Google';

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedin: null
    };
  }

  loginIn = () => {
    const { google } = this.props;
    google.initClient().then(() => {
      gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
      this.updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      google.handleAuthClick();
    });
    google.handleAuthClick();
  };

  logOut = () => {
    const { google } = this.props;
    google.initClient().then(() => {
      google.handleSignoutClick();
      this.setState({
        isSignedIn: null
      });
    });
    google.handleSignoutClick();
  };

  updateSignInStatus = isSignedIn => {
    if (isSignedIn) {
      this.setState({
        isSignedIn: isSignedIn
      });
    } else {
      return null;
    }
  };
  toggleBtn() {
    document.body.classList.toggle('show-nav');
  }

  render() {
    const { isSignedIn } = this.state;

    if (isSignedIn) {
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
                <button onClick={this.logOut}>Logout</button>
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
                  <button onClick={this.logOut}>Logout</button>
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
                <button onClick={this.loginIn}>Login</button>
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
