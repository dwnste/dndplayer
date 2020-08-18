import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Button} from 'react-native';

import {ReadDirItem} from 'react-native-fs';

import {Folder, File} from '../../../components/Icons';

import {COLORS} from '../../../consts/colors';

type ExplorerItemProps = {
  item: ReadDirItem;
  onSelect: (item: ReadDirItem) => void;
  onPress: (item: ReadDirItem) => void | Promise<void>;
  showSelect: (item: ReadDirItem) => boolean;
};

const ExplorerItem = ({
  item,
  onSelect,
  onPress,
  showSelect,
}: ExplorerItemProps): JSX.Element => (
  <TouchableOpacity style={styles.wrap} onPress={() => onPress(item)}>
    <View style={styles.titleWrap}>
      {item.isDirectory() ? (
        <Folder width={50} height={50} color={COLORS.lighterBackground} />
      ) : (
        <File width={50} height={50} color={COLORS.lighterBackground} />
      )}
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
        {item.name}
      </Text>
    </View>
    {showSelect(item) && (
      <Button
        title="Select"
        onPress={(e) => {
          e.stopPropagation();
          onSelect(item);
        }}
      />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexGrow: 0,
    flexShrink: 1,
  },
  wrap: {
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    fontSize: 20,
    color: COLORS.text,
    marginLeft: 5,
  },
});

export default ExplorerItem;
