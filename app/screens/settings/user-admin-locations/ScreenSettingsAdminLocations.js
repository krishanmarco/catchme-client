/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import SettingsUserAdminLocations from './SettingsUserAdminLocations';
import {CACHE_ID_USER_PROFILE, poolConnect} from '../../../redux/ReduxPool';
import {NullableObjects, Screen} from "../../../comp/Misc";
import type {TNavigator} from "../../../lib/types/Types";

// Flow *************************************************************************************************
// Flow *************************************************************************************************

type Props = {
  navigator: TNavigator
}

// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class ScreenSettingsAdminLocationsPresentational extends React.Component<any, Props, any> {

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
              renderChild={([userProfile]) => (
                  <SettingsUserAdminLocations
                      navigator={this.props.navigator}
                      userProfile={userProfile}/>
              )}/>
        </Screen>
    );
  }

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const ScreenSettingsAdminLocations = poolConnect(
    // Presentational Component
    ScreenSettingsAdminLocationsPresentational,

    // mapStateToProps
    (state) => ({}),

    // mapDispatchToProps
    (dispatch) => ({}),

    // Array of pools to subscribe to
    [CACHE_ID_USER_PROFILE]
);
export default ScreenSettingsAdminLocations;

ScreenSettingsAdminLocations.propTypes = {
  // Nothing for now
};