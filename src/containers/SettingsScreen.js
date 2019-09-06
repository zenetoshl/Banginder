import React from 'react';
import { ScrollView, Text, Button } from 'react-native';
import {Avatar} from 'react-native-elements'
import firebase from 'react-native-firebase';

class SettingsScreen extends React.Component {
  state = {
    photoUrl: '',
    displayName: '',
    bio: '',
    likes: [],
    dislikes: []
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
          dislikes: data.dislikes
        });
      });
  };
  render() {
    const { displayName, photoUrl, bio } = this.state;
    return (
      <ScrollView contentContainerStyle={{alignItems:"center"}}>
        <Avatar
          rounded
          size={100}
          source={{
            uri:
              photoUrl
          }}
        />
        <Text>{displayName}</Text>
        <Text>{bio}</Text>
        <Button title='SignOut' onPress={() => firebase.auth().signOut()} />
      </ScrollView>
    );
  }
}

export default SettingsScreen;
