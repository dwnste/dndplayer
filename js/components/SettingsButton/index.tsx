import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';

type SettingsButtonProps = {
  onPress: (ev: Event) => void;
};

const SettingsButton = ({onPress}: SettingsButtonProps) => (
  <TouchableOpacity onPress={onPress}>
    <Image style={styles.icon} source={require('./icon.png')} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  icon: {
    width: 75,
    height: 75,
  },
});

export default SettingsButton;
