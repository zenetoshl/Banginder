import React from "react";
import { ScrollView, Button, Modal } from "react-native";
import firebase from "react-native-firebase";
import SafeView from "../components/SafeView";
import HateScreen from "../components/HateScreen";
import InformationScreen from "../containers/InformationScreen";
import icons from "react-native-vector-icons/AntDesign";

const IconComponent = icons;

class HomeScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: () => <IconComponent name="home" size={25} color={"black"} />
  };

  state = {
    isNotRegister: !!firebase.auth().currentUser.displayName === false
  };

  render() {
    const { isNotRegister } = this.state;
    const {navigation} = this.props;
    return (
      <ScrollView>
        <SafeView />
        {isNotRegister ? (
          <Modal
            animationType="slide"
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
          <HateScreen navigation = {navigation}/>
        )}
      </ScrollView>
    );
  }
}

export default HomeScreen;
