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
  <TouchableOpacity onPress={() => onPress(item)}>
    <View style={styles.wrap2}>
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
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  wrap2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrap: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  text: {
    fontSize: 20,
  },
});

export default ExplorerItem;
