import React from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import icons from 'react-native-vector-icons/AntDesign';
import HomeScreen from '../containers/HomeScreen';
import SettingsScreen from '../containers/SettingsScreen';
import TinderScreen from '../containers/TinderScreen';
import RegisterScreen from '../containers/RegisterScreen';
import LoginScreen from '../containers/LoginScreen';
import messageScreen from '../containers/messageScreen';

const HomeAndChatStack = createStackNavigator(
  {
    Home: HomeScreen,
    Chat: messageScreen
  },
  {
    headerMode: 'none'
  }
);
const mainTab = createBottomTabNavigator(
  {
    Home: HomeAndChatStack,
    Pessoas: TinderScreen,
    Settings: SettingsScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const { routeName, focused, tintColor } = navigation.state;
        const IconComponent = icons;
        let iconName;
        if (routeName === 'Home') iconName = 'home';
        else if (routeName === 'Pessoas') iconName = 'deleteuser';
        else if (routeName === 'Settings') iconName = 'setting';
        return (
          <IconComponent
            name={iconName}
            size={25}
            color={focused ? tintColor : 'black'}
          />
        );
      }
    }),
    tabBarOptions: {
      keyboardHidesTabBar: true,
    }
  }
);
const mainStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen
  },
  {
    headerMode: 'none'
  }
);

const App = createAppContainer(mainTab);
const RegisterApp = createAppContainer(mainStack);

function Routes({ user }) {
  if (user != null) {
    return <App />;
  }
  return <RegisterApp />;
}

Routes.propTypes = {
  user: PropTypes.any
};

Routes.defaultProps = {
  user: null
};

function mapStateToProp(state) {
  return {
    user: state.firebase.user
  };
}

export default connect(mapStateToProp)(Routes);
