import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SettingsService from './services/settings';

import Settings from './screens/Settings';
import Main from './screens/Main';

export type StackParamList = {
  Main: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const settingService = new SettingsService();

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" headerMode="none">
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Settings">
          {props => <Settings {...props} settingsService={settingService} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
