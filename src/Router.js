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

export class Router extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null,
      gapiReady: false,
      isSignedIn: null
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
      gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
      this.updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      google.handleAuthClick();
    });
  };

  getUserData = (isSignedin, basicProfile) => {
    if (isSignedin) {
      const profile = basicProfile.getBasicProfile();
      console.log('ID: ' + profile.getId());
      console.log('Full Name: ' + profile.getName());
      console.log('Given Name: ' + profile.getGivenName());
      console.log('Family Name: ' + profile.getFamilyName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail());
    }
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
        google.handleSignoutClick();
      })
      .catch(err => console.log(err));
  };

  updateSignInStatus = isSignedIn => {
    if (isSignedIn) {
      this.setState({
        isSignedIn: isSignedIn
      });
    } else {
      this.setState({
        isSignedIn: null
      });
    }
  };

  componentDidMount() {
    this.props.google.handleClientLoad();
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
