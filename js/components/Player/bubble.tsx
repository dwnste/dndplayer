import React from 'react';
import {TouchableOpacity, View, Image, StyleSheet} from 'react-native';

type BubbleProps = {
  paused: boolean;
  toggle: (e: Event) => void;
  togglePlaylist: (e: Event) => void;
};

const fxImage = require('./icons/fx.png');
const fxImageToggled = require('./icons/fx_toggled.png');

const Bubble = ({toggle, togglePlaylist, paused}: BubbleProps) => {
  const fxIcon = paused ? fxImage : fxImageToggled;

  return (
    <View style={styles.wrap}>
      <TouchableOpacity
        onPress={toggle}
        onLongPress={togglePlaylist}
        style={styles.bubble}>
        <Image style={styles.image} source={fxIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bubble: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default Bubble;
