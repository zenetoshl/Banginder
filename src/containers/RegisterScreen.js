import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import { Button, Input } from "react-native-elements";
import firebase from "react-native-firebase";
import logo from "../assets/logo.png";
import Image from "react-native-scalable-image";

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

class RegisterScreen extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleSubmit = () => {
    const { email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  render() {
    const { email, password } = this.state;
    return (
      <View style={style.body}>
        <Image width={Dimensions.get("window").width * 0.7} source={logo} />
        <Input
          placeholder="Digite seu Email"
          containerStyle={style.inputContainer}
          onChangeText={text => this.setState({ email: text })}
          value={email}
        />
        <Input
          placeholder="Digite sua Senha"
          secureTextEntry
          containerStyle={style.inputContainer}
          onChangeText={text => this.setState({ password: text })}
          value={password}
        />
        <Button
          buttonStyle={style.loginBtn}
          titleStyle={style.loginBtnTitle}
          title="Cadastrar"
          disabled={!(email && password)}
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

export default RegisterScreen;
