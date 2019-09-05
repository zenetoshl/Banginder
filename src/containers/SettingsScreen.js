import React from 'react';
import {ScrollView, Text} from 'react-native';
import firebase from 'react-native-firebase';

class SettingsScreen extends React.Component {
  state = {
    photoUrl: '',
    displayName: '',
    bio: '',
    likes: [],
    dislikes: [],
  };

  componentDidMount = () => {
    const firestore = firebase.firestore();
    const user = firebase.auth().currentUser;
    firestore
      .collection('registerInfo')
      .doc(user.uid)
      .get()
      .then(snap => {
        const data = snap.data();
        this.setState({
          photoUrl: data.url,
          displayName: `${data.name} ${data.surname}`,
          bio: data.bio,
          likes: data.likes,
          dislikes: data.dislikes,
        });
      });
  };
  render() {
    const {displayName, photoUrl} = this.state;
    return (
      <ScrollView>
        <Text>{displayName}</Text>
      </ScrollView>
    );
  }
}

export default SettingsScreen;
