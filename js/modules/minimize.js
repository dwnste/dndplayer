import {NativeModules} from 'react-native';

type MinimizeModuleType = {
  minimizeApp: () => void,
};

const minimizeModule: MinimizeModuleType = NativeModules.MinimizeModule || {
  minimizeApp: () => {},
};

export default minimizeModule;
