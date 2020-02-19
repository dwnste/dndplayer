import React from 'react';
import {View, Button} from 'react-native';

import ExplorerItem from './components/ExplorerItem';

import {ReadDirItem} from 'react-native-fs';

type FileExplorerProps = {
  items: ReadDirItem[];
  onSelect: (item: ReadDirItem) => void | Promise<void>;
  onPress: (item: ReadDirItem) => void | Promise<void>;
  onPressBack: (e: Event) => void;
};

const generateKey = ({name, isDirectory}: ReadDirItem): string => {
  const prefix = isDirectory() ? 'dir' : 'file';

  return `${prefix}_${name}`;
};

const FileExplorer = ({
  items,
  onSelect,
  onPress,
  onPressBack,
}: FileExplorerProps) => {
  return (
    <View>
      <Button title="..." onPress={onPressBack} />
      {items.map(item => (
        <ExplorerItem
          key={generateKey(item)}
          item={item}
          onPress={onPress}
          onSelect={onSelect}
        />
      ))}
    </View>
  );
};

export default FileExplorer;
