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
    google.initClient().then(() => {
      gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
      this.updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      google.handleAuthClick();
    });
    google.handleAuthClick();
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
        <Navbar loginUser={this.loginUser} isSignedIn={isSignedIn} />
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
