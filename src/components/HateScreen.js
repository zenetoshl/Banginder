import React from 'react';
import { ScrollView, Button, Modal } from 'react-native';
import firebase from 'react-native-firebase';
import HateCard from './HateCard';

class HateScreen extends React.Component {
  state = {
    hateList: [],
    loading: true
  };

  componentDidMount = () => {
    const firestore = firebase.firestore();
    const user = firebase.auth().currentUser;
    this.setState({ loading: true });
    firestore
      .collection('Hate')
      .doc(user.uid)
      .collection('HateList')
      .get()
      .then(snap => {
        this.setState({
          hateList: snap.docs.map(e => e.id)
        }).then(() => this.setState({ loading: false }));
      })
      .catch(() => this.setState({ loading: false }));
  };

  render() {
    const { hateList } = this.state;
    const { navigation } = this.props;
    return (
      <ScrollView>
        {hateList.map(e => (
          <HateCard uid={e} navigation={navigation} />
        ))}
      </ScrollView>
    );
  }
}

export default HateScreen;
