package com.catchme;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.azendoo.reactnativesnackbar.SnackbarPackage;
import com.airbnb.android.react.maps.MapsPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.azendoo.reactnativesnackbar.SnackbarPackage;


import com.AlexanderZaytsev.RNI18n.RNI18nPackage;

import co.apptailor.googlesignin.RNGoogleSigninPackage;

import com.airbnb.android.react.maps.MapsPackage;
import com.imagepicker.ImagePickerPackage;


import com.magus.fblogin.FacebookLoginPackage;

import com.horcrux.svg.SvgPackage;
import com.reactnativenavigation.NavigationApplication;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;


import com.oblador.vectoricons.VectorIconsPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

    private final _ReactNativeHost mReactNativeHost = new _ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new SnackbarPackage(),
                    new RNGoogleSigninPackage(),
                    new MapsPackage(),
                    new RNI18nPackage(),
                    new ImagePickerPackage(),
                    new FacebookLoginPackage(),
                    new SvgPackage(),
                    new RCTCameraPackage(),
                    new ReactNativeContacts(),
                    new RealmReactPackage(),
                    new VectorIconsPackage(),
                    new RNFetchBlobPackage()
            );
        }
    };

    @Override
    public _ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, false);
    }


    static abstract class _ReactNativeHost extends ReactNativeHost {
        _ReactNativeHost(Application application) {
            super(application);
        }

        List<ReactPackage> _getPackages() {
            return this.getPackages();
        }
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return this.getReactNativeHost()._getPackages();
    }

    @Override
    public boolean isDebug() {
        // Make sure you are using BuildConfig from your own application
        return BuildConfig.DEBUG;
    }

}
