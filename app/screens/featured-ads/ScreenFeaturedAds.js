/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';
import {poolConnect, CACHE_MAP_ID_USER_PROFILES, CACHE_ID_USER_PROFILE} from '../../redux/ReduxPool';
import {NullableObjects} from "../../comp/Misc";
import UserProfile from './FeaturedAds';
import DaoUser from "../../lib/daos/DaoUser";

// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class ScreenFeaturedAdsPresentational extends React.Component {

  componentWillMount() {

    this.props[CACHE_ID_USER_PROFILE].initialize();

    this.props[CACHE_MAP_ID_USER_PROFILES].initializeItem(this.props.userId);
        //.then(userProfile => this.navigator.setTitle({title: DaoUser.gName(userProfile)}))

  }

  _userProfile() {
    return this.props[CACHE_MAP_ID_USER_PROFILES].get(this.props.userId);
  }

  _authenticatedUserProfile() {
    return this.props[CACHE_ID_USER_PROFILE].data;
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

const ScreenFeaturedAds = poolConnect(
    // Presentational Component
    ScreenFeaturedAdsPresentational,

    // mapStateToProps
    (state) => ({}),

    // mapDispatchToProps
    (dispatch) => ({}),

    // Array of pools to subscribe to
    [CACHE_MAP_ID_USER_PROFILES, CACHE_ID_USER_PROFILE]
);
export default ScreenFeaturedAds;

ScreenFeaturedAds.propTypes = {
  userId: PropTypes.number.isRequired
};