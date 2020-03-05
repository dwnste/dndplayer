import React from 'react';
import {FlatList, View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {ReadDirItem} from 'react-native-fs';

import {generateKey} from '../../utils/keygenerator';

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
    <View>
      <Text style={styles.itemTitle}>{item.name}</Text>
      {isPlayingNow && <Text>↑ is playing now</Text>}
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
  item: {
    height: 30,
    marginBottom: 15,
  },
  itemTitle: {
    fontSize: 20,
  },
});

export default Playlist;
