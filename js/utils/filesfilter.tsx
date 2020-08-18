import {ReadDirItem} from 'react-native-fs';

const extensions: Array<string> = ['.mp3', '.wav', '.flac', '.m4u', '.ogg'];

const filterAudioFiles = (items: ReadDirItem[]): ReadDirItem[] => {
  return items.filter(({isDirectory, name}) => {
    if (isDirectory()) {
      return false;
    }

    const lastIndexOfDot = name.lastIndexOf('.');

    if (lastIndexOfDot < 0) {
      return false;
    }

    const currentExtension = name.slice(lastIndexOfDot);

    return extensions.some((extension) => currentExtension === extension);
  });
};

export {filterAudioFiles, extensions};
