/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {Navigation} from 'react-native-navigation';

import {Colors, Const} from './Config';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import ReduxReducer from './redux/Reducers';

import ScreenLogin from './screens/login/ScreenLogin';
import ScreenRegister from './screens/register/ScreenRegister';
import ScreenRecoverPassword from './screens/settings/recover-password/ScreenRecoverPassword';

import firebase from './lib/data/Firebase';


export default function run() {

  const store = createStore(ReduxReducer, applyMiddleware(ReduxThunk, promiseMiddleware()));

  [

    {name: Const.NavigationComponents.ScreenLogin, getComponent: () => ScreenLogin},
    {name: Const.NavigationComponents.ScreenRegister, getComponent: () => ScreenRegister},
    {name: Const.NavigationComponents.ScreenRecoverPassword, getComponent: () => ScreenRecoverPassword},

  ].map(route => Navigation.registerComponent(route.name, route.getComponent, store, Provider));


  Navigation.startSingleScreenApp({
    screen: {
      screen: Const.NavigationComponents.ScreenLogin,
      navigatorStyle: {
        navBarHidden: true
      }
    },
    appStyle: {
      statusBarColor: Colors.primary,
      screenBackgroundColor: Colors.background
    },
  });

}