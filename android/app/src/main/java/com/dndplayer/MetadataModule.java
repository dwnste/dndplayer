package com.dndplayer;

import android.media.MediaMetadataRetriever;
import android.net.Uri;
import android.util.Base64;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

public class MetadataModule extends ReactContextBaseJavaModule {
  private static ReactApplicationContext reactContext;

  MetadataModule(ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }

  @Override
  public String getName() {
    return "MetadataModule";
  }

  private String getCoverAsBase64String(MediaMetadataRetriever metaRetriever) {
    byte[] coverAsBytes = metaRetriever.getEmbeddedPicture();

    if (coverAsBytes == null) {
      return "";
    }

    return Base64.encodeToString(coverAsBytes, Base64.NO_WRAP);
  }

  @ReactMethod
  public void get(
    String path,
    Promise promise) {
      Uri parsedPath = Uri.parse(path);

      MediaMetadataRetriever metaRetriever = new MediaMetadataRetriever();
      metaRetriever.setDataSource(getReactApplicationContext(), parsedPath);

      String album = metaRetriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_ALBUM);
      String artist = metaRetriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_ARTIST);
      String cover = getCoverAsBase64String(metaRetriever);
      String title = metaRetriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_TITLE);

      WritableMap map = Arguments.createMap();

      map.putString("album", album);
      map.putString("artist", artist);
      map.putString("cover", cover);
      map.putString("title", title);

      promise.resolve(map);
  }
}
