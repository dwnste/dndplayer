import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import IconButton from '../../components/IconButton';
import Player from '../../components/Player';
import Slider from '../../components/Slider';
import Modal from '../../components/Modal';
import Playlist from '../../components/Playlist';

import {useStores} from '../../hooks';
import {useObserver} from 'mobx-react-lite';

import {StackNavigationProp} from '@react-navigation/stack';
import {ReadDirItem} from 'react-native-fs';
import {StackParamList} from '../../App';

import {SCREENS} from '../../consts/screens';

const settingsIcon = require('./icon.png');

type MainScreenNavigationProp = StackNavigationProp<StackParamList, 'Main'>;

type MainProps = {
  navigation: MainScreenNavigationProp;
};

const Main = ({navigation}: MainProps): JSX.Element => {
  const {playlistsStore} = useStores();

  const [repeat, setRepeat] = useState(false);
  const [paused, setPaused] = useState(true);
  const [fxPaused, setFxPaused] = useState(true);
  const [musicVolume, setMusicVolume] = useState(1);
  const [fxVolume, setFxVolume] = useState(1);
  const [musicPlaylistVisible, setMusicPlaylistVisible] = useState(false);
  const [fxPlaylistVisible, setFXPlaylistVisible] = useState(false);

  const toggle = (): void => {
    if (!playlistsStore.currentMusic) {
      return;
    }

    setPaused(!paused);
  };

  const toggleFx = (): void => {
    if (!playlistsStore.currentFx) {
      return;
    }

    setFxPaused(!fxPaused);
  };

  const onNext = (): void => {
    playlistsStore.nextMusic();
  };

  const onPrevious = (): void => {
    playlistsStore.previousMusic();
  };

  const onToggleRepeat = (): void => {
    setRepeat(!repeat);
  };

  const goToSettings = (): void => {
    navigation.navigate(SCREENS.Settings);
  };

  const onToggleMusicPlaylist = (): void => {
    setMusicPlaylistVisible(!musicPlaylistVisible);
  };

  const onToggleFxPlaylist = (): void => {
    setFXPlaylistVisible(!fxPlaylistVisible);
  };

  const onSelectMusicFromPlaylist = (item: ReadDirItem): void => {
    playlistsStore.setCurrentMusic(item);
  };

  const onSelectFxFromPlaylist = (item: ReadDirItem): void => {
    playlistsStore.setCurrentFx(item);
  };

  return useObserver(() => (
    <View style={styles.wrap}>
      <View style={styles.iconWrap}>
        <IconButton
          iconStyle={styles.iconStyle}
          imgSource={settingsIcon}
          onPress={goToSettings}
        />
      </View>
      <View style={styles.playersWrap}>
        <Player
          repeat
          bubbleUi
          file={playlistsStore.currentFx}
          paused={fxPaused}
          toggle={toggleFx}
          volume={fxVolume}
          onTogglePlaylist={onToggleFxPlaylist}
        />
        <View style={styles.volumeWrap}>
          {/* TODO: Add `mute` button */}
          <Slider onChange={setFxVolume} />
          <Slider onChange={setMusicVolume} />
        </View>
        <Player
          ui
          repeat={repeat}
          file={playlistsStore.currentMusic}
          paused={paused}
          toggle={toggle}
          volume={musicVolume}
          onNext={onNext}
          onPrevious={onPrevious}
          onEnd={onNext}
          onToggleRepeat={onToggleRepeat}
          onTogglePlaylist={onToggleMusicPlaylist}
        />
      </View>
      <Modal visible={musicPlaylistVisible} onClose={onToggleMusicPlaylist}>
        <Playlist
          list={playlistsStore.musicPlaylist}
          currentItem={playlistsStore.currentMusic}
          onSelect={onSelectMusicFromPlaylist}
        />
      </Modal>
      <Modal visible={fxPlaylistVisible} onClose={onToggleFxPlaylist}>
        <Playlist
          list={playlistsStore.fxPlaylist}
          currentItem={playlistsStore.currentFx}
          onSelect={onSelectFxFromPlaylist}
        />
      </Modal>
    </View>
  ));
};

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#fff',
  },
  volumeWrap: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexGrow: 1,
  },
  playersWrap: {
    flex: 1,
    paddingTop: 40,
  },
  iconWrap: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 2,
  },
  iconStyle: {
    width: 75,
    height: 75,
  },
});

export default Main;
