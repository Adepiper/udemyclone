import React, { Component } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };

    this.inputChange = this.inputChange.bind(this);
  }

  inputhChange(event) {
    this.setState({
      term: event.target.value
    });
  }

  toggleBtn() {
    document.body.classList.toggle('show-nav');
  }

  render() {
    const { term } = this.state;
    return (
      <div>
        <div className='topnav' id='myTopnav'>
          {/*

          
          <Link to='#home' className=' home'>
            Home
          </Link>
          <Link to='#news'>News</Link>
          <Link to='#contact'>Contact</Link>
          <div className='dropdown'>
            <button className='dropbtn'>
              Dropdown
              <i className='fa fa-caret-down'></i>
            </button>
            <div className='dropdown-content'>
              <Link to='#'>Link 1</Link>
              <Link to='#'>Link 2</Link>
              <Link to='#'>Link 3</Link>
            </div>
          </div>
          <Link to='#about'>About</Link>
      */}
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
                  value={term}
                  onChange={this.inputChange}
                />
                <button className=''>
                  <i className='fa fa-search'></i>
                </button>
              </form>
            </li>
            <li className='float-right'>
              <Link to='/login'>Login</Link>
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
                  value={term}
                  onChange={this.inputChange}
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

export default Navbar;
