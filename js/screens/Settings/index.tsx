import React, {useState} from 'react';
import {SafeAreaView, View, StyleSheet, Button} from 'react-native';
import {useObserver} from 'mobx-react-lite';

import Folder from './components/Folder';
import ExplorerModal from './components/ExplorerModal';

import {useStores} from '../../hooks';

import {ExternalStorageDirectoryPath, ReadDirItem} from 'react-native-fs';

import {SCREENS} from '../../consts/screens';

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
  const {settingsStore} = useStores();

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

  const handleSetDir = (i: ReadDirItem) => {
    settingsStore.setMusicDir(i);
  };

  return useObserver(() => (
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
        <Button
          title="Back"
          onPress={() => {
            navigation.navigate(SCREENS.main);
          }}
        />
      </View>
      <ExplorerModal
        visible={fxModalVisible}
        toggle={toggleFxModal}
        setDir={handleSetDir}
        openDir={handleOpenFXDir}
        items={settingsStore.explorers.fx.items}
      />
      <ExplorerModal
        visible={musicModalVisible}
        toggle={toggleMusicModal}
        setDir={settingsStore.setMusicDir}
        openDir={handleOpenMusicDir}
        items={settingsStore.explorers.music.items}
      />
    </SafeAreaView>
  ));
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
