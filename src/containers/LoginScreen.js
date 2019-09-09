import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import { Input, Button } from "react-native-elements";
import firebase from "react-native-firebase";
import Image from "react-native-scalable-image";
import logo from "../assets/logo.png";

const dimensions = Dimensions.get("window");

const style = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    backgroundColor: "#FFF",
    width: dimensions.width * 0.7,
    marginTop: 40,
    borderRadius: 20,
    borderBottomWidth: 0
  },
  loginBtn: {
    width: "70%",
    marginTop: 40,
    alignItems: "center",
    borderWidth: 2
  },
  loginBtnTitle: {
    color: "white",
    width: "100%"
  }
});

class LoginScreen extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleSubmit = () => {
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password);
  };

  render() {
    const { navigation } = this.props;
    const { email, password } = this.state;
    return (
      <View style={style.body}>
        <Image width={Dimensions.get("window").width * 0.8} source={logo} />
        <Input
          leftIcon={{
            type: "antdesign",
            name: "user",
            color: "rgba(0, 0, 0, 0.25)"
          }}
          containerStyle={style.inputContainer}
          placeholder="Email"
          onChangeText={text => this.setState({ email: text })}
          value={email}
        />

        <Input
          leftIcon={{
            type: "antdesign",
            name: "lock",
            color: "rgba(0, 0, 0, 0.25)"
          }}
          containerStyle={style.inputContainer}
          placeholder="Senha"
          secureTextEntry
          onChangeText={text => this.setState({ password: text })}
          value={password}
        />
        <Button
          buttonStyle={style.loginBtn}
          titleStyle={style.loginBtnTitle}
          title="Login"
          disabled={!(password && email)}
          onPress={this.handleSubmit}
        />
        <Button
          title="Registre-se"
          buttonStyle={style.loginBtn}
          titleStyle={style.loginBtnTitle}
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    );
  }
}

export default LoginScreen;
