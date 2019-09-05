import React from 'react';
import {View, Text, Button, ScrollView, Alert} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Card, Divider} from 'react-native-elements';
import firebase from 'react-native-firebase';

class TinderScreen extends React.Component {
  state = {
    users: [{}],
    user: {
      data: () => ({
        name: '',
        surname: '',
        bio: '',
        url: '',
        likes: [''],
        dislikes: [''],
      }),
    },
    loading: true,
  };

  renderCard = user => {
    if (user.data().name === '') {
      this.prox();
    }
    if (!!user !== false) {
      const data = user.data();
      return (
        <Card
          title={`${data.name} ${data.surname}`}
          image={{uri: `${data.url}`}}
          imageStyle={{height: 500}}>
          <Text>{data.bio}</Text>
          <Divider style={{backgroundColor: 'green'}} />

          <Text>LIKES</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {data.likes.map(e => (
              <Text>{`${e} `}</Text>
            ))}
          </View>
          <Divider style={{backgroundColor: 'red'}} />
          <Text>DISLIKES</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {data.dislikes.map(e => (
              <Text>{`${e} `}</Text>
            ))}
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignSelf: 'center',
            }}>
            <Button onPress={this.prox} title="Love" />
            <Button
              onPress={() => this.addToHateList(user.id, this.prox)}
              title="Hate"
            />
          </View>
        </Card>
      );
    } else {
      return <Text>acabou a lista</Text>;
    }
  };

  addToHateList = (enemyUid, func) => {
    const user = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection('Hate')
      .doc(user.uid)
      .collection(enemyUid)
      .doc()
      .set({
        date: '',
        message: '',
      })
      .then(func);
  };

  prox = () => {
    const {users} = this.state;
    let array = users;
    let newUser = array.pop();
    this.setState({
      user: newUser,
      users: array,
    });
  };

  componentDidMount = () => {
    const firestore = firebase.firestore();
    const user = firebase.auth().currentUser;
    this.setState({loading: true});
    firestore
      .collection('registerInfo')
      .get()
      .then(snap => {
        this.setState({
          users: snap.docs.filter(e => e.data().uid !== user.uid),
        }).then(() => this.setState({loading: false}));
      })
      .catch(() => this.setState({loading: false}));
  };

  render() {
    const {user, loading} = this.state;
    return (
      <ScrollView>
        {loading ? (
          <Spinner visible={loading} textContent={'Loading...'} />
        ) : (
          this.renderCard(user)
        )}
      </ScrollView>
    );
  }
}

export default TinderScreen;
