import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SettingsService from './services/settings';

import Settings from './screens/Settings';
import Main from './screens/Main';

import {SCREENS} from './consts/screens';

export type StackParamList = {
  Main: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const settingService = new SettingsService();

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={SCREENS.main} headerMode="none">
        <Stack.Screen name={SCREENS.main} component={Main} />
        <Stack.Screen name={SCREENS.settings}>
          {props => <Settings {...props} settingsService={settingService} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
