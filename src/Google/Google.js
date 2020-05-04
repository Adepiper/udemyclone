/* global gapi */
import { Component } from 'react';
const API_KEY = 'AIzaSyBZKu1Pi-lbJU9sOPcetUMjePrriExFmuY';
const CLIENT_ID =
  '42073983734-mes17bmpppr9if5elo6kn4f8segn4hsi.apps.googleusercontent.com';
const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'
];
const SCOPES = 'https://www.googleapis.com/auth/youtube.force-ssl';

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
  };

  handleAuthClick = () => {
    return gapi.auth2.getAuthInstance().signIn();
  };

  handleSignoutClick = () => {
    return gapi.auth2.getAuthInstance().signOut();
  };
}

export default Google;
