import React from 'react';
import Video from 'react-native-video';

type PlayerProps = {
  paused: boolean;
};

const Player = ({paused}: PlayerProps) => (
  <Video
    audioOnly
    playInBackground
    playWhenInactive
    paused={paused}
    source={{uri: '/storage/emulated/0/Download/robins.mp3'}}
    onProgress={console.log}
  />
);

export default Player;
