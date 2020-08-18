import {observable, action} from 'mobx';

import {AudioFile} from '../types';

export interface PlaylistsStoreInterface {
  setPlaylistForFx(list: AudioFile[]): void;
  setPlaylistForMusic(list: AudioFile[]): void;
  currentFx: AudioFile | null;
  currentMusic: AudioFile | null;
  nextMusic: () => void;
  previousMusic: () => void;
}

class PlaylistsStore implements PlaylistsStoreInterface {
  @observable fxPlaylist: AudioFile[] = [];
  @observable musicPlaylist: AudioFile[] = [];
  @observable currentFx: AudioFile | null = null;
  @observable currentMusic: AudioFile | null = null;

  @action
  setPlaylistForFx = (list: AudioFile[] = []): void => {
    this.fxPlaylist = list;
  };

  @action
  setPlaylistForMusic = (list: AudioFile[] = []): void => {
    this.musicPlaylist = list;
  };

  @action
  setCurrentMusic = (file: AudioFile | null): void => {
    this.currentMusic = file;
  };

  @action
  setCurrentFx = (file: AudioFile | null): void => {
    this.currentFx = file;
  };

  @action
  updateMusicPlaylist = (playlist: AudioFile[]): void => {
    this.setPlaylistForMusic(playlist);

    if (!this.musicPlaylist.length) {
      return;
    }

    this.setCurrentMusic(this.musicPlaylist[0]);
  };

  @action
  updateFxPlaylist = (playlist: AudioFile[]): void => {
    this.setPlaylistForFx(playlist);

    if (!this.fxPlaylist.length) {
      return;
    }

    this.setCurrentFx(this.fxPlaylist[0]);
  };

  @action
  nextMusic = (): void => {
    if (!this.musicPlaylist.length) {
      return;
    }

    const index = this.musicPlaylist.findIndex(
      ({path}) => path === this.currentMusic?.path,
    );

    const nextIndex = index + 1;

    const newIndex = this.musicPlaylist.length === nextIndex ? 0 : nextIndex;

    this.setCurrentMusic(this.musicPlaylist[newIndex]);
  };

  @action
  previousMusic = (): void => {
    if (!this.fxPlaylist.length) {
      return;
    }

    const index = this.musicPlaylist.findIndex(
      ({path}) => path === this.currentMusic?.path,
    );

    const isFirst = index === 0;
    const lastIndex = this.musicPlaylist.length - 1;
    const previousIndex = index - 1;

    const newIndex = isFirst ? lastIndex : previousIndex;

    this.setCurrentMusic(this.musicPlaylist[newIndex]);
  };
}

export default PlaylistsStore;
