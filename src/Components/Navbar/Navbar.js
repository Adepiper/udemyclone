import React, { Component } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { withGoogle } from '../../Google';

export class Navbar extends Component {
  toggleBtn() {
    document.body.classList.toggle('show-nav');
  }

  render() {
    const { isSignedIn, loginUser, logOut, channel } = this.props;
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
                <button onClick={logOut}>Logout</button>
              </li>
              {channel.length > 0 ? (
                <li className='float-right'>
                  <Link to='/add'>Add Course</Link>
                </li>
              ) : (
                ''
              )}
              <li className='float-right'>
                <Link to='/instructor'>Instructor</Link>
              </li>
            </ul>
          </div>
          <div className='responsive'>
            <ul>
              <div>
                <li className=''>
                  <button onClick={logOut}>Logout</button>
                </li>
              </div>
              {channel.length > 0 ? (
                <li className=''>
                  <Link to='/add'>Add Course</Link>
                </li>
              ) : (
                ''
              )}
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
              <button onClick={loginUser}>Login</button>
            </li>
            <li className='float-right'>
              <Link to='/instructor'>Instructor</Link>
            </li>
          </ul>
        </div>
        <div className='responsive'>
          <ul>
            <div>
              <li className=''>
                <button onClick={loginUser}>Login</button>
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
          </ul>
        </div>
      </div>
    );
  }
}

export default withGoogle(Navbar);
