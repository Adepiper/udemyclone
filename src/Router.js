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
const db = 'https://peaceful-dawn-85735.herokuapp.com';

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
      channel: [],
      channels: []
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

    if (users.length === 0) {
      axios
        .post(`${db}/users`, {
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
            .post(`${db}/users`, {
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
    axios.get(`${db}/users/${id}`).then(res => {
      const data = res.data;
      userData.push(data);
      this.setState({
        user: userData
      });
    });
  };

  getUsers = () => {
    axios.get(`${db}/users`).then(res => {
      this.setState({
        users: res.data
      });
    });
  };

  getChannels = () => {
    axios
      .get(`${db}/channels`)
      .then(res => {
        const channels = res.data;
        this.setState({
          channels: channels
        });
        const playListId = channels.map(channel => {
          return channel.contentDetails.relatedPlaylists.uploads;
        });
        this.requestVideoPlaylist(playListId);
      })
      .catch(err => {
        console.log(err);
      });
  };

  getChannelData = () => {
    gapi.client.youtube.channels
      .list({
        part: 'snippet, contentDetails, statistics',
        // mine: true
        forUsername: 'techguyweb'
      })
      .then(res => {
        const channel = res.result.items[0];
        this.setChannels(channel);
      })
      .catch(err => alert('No channel by that name'));
  };

  setChannels = channelData => {
    const { channels } = this.state;

    if (channels.length === 0) {
      axios
        .post(`${db}/channels`, channelData)
        .then(res => {
          const channelData = res.data;
          const channelId = channelData.id;
          this.getIndividualChannel(channelId);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      channels.map(channel => {
        if (channel.id === channelData.id) {
          this.getIndividualChannel(channel.id);
        } else {
          axios
            .post(`${db}/channels`, channelData)
            .then(res => {
              const channelData = res.data;
              const channelId = channelData.id;
              this.getIndividualChannel(channelId);
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  };

  getIndividualChannel = id => {
    let channelData = [];
    axios
      .get(`${db}/channels/${id}`)
      .then(res => {
        const data = res.data;
        channelData.push(data);
        this.setState({
          channel: channelData
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  requestVideoPlaylist = Id => {
    if (Id.length === 0) {
      return false;
    } else {
      Id.forEach(item => {
        const requestOptions = {
          playlistId: item,
          part: 'snippet',
          maxResults: 10
        };
        const request = gapi.client.youtube.playlistItems.list(requestOptions);
        request.execute(response => {
          if ('error' in response) {
            console.log(response.error.message);
          } else {
            const videos = response.result.items;
            if (videos) {
              this.sendVideoToJson(videos);
            }
          }
        });
      });
    }
  };

  sendVideoToJson = videosData => {
    const { videos } = this.state;
    if (videos.length === 0) {
      axios
        .post(`${db}/videos`, videosData)
        .then(res => {
          console.log(res.data);
        })
        .then(err => {
          console.log(err);
        });
    } else {
      videos.map(video => {
        if (video.id === videosData.id) {
          return false;
        } else {
          axios
            .post(`${db}/videos`, videosData)
            .then(res => {
              console.log(res.data);
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  };

  getVideos = () => {
    axios
      .get(`${db}/videos`)
      .then(res => {
        const videos = res.data;
        this.setState({
          videos: videos
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentWillMount() {
    this.getUsers();
    this.getVideos();
  }

  componentWillUnmount() {
    this.getChannels = this.getChannels.destroy();
  }
  componentDidUpdate() {
    this.getChannels();
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
                getChannelData={this.getChannelData}
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
