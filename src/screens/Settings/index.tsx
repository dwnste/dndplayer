/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
} from 'react-native';

import RNFS from 'react-native-fs';

interface SettingsState {
  folders: RNFS.ReadDirItem[];
}

class Settings extends React.Component<SettingsState> {
  state: SettingsState = {
    folders: [],
  };

  componentDidMount = async () => {
    await this.askForPermissions();

    RNFS.readDir(RNFS.ExternalStorageDirectoryPath)
      .then(result =>
        this.setState({
          folders: result,
        }),
      )
      .catch(error => console.log(error));
  };

  askForPermissions = async () => {
    const { navigation } = this.props;

    const request = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );

    const isGranted = request === PermissionsAndroid.RESULTS.GRANTED;

    if (isGranted) {
      return;
    }

    navigation.navigate('Main');
  };

  renderFolders = (): React.ReactNode =>
    this.state.folders.map(folder => (
      <View key={folder.name}>
        <Text>{folder.name}</Text>
      </View>
    ));

  render(): React.ReactNode {
    const folders = this.renderFolders();

    return <SafeAreaView>{folders}</SafeAreaView>;
  }
}

const styles = StyleSheet.create({});

export default Settings;
