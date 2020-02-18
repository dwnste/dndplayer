import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {ExternalStorageDirectoryPath} from 'react-native-fs';

type FolderProps = {
  name: string;
  onPress: (e: Event) => void | Promise<void>;
  path: string | null;
};

const preparePath = (path: string | null): string => {
  if (!path) {
    return 'Not specified';
  }

  return path.replace(ExternalStorageDirectoryPath, 'SDCARD');
};

const Folder = ({name, path, onPress}: FolderProps): JSX.Element => {
  const preparedPath = preparePath(path);

  return (
    <TouchableOpacity style={styles.wrap} onPress={onPress}>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.path}>{preparedPath}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  name: {
    fontSize: 20,
  },
  path: {
    fontSize: 20,
  },
});

export default Folder;
