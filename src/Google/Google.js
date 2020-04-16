/* global gapi */
import React, { Component } from 'react';
const API_KEY = 'AIzaSyBZKu1Pi-lbJU9sOPcetUMjePrriExFmuY';
const CLIENT_ID =
  '42073983734-mes17bmpppr9if5elo6kn4f8segn4hsi.apps.googleusercontent.com';
const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'
];
const SCOPES = 'https://www.googleapis.com/auth/youtube.force-ssl';
const defaultChannel = 'techguyweb';

const newChannel =
  'https://m.youtube.com/create_channel?chromeless=1&next=/channel_creation_done';

export class Google extends Component {
  handleClientLoad = () => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      gapi.load('client:auth2', this.initClient);
    };
    document.body.appendChild(script);
  };

  initClient = () => {
    return gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      scope: SCOPES,
      discoveryDocs: DISCOVERY_DOCS
    });
    /* .then(() => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
        this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        this.handleAuthClick();
        this.handleSignoutClick();
      });
      */
  };

  /*  onChange = e => {
    this.setState({
      name: e.target.value
    });
  };
  */

  handleAuthClick = () => {
    return gapi.auth2.getAuthInstance().signIn();
  };

  handleSignoutClick = () => {
    return gapi.auth2.getAuthInstance().signOut();
  };

  /* updateSigninStatus = isSignedIn => {
    if (isSignedIn) {
      this.setState({
        isSignIn: isSignedIn
      });
      this.getChannel(defaultChannel);
    } else {
      return false;
    }
  }*/

  /* submit = e => {
    e.preventDefault();
    this.getChannel(this.state.name);
  };
  */

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

  requestVideoPlaylist = Id => {
    const requestOptions = {
      playlistId: Id,
      part: 'snippet',
      maxResults: 10
    };

    const request = gapi.client.youtube.playlistItems.list(requestOptions);
    return request;
    /*  request.execute(response => {
      const items = response.result.items;

      if (items) {
        this.setState({
          items: items
        });
      }
    });*/
  };

  /* render() {
    const { isSignIn, channel, name, items } = this.state;
    if (isSignIn) {
      return (
        <div>
          <nav className='black'>
            <div className='nav-wrapper'>
              <div className='container'>
                <a href='#!' className='brand-logo'>
                  YouTube Channel Data
                </a>
              </div>
            </div>
          </nav>
          <br />
          <section>
            <div className='container'>
              <p>Log In With Google</p>
              <button
                className='btn red'
                id='signout-button'
                onClick={this.handleSignoutClick}
              >
                Log Out
              </button>
              <br />
              <div id='content'>
                <div className='row'>
                  <div className='col s6'>
                    <form id='channel-form' onSubmit={this.submit}>
                      <div className='input-field col s6'>
                        <input
                          type='text'
                          placeholder='Enter Channel Name'
                          id='channel-input'
                          onChange={this.onChange}
                          value={name}
                        />
                        <button
                          type='submit'
                          value='Get Channel Data'
                          className='btn grey'
                        >
                          Get Channel data
                        </button>
                      </div>
                    </form>
                  </div>
                  <div id='channel-data' className='col s6'>
                    <Channeldata channel={channel} />
                  </div>
                </div>
                <div className='row' id='video-container'>
                  <Videos items={items} />
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    } else {
      return (
        <div>
          <nav className='black'>
            <div className='nav-wrapper'>
              <div className='container'>
                <a href='#!' className='brand-logo'>
                  YouTube Channel Data
                </a>
              </div>
            </div>
          </nav>
          <br />
          <section>
            <div className='container'>
              <p>Log In With Google</p>
              <button
                className='btn red'
                id='authorize-button'
                onClick={this.handleAuthClick}
              >
                Log In
              </button>

              <br />
            </div>
          </section>
        </div>
      );
    }
  } */
}

export default Google;
