import React from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TextInput,
  Button
} from 'react-native';
import { Avatar } from 'react-native-elements';
import firebase from 'react-native-firebase';
import MessageText from '../components/MessageText';
import MessageSender from '../components/messageSender';

const style = StyleSheet.create({
  loginBtn: {
    width: '70%',
    marginTop: 30,
    alignItems: 'center',
    borderWidth: 2
  },
  loginBtnTitle: {
    color: 'white',
    width: '100%'
  }
});

class messageScreen extends React.Component {
  state = {
    photoUrl: '',
    displayName: '',
    bio: '',
    likes: [],
    dislikes: [],
    loading: false
  };

  componentDidMount = () => {
    const firestore = firebase.firestore();
    const userUid = this.props.navigation.getParam('uid');
    firestore
      .collection('registerInfo')
      .doc(userUid)
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
    const { displayName, photoUrl, bio, list } = this.state;
    const user = firebase.auth().currentUser;
    const userUid = this.props.navigation.getParam('uid');
    return (
      <ScrollView>
        <View
          style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
        >
          <Avatar
            rounded
            size={100}
            source={{
              uri: photoUrl
            }}
          />
          <Text style={{ fontSize: 20, alignSelf: 'center', marginTop: 30, marginLeft: 10 }}>
            {displayName}
          </Text>
        </View>
        <View style={{borderColor:'gray', borderWidth:1, marginTop: 5, marginLeft:10, marginRight:10}}>
          <Text
            style={{
              fontSize: 20,
              alignSelf: 'center',
              marginTop: 15,
              marginBottom: 24
            }}
          >
            {bio}
          </Text>
        </View>
        <ScrollView>
          <View style={{ alignSelf: 'flex-start' }}>
            <Text>Mensagens Recebidas: </Text>
            <MessageText firstUid={userUid} secondUid={user.uid} />
          </View>
          <View style={{ alignSelf: 'flex-start' }}>
            <Text>Minhas Mensagens: </Text>
            <MessageText firstUid={user.uid} secondUid={userUid} />
          </View>
          <Text>Nova Mensagem: </Text>
          <MessageSender firstUid={user.uid} secondUid={userUid} />
        </ScrollView>
      </ScrollView>
    );
  }
}

export default messageScreen;
