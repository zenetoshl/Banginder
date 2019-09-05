import React from 'react';
import {ScrollView, TextInput} from 'react-native';
import {Button} from 'react-native-elements';
import firebase from 'react-native-firebase';

class RegisterScreen extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleSubmit = () => {
    const {email, password} = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  render() {
    const {email, password} = this.state;
    return (
      <ScrollView>
        <TextInput
          placeholder="Email"
          onChangeText={text => this.setState({email: text})}
          value={email}
        />
        <TextInput
          placeholder="senha"
          secureTextEntry
          onChangeText={text => this.setState({password: text})}
          value={password}
        />
        <Button title="cadastrar" onPress={this.handleSubmit} />
      </ScrollView>
    );
  }
}

export default RegisterScreen;
