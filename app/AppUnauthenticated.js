/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import promiseMiddleware from 'redux-promise-middleware';
import React from 'react';

import ReduxReducer from './redux/Reducers';

import ReduxThunk from 'redux-thunk';
import ScreenLogin from './screens/login/ScreenLogin';
import ScreenRecoverPassword from './screens/settings/recover-password/ScreenRecoverPassword';
import ScreenRegister from './screens/register/ScreenRegister';
import {applyMiddleware, createStore} from 'redux';

import {Colors, Const} from './Config';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';


export default function run() {

  const store = createStore(ReduxReducer, applyMiddleware(ReduxThunk, promiseMiddleware()));

  [

    {name: Screens.ScreenLogin, getComponent: () => ScreenLogin},
    {name: Screens.ScreenRegister, getComponent: () => ScreenRegister},
    {name: Screens.ScreenRecoverPassword, getComponent: () => ScreenRecoverPassword},

  ].map(route => Navigation.registerComponent(route.name, route.getComponent, store, Provider));


  Navigation.startSingleScreenApp({
    screen: {
      screen: Screens.ScreenLogin,
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