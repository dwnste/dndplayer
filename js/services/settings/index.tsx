import {get, set} from '../../utils/storage';

const FX_DIR = 'fx_dir';
const MUSIC_DIR = 'music_dir';

export interface SettingsServiceInterface {
  setFXDir(path: string): Promise<void>;
  getFXDir(): Promise<string | null>;
  setMusicDir(path: string): Promise<void>;
  getMusicDir(): Promise<string | null>;
}

export default class SettingsService implements SettingsServiceInterface {
  setFXDir = async (path: string = ''): Promise<void> => set(FX_DIR, path);

  getFXDir = (): Promise<string | null> => get(FX_DIR);

  setMusicDir = (path: string = ''): Promise<void> => set(MUSIC_DIR, path);

  getMusicDir = (): Promise<string | null> => get(MUSIC_DIR);
}
