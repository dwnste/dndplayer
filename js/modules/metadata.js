import {NativeModules} from 'react-native';

const DEFAULT_METADATA = {
  album: null,
  artist: null,
  cover: null,
  title: null,
};

type MetadataType = {
  album: ?string,
  artist: ?string,
  cover: ?string,
  title: ?string,
};

type MetadataModuleType = {
  get: (path: string) => Promise<MetadataType>,
};

const metadataModule: MetadataModuleType = NativeModules.MetadataModule || {
  get: (path: string) => Promise.resolve(DEFAULT_METADATA),
};

export default metadataModule;
