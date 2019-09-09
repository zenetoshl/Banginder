import React from 'react';
import { View, Button, Text } from 'react-native';
import firebase from 'react-native-firebase';

class HateText extends React.Component {
  state = {
    likes: [''],
    dislikes: [''],
    hateText: 'Carregando lista...'
  };

  compare = () => {
    const { Ulikes, Udislikes } = this.props;
    const { likes, dislikes } = this.state;
    const IhateUlove = dislikes.filter(e => Ulikes.includes(e));
    const IloveUhate = likes.filter(e => Udislikes.includes(e));
    const Hate = [...IhateUlove, ...IloveUhate];
    this.setState({hateText: `${Hate}`})
    this.setState({ loading: false });
  };

  componentDidMount = () => {
    const firestore = firebase.firestore();
    const user = firebase.auth().currentUser;
    const { uid } = this.props;
    this.setState({ loading: true });
    firestore
      .collection('registerInfo')
      .doc(user.uid)
      .get()
      .then(snap => {
        const data = snap.data();
        this.setState({
          likes: data.likes,
          dislikes: data.dislikes,
        }).then(this.compare);
      })
      .catch(this.compare);
  };

  render() {
    const { hateText } = this.state;
    return (
      <View>
        <Text>{hateText}</Text>
      </View>
    );
  }
}

export default HateText;
