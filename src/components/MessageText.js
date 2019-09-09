import React from 'react';
import { View, Button, Text } from 'react-native';
import { Card } from 'react-native-elements';
import firebase from 'react-native-firebase';

class MessageText extends React.Component {
  state = {
    message: [{ text: '', date: '' }]
  };

  formatDate = date => {
    const array = date.split(' ');

    return `${array[0]} ${array[2]} ${array[1]} às ${array[4].substr(0, 5)}`;
  };

  componentDidMount = () => {
    const firestore = firebase.firestore();
    const { firstUid, secondUid } = this.props;
    this.setState({ loading: true });
    firestore
      .collection('Hate')
      .doc(firstUid)
      .collection('HateList')
      .doc(secondUid)
      .get()
      .then(snap => {
        const newObj = snap.data().message.filter(e => e.text !== '');
        this.setState({
          message: newObj || [{ text: '', date: '' }]
        }).then(() => {
          this.setState({ loading: false });
        });
      })
      .catch(() => this.setState({ loading: false }));
  };

  render() {
    const { message } = this.state;
    return message.map(e =>
      e.text !== '' ? (
        <View>
          <Card>
            <Text>{`${e.text}`}</Text>
            <Text
              style={{ alignSelf: 'flex-end', fontSize: 10 }}
            >{`- ${this.formatDate(e.date)}`}</Text>
          </Card>
        </View>
      ) : (
        <View style={{ alignSelf: 'center' }}>
          <Text>- Não há mensagens nesta seção -</Text>
        </View>
      )
    );
  }
}

export default MessageText;
