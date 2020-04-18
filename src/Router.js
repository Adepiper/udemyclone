/* global gapi */
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Student from './Components/Student/Student';
import Instructor from './Components/Instructor/Instructor';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';
import { withGoogle } from './Google';
import axios from 'axios';

export class Router extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null,
      gapiReady: false,
      isSignedIn: null,
      users: []
    };
  }

  loginUser = () => {
    const { google } = this.props;
    google.handleAuthClick();
    google.initClient().then(() => {
      this.getUserData(
        gapi.auth2.getAuthInstance().isSignedIn.get(),
        gapi.auth2.getAuthInstance().currentUser.get()
      );
      gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSignInStatus);
      this.updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      google.handleAuthClick();
    });
  };

  getUserData = (isSignedin, basicProfile) => {
    if (isSignedin) {
      const profile = basicProfile.getBasicProfile();

      const id = profile.getId();
      const firstName = profile.getGivenName();
      const lastname = profile.getFamilyName();
      const imageUrl = profile.getImageUrl();
      const email = profile.getEmail();

      this.addUserData(id, firstName, lastname, email, imageUrl);
    }
  };

  addUserData = (id, firstname, lastname, Email, imageUrl) => {
    const { users } = this.state;

    users.map(user => {
      if (user.id !== id) {
        axios
          .post('https://peaceful-dawn-85735.herokuapp.com/users', {
            id,
            firstname,
            lastname,
            Email,
            imageUrl
          })
          .then(res => {
            console.log(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  getUsers = () => {
    axios.get('https://peaceful-dawn-85735.herokuapp.com/users').then(res => {
      this.setState({
        users: res.data
      });
    });
  };

  logOut = () => {
    const { google } = this.props;
    google.handleSignoutClick();
    google
      .initClient()
      .then(() => {
        this.setState({
          isSignedIn: null
        });
        localStorage.removeItem('user');
        google.handleSignoutClick();
      })
      .catch(err => console.log(err));
  };

  updateSignInStatus = isSignedIn => {
    if (isSignedIn) {
      localStorage.setItem('user', isSignedIn);
    }
  };

  getSignInStatus = () => {
    const isSignedIn = localStorage.getItem('user');
    this.setState({
      isSignedIn: isSignedIn
    });
  };

  componentDidUpdate() {
    this.props.google.handleClientLoad();
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    const { isSignedIn } = this.state;
    return (
      <div>
        <Navbar
          loginUser={this.loginUser}
          isSignedIn={isSignedIn}
          logOut={this.logOut}
        />
        <Route
          exact
          path='/'
          render={prop => (
            <React.Fragment>
              <Home />
            </React.Fragment>
          )}
        ></Route>
        <Route
          path='/courses'
          render={prop => (
            <React.Fragment>
              <Student />
            </React.Fragment>
          )}
        ></Route>

        <Route path='/Instructor' component={Instructor}></Route>
        <Route path='/login' component={Login}></Route>
        <Footer />
      </div>
    );
  }
}

export default withGoogle(Router);
