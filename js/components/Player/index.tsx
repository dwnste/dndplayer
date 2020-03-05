import React, {useState, useRef} from 'react';
import {View, GestureResponderEvent} from 'react-native';

import Video, {OnLoadData, OnProgressData} from 'react-native-video';
import {ReadDirItem} from 'react-native-fs';

import Controls from './controls';
import Bubble from './bubble';

type PlayerProps = {
  repeat?: boolean;
  ui?: boolean;
  bubbleUi?: boolean;
  file: ReadDirItem | null;
  paused: boolean;
  volume: number;
  toggle: (e: Event) => void;
  onEnd?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onTogglePlaylist?: () => void;
  onToggleRepeat?: () => void;
};

const Player = ({
  repeat = false,
  paused = false,
  ui = false,
  bubbleUi = false,
  toggle,
  file,
  volume,
  onEnd = () => {},
  onNext = () => {},
  onPrevious = () => {},
  onTogglePlaylist = () => {},
  onToggleRepeat = () => {},
}: PlayerProps) => {
  const playerRef = useRef<Video>(null);
  const progressRef = useRef<View>(null);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const onSeek = (e: GestureResponderEvent) => {
    const locationX = e.nativeEvent?.locationX;

    if (!locationX) {
      return;
    }

    progressRef.current?.measure((x, y, width) => {
      playerRef.current?.seek((locationX * duration) / width);
    });
  };

  const onLoad = ({duration}: OnLoadData): void => {
    setDuration(duration);
  };

  const onProgress = ({seekableDuration, currentTime}: OnProgressData) => {
    setProgress((currentTime * 100) / seekableDuration);
  };

  return (
    <>
      {ui && (
        <Controls
          repeat={repeat}
          onSeek={onSeek}
          progress={progress}
          toggle={toggle}
          paused={paused}
          progressRef={progressRef}
          onNext={onNext}
          onPrevious={onPrevious}
          onTogglePlaylist={onTogglePlaylist}
          onToggleRepeat={onToggleRepeat}
        />
      )}
      {bubbleUi && (
        <Bubble
          paused={paused}
          toggle={toggle}
          togglePlaylist={onTogglePlaylist}
        />
      )}
      {file && (
        <Video
          audioOnly
          playInBackground
          playWhenInactive
          repeat={repeat}
          paused={paused}
          volume={volume}
          source={{uri: file?.path}}
          ref={playerRef}
          onLoad={onLoad}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      )}
    </>
  );
};

export default Player;
