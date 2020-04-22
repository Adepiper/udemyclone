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

const newChannel =
  'https://m.youtube.com/create_channel?chromeless=1&next=/channel_creation_done';

const SCOPES = 'https://www.googleapis.com/auth/youtube.force-ssl';

export class Router extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null,
      gapiReady: false,
      isSignedIn: null,
      users: [],
      user: [],
      channel: []
    };
  }

  loginUser = () => {
    const { google } = this.props;
    const googleAuth = gapi.auth2.getAuthInstance();
    google.initClient().then(() => {
      this.getUserData(
        googleAuth.isSignedIn.get(),
        googleAuth.currentUser.get()
      );
      googleAuth.isSignedIn.listen(this.updateSignInStatus);
      this.updateSignInStatus(googleAuth.currentUser.get());
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
      // this.getIndividualData(id);
    }
  };

  addUserData = (id, firstname, lastname, Email, imageUrl) => {
    const { users } = this.state;

    if (users.length === 0) {
      axios
        .post('https://peaceful-dawn-85735.herokuapp.com/users', {
          id,
          firstname,
          lastname,
          Email,
          imageUrl
        })
        .then(res => {
          const data = res.data;
          let dataId = data.id;
          this.getIndividualData(dataId);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      users.forEach(user => {
        if (user.id === id) {
          this.getIndividualData(user.id);
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
              const data = res.data;
              let dataId = data.id;
              this.getIndividualData(dataId);
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  };

  getIndividualData = id => {
    let userData = [];
    axios
      .get(`https://peaceful-dawn-85735.herokuapp.com/users/${id}`)
      .then(res => {
        const data = JSON.parse(res.data);
        userData.push(data);
        this.setState({
          user: userData
        });
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

  getChannel = () => {
    gapi.client.youtube.channels
      .list({
        part: 'snippet, contentDetails, statistics',
        mine: true
      })
      .then(res => {
        const channel = res.result.items[0];
        this.setState({
          channel: channel
        });
      })
      .catch(err => alert('No channel by that name'));
  };
  componentWillMount() {
    this.getUsers();
  }

  componentDidMount() {
    this.props.google.handleClientLoad();
  }

  render() {
    const { isSignedIn, user, channel } = this.state;
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
              <Home isSignedIn={isSignedIn} loginUser={this.loginUser} />
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
              <Instructor
                user={user}
                createNewChannel={this.createNewChannel}
                loginUser={this.loginUser}
                getChannel={this.getChannel}
                channel={channel}
              />
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
