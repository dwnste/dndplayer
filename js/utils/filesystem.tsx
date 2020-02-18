import RNFS from 'react-native-fs';

const list = async (
  path: string = RNFS.ExternalStorageDirectoryPath,
): Promise<RNFS.ReadDirItem[]> => {
  try {
    return await RNFS.readDir(path);
  } catch {}

  return [];
};

export {list};
