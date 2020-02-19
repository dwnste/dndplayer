import React, {useState, useEffect, useLayoutEffect} from 'react';
import {SafeAreaView, View, StyleSheet, Button} from 'react-native';
import {useObserver} from 'mobx-react-lite';

import Folder from './components/Folder';
import ExplorerModal from './components/ExplorerModal';

import {useStores} from '../../hooks';

import {requestExternalStorageReading} from '../../utils/permissions';

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
  const {settingsStore} = useStores();

  useEffect(() => {
    const init = async () => {
      const granted = await requestExternalStorageReading();

      if (!granted) {
        navigation.navigate(SCREENS.main);
      }
    };

    init();
  });

  useLayoutEffect(() => {
    const init = async () => {
      settingsStore.setLoading(true);

      try {
        await settingsStore.setPaths();
      } catch {}

      settingsStore.setLoading(false);
    };

    init();

    return () => {
      settingsStore.reset();
    };
  }, [settingsStore]);

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

  const renderContent = () => {
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
          setDir={i => {
            settingsStore.setFXDir(i);
            toggleFxModal();
          }}
          openDir={handleOpenFXDir}
          items={settingsStore.explorers.fx.items}
        />
        <ExplorerModal
          visible={musicModalVisible}
          toggle={toggleMusicModal}
          setDir={i => {
            settingsStore.setMusicDir(i);
            toggleMusicModal();
          }}
          openDir={handleOpenMusicDir}
          items={settingsStore.explorers.music.items}
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
