/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {poolConnect, CACHE_ID_USER_PROFILE} from '../../../redux/ReduxPool';
import {NullableObjects} from "../../../comp/Misc";
import SettingsUserAdminLocations from './SettingsUserAdminLocations';

// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class ScreenSettingsAdminLocationsPresentational extends React.Component {

  componentWillMount() {
    this.props[CACHE_ID_USER_PROFILE].initialize();
  }

  _authenticatedUserProfile() {
    return this.props[CACHE_ID_USER_PROFILE].data;
  }

  render() {
    return (
        <NullableObjects
            objects={[this._authenticatedUserProfile()]}
            renderChild={([userProfile]) => (
                <SettingsUserAdminLocations
                    navigator={this.props.navigator}
                    userProfile={userProfile}/>
            )}/>
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