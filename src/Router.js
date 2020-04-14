import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Student from './Components/Student/Student';
import Instructor from './Components/Instructor/Instructor';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';
import YTSearch from 'youtube-api-search';
import Google from './Components/Google/Google';

const API_KEY = 'AIzaSyBZKu1Pi-lbJU9sOPcetUMjePrriExFmuY';

export class Router extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null,
      gapiReady: false
    };

    this.videoSearch();
  }

  loadYoutubeApi() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/client.js';

    script.onload = () => {
      window.gapi.load('client', () => {
        window.gapi.client.setApiKey(API_KEY);
        window.gapi.client.load('youtube', 'v3', () => {
          this.setState({ gapiReady: true });
        });
      });
    };

    document.body.appendChild(script);
  }

  videoSearch(term) {
    YTSearch(
      {
        key: API_KEY,
        term: term
      },
      data => {
        this.setState({
          videos: data,
          selectedVideo: data[0]
        });
      }
    );
  }

  render() {
    return (
      <div>
        <Navbar
          onSearchTermChange={searchTerm => this.videoSearch(searchTerm)}
        />
        <Route
          exact
          path='/'
          render={prop => (
            <React.Fragment>
              <Home
                videos={this.state.videos}
                onVideoSelect={userSelected =>
                  this.setState({
                    selectedVideo: userSelected
                  })
                }
              />
            </React.Fragment>
          )}
        ></Route>
        <Route
          path='/courses'
          render={prop => (
            <React.Fragment>
              <Student video={this.state.selectedVideo} />
            </React.Fragment>
          )}
        ></Route>

        <Route path='/Instructor' component={Instructor}></Route>
        <Route path='/login' component={Login}></Route>
        <Route
          path='/google'
          render={prop => (
            <React.Fragment>
              <Google />
            </React.Fragment>
          )}
        ></Route>
        <Footer />
      </div>
    );
  }
}

export default Router;
