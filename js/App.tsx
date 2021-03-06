import React, {useLayoutEffect, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {configure} from 'mobx';

import Settings from './screens/Settings';
import Main from './screens/Main';

import preparePlaylist from './utils/preparePlaylist';
import {requestExternalStorageReading} from './utils/permissions';

import {useStores} from './hooks';

import {SCREENS} from './consts/screens';

export type StackParamList = {
  Main: undefined;
  Settings: undefined;
};

// Set mobx
configure({enforceActions: 'observed'});

const Stack = createStackNavigator<StackParamList>();

const App = (): JSX.Element => {
  const {settingsStore, playlistsStore} = useStores();

  useEffect(() => {
    requestExternalStorageReading();
  }, []);

  useLayoutEffect(() => {
    const init = async () => {
      settingsStore.setLoading(true);

      try {
        await settingsStore.setPaths();

        // TODO: move this to settings screen
        await Promise.all([
          settingsStore.updateFXExplorer(settingsStore.paths.fx),
          settingsStore.updateMusicExplorer(settingsStore.paths.music),
        ]);

        const musicPlaylist = await preparePlaylist(
          settingsStore.explorers.music.items,
        );
        const fxPlaylist = await preparePlaylist(
          settingsStore.explorers.fx.items,
        );

        playlistsStore.updateMusicPlaylist(musicPlaylist);
        playlistsStore.updateFxPlaylist(fxPlaylist);
      } catch {}

      settingsStore.setLoading(false);
    };

    init();

    return () => {
      settingsStore.reset();
    };
  }, [settingsStore, playlistsStore]);

  return (
    <View style={styles.wrap}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={SCREENS.Main} headerMode="none">
          <Stack.Screen name={SCREENS.Main} component={Main} />
          <Stack.Screen
            name={SCREENS.Settings}
            component={Settings}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
});

export default App;
