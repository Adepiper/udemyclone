/* global gapi */
import React, { Component } from 'react';
import Channeldata from './Channeldata';
const API_KEY = 'AIzaSyBZKu1Pi-lbJU9sOPcetUMjePrriExFmuY';
const CLIENT_ID =
  '42073983734-mes17bmpppr9if5elo6kn4f8segn4hsi.apps.googleusercontent.com';
const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'
];
const SCOPES = 'https://www.googleapis.com/auth/youtube.force-ssl';
const defaultChannel = 'techguyweb';

export class Google extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gapiReady: false,
      isSignIn: false,
      channel: [],
      input: ''
    };
  }
  loadYoutubeApi() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/client.js';

    script.onload = () => {
      gapi.load('client', () => {
        gapi.client.setApiKey(API_KEY);
        gapi.client.load('youtube', 'v3', () => {
          this.setState({ gapiReady: true });
        });
      });
    };

    document.body.appendChild(script);
  }

  handleClientLoad = () => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      gapi.load('client:auth2', this.initClient);
    };
    document.body.appendChild(script);
  };
  initClient = () => {
    gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES,
        discoveryDocs: DISCOVERY_DOCS
      })
      .then(() => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
        this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        this.handleAuthClick();
        this.handleSignoutClick();
      });
  };

  handleAuthClick = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  handleSignoutClick = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  updateSigninStatus = isSignedIn => {
    this.setState({
      isSignIn: isSignedIn
    });
    this.getChannel(defaultChannel);
  };

  submit = e => {
    e.preventDefault();
    this.setState({
      input: e.target.value
    });
  };

  getChannel = channel => {
    gapi.client.youtube.channels
      .list({
        part: 'snippet, contentDetails, statistics',
        forUsername: channel
      })
      .then(res => {
        console.log(res);
        const channel = res.result.items[0];
        console.log(channel);
        this.setState({
          channel: channel
        });
      })
      .catch(err => alert('No channel by that name'));
  };

  componentDidMount() {
    this.handleClientLoad();
  }

  render() {
    const { isSignIn, channel } = this.state;
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
                        />
                        <input
                          type='submit'
                          value='Get Channel Data'
                          className='btn grey'
                        />
                      </div>
                    </form>
                  </div>
                  <div id='channel-data' className='col s6'>
                    <Channeldata channel={channel} />
                  </div>
                </div>
                <div className='row' id='video-container'></div>
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
  }
}

export default Google;
