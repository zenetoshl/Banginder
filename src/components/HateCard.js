import React from 'react';
import { View, Button, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'react-native-firebase';
import HateCardInfo from './HateCardInfo';
import { withNavigationFocus } from 'react-navigation';
class HateCard extends React.Component {
  state = {
    exists: false
  };

  componentDidMount = () => {
    const firestore = firebase.firestore();
    const user = firebase.auth().currentUser;
    const { uid } = this.props;
    const {navigation} = this.props;
    navigation.addListener('willFocus', () => {
      this.setState({ loading: true });
      firestore
        .collection('Hate')
        .doc(uid)
        .collection('HateList')
        .doc(user.uid)
        .get()
        .then(snap => {
          this.setState({
            exists: snap.exists
          }).then(() => {
            this.setState({ loading: false });
          });
        })
        .catch(() => this.setState({ loading: false }));
    });
  };

  render() {
    const { exists } = this.state;
    const { uid } = this.props;
    return <View>{exists ? <HateCardInfo uid={uid} /> : <View />}</View>;
  }
}

export default HateCard;
