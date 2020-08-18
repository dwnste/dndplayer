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
}) => {
  const hasNoArtist = !item.metadata.artist;

  const title = hasNoArtist ? (
    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemNoTitle}>
      {item.metadata.title}
    </Text>
  ) : (
    <View style={styles.itemFullTitle}>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemTitle}>
        {item.metadata.title}
      </Text>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemArtist}>
        {item.metadata.artist}
      </Text>
    </View>
  );

  const icon = isPlayingNow ? (
    <Pause height={50} width={50} color={COLORS.secondary} />
  ) : (
    <Play height={50} width={50} color={COLORS.secondary} />
  );

  return (
    <TouchableOpacity style={styles.item} onPress={() => onSelect(item)}>
      <View style={styles.titleAndIcon}>
        <View style={styles.iconWrap}>{icon}</View>
        {title}
      </View>
    </TouchableOpacity>
  );
};

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
    padding: 5,
    borderRadius: 10,
    backgroundColor: COLORS.transparentWhiteBackground,
    flexDirection: 'column',
    marginBottom: 10,
  },
  itemNoTitle: {
    flex: 1,
    fontSize: 20,
    color: COLORS.text,
    marginLeft: 10,
  },
  itemFullTitle: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
  },
  itemTitle: {
    color: COLORS.text,
    fontSize: 20,
  },
  itemArtist: {
    color: COLORS.text,
    fontSize: 15,
  },
  titleAndIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Playlist;
