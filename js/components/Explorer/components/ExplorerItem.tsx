import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Button} from 'react-native';

import {ReadDirItem} from 'react-native-fs';

type ExplorerItemProps = {
  item: ReadDirItem;
  onSelect: (item: ReadDirItem) => void;
  onPress: (item: ReadDirItem) => void | Promise<void>;
};

const ExplorerItem = ({
  item,
  onSelect,
  onPress,
}: ExplorerItemProps): JSX.Element => (
  <TouchableOpacity style={styles.wrap2} onPress={() => onPress(item)}>
    <View style={styles.wrap}>
      <Text style={styles.text}>{item.name}</Text>
    </View>
    <Button
      title="Select"
      onPress={e => {
        e.stopPropagation();
        onSelect(item);
      }}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  wrap2: {
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrap: {
    padding: 5,
  },
  text: {
    fontSize: 20,
  },
});

export default ExplorerItem;
