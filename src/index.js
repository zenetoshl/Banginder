import React from 'react';
import {Provider} from 'react-redux';
import Routes from './routes';
import store from './store';
import Firebase, {FirebaseContext} from './components/firebase';

export default class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <FirebaseContext.Provider value={Firebase}>
          <Routes />
        </FirebaseContext.Provider>
      </Provider>
    );
  }
}
