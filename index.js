/**
 * @format
 */
import 'react-native-gesture-handler'; // TODO: remove when fixed

import {AppRegistry} from 'react-native';
import App from './js/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
