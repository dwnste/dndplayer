import AsyncStorage from '@react-native-community/async-storage';

const set = async (
  key: string,
  value: string,
  errHandler?: Function,
): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    if (!errHandler) {
      return;
    }

    errHandler(e);
  }
};

const get = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    return null;
  }
};

export {get, set};
