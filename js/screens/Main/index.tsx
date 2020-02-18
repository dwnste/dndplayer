import React, {useState} from 'react';
import {StyleSheet, ScrollView, View, Button} from 'react-native';

import SettingsButton from '../../components/SettingsButton';
import Player from '../../components/Player';

import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../../App';

type MainScreenNavigationProp = StackNavigationProp<StackParamList, 'Main'>;

type MainProps = {
  navigation: MainScreenNavigationProp;
};

const Main = ({navigation}: MainProps): JSX.Element => {
  const [paused, setPaused] = useState(true);

  const toggle = (): void => {
    setPaused(!paused);
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.iconWrap}>
        <SettingsButton onPress={() => navigation.navigate('Settings')} />
      </View>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Button title="Pause" onPress={toggle} />
        <Player paused={paused} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#fff',
  },
  iconWrap: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 2,
  },
});

export default Main;
