export type MetadataType = {
  album: string | null;
  artist: string | null;
  cover: string | null;
  title: string | null;
};

export type AudioFile = {
  path: string;
  metadata: MetadataType;
};

export type Playlist = {
  title: string;
  list: AudioFile[];
};
