import React from 'react';
import {TouchableOpacity, View, Image, StyleSheet} from 'react-native';

import {COLORS} from '../../consts/colors';

// TODO: replace with svg/component
const fxImage = require('./icons/fx.png');

type BubbleProps = {
  paused: boolean;
  toggle: (e: Event) => void;
  togglePlaylist: (e: Event) => void;
};

const Bubble = ({toggle, togglePlaylist, paused}: BubbleProps) => {
  const fxOpacityStyle = {
    opacity: paused ? 0.3 : 1,
  };

  return (
    <View style={styles.wrap}>
      <TouchableOpacity
        onPress={toggle}
        onLongPress={togglePlaylist}
        style={styles.bubble}>
        <Image style={[styles.image, fxOpacityStyle]} source={fxImage} />
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
    backgroundColor: COLORS.lighterBackground,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default Bubble;
