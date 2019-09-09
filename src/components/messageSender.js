import React from 'react';
import { TextInput, ScrollView, Button } from 'react-native';
import firebase from 'react-native-firebase';

class MessageSender extends React.Component {
  state = {
    message: [{ text: '', date: '' }],
    newMessage: '',
    list: [{}]
  };

  submitMessage = () => {
    const { firstUid, secondUid } = this.props;
    const { newMessage, list } = this.state;
    let time = new Date();
    const obj = { text: newMessage, date: `${time}` };
    this.setState({ loading: true });
    console.warn(list);
    firebase
      .firestore()
      .collection('Hate')
      .doc(firstUid)
      .collection('HateList')
      .doc(secondUid)
      .set({
        message: [obj, ...list]
      })
      .then(() => {
        this.props.navigation.goBack();  
        this.setState({ newMessage: '', loading: false })});
  };

  componentDidMount = () => {
    const { firstUid, secondUid } = this.props;
    this.setState({ loading: true });
    firebase
      .firestore()
      .collection('Hate')
      .doc(firstUid)
      .collection('HateList')
      .doc(secondUid)
      .get()
      .then(snap => {
        this.setState({ list: snap.data().message, loading: false });
      });
  };
  render() {
    const { newMessage } = this.state;
    return (
      <ScrollView>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 10
          }}
          onChangeText={text => this.setState({ newMessage: text })}
          value={newMessage}
        />
        <Button
          title='Enviar Mensagem'
          style={{ marginLeft: 10, marginRight: 10, marginBottom: 10 }}
          onPress={this.submitMessage}
        />
      </ScrollView>
    );
  }
}

export default MessageSender;
