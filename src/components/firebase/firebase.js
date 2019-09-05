import firebase from 'react-native-firebase';
import store from '../../store';
import actions from '../../constants/actionTypes';

class Firebase {
  auth = firebase.auth();

  functions = firebase.functions();

  firestore = firebase.firestore();

  constructor() {
    this.auth.onAuthStateChanged(user => {
      store.dispatch({
        type: actions.FIREBASE.UPDATE_USER,
        data: user,
      });
    });
  }
}
export default new Firebase();
