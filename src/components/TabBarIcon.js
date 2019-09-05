import React from 'react';
import {Icon} from 'react-native-elements';

export default function TabBarIcon(props) {
  return <Icon name={props.name} size={26} style={{marginBottom: -3}} />;
}
