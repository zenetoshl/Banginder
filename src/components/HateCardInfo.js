import React from 'react';
import { View, Button, Text } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import firebase from 'react-native-firebase';
import HateText from './HateText';

class HateCardInfo extends React.Component {
  state = {
    photoUrl: '',
    displayName: '',
    likes: [''],
    dislikes: ['']
  };

  componentDidMount = () => {
    const firestore = firebase.firestore();
    const { uid } = this.props;
    this.setState({ loading: true });
    firestore
      .collection('registerInfo')
      .doc(uid)
      .get()
      .then(snap => {
        const data = snap.data();
        this.setState({
          photoUrl: data.url,
          displayName: `${data.name} ${data.surname}`,
          likes: data.likes,
          dislikes: data.dislikes
        }).then(() => this.setState({ loading: false }));
      })
      .catch(() => this.setState({ loading: false }));
  };

  render() {
    const { displayName, photoUrl, likes, dislikes } = this.state;
    const {navigation, uid} = this.props;
    return (
      <View>
        <ListItem
          key={Math.random()}
          title={displayName}
          leftAvatar={<Avatar rounded size={60} source={{ uri: photoUrl }} />}
          subtitle={<HateText Ulikes={likes} Udislikes={dislikes} />}
          onPress={()=> navigation.navigate('Chat', {uid: uid})}
        />
      </View>
    );
  }
}

export default HateCardInfo;
