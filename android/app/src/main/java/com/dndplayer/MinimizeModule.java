package com.dndplayer;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class MinimizeModule extends ReactContextBaseJavaModule {
  private static ReactApplicationContext reactContext;

  MinimizeModule(ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }

  @Override
  public String getName() {
    return "MinimizeModule";
  }

  @ReactMethod
  void minimizeApp() {
    getCurrentActivity().moveTaskToBack(true);
  }
}
