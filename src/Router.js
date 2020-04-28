/* global gapi */
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Student from './Components/Student/Student';
import Instructor from './Components/Instructor/Instructor';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import { withGoogle } from './Google';
import axios from 'axios';

import Login from './Components/Login/Login';
import InstructorCoursesDetails from './Components/Instructor/InstructorCoursesDetails';
const db = 'http://localhost:4000';

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
      channels: [],
      video: []
    };
  }

  loginUser = () => {
    const { google } = this.props;
    const googleAuth = gapi.auth2.getAuthInstance();
    google
      .initClient()
      .then(() => {
        this.getUserData(
          googleAuth.isSignedIn.get(),
          googleAuth.currentUser.get()
        );
        googleAuth.isSignedIn.listen(this.updateSignInStatus);
        this.updateSignInStatus(googleAuth.currentUser.get());
        google.handleAuthClick();
        this.getChannels();
      })
      .catch(err => {
        console.log(err);
      });
  };

  logOut = () => {
    const { google } = this.props;
    google
      .initClient()
      .then(() => {
        this.setState({
          ...this.state,
          isSignedIn: null
        });
        google.handleSignoutClick();
      })
      .catch(err => console.log(err));
  };

  updateSignInStatus = isSignedIn => {
    if (isSignedIn) {
      this.setState({
        ...this.state,
        isSignedIn: isSignedIn
      });
    } else {
      this.setState({
        ...this.state,
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
        ...this.state,
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
          ...this.state,
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
        //mine: true
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
          ...this.state,
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
            const videos = response.result.items[0];

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
          const videoData = res.data;
          this.getIndividualVideos(videoData.snippet.channelId);
          this.getVideos();
        })
        .then(err => {
          console.log(err);
        });
    } else {
      videos.map(video => {
        if (video.id === videosData.id) {
          this.getIndividualVideos(video.snippet.channelId);
        } else {
          axios
            .post(`${db}/videos`, videosData)
            .then(res => {
              const videoData = res.data;
              this.getIndividualVideos(videoData.snippet.channelId);
              this.getVideos();
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  };

  getIndividualVideos = instructorId => {
    axios.get(`${db}/videos`).then(res => {
      const videos = res.data;
      const videoData = videos.find(video => {
        return video.snippet.channelId === instructorId;
      });
      this.setState({
        ...this.state,
        video: videoData
      });
    });
  };

  getVideos = () => {
    axios
      .get(`${db}/videos`)
      .then(res => {
        this.setState({
          ...this.state,
          videos: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidUpdate() {}

  componentWillMount() {}

  componentDidMount() {
    this.props.google.handleClientLoad();
    this.getVideos();
    this.getUsers();
  }

  render() {
    const { isSignedIn, user, channel, video, videos } = this.state;
    return (
      <div>
        <Navbar
          loginUser={this.loginUser}
          isSignedIn={isSignedIn}
          logOut={this.logOut}
        />

        {isSignedIn ? (
          <>
            {' '}
            <Route
              exact
              path='/'
              render={prop => (
                <React.Fragment>
                  <Home
                    isSignedIn={isSignedIn}
                    loginUser={this.loginUser}
                    videos={videos}
                  />
                </React.Fragment>
              )}
            ></Route>
            <Route
              path='/videos/:id'
              render={prop => (
                <React.Fragment>
                  <Student />
                </React.Fragment>
              )}
            ></Route>
            <Route
              path='/course/:id'
              render={prop => (
                <React.Fragment>
                  <InstructorCoursesDetails />
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
                    video={video}
                  />
                </React.Fragment>
              )}
            ></Route>
          </>
        ) : (
          <Login loginUser={this.loginUser} />
        )}

        <Footer />
      </div>
    );
  }
}

export default withGoogle(Router);
