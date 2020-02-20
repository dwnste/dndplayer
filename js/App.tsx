import React, {useLayoutEffect, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackCardInterpolationProps,
  StackCardInterpolatedStyle,
} from '@react-navigation/stack';

import {configure} from 'mobx';

import Settings from './screens/Settings';
import Main from './screens/Main';

import {requestExternalStorageReading} from './utils/permissions';

import {useStores} from './hooks';

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
  const {settingsStore, playlistsStore} = useStores();

  useEffect(() => {
    requestExternalStorageReading();
  });

  useLayoutEffect(() => {
    const init = async () => {
      settingsStore.setLoading(true);

      try {
        await settingsStore.setPaths();

        await Promise.all([
          settingsStore.updateFXExplorer(settingsStore.paths.fx),
          settingsStore.updateMusicExplorer(settingsStore.paths.music),
        ]);

        const filteredMusicList = settingsStore.explorers.music.items.filter(
          file => file.isFile(),
        );
        const filteredFxList = settingsStore.explorers.fx.items.filter(file =>
          file.isFile(),
        );

        playlistsStore.setPlaylistForMusic(filteredMusicList);
        playlistsStore.setPlaylistForFx(filteredFxList);

        if (!playlistsStore.currentMusic && filteredMusicList.length) {
          playlistsStore.setCurrentMusic(playlistsStore.musicPlaylist[0]);
        }

        if (!playlistsStore.currentFx && filteredFxList.length) {
          playlistsStore.setCurrentFx(playlistsStore.fxPlaylist[0]);
        }
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
