import React from 'react';
import {FlatList, View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {ReadDirItem} from 'react-native-fs';

import {generateKey} from '../../utils/keygenerator';

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
    <Text style={styles.itemTitle}>{item.name}</Text>
    {isPlayingNow && <Text style={styles.current}>↑ is playing now</Text>}
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
  item: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  current: {
    fontSize: 15,
    color: COLORS.text,
  },
  itemTitle: {
    fontSize: 20,
    color: COLORS.text,
  },
});

export default Playlist;
