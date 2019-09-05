import React from 'react';
import {ScrollView, Button, Modal} from 'react-native';
import firebase from 'react-native-firebase';
import SafeView from '../components/SafeView';
import InformationScreen from '../containers/InformationScreen';

class HomeScreen extends React.Component {
  state = {
    isNotRegister: !!firebase.auth().currentUser.displayName === false,
  };

  render() {
    const {isNotRegister} = this.state;
    return (
      <ScrollView>
        <SafeView />
        <Modal
          animationType="slide"
          transparent={false}
          visible={isNotRegister}
          onRequestClose={() => {}}>
          <InformationScreen
            closeModal={() => {
              this.setState({isNotRegister: false});
            }}
          />
        </Modal>
        <Button title="SignOut" onPress={() => firebase.auth().signOut()} />
      </ScrollView>
    );
  }
}

export default HomeScreen;
