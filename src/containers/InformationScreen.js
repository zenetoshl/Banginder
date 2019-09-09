import React from 'react';
import { ScrollView, View, TextInput, Text, StyleSheet } from 'react-native';
import { Button, Avatar, Input } from 'react-native-elements';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';
import { likesAndDislikes } from '../constants/likesAndDislikes';
import RadioButton from '../components/RadioButton';
import SafeView from '../components/SafeView';
import DatePicker from 'react-native-datepicker';
import RadioForm, {
  RadioButton as RadioB,
  RadioButtonInput,
  RadioButtonLabel
} from 'react-native-simple-radio-button';

const style = StyleSheet.create({
  text: {
    marginLeft: 10
  },
  HighlightText: {
    marginLeft: 10,
    fontSize: 20
  },
  ButtonListLikes: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10,
    marginRight: 10
  },
  ButtonLikes: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10,
    marginRight: 10,
    borderColor: '#30f26f',
    borderWidth: 2,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  ButtonListDislikes: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10,
    marginRight: 10,
    borderColor: '#ff7675',
    borderWidth: 2,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  avatarDisplay: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  avatarDisplay2: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignSelf: 'center',
    margin: 10
  },
  insideText: {
    width: 176,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
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
    uploading: false,
    genero: 'Homem',
    nascimento: ''
  };

  handleUpload = path => {
    return new Promise((resolve, reject) => {
      this.setState({ uploading: true });
      const imageRef = firebase
        .storage()
        .ref('avatar')
        .child(`${firebase.auth().currentUser.uid}.jpg`);

      return imageRef
        .putFile(`${path}`, {
          contentType: 'image/jpeg'
        })
        .then(() => {
          return imageRef.getDownloadURL();
        })
        .then(url => {
          this.setState({ url: url });
          this.setState({ uploading: false });
          resolve(url);
        })
        .catch(error => {
          reject(error);
          this.setState({ uploading: false});
          console.warn('error', error);
        });
    });
  };

  avatarSubmit = async () => {
    await ImagePicker.launchImageLibrary({}, response => {
      this.setState({ uri_: response.uri });
      return this.handleUpload(response.path);
    });
  };

  handleSubmit = closeModal => {
    const {
      name,
      surname,
      bio,
      likes,
      dislikes,
      url,
      genero,
      nascimento
    } = this.state;
    const user = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection('registerInfo')
      .doc(user.uid)
      .set({
        name: name,
        surname: surname,
        bio: bio,
        bDay: nascimento,
        gender: genero,
        likes: likes.filter(e => e !== ''),
        dislikes: dislikes.filter(e => e !== ''),
        url: url,
        uid: user.uid
      })
      .then(() => {
        user.updateProfile({
          displayName: `${name} ${surname}`
        });
        this.closeThisModal(closeModal);
      });
  };
  closeThisModal = closeThisModal => {
    closeThisModal();
  };

  render() {
    const { name, surname, bio, likes, dislikes, uri_, genero, nascimento, uploading} = this.state;
    const { closeModal } = this.props;
    return (
      <ScrollView>
        <SafeView />
        <View style={{ marginLeft: 136, marginTop: 20, marginBottom: 20 }}>
          <Avatar
            rounded
            source={{ uri: uri_ }}
            size={100}
            title={name}
            onPress={this.avatarSubmit}
            activeOpacity={0.7}
            showEditButton
          />
        </View>
        <View>
          <View style={style.avatarDisplay}>
            <View>
              <Text style={style.text}>Nome: </Text>
              <TextInput
                style={style.insideText}
                textContentType='name'
                placeholderTextColor='#b2bec3'
                placeholder='Nome'
                onChangeText={text => this.setState({ name: text })}
                value={name}
              />
            </View>
            <View>
              <Text style={style.text}>Sobrenome: </Text>
              <TextInput
                style={style.insideText}
                textContentType='middleName'
                placeholderTextColor='#b2bec3'
                placeholder='Sobrenome'
                onChangeText={text => this.setState({ surname: text })}
                value={surname}
              />
            </View>
          </View>
          <View style={style.avatarDisplay}>
            <View>
              <Text style={style.text}>Data de nascimento: </Text>
              <DatePicker
                style={{ width: 150, borderRadius: 20 }}
                date={this.state.nascimento}
                mode='date'
                placeholder='touch to select date'
                format='DD-MM-YYYY'
                confirmBtnText='Confirm'
                cancelBtnText='Cancel'
                showIcon={false}
                customStyles={{
                  dateInput: {
                    marginLeft: 10
                  }
                }}
                onDateChange={date => {
                  this.setState({ nascimento: date });
                }}
              />
            </View>
            <View style={{ marginTop: 20, marginLeft: 10 }}>
              <Text style={style.text}>Gênero: </Text>
              <RadioForm
                style={{ marginLeft: 10 }}
                formHorizontal={true}
                labelHorizontal={false}
                initial={0}
                animation={false}
                radio_props={[
                  { label: 'Homem', value: 'Homem' },
                  { label: 'Mulher', value: 'Mulher' },
                  { label: 'Outro', value: 'Outro' }
                ]}
                onPress={value => {
                  this.setState({ genero: value });
                }}
              />
            </View>
          </View>
          <Text style={style.text}>Biografia: </Text>
          <TextInput
            style={{
              borderColor: 'gray',
              borderWidth: 1,
              borderRadius: 5,
              margin: 10,
              marginBottom: 20
            }}
            placeholderTextColor='#b2bec3'
            placeholder='Biografia'
            onChangeText={text => this.setState({ bio: text })}
            value={bio}
            multiline
          />
        </View>

        <Text style={style.HighlightText}>Coisas que você ama:</Text>
        <View style={style.ButtonLikes}>
        {likesAndDislikes.map(topico => {
          const { name, list } = topico;
          return (
            <View>
              <Text style={style.text}>{name} </Text>
              <View style={style.ButtonListLikes}>
                {list.map(like => (
                  <RadioButton
                    list={likes}
                    markedColor='#30f26f'
                    dismarkedColor='#fff'
                    onMark={() =>
                      this.setState({
                        likes: likes.filter(e => e !== like)
                      })
                    }
                    onDismark={() =>
                      this.setState({
                        likes: [...likes, like]
                      })
                    }
                    title={like}
                    key={Math.random()}
                  />
                ))}
              </View>
            </View>
          );
        })}
        </View>
        <Text style={style.HighlightText}>Coisas que você odeia:</Text>
        <View style={style.ButtonListDislikes}>
          {likesAndDislikes.map(topico => {
            const { name, list } = topico;
            return (
              <View>
                <Text style={style.text}>{name} </Text>
                <View style={style.ButtonListLikes}>
                  {list.map(dislike => (
                    <RadioButton
                      list={dislikes}
                      markedColor='#ff7675'
                      dismarkedColor='#fff'
                      onMark={() =>
                        this.setState({
                          dislikes: dislikes.filter(e => e !== dislike)
                        })
                      }
                      onDismark={() =>
                        this.setState({
                          dislikes: [...dislikes, dislike]
                        })
                      }
                      title={dislike}
                      key={Math.random()}
                    />
                  ))}
                </View>
              </View>
            );
          })}
        </View>
        <View style={style.view}>
          <Button
            buttonStyle={{
              marginBottom: 10,
              marginTop: 5,
              width: '70%',
              marginTop: 30,
              alignItems: 'center',
              borderRadius: 3
            }}
            titleStyle={{
              color: 'white',
              width: '100%'
            }}
            title='Salvar informações'
            disabled={!(name && surname && bio && uri_ && !uploading && nascimento && genero)}
            onPress={() => this.handleSubmit(closeModal)}
          />
        </View>
      </ScrollView>
    );
  }
}

export default InformationScreen;
