import React from 'react';
import {
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  StyleProp,
  ImageStyle,
} from 'react-native';

type IconButtonProps = {
  onPress: (ev: Event) => void;
  imgSource: ImageSourcePropType;
  iconStyle: StyleProp<ImageStyle>;
};

const IconButton = ({onPress, imgSource, iconStyle}: IconButtonProps) => (
  <TouchableOpacity onPress={onPress}>
    <Image style={iconStyle} source={imgSource} />
  </TouchableOpacity>
);

export default IconButton;
