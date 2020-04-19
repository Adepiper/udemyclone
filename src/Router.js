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
      users: [],
      user: []
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
      this.getIndividualData(id, firstName, lastname, email, imageUrl);
    }
  };

  addUserData = (id, firstname, lastname, Email, imageUrl) => {
    const { users } = this.state;
    users.map(user => {
      if (user.id === id) {
        return false;
      } else {
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

  getIndividualData = (id, firstName, lastname, email, imageUrl) => {
    let userData = [];
    userData.push(id, firstName, lastname, email, imageUrl);
    this.setState({
      user: userData
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

  getChannel = channel => {
    return gapi.client.youtube.channels.list({
      part: 'snippet, contentDetails, statistics',
      forUsername: channel
    });
    /*.then(res => {
        const channel = res.result.items[0];
        this.setState({
          channel: channel
        });
        const playListId = channel.contentDetails.relatedPlaylists.uploads;
        this.requestVideoPlaylist(playListId);
      })
      .catch(err => alert('No channel by that name'));
      */
  };
  componentWillMount() {
    this.getUsers();
  }

  componentDidMount() {
    this.props.google.handleClientLoad();
  }

  render() {
    const { isSignedIn, user } = this.state;

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

        <Route
          path='/instructor'
          render={prop => (
            <React.Fragment>
              <Instructor user={user} />
            </React.Fragment>
          )}
        ></Route>

        <Route path='/login' component={Login}></Route>
        <Footer />
      </div>
    );
  }
}

export default withGoogle(Router);
