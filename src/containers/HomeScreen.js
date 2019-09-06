import React from 'react';
import { ScrollView, Button, Modal } from 'react-native';
import firebase from 'react-native-firebase';
import SafeView from '../components/SafeView';
import HateScreen from '../components/HateScreen';
import InformationScreen from '../containers/InformationScreen';

class HomeScreen extends React.Component {
  state = {
    isNotRegister: !!firebase.auth().currentUser.displayName === false
  };

  render() {
    const { isNotRegister } = this.state;
    return (
      <ScrollView>
        <SafeView />
        {isNotRegister ? (
          <Modal
            animationType='slide'
            transparent={false}
            visible={isNotRegister}
            onRequestClose={() => {}}
          >
            <InformationScreen
              closeModal={() => {
                this.setState({ isNotRegister: false });
              }}
            />
          </Modal>
        ) : (
          <HateScreen />
        )}
      </ScrollView>
    );
  }
}

export default HomeScreen;
