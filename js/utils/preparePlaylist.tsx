import {ReadDirItem} from 'react-native-fs';

import metadataModule, {DEFAULT_METADATA} from '../modules/metadata';
import {EXTENSIONS} from '../consts/extensions';

const filterAudioFiles = (items: ReadDirItem[]): ReadDirItem[] => {
  return items.filter(({isDirectory, name}) => {
    if (isDirectory()) {
      return false;
    }

    const lastIndexOfDot = name.lastIndexOf('.');

    if (lastIndexOfDot < 0) {
      return false;
    }

    const currentExtension = name.slice(lastIndexOfDot + 1);

    return EXTENSIONS.some((extension) => currentExtension === extension);
  });
};

const getMetadata = async ({path, name}: ReadDirItem) => {
  try {
    const metadata = await metadataModule.get(path);

    return {
      ...metadata,
      title: metadata.title || name,
    };
  } catch (e) {
    return {
      ...DEFAULT_METADATA,
      title: name,
    };
  }
};

const prepareAudioFile = async (file: ReadDirItem) => ({
  path: file.path,
  metadata: await getMetadata(file),
});

const preparePlaylist = (files: ReadDirItem[] = []) => {
  const audioFiles = filterAudioFiles(files);

  return Promise.all(audioFiles.map(prepareAudioFile));
};

export default preparePlaylist;
