import React from 'react';
import './App.css';
import Router from './Router';
import { Switch } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Router />
      </Switch>
    </div>
  );
}

export default App;
