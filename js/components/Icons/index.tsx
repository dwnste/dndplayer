import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

type IconProps = {
  height: number;
  width: number;
  color: string;
  flipHorizontal?: boolean;
};

const Play = ({height, width, color}: IconProps) => {
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24">
      <Path d="M8 5v14l11-7z" fill={color} />
      <Path d="M0 0h24v24H0z" fill="none" />
    </Svg>
  );
};

const Pause = ({height, width, color}: IconProps) => {
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24">
      <Path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill={color} />
      <Path d="M0 0h24v24H0z" fill="none" />
    </Svg>
  );
};

const Rewind = ({height, width, color, flipHorizontal}: IconProps) => {
  const styles = flipHorizontal
    ? {
        transform: [
          {
            rotateY: '180deg',
          },
        ],
      }
    : {};

  return (
    <View style={styles}>
      <Svg height={height} width={width} viewBox="0 0 24 24">
        <Path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" fill={color} />
        <Path d="M0 0h24v24H0z" fill="none" />
      </Svg>
    </View>
  );
};

const Repeat = ({height, width, color}: IconProps) => {
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24">
      <Path d="M0 0h24v24H0z" fill="none" />
      <Path
        d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"
        fill={color}
      />
    </Svg>
  );
};

const Playlist = ({height, width, color}: IconProps) => {
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24">
      <Path d="M0 0h24v24H0V0z" fill="none" />
      <Path d="M4 10h12v2H4zm0-4h12v2H4zm0 8h8v2H4zm10 0v6l5-3z" fill={color} />
    </Svg>
  );
};

const Settings = ({height, width, color}: IconProps) => {
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24">
      <Path d="M0 0h24v24H0V0z" fill="none" />
      <Path
        fill={color}
        d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"
      />
    </Svg>
  );
};

export {Play, Pause, Rewind, Repeat, Playlist, Settings};
