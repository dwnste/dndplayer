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

import {filterAudioFiles} from './utils/filesfilter';
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
  }, []);

  useLayoutEffect(() => {
    const init = async () => {
      settingsStore.setLoading(true);

      try {
        await settingsStore.setPaths();

        await Promise.all([
          settingsStore.updateFXExplorer(settingsStore.paths.fx),
          settingsStore.updateMusicExplorer(settingsStore.paths.music),
        ]);

        const filteredMusicList = filterAudioFiles(
          settingsStore.explorers.music.items,
        );
        const filteredFxList = filterAudioFiles(
          settingsStore.explorers.fx.items,
        );

        playlistsStore.setPlaylistForMusic(filteredMusicList);
        playlistsStore.setPlaylistForFx(filteredFxList);

        if (filteredMusicList.length > 0) {
          playlistsStore.setCurrentMusic(playlistsStore.musicPlaylist[0]);
        }

        if (filteredFxList.length > 0) {
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
        <Stack.Navigator initialRouteName={SCREENS.Main} headerMode="none">
          <Stack.Screen name={SCREENS.Main} component={Main} />
          <Stack.Screen
            name={SCREENS.Settings}
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
