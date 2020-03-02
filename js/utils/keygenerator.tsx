import {ReadDirItem} from 'react-native-fs';

const generateKey = ({name, isDirectory}: ReadDirItem): string => {
  const prefix = isDirectory() ? 'dir' : 'file';

  return `${prefix}_${name}`;
};

export {generateKey};
