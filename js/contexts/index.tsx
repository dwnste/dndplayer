import React from 'react';

import {SettingsStore} from '../stores';
import {PlaylistsStore} from '../stores';

export const storesContext = React.createContext({
  settingsStore: new SettingsStore(),
  playlistsStore: new PlaylistsStore(),
});
