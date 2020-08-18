import 'react-native-gesture-handler';
import 'mobx-react-lite/batchingForReactNative';

import {AppRegistry} from 'react-native';
import App from './js/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
