import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import IconButton from '../../components/IconButton';
import Player from '../../components/Player';
import Slider from '../../components/Slider';

import {useStores} from '../../hooks';
import {useObserver} from 'mobx-react-lite';

import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../../App';

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
    navigation.navigate('Settings');
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
        />
        <View style={styles.volumeWrap}>
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
        />
      </View>
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
