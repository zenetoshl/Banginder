import React from 'react';
import {ScrollView, View, TextInput, Text, StyleSheet} from 'react-native';
import {Button, Avatar} from 'react-native-elements';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';
import {likesAndDislikes} from '../constants/likesAndDislikes';
import RadioButton from '../components/RadioButton';
import SafeView from '../components/SafeView';

const style = StyleSheet.create({
  ButtonListLikes: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ButtonListDislikes: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  avatarDisplay: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  avatarDisplay2: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignSelf: 'center',
    margin: 10,
  },
  container: {
    backgroundColor: '#f3f3f3',
    marginTop: 10,
  },
  insideText: {
    color: '#636e72',
    borderColor: 'gray',
    borderRadius: 5,
  },
});

class InformationScreen extends React.Component {
  state = {
    name: '',
    surname: '',
    birthDate: '',
    bio: '',
    likes: [''],
    dislikes: [''],
    avatarSource: '',
    uri_: undefined,
    url: '',
  };

  handleUpload = path => {
    return new Promise((resolve, reject) => {
      const imageRef = firebase
        .storage()
        .ref('avatar')
        .child(`${firebase.auth().currentUser.uid}.jpg`);

      return imageRef
        .putFile(`${path}`, {
          contentType: 'image/jpeg',
        })
        .then(() => {
          return imageRef.getDownloadURL();
        })
        .then(url => {
          this.setState({url: url});
          resolve(url);
        })
        .catch(error => {
          reject(error);
          console.warn('error', error);
        });
    });
  };

  avatarSubmit = async () => {
    await ImagePicker.launchImageLibrary({}, response => {
      this.setState({uri_: response.uri});
      return this.handleUpload(response.path);
    });
  };

  handleSubmit = closeModal => {
    const {name, surname, bio, likes, dislikes, url} = this.state;
    const user = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection('registerInfo')
      .doc(user.uid)
      .set({
        name: name,
        surname: surname,
        bio: bio,
        likes: likes.filter(e => e !== ''),
        dislikes: dislikes.filter(e => e !== ''),
        url: url,
        uid: user.uid,
      })
      .then(() => {
        user.updateProfile({
          displayName: `${name} ${surname}`,
        });
        this.closeThisModal(closeModal);
      });
  };
  closeThisModal = closeThisModal => {
    closeThisModal();
  };

  render() {
    const {name, surname, bio, likes, dislikes, uri_} = this.state;
    const {closeModal} = this.props;
    return (
      <ScrollView style={style.container}>
        <SafeView />
        <View style={style.ButtonListLikes}>
          <View style={style.avatarDisplay2}>
            <Avatar
              rounded
              source={{uri: uri_}}
              size={100}
              title={name}
              onPress={this.avatarSubmit}
              activeOpacity={0.7}
            />
          </View>
          <View>
            <Text> Nome: </Text>
            <TextInput
              textContentType="name"
              style={style.insideText}
              placeholderTextColor="#b2bec3"
              placeholder="Nome"
              onChangeText={text => this.setState({name: text})}
              value={name}
            />
            <Text> Sobrenome: </Text>
            <TextInput
              textContentType="middleName"
              style={style.insideText}
              placeholderTextColor="#b2bec3"
              placeholder="Sobrenome"
              onChangeText={text => this.setState({surname: text})}
              value={surname}
            />
          </View>
        </View>
        <Text> Biografia: </Text>
        <TextInput
          style={style.insideText}
          placeholderTextColor="#b2bec3"
          placeholder="Biografia"
          onChangeText={text => this.setState({bio: text})}
          value={bio}
          multiline
        />
        <View>
          <Text>Coisas que você ama:</Text>
          <View style={style.ButtonListLikes}>
            {likesAndDislikes.map(like => {
              return (
                <RadioButton
                  list={likes}
                  markedColor="#30f26f"
                  dismarkedColor="#fff"
                  onMark={() =>
                    this.setState({
                      likes: likes.filter(e => e !== like),
                    })
                  }
                  onDismark={() =>
                    this.setState({
                      likes: [...likes, like],
                    })
                  }
                  title={like}
                  key={Math.random()}
                />
              );
            })}
          </View>
          <Text>Coisas que você odeia:</Text>
          <View style={style.ButtonListDislikes}>
            {likesAndDislikes.map(dislike => {
              return (
                <RadioButton
                  list={dislikes}
                  markedColor="#ff7675"
                  dismarkedColor="#fff"
                  onMark={() =>
                    this.setState({
                      dislikes: dislikes.filter(e => e !== dislike),
                    })
                  }
                  onDismark={() =>
                    this.setState({
                      dislikes: [...dislikes, dislike],
                    })
                  }
                  title={dislike}
                  key={Math.random()}
                />
              );
            })}
          </View>
        </View>

        <Button
          title="Salvar informações"
          disabled={!(name && surname && bio && uri_)}
          onPress={() => this.handleSubmit(closeModal)}
        />
      </ScrollView>
    );
  }
}

export default InformationScreen;
