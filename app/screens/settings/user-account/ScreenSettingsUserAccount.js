/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';
import {poolConnect, CACHE_MAP_ID_USER_PROFILES, CACHE_ID_USER_PROFILE} from '../../../redux/ReduxPool';
import {NullableObjects} from "../../../comp/Misc";
import SettingsUserAccount from './SettingsUserAccount';
import DaoUser from "../../../lib/daos/DaoUser";

// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class ScreenSettingsUserAccountPresentational extends React.Component {

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
            renderChild={([authenticatedUserProfile]) => (
                <SettingsUserAccount
                    navigator={this.props.navigator}
                    authenticatedUserProfile={authenticatedUserProfile}/>
            )}/>
    );
  }

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const ScreenSettingsUserAccount = poolConnect(
    // Presentational Component
    ScreenSettingsUserAccountPresentational,

    // mapStateToProps
    (state) => ({}),

    // mapDispatchToProps
    (dispatch) => ({}),

    // Array of pools to subscribe to
    [CACHE_ID_USER_PROFILE]
);
export default ScreenSettingsUserAccount;

ScreenSettingsUserAccount.propTypes = {
  // Nothing for now
};