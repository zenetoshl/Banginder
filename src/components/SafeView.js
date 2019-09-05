import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

class SafeView extends React.Component {
  render() {
    return <StatusBar backgroundColor="white" barStyle="dark-content" />;
  }
}
export default SafeView;
