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
import AddCourse from './Components/Instructor/AddCourse';
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
      })
      .catch(err => {
        console.log(err);
      });
  };

  getChannelData = () => {
    gapi.client.youtube.channels
      .list({
        part: 'snippet, contentDetails, statistics',
        //  mine: true
        forUsername: 'techguyweb'
      })
      .then(res => {
        const channel = res.result.items[0];
        const playListId = channel.contentDetails.relatedPlaylists.uploads;
        this.requestVideoPlaylist(playListId);
        this.setChannels(channel);
      })
      .catch(err => {
        console.log(err);
      });
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
        console.log(channel.id);
        console.log(channelData.id);
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
    const requestOptions = {
      playlistId: Id,
      part: 'snippet',
      maxResults: 10
    };
    const request = gapi.client.youtube.playlistItems.list(requestOptions);
    request.execute(response => {
      if ('error' in response) {
        console.log(response.error.message);
      } else {
        const videos = response.result.items;
        if (videos.length > 0) {
          this.unrefinedVideos(videos);
        } else {
          return false;
        }
      }
    });
  };

  unrefinedVideos = videosData => {
    axios.post(`${db}/unrefinedVideos`, videosData).then(res => {
      const data = res.data;
      // let refinedData = data.map((video, index) => {
      //   return video[index];
      // });

      let refinedData = data.reduce((result, item) => {
        let key = Object.keys(item)[0];
        result[key] = item[key];
        return result;
      }, {});
      console.log(refinedData);
      //this.sendVideoToJson(video);
    });
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
          console.log(videosData);
          this.getIndividualVideos(videosData.snippet.channelId);
        } else {
          axios
            .post(`${db}/videos`, videosData)
            .then(res => {
              const videoData = res.data;
              if (videoData.length > 0) {
                this.getIndividualVideos(videoData.snippet.channelId);
              } else {
                return false;
              }
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
          channel={channel}
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
              path='/add'
              render={prop => (
                <React.Fragment>
                  <AddCourse />
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
