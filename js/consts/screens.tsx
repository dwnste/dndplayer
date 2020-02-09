type Screens = 'Main' | 'Settings';

type ScreenType = {
  [key: string]: Screens;
};

const SCREENS: ScreenType = {
  main: 'Main',
  settings: 'Settings',
};

export {SCREENS};
