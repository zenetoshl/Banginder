import React from 'react';
import {Button} from 'react-native-elements';

class RadioButton extends React.PureComponent {
  render() {
    const {
      title,
      onMark,
      onDismark,
      list,
      markedColor,
      dismarkedColor,
    } = this.props;
    const isPress = list.includes(title);
    return (
      <Button
        buttonStyle={{
          alignSelf: 'center',
          backgroundColor: dismarkedColor,
          borderColor: isPress ? markedColor : '#555555',
          borderWidth: 2,
          borderRadius: 3,
          marginBottom: 5,
          marginLeft: 3,
          height: 30,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
        }}
        titleStyle={{
          color: isPress ? markedColor : '#555555',
        }}
        title={title}
        onPress={isPress ? onMark : onDismark}
      />
    );
  }
}

export default RadioButton;
