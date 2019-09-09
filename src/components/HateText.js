import React from 'react';
import { View, Button, Text } from 'react-native';
import firebase from 'react-native-firebase';

class HateText extends React.Component {
  state = {
    likes: [''],
    dislikes: [''],
    hateText: [{name:'Carregando lista...', color: 'black'}]
  };

  compare = () => {
    const { Ulikes, Udislikes } = this.props;
    const { likes, dislikes } = this.state;
    const IhateUlove = dislikes.filter(e => Ulikes.includes(e));

    const IloveUhate = likes.filter(e => Udislikes.includes(e));

    const Hate = [
      ...IhateUlove.map(e => {
        return { name: e, color: '#30f26f' };
      }),
      ...IloveUhate.map(e => {
        return { name: e, color: '#ff7675' };
      })
    ];
    this.setState({ hateText: Hate });
    this.setState({ loading: false });
  };

  componentDidMount = () => {
    const firestore = firebase.firestore();
    const user = firebase.auth().currentUser;
    this.setState({ loading: true });
    firestore
      .collection('registerInfo')
      .doc(user.uid)
      .get()
      .then(snap => {
        const data = snap.data();
        this.setState({
          likes: data.likes,
          dislikes: data.dislikes
        }).then(this.compare);
      })
      .catch(this.compare);
  };

  render() {
    const { hateText } = this.state;

    return (
      <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {hateText.map(e => (
          <Text style={{ color: e.color }}>{`${e.name} `}</Text>
        ))}
      </View>
    );
  }
}

export default HateText;
