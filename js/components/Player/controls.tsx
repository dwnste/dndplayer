import React, {useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  GestureResponderEvent,
} from 'react-native';

import IconButton from '../IconButton';

import {COLORS} from '../../consts/colors';

// TODO: replace with svgs/components
const playIcon = require('./icons/play.png');
const pauseIcon = require('./icons/pause.png');
const rewindIcon = require('./icons/rewind.png');
const repeatIcon = require('./icons/repeat.png');
const repeatToggledIcon = require('./icons/repeat_toggled.png');
const playlistIcon = require('./icons/playlist.png');

type ControlsProps = {
  repeat: boolean;
  paused: boolean;
  toggle: (e: Event) => void;
  onSeek: (e: GestureResponderEvent) => void;
  progressRef: React.RefObject<View>;
  progress: number;
  onNext: () => void;
  onPrevious: () => void;
  onTogglePlaylist: () => void;
  onToggleRepeat: () => void;
};

const Controls = ({
  repeat,
  paused,
  toggle,
  progress,
  onSeek,
  progressRef,
  onNext = () => {},
  onPrevious = () => {},
  onTogglePlaylist = () => {},
  onToggleRepeat = () => {},
}: ControlsProps) => {
  const progressAnimation = useRef(new Animated.Value(0));

  const width = progressAnimation.current.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    Animated.timing(progressAnimation.current, {
      toValue: progress,
      duration: 100,
    }).start();
  }, [progress]);

  const playOrPauseIcon = paused ? playIcon : pauseIcon;
  const repeatStateIcon = repeat ? repeatToggledIcon : repeatIcon;

  const barStyles = {
    backgroundColor: COLORS.accent,
    width,
  };

  return (
    <View style={styles.wrap}>
      <TouchableWithoutFeedback onPress={onSeek}>
        <View ref={progressRef} style={styles.progress}>
          <Animated.View style={[[StyleSheet.absoluteFill], barStyles]} />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.controlsWrap}>
        <IconButton
          onPress={onToggleRepeat}
          imgSource={repeatStateIcon}
          iconStyle={[styles.smallIcon, styles.flipped]}
        />
        <IconButton
          onPress={onPrevious}
          imgSource={rewindIcon}
          iconStyle={[styles.icon, styles.flipped]}
        />
        <IconButton
          onPress={toggle}
          imgSource={playOrPauseIcon}
          iconStyle={styles.icon}
        />
        <IconButton
          onPress={onNext}
          imgSource={rewindIcon}
          iconStyle={styles.icon}
        />
        <IconButton
          onPress={onTogglePlaylist}
          imgSource={playlistIcon}
          iconStyle={[styles.smallIcon, styles.flipped]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: COLORS.lighterBackground,
    paddingBottom: 10,
  },
  progress: {
    marginBottom: 10,
    height: 20,
    width: '100%',
    backgroundColor: COLORS.lightestBackground,
  },
  controlsWrap: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
  },
  smallIcon: {
    width: 30,
    height: 30,
  },
  flipped: {
    transform: [
      {
        rotateZ: '180deg',
      },
    ],
  },
});

export default Controls;
