import React from 'react';
import {SafeAreaView, Text, View, PermissionsAndroid} from 'react-native';

import RNFS from 'react-native-fs';

import {SettingsServiceInterface} from '../../services/settings';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../../App';

type SettingsScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'Settings'
>;

type SettingsState = {
  folders: RNFS.ReadDirItem[];
};

type SettingsProps = {
  settingsService: SettingsServiceInterface;
  navigation: SettingsScreenNavigationProp;
};

class Settings extends React.Component<SettingsProps, SettingsState> {
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
    const {navigation} = this.props;

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

export default Settings;
