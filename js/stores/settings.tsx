import {observable, action, flow} from 'mobx';

import {get, set} from '../utils/storage';
import {list} from '../utils/filesystem';

import {CancellablePromise} from 'mobx/lib/api/flow';
import {ReadDirItem} from 'react-native-fs';

const FX_DIR_NAME = 'fx_dir';
const MUSIC_DIR_NAME = 'music_dir';
const DEFAULT_PATH = '';

type PathsType = {
  fx: string;
  music: string;
};

type ExplorerType = {
  path: string;
  items: ReadDirItem[];
};

type ExplorersType = {
  fx: ExplorerType;
  music: ExplorerType;
};

export interface SettingsStoreInterface {
  paths: PathsType;
  explorers: ExplorersType;
  updateFXExplorer(path: string): CancellablePromise<unknown>;
  updateMusicExplorer(path: string): CancellablePromise<unknown>;
  setFXDir(item: ReadDirItem): CancellablePromise<unknown>;
  getFXDir(): Promise<string | null>;
  setMusicDir(item: ReadDirItem): CancellablePromise<unknown>;
  getMusicDir(): Promise<string | null>;
}

class SettingsStore implements SettingsStoreInterface {
  @observable
  paths: PathsType = {
    fx: DEFAULT_PATH,
    music: DEFAULT_PATH,
  };

  @observable
  explorers: ExplorersType = {
    fx: {
      path: DEFAULT_PATH,
      items: [],
    },
    music: {
      path: DEFAULT_PATH,
      items: [],
    },
  };

  setFXDir = flow(function*(this: SettingsStoreInterface, item: ReadDirItem) {
    if (!item.isDirectory()) {
      return;
    }

    yield set(FX_DIR_NAME, item.path);
    this.paths.fx = item.path;
  });

  setMusicDir = flow(function*(
    this: SettingsStoreInterface,
    item: ReadDirItem,
  ) {
    yield set(MUSIC_DIR_NAME, item.path);

    this.paths.music = item.path;
  });

  updateFXExplorer = flow(function*(
    this: SettingsStoreInterface,
    path: string,
  ) {
    try {
      const items = yield list(path);
      this.explorers = {
        ...this.explorers,
        fx: {
          path,
          items,
        },
      };
    } catch {
      this.explorers = {
        ...this.explorers,
        fx: {
          path: '',
          items: [],
        },
      };
    }
  });

  updateMusicExplorer = flow(function*(
    this: SettingsStoreInterface,
    path: string,
  ) {
    try {
      const items = yield list(path);
      this.explorers = {
        ...this.explorers,
        music: {
          path,
          items,
        },
      };
    } catch {
      this.explorers = {
        ...this.explorers,
        music: {
          path: '',
          items: [],
        },
      };
    }
  });

  @action
  getFXDir = (): Promise<string | null> => get(FX_DIR_NAME);

  @action
  getMusicDir = (): Promise<string | null> => get(MUSIC_DIR_NAME);
}

export default SettingsStore;
