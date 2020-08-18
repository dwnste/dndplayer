import {NativeModules} from 'react-native';
import {MetadataType} from '../types';

const DEFAULT_METADATA = {
  album: null,
  artist: null,
  cover: null,
  title: null,
};

type MetadataModuleType = {
  get: (path: string) => Promise<MetadataType>,
};

const metadataModule: MetadataModuleType = NativeModules.MetadataModule || {
  get: () => Promise.resolve(DEFAULT_METADATA),
};

export {metadataModule as default, DEFAULT_METADATA};
