/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';
import {poolConnect, CACHE_MAP_ID_USER_PROFILES, CACHE_ID_USER_PROFILE} from '../../redux/ReduxPool';
import {NullableObjects} from "../../comp/Misc";
import UserProfile from './UserProfile';
import DaoUser from "../../lib/daos/DaoUser";

// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class ScreenUserProfilePresentational extends React.Component {

  componentWillMount() {

    // Initialize the logged in user profile
    this.props[CACHE_ID_USER_PROFILE].initialize();

    // Initialize the profile of the user that is being viewed
    this.props[CACHE_MAP_ID_USER_PROFILES].initializeItem(this.props.userId);
        //.then(userProfile => this.navigator.setTitle({title: DaoUser.gName(userProfile)}))

  }

  _authenticatedUserProfile() {
    return this.props[CACHE_ID_USER_PROFILE].data;
  }

  _userProfile() {
    if (this.props.userId === DaoUser.gId(this._authenticatedUserProfile()))
      return this._authenticatedUserProfile();

    return this.props[CACHE_MAP_ID_USER_PROFILES].get(this.props.userId);
  }

  render() {
    return (
        <NullableObjects
            objects={[this._userProfile(), this._authenticatedUserProfile()]}
            renderChild={([userProfile, authenticatedUserProfile]) => (
                <UserProfile
                    navigator={this.props.navigator}
                    userProfile={userProfile}
                    authenticatedUserProfile={authenticatedUserProfile}/>
            )}/>
    );
  }

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const ScreenUserProfile = poolConnect(
    // Presentational Component
    ScreenUserProfilePresentational,

    // mapStateToProps
    (state) => ({}),

    // mapDispatchToProps
    (dispatch) => ({}),

    // Array of pools to subscribe to
    [CACHE_MAP_ID_USER_PROFILES, CACHE_ID_USER_PROFILE]
);
export default ScreenUserProfile;

ScreenUserProfile.propTypes = {
  userId: PropTypes.number.isRequired
};