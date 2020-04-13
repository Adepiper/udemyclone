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

  inputChange(event) {
    const { onSearchTermChange } = this.props;
    this.setState({
      term: event.target.value
    });
    onSearchTermChange(event.target.value);
  }

  toggleBtn() {
    document.body.classList.toggle('show-nav');
  }

  render() {
    const { term } = this.state;
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
