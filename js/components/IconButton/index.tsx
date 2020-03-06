import React from 'react';
import {TouchableOpacity, StyleProp, ViewStyle} from 'react-native';

type IconButtonProps = {
  onPress: (ev: Event) => void;
  style?: StyleProp<ViewStyle>;
  children: JSX.Element;
};

const IconButton = ({onPress, style, children}: IconButtonProps) => (
  <TouchableOpacity style={style || {}} onPress={onPress}>
    {children}
  </TouchableOpacity>
);

export default IconButton;
