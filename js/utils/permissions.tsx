import {PermissionsAndroid} from 'react-native';

const requestExternalStorageReading = async (): Promise<boolean> => {
  const request = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  );

  const granted = request === PermissionsAndroid.RESULTS.GRANTED;
  return granted;
};

export {requestExternalStorageReading};
