import React, {useState} from 'react';
import {SafeAreaView, View, StyleSheet, Button} from 'react-native';
import {useObserver} from 'mobx-react-lite';

import Folder from './components/Folder';
import ExplorerModal from './components/ExplorerModal';

import {useStores} from '../../hooks';

import {filterAudioFiles} from '../../utils/filesfilter';
import {list} from '../../utils/filesystem';

import {SCREENS} from '../../consts/screens';

import {ExternalStorageDirectoryPath, ReadDirItem} from 'react-native-fs';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../../App';

type SettingsScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'Settings'
>;

type SettingsProps = {
  navigation: SettingsScreenNavigationProp;
};

const Settings = ({navigation}: SettingsProps) => {
  const {settingsStore, playlistsStore} = useStores();

  const [fxModalVisible, setFxModalVisible] = useState(false);
  const [musicModalVisible, setMusicModalVisible] = useState(false);

  const toggleFxModal = (): void => {
    settingsStore.updateFXExplorer(
      settingsStore.explorers.fx.path || ExternalStorageDirectoryPath,
    );
    setFxModalVisible(!fxModalVisible);
  };

  const toggleMusicModal = (): void => {
    settingsStore.updateMusicExplorer(
      settingsStore.explorers.music.path || ExternalStorageDirectoryPath,
    );
    setMusicModalVisible(!musicModalVisible);
  };

  const handleOpenFXDir = (item: ReadDirItem): void => {
    if (!item.isDirectory()) {
      return;
    }

    settingsStore.updateFXExplorer(item.path);
  };

  const handleOpenMusicDir = (item: ReadDirItem): void => {
    if (!item.isDirectory()) {
      return;
    }

    settingsStore.updateMusicExplorer(item.path);
  };

  const handlePressBackForMusicDir = (): void => {
    const {path} = settingsStore.explorers.music;

    if (path === ExternalStorageDirectoryPath) {
      return;
    }

    settingsStore.updateMusicExplorer(path.slice(0, path.lastIndexOf('/')));
  };

  const handlePressBackForFxDir = (): void => {
    const {path} = settingsStore.explorers.fx;

    if (path === ExternalStorageDirectoryPath) {
      return;
    }

    settingsStore.updateFXExplorer(path.slice(0, path.lastIndexOf('/')));
  };

  const setFxDir = async (item: ReadDirItem): Promise<void> => {
    try {
      await settingsStore.setFXDir(item);

      const filteredFxList = filterAudioFiles(
        await list(settingsStore.paths.fx),
      );
      playlistsStore.setPlaylistForFx(filteredFxList);

      const currentTrack =
        filteredFxList.length > 0 ? playlistsStore.fxPlaylist[0] : null;
      playlistsStore.setCurrentFx(currentTrack);
    } catch {}

    toggleFxModal();
  };

  const setMusicDir = async (item: ReadDirItem): Promise<void> => {
    try {
      await settingsStore.setMusicDir(item);

      const filteredMusicList = filterAudioFiles(
        await list(settingsStore.paths.music),
      );

      playlistsStore.setPlaylistForMusic(filteredMusicList);

      const currentTrack =
        filteredMusicList.length > 0 ? playlistsStore.musicPlaylist[0] : null;

      playlistsStore.setCurrentMusic(currentTrack);
    } catch {}

    toggleMusicModal();
  };

  const goToMain = (): void => {
    navigation.navigate(SCREENS.Main);
  };

  const renderContent = (): JSX.Element | null => {
    if (settingsStore.loading) {
      return null;
    }

    return (
      <SafeAreaView style={styles.wrap}>
        <View style={styles.itemWrap}>
          <View style={styles.menuWrap}>
            <Folder
              name="FX folder"
              path={settingsStore.paths.fx}
              onPress={toggleFxModal}
            />
            <Folder
              name="Music folder"
              path={settingsStore.paths.music}
              onPress={toggleMusicModal}
            />
          </View>
          <Button title="Back" onPress={goToMain} />
        </View>
        <ExplorerModal
          visible={fxModalVisible}
          toggle={toggleFxModal}
          setDir={setFxDir}
          openDir={handleOpenFXDir}
          items={settingsStore.explorers.fx.items}
          onPressBack={handlePressBackForFxDir}
        />
        <ExplorerModal
          visible={musicModalVisible}
          toggle={toggleMusicModal}
          setDir={setMusicDir}
          openDir={handleOpenMusicDir}
          items={settingsStore.explorers.music.items}
          onPressBack={handlePressBackForMusicDir}
        />
      </SafeAreaView>
    );
  };

  return useObserver(() => renderContent());
};

const styles = StyleSheet.create({
  menuWrap: {
    flexGrow: 1,
  },
  wrap: {
    flex: 1,
    padding: 20,
  },
  item: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  itemWrap: {
    flex: 1,
    marginTop: 15,
  },
});

export default Settings;
