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
  loading: boolean;
  paths: PathsType;
  explorers: ExplorersType;
  reset(): void;
  setLoading(value: boolean): void;
  updateFXExplorer(path: string): CancellablePromise<unknown>;
  updateMusicExplorer(path: string): CancellablePromise<unknown>;
  setFXDir(item: ReadDirItem): CancellablePromise<unknown>;
  getFXDir(): CancellablePromise<unknown>;
  setMusicDir(item: ReadDirItem): CancellablePromise<unknown>;
  getMusicDir(): CancellablePromise<unknown>;
  setPaths(): CancellablePromise<unknown>;
}

class SettingsStore implements SettingsStoreInterface {
  @observable loading = false;

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

  @action
  setLoading = (value: boolean = false) => {
    this.loading = value;
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

  getFXDir = flow(function*(this: SettingsStoreInterface) {
    const path = yield get(FX_DIR_NAME);
    this.paths.fx = path || '';
  });

  getMusicDir = flow(function*(this: SettingsStoreInterface) {
    const path = yield get(MUSIC_DIR_NAME);
    this.paths.music = path || '';
  });

  setPaths = flow(function*(this: SettingsStoreInterface) {
    yield Promise.all([this.getFXDir(), this.getMusicDir()]);
  });

  @action
  reset = () => {
    this.loading = false;

    this.explorers = {
      fx: {
        path: DEFAULT_PATH,
        items: [],
      },
      music: {
        path: DEFAULT_PATH,
        items: [],
      },
    };
  };
}

export default SettingsStore;
