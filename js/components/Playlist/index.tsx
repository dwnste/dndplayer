import React from 'react';
import {FlatList, View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {ReadDirItem} from 'react-native-fs';

import {generateKey} from '../../utils/keygenerator';

import {Play, Pause} from '../Icons';

import {COLORS} from '../../consts/colors';

type PlaylistProps = {
  list: ReadDirItem[];
  currentItem: ReadDirItem | null;
  onSelect: (item: ReadDirItem) => void;
};

const PlaylistItem = ({
  item,
  isPlayingNow,
  onSelect,
}: {
  item: ReadDirItem;
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
        {item.name}
      </Text>
    </View>
  </TouchableOpacity>
);

const Playlist = ({list, currentItem, onSelect}: PlaylistProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        renderItem={({item}: {item: ReadDirItem}) => (
          <PlaylistItem
            item={item}
            isPlayingNow={item.path === currentItem?.path}
            onSelect={onSelect}
          />
        )}
        keyExtractor={generateKey}
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
