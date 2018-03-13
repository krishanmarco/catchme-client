/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import Logout from './Logout';
import React from 'react';
import {CACHE_ID_USER_PROFILE, poolConnect} from '../../../redux/ReduxPool';
import {NullableObjects, Screen} from "../../../comp/Misc";

// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class ScreenLogoutPresentational extends React.Component {

  componentWillMount() {
    this.props[CACHE_ID_USER_PROFILE].initialize();
  }

  _authenticatedUserProfile() {
    return this.props[CACHE_ID_USER_PROFILE].data;
  }

  render() {
    return (
        <Screen>
          <NullableObjects
              objects={[this._authenticatedUserProfile()]}
              renderChild={([authenticatedUserProfile]) => (
                  <Logout
                      navigator={this.props.navigator}
                      authenticatedUserProfile={authenticatedUserProfile}/>
              )}/>
        </Screen>
    );
  }

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const ScreenLogout = poolConnect(
    // Presentational Component
    ScreenLogoutPresentational,

    // mapStateToProps
    (state) => ({}),

    // mapDispatchToProps
    (dispatch) => ({}),

    // Array of pools to subscribe to
    [CACHE_ID_USER_PROFILE]
);
export default ScreenLogout;

ScreenLogout.propTypes = {};