import {observable, action} from 'mobx';

import {ReadDirItem} from 'react-native-fs';

export interface PlaylistsStoreInterface {
  setPlaylistForFx(list: ReadDirItem[]): void;
  setPlaylistForMusic(list: ReadDirItem[]): void;
  currentFx: ReadDirItem | null;
  currentMusic: ReadDirItem | null;
  nextMusic: () => void;
  previousMusic: () => void;
}

class PlaylistsStore implements PlaylistsStoreInterface {
  @observable fxPlaylist: ReadDirItem[] = [];
  @observable musicPlaylist: ReadDirItem[] = [];
  @observable currentFx: ReadDirItem | null = null;
  @observable currentMusic: ReadDirItem | null = null;

  @action
  setPlaylistForFx = (list: ReadDirItem[] = []): void => {
    this.fxPlaylist = list;
  };

  @action
  setPlaylistForMusic = (list: ReadDirItem[] = []): void => {
    this.musicPlaylist = list;
  };

  @action
  setCurrentMusic = (file: ReadDirItem | null): void => {
    this.currentMusic = file;
  };

  @action
  setCurrentFx = (file: ReadDirItem | null): void => {
    this.currentFx = file;
  };

  @action
  nextMusic = (): void => {
    if (!this.musicPlaylist.length) {
      return;
    }

    const index = this.musicPlaylist.findIndex(
      ({path}) => path === this.currentMusic?.path,
    );

    const nextIndex = this.musicPlaylist.length === index + 1 ? 0 : index + 1;

    this.setCurrentMusic(this.musicPlaylist[nextIndex]);
  };

  @action
  previousMusic = (): void => {
    if (!this.fxPlaylist.length) {
      return;
    }

    const index = this.musicPlaylist.findIndex(
      ({path}) => path === this.currentMusic?.path,
    );

    const nextIndex = index === 0 ? this.musicPlaylist.length - 1 : index - 1;

    this.setCurrentMusic(this.musicPlaylist[nextIndex]);
  };
}

export default PlaylistsStore;
