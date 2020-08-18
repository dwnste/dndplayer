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
import {Play, Rewind, Playlist, Repeat, Pause} from '../Icons';

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
      useNativeDriver: false,
    }).start();
  }, [progress]);

  // const playOrPauseIcon = paused ? playIcon : pauseIcon;
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
        <IconButton onPress={onToggleRepeat}>
          <Repeat
            width={35}
            height={35}
            color={repeat ? COLORS.accent : COLORS.icon}
          />
        </IconButton>
        <IconButton onPress={onPrevious}>
          <Rewind flipHorizontal width={50} height={50} color={COLORS.icon} />
        </IconButton>
        <IconButton onPress={toggle}>
          {paused ? (
            <Play width={50} height={50} color={COLORS.icon} />
          ) : (
            <Pause width={50} height={50} color={COLORS.icon} />
          )}
        </IconButton>
        <IconButton onPress={onNext}>
          <Rewind width={50} height={50} color={COLORS.icon} />
        </IconButton>
        <IconButton onPress={onTogglePlaylist}>
          <Playlist width={35} height={35} color={COLORS.icon} />
        </IconButton>
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
  flipped: {
    transform: [
      {
        rotateZ: '180deg',
      },
    ],
  },
});

export default Controls;
