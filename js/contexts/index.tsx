import React from 'react';

import {SettingsStore} from '../stores';

export const storesContext = React.createContext({
  settingsStore: new SettingsStore(),
});
