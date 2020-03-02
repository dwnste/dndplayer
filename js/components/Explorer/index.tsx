import React from 'react';
import {View, Button, FlatList, StyleSheet} from 'react-native';

import ExplorerItem from './components/ExplorerItem';

import {generateKey} from '../../utils/keygenerator';

import {ReadDirItem} from 'react-native-fs';

type FileExplorerProps = {
  items: ReadDirItem[];
  onSelect: (item: ReadDirItem) => void | Promise<void>;
  onPress: (item: ReadDirItem) => void | Promise<void>;
  onPressBack: (e: Event) => void;
  showSelect: (item: ReadDirItem) => boolean;
};

const FileExplorer = ({
  items,
  onSelect,
  onPress,
  onPressBack,
  showSelect = () => false,
}: FileExplorerProps) => {
  return (
    <View style={styles.container}>
      <Button title="..." onPress={onPressBack} />
      <FlatList
        data={items}
        renderItem={({item}) => (
          <ExplorerItem
            item={item}
            onPress={onPress}
            onSelect={onSelect}
            showSelect={showSelect}
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
});

export default FileExplorer;
