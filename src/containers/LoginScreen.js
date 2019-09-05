import React from 'react';
import {ScrollView, TextInput, Button} from 'react-native';
import firebase from 'react-native-firebase';

import SafeView from '../components/SafeView';

class LoginScreen extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleSubmit = () => {
    const {email, password} = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password);
  };

  render() {
    const {navigation} = this.props;
    const {email, password} = this.state;
    return (
      <ScrollView>
        <SafeView />
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
        <Button title="Login" onPress={this.handleSubmit} />
        <Button
          title="Registre-se"
          onPress={() => navigation.navigate('Register')}
        />
      </ScrollView>
    );
  }
}

export default LoginScreen;
