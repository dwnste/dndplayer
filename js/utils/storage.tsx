import AsyncStorage from '@react-native-community/async-storage';

const set = async (key: string, value: string): Promise<void> =>
  AsyncStorage.setItem(key, value);

const get = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    return null;
  }
};

export {get, set};
