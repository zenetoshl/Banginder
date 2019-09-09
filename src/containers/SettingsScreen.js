import React from "react";
import { ScrollView, Text, Dimensions, StyleSheet } from "react-native";
import { Avatar, Button, Icon } from "react-native-elements";
import icons from "react-native-vector-icons/AntDesign";
import firebase from "react-native-firebase";

const dimensions = Dimensions.get("window");
const IconComponent = icons;

const style = StyleSheet.create({
  loginBtn: {
    width: "70%",
    marginTop: 30,
    alignItems: "center",
    borderWidth: 2
  },
  loginBtnTitle: {
    color: "white",
    width: "100%"
  }
});

class SettingsScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: () => <IconComponent name="setting" size={25} color={"black"} />
  };

  state = {
    photoUrl: "",
    displayName: "",
    bio: "",
    likes: [],
    dislikes: []
  };

  componentDidMount = () => {
    const firestore = firebase.firestore();
    const user = firebase.auth().currentUser;
    firestore
      .collection("registerInfo")
      .doc(user.uid)
      .get()
      .then(snap => {
        const data = snap.data();
        this.setState({
          photoUrl: data.url,
          displayName: `${data.name} ${data.surname}`,
          bio: data.bio,
          likes: data.likes,
          dislikes: data.dislikes
        });
      });
  };
  render() {
    const { displayName, photoUrl, bio } = this.state;
    return (
      <ScrollView
        contentContainerStyle={{ alignItems: "center", marginTop: 90 }}
      >
        <Avatar
          rounded
          size={200}
          source={{
            uri: photoUrl
          }}
        />
        <Text style={{ fontSize: 30, alignSelf: "center", marginTop: 30 }}>
          {displayName}
        </Text>
        <Text
          style={{
            fontSize: 20,
            alignSelf: "center",
            marginTop: 15,
            marginBottom: 24
          }}
        >
          {bio}
        </Text>
        <Button
          buttonStyle={style.loginBtn}
          titleStyle={style.loginBtnTitle}
          title="Sair"
          onPress={() => firebase.auth().signOut()}
        />
      </ScrollView>
    );
  }
}

export default SettingsScreen;
