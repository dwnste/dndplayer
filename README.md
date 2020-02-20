# dndplayer

It is a dead simple audio player which allows you to play two tracks in the same time. One of these tracks is supposed to be an FX, so it plays repeatedly and the only parameter can be adjusted here is a volume level. Besides, there is a basic audio player functionality which can be applied for a second track.

For now (and I guess it's going to stay so) it is android only.

## How to debug

Use `yarn start` to run Metro bundler and `yarn android` to build the app and run an emulator

## How to build .APK/.AAB

1. Generate [an upload key](https://reactnative.dev/docs/signed-apk-android#generating-an-upload-key)
2. Use `dndplayer.keystore` as a filename and `dndplayer-key` as a key alias or edit `./android/gradle.properties`
3. Add your credentials to the keychain as shown [here](https://pilloxa.gitlab.io/posts/safer-passwords-in-gradle/) (OS X only)
4. Edit the username string in `pass` definition which is in `./android/app/build.gradle`
5. And that's basically it, now just run `yarn bundle:android` or `yarn build:android` for `.aab` and `.apk` respectively

Bootstrapped with [React Native Typescript template](https://github.com/react-native-community/react-native-template-typescript)

Icons are [Material Icons](https://material.io/resources/icons/?style=baseline)
