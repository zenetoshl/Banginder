import React from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import HomeScreen from '../containers/HomeScreen';
import SettingsScreen from '../containers/SettingsScreen';
import TinderScreen from '../containers/TinderScreen';
import RegisterScreen from '../containers/RegisterScreen';
import LoginScreen from '../containers/LoginScreen';
import InformationScreen from '../containers/InformationScreen';

const mainTab = createBottomTabNavigator({
  Home: HomeScreen,
  Links: TinderScreen,
  Settings: SettingsScreen,
});
const mainStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
  },
  {
    headerMode: 'none',
  },
);
const mainAll = createStackNavigator(
  {
    App: mainTab,
    Info: InformationScreen,
  },
  {
    headerMode: 'none',
  },
);

const App = createAppContainer(mainTab);
const RegisterApp = createAppContainer(mainStack);

function Routes({user}) {
  if (user != null) {
    return <App />;
  }
  return <RegisterApp />;
}

Routes.propTypes = {
  user: PropTypes.any,
};

Routes.defaultProps = {
  user: null,
};

function mapStateToProp(state) {
  return {
    user: state.firebase.user,
  };
}

export default connect(mapStateToProp)(Routes);
