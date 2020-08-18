import React from 'react';
import {View, ImageBackground, StyleSheet, ViewStyle} from 'react-native';
import {AudioFile} from '../../types';

type CoverProps = {
  file: AudioFile | null;
  children: JSX.Element | JSX.Element[];
  wrapStyles: ViewStyle;
};

const Cover = ({file, children, wrapStyles}: CoverProps) => {
  if (!file?.metadata.cover) {
    return <View style={wrapStyles}>{children}</View>;
  }

  return (
    <ImageBackground
      source={{
        uri: `data:image/jpeg;base64,${file.metadata.cover}`,
      }}
      style={wrapStyles}
      imageStyle={styles.image}>
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 'auto',
  },
});

export default Cover;
