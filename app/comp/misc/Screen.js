/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 18/01/18 © **/
import Logger from '../../lib/Logger';
import React from 'react';
import {bindActionCreators} from 'redux';
import {Colors, Icons} from '../../Config';
import {connect} from 'react-redux';
import {Dimensions, KeyboardAvoidingView, NetInfo, StyleSheet, View} from 'react-native';
import {ScreenInfo, Touchable} from '../Misc';
import {t} from '../../lib/i18n/Translations';
import type {TNavigator} from '../../lib/types/Types';


// Const **********************************************************************************************
// Const **********************************************************************************************

type Props = {
  navigator: TNavigator,
  style: ?Object,
  children: Node,
  requireOnline: boolean,

  // Redux stateProps
  disablePointerEvents: boolean,
  isOnline: boolean,
  setOnlineStatus: Function
};

type State = {
  // Nothing for now
};

const defaultProps = {
  requireOnline: true
};

// Redux ************************************************************************************************
// Redux ************************************************************************************************

const ACTION_SET_DISABLE_POINTER_EVENTS = 'ACTION_SET_DISABLE_POINTER_EVENTS';
const ACTION_SET_ONLINE_STATUS = 'ACTION_SET_ONLINE_STATUS';

const screenInitState = {
  disablePointerEvents: false,
  isOnline: true
};

export function screenReducer(state = screenInitState, action) {
  switch (action.type) {

    case ACTION_SET_DISABLE_POINTER_EVENTS:
      return Object.assign({}, state, {
        disablePointerEvents: action.disablePointerEvents
      });

    case ACTION_SET_ONLINE_STATUS:
      return Object.assign({}, state, {
        isOnline: action.isOnline
      });
  }
  return state;
}

function screenSetDisablePointerEvents(disablePointerEvents: boolean) {
  return (dispatch) => {
    Logger.v(`Screen screenSetDisablePointerEvents: disablePointerEvents=${disablePointerEvents}`);
    dispatch({type: ACTION_SET_DISABLE_POINTER_EVENTS, disablePointerEvents});
  };
}

export function screenDisablePointerEvents() {
  return screenSetDisablePointerEvents(true);
}

export function screenEnablePointerEvents() {
  return screenSetDisablePointerEvents(false);
}

export function screenSetOnlineStatus(isOnline: boolean) {
  return {
    type: ACTION_SET_ONLINE_STATUS,
    isOnline
  };
}

// Screen ***********************************************************************************************
// Screen ***********************************************************************************************

class Screen extends React.PureComponent<void, Props, State> {
  static defaultProps = defaultProps;

  constructor(props, context) {
    super(props, context);
    this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
  }

  componentDidMount() {
    NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange(connectionInfo) {
    const {setOnlineStatus} = this.props;
    setOnlineStatus(connectionInfo.type != 'none' && connectionInfo.type != 'unknown');
  }

  render() {
    const {style, disablePointerEvents, requireOnline, isOnline, children} = this.props;
    const {width, height} = Dimensions.get('window');
    return (
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behaviour='padding'>
        <View
          style={[{width, height}, styles.screen, style]}
          pointerEvents={disablePointerEvents ? 'none' : 'auto'}>
          {(isOnline || !requireOnline) ? children : this._renderNoConnection()}
        </View>
      </KeyboardAvoidingView>
    );
  }

  _renderNoConnection() {
    return (
      <ScreenInfo
        textText={t('t_no_wifi')}
        imageSource={require('../../assets/images/no-wifi.png')}/>
    );
  }

}

export default connect(
  // mapStateToProps
  (state) => state.screenReducer,

  // mapDispatchToProps
  (dispatch) => ({
    setOnlineStatus: bindActionCreators(screenSetOnlineStatus, dispatch)
  })
)(Screen);


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1
  },
  screen: {
    flex: 1,
    backgroundColor: Colors.background
  }
});
