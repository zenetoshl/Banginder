import React from 'react';
import { View, Button, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'react-native-firebase';

class HateCard extends React.Component {
  state = {
    exists: false,
    photoUrl: '',
    displayName: ''
  };

  loadInfo = () => {
    const firestore = firebase.firestore();
    const { uid } = this.props;
    this.setState({ loading: true });
    console.warn(uid);
    firestore
      .collection('registerInfo')
      .doc(uid)
      .get();
    then(snap => {
      const data = snap.data();
      this.setState({
        photoUrl: data.url,
        displayName: `${data.name} ${data.surname}`,
      }).then(() => this.setState({ loading: false }));
    }).catch(() => this.setState({ loading: false }));
  };

  componentDidMount = () => {
    const firestore = firebase.firestore();
    const user = firebase.auth().currentUser;
    const { uid } = this.props;
    this.setState({ loading: true });
    firestore
      .collection('Hate')
      .doc(uid)
      .collection('HateList')
      .doc(user.uid)
      .get()
      .then(snap => {
        this.setState({
          exists: snap.exists
        }).then(() => {
            this.loadInfo();
            this.setState({ loading: false })});
      })
      .catch(() => this.setState({ loading: false }));
  };

  render() {
    const { exists, displayName, photoUrl } = this.state;
    return (
      <View>
        {exists ? <ListItem
        key = {Math.random()}
        title = {displayName}
        leftAvatar = {{uri: `${photoUrl}`}}
        />: <View />}
      </View>
    );
  }
}

export default HateCard;
