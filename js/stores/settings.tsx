import {observable, action, flow} from 'mobx';

import {get, set} from '../utils/storage';
import {list} from '../utils/filesystem';

import {getLatestVersion, ReleaseType} from '../api';

import {CancellablePromise} from 'mobx/lib/api/flow';
import {ReadDirItem} from 'react-native-fs';

const FX_DIR_NAME = 'fx_dir';
const MUSIC_DIR_NAME = 'music_dir';
const DEFAULT_PATH = '';

const DEFAULT_VERSION: VersionType = {
  loading: false,
  showModal: false,
  availableVersion: '',
  description: '',
  downloadLink: '',
  publishedAt: '',
  error: false,
};

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

type VersionType = {
  loading: boolean;
  showModal: boolean;
  availableVersion: string;
  downloadLink: string;
  description: string;
  publishedAt: string;
  error: boolean;
};

export interface SettingsStoreInterface {
  loading: boolean;
  paths: PathsType;
  explorers: ExplorersType;
  version: VersionType;
  checkVersion(): CancellablePromise<unknown>;
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

  @observable version: VersionType = DEFAULT_VERSION;

  @action
  setLoading = (value: boolean = false) => {
    this.loading = value;
  };

  setFXDir = flow(function* (this: SettingsStoreInterface, item: ReadDirItem) {
    if (!item.isDirectory()) {
      return;
    }

    yield set(FX_DIR_NAME, item.path);
    this.paths.fx = item.path;
  });

  setMusicDir = flow(function* (
    this: SettingsStoreInterface,
    item: ReadDirItem,
  ) {
    yield set(MUSIC_DIR_NAME, item.path);

    this.paths.music = item.path;
  });

  updateFXExplorer = flow(function* (
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

  updateMusicExplorer = flow(function* (
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

  getFXDir = flow(function* (this: SettingsStoreInterface) {
    const path = yield get(FX_DIR_NAME);
    this.paths.fx = path || '';
  });

  getMusicDir = flow(function* (this: SettingsStoreInterface) {
    const path = yield get(MUSIC_DIR_NAME);
    this.paths.music = path || '';
  });

  checkVersion = flow(function* (this: SettingsStoreInterface) {
    this.version.loading = true;

    try {
      const {
        assets,
        tag_name,
        body,
        published_at,
      }: ReleaseType = yield getLatestVersion();

      const downloadLink: string =
        assets?.find(
          ({content_type}) =>
            content_type === 'application/vnd.android.package-archive',
        )?.browser_download_url || '';

      this.version = {
        ...this.version,
        showModal: true,
        error: false,
        availableVersion: tag_name,
        description: body,
        publishedAt: published_at,
        downloadLink,
      };
    } catch {
      this.version.error = true;
    }

    this.version.loading = false;
  });

  @action
  hideVersionModal = () => {
    this.version = {
      ...this.version,
      showModal: false,
    };
  };

  setPaths = flow(function* (this: SettingsStoreInterface) {
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

    this.version = DEFAULT_VERSION;
  };
}

export default SettingsStore;
