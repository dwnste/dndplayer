import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {AudioFile} from '../../types';

import {COLORS} from '../../consts/colors';

type InfoProps = {
  file: AudioFile | null;
};

const LABELS = {
  unknownArtist: 'Unknown Artist',
};

const Info = ({file}: InfoProps) => {
  if (!file) {
    return null;
  }

  return (
    <View style={styles.wrap}>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
        {file.metadata.title}
      </Text>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.artist}>
        {file.metadata.artist || LABELS.unknownArtist}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: COLORS.transparentBackground,
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  title: {
    color: COLORS.text,
    fontWeight: 'bold',
    fontSize: 20,
  },
  artist: {
    color: COLORS.text,
    fontSize: 15,
  },
});

export default Info;
