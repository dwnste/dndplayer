import React, {useState, useCallback} from 'react';
import {BackHandler, StyleSheet, View} from 'react-native';
import {useFocusEffect, useNavigationState} from '@react-navigation/native';

import minimizeModule from '../../modules/minimize';

import IconButton from '../../components/IconButton';
import Player from '../../components/Player';
import Slider from '../../components/Slider';
import Modal from '../../components/Modal';
import Playlist from '../../components/Playlist';
import Info from '../../components/Info';

import {Settings} from '../../components/Icons';

import {useStores} from '../../hooks';
import {useObserver} from 'mobx-react-lite';

import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../../App';
import {AudioFile} from '../../types';

import {SCREENS} from '../../consts/screens';
import {COLORS} from '../../consts/colors';
import Cover from '../../components/Cover';

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

  const routesLength = useNavigationState(({routes: {length}}) => length);
  const isOnlyRoute = routesLength === 1;

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (isOnlyRoute) {
          minimizeModule.minimizeApp();
          return true;
        }

        return false;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [isOnlyRoute]),
  );

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

  const onSelectMusicFromPlaylist = (item: AudioFile): void => {
    const isCurrentTrack = playlistsStore.currentMusic?.path === item.path;

    if (isCurrentTrack) {
      toggle();
      return;
    }

    playlistsStore.setCurrentMusic(item);

    if (!paused) {
      return;
    }

    toggle();
  };

  const onSelectFxFromPlaylist = (item: AudioFile): void => {
    const isCurrentFx = playlistsStore.currentFx?.path === item.path;

    if (isCurrentFx) {
      toggleFx();
      return;
    }

    playlistsStore.setCurrentFx(item);

    if (!fxPaused) {
      return;
    }

    toggleFx();
  };

  return useObserver(() => (
    <View style={styles.wrap}>
      <Cover file={playlistsStore.currentMusic} wrapStyles={styles.coverWrap}>
        <View style={styles.iconWrap}>
          <IconButton onPress={goToSettings}>
            <Settings width={60} height={60} color={COLORS.icon} />
          </IconButton>
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
          <Info file={playlistsStore.currentMusic} />
        </View>
      </Cover>
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
    backgroundColor: COLORS.background,
  },
  coverWrap: {
    position: 'relative',
    flex: 1,
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
});

export default Main;
