import React from 'react';
import {FlatList, View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {AudioFile} from '../../types';

import {Play, Pause} from '../Icons';

import {COLORS} from '../../consts/colors';

type PlaylistProps = {
  list: AudioFile[];
  currentItem: AudioFile | null;
  onSelect: (item: AudioFile) => void;
};

const PlaylistItem = ({
  item,
  isPlayingNow,
  onSelect,
}: {
  item: AudioFile;
  isPlayingNow: boolean;
  onSelect: Function;
}) => (
  <TouchableOpacity style={styles.item} onPress={() => onSelect(item)}>
    <View style={styles.titleAndIcon}>
      <View style={styles.iconWrap}>
        {isPlayingNow ? (
          <Pause height={40} width={40} color={COLORS.secondary} />
        ) : (
          <Play height={40} width={40} color={COLORS.secondary} />
        )}
      </View>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemTitle}>
        {item.metadata.title}
      </Text>
    </View>
  </TouchableOpacity>
);

const Playlist = ({list, currentItem, onSelect}: PlaylistProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        renderItem={({item}: {item: AudioFile}) => (
          <PlaylistItem
            item={item}
            isPlayingNow={item.path === currentItem?.path}
            onSelect={onSelect}
          />
        )}
        keyExtractor={({path}) => path}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconWrap: {
    padding: 5,
    backgroundColor: COLORS.lighterBackground,
    borderRadius: 10,
  },
  item: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  itemTitle: {
    flex: 1,
    fontSize: 20,
    color: COLORS.text,
    marginLeft: 10,
  },
  titleAndIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Playlist;
