import React from 'react';

const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component firebase={firebase} {...props} />}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;
