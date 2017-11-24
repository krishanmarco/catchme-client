/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';
import {poolConnect, CACHE_ID_USER_PROFILE, FORM_API_ID_EDIT_USER_PROFILE} from '../../../redux/ReduxPool';
import {NullableObjects} from "../../../comp/Misc";
import SettingsUserNotifications from './SettingsUserNotifications';
import DaoUser from "../../../lib/daos/DaoUser";

// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class ScreenSettingsUserNotificationsPresentational extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.onSettingNotificationsChanged = this.onSettingNotificationsChanged.bind(this);
  }

  componentWillMount() {
    // Fetch the authenticated users profile and then set
    // the users profile data into the user-profile form handler
    this._cacheUserProfile().initialize()
        .then(() => this._formApiEditUserProfile().change(this._cacheUserProfile().data));
  }



  _cacheUserProfile() {
    return this.props[CACHE_ID_USER_PROFILE];
  }

  _formApiEditUserProfile() {
    return this.props[FORM_API_ID_EDIT_USER_PROFILE];
  }


  onSettingNotificationsChanged(settingNotificationString) {
    // Change the value in the form handler
    this._formApiEditUserProfile().change({
      [DaoUser.pSettingNotifications]: settingNotificationString
    });

    // Post the updated form
    this._formApiEditUserProfile().post();
  }

  render() {
    return (
        <NullableObjects
            objects={[this._formApiEditUserProfile().apiInput]}
            renderChild={([userProfileFormData]) => (
                <SettingsUserNotifications
                    navigator={this.props.navigator}
                    onSettingNotificationsChanged={this.onSettingNotificationsChanged}
                    authenticatedUserProfile={userProfileFormData}/>
            )}/>
    );
  }

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const ScreenSettingsUserNotifications = poolConnect(
    // Presentational Component
    ScreenSettingsUserNotificationsPresentational,

    // mapStateToProps
    (state) => ({}),

    // mapDispatchToProps
    (dispatch) => ({}),

    // Array of pools to subscribe to
    [CACHE_ID_USER_PROFILE, FORM_API_ID_EDIT_USER_PROFILE]
);
export default ScreenSettingsUserNotifications;

ScreenSettingsUserNotifications.propTypes = {
  // Nothing for now
};