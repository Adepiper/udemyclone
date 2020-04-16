import React from 'react';

const GoogleContext = React.createContext(null);

export const withGoogle = Component => props => (
  <GoogleContext.Consumer>
    {google => <Component {...props} google={google} />}
  </GoogleContext.Consumer>
);

export default GoogleContext;
