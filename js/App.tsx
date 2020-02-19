import React from 'react';
import {View, StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackCardInterpolationProps,
  StackCardInterpolatedStyle,
} from '@react-navigation/stack';

import Settings from './screens/Settings';
import Main from './screens/Main';

import {configure} from 'mobx';

import {SCREENS} from './consts/screens';

export type StackParamList = {
  Main: undefined;
  Settings: undefined;
};

// Set mobx
configure({enforceActions: 'observed'});

// Fade animation for transitions
const cardStyleInterpolator = ({
  current,
}: StackCardInterpolationProps): StackCardInterpolatedStyle => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const Stack = createStackNavigator<StackParamList>();

const App = (): JSX.Element => {
  return (
    <View style={styles.wrap}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={SCREENS.main} headerMode="none">
          <Stack.Screen name={SCREENS.main} component={Main} />
          <Stack.Screen
            name={SCREENS.settings}
            component={Settings}
            options={{cardStyleInterpolator}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
