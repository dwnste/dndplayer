# dndplayer ![Build Status](https://github.com/dwnste/dndplayer/workflows/DnD%20Player/badge.svg)

It is a dead simple audio player which allows you to play two tracks at the same time. One of these tracks is supposed to be an FX, so it plays repeatedly and the only parameter can be adjusted here is a volume level. Besides, there is a basic audio player functionality which can be applied for a second track.

For now (and I guess it's going to stay so) it is android only.

## Where to download an .apk

There are multiple versions available under [Releases](https://github.com/dwnste/dndplayer/releases) section.

## How to debug

Use `yarn start` to run Metro bundler and `yarn android` to build the app and run an emulator

## How to build .APK/.AAB

1. Generate [an upload key](https://reactnative.dev/docs/signed-apk-android#generating-an-upload-key)
2. Edit `./android/gradle.properties`
3. And that's basically it, now just run `yarn bundle:android` or `yarn build:android` for `.aab` and `.apk` respectively

Bootstrapped with [React Native Typescript template](https://github.com/react-native-community/react-native-template-typescript)  
Icons are [Material Icons](https://material.io/resources/icons/?style=baseline)
