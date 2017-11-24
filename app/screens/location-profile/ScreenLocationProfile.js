/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';
import {poolConnect, CACHE_MAP_ID_LOCATION_PROFILES, CACHE_ID_USER_PROFILE} from '../../redux/ReduxPool';
import ApiClient from '../../lib/data/ApiClient';
import {NullableObjects} from '../../comp/Misc';
import LocationProfile from './LocationProfile';
import DaoLocation from "../../lib/daos/DaoLocation";
import DaoUser from "../../lib/daos/DaoUser";
import Router from "../../lib/helpers/Router";

// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class ScreenLocationProfilePresentational extends React.Component {

  static NAV_BUTTON_USER_LOCATION_STATUS = {
    id: 'NAV_BUTTON_ID_USER_LOCATION_STATUS',
    icon: require('../../assets/images/screenLoginBackground.png'),
    buttonFontSize: 14,
    buttonFontWeight: '600',
  };

  static NAV_BUTTON_FOLLOW_LOCATION = {
    id: 'NAV_BUTTON_ID_FOLLOW_LOCATION',
    icon: require('../../assets/images/screenLoginBackground.png'),
    buttonFontSize: 14,
    buttonFontWeight: '600',
  };

  constructor(props, context) {
    super(props, context);
    this._initializeNavigatorButtons();
    this._navigator().setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
  }





  _initializeNavigatorButtons() {
    const rightButtons = [];

    const favoriteIds = DaoUser.gLocationFavoriteIds(this._authenticatedUserProfile());
    if (!favoriteIds.includes(DaoLocation.gId(this._locationProfile())))
      rightButtons.push(ScreenLocationProfilePresentational.NAV_BUTTON_FOLLOW_LOCATION);

    rightButtons.push(ScreenLocationProfilePresentational.NAV_BUTTON_USER_LOCATION_STATUS);

    this._navigator().setButtons({rightButtons: rightButtons});
  }




  _onNavigatorEvent(event) {
    if (event.type !== 'NavBarButtonPress')
      return;

    if (event.id === ScreenLocationProfilePresentational.NAV_BUTTON_USER_LOCATION_STATUS.id) {
      Router.toModalUserLocationStatus(this._navigator(), {
        location: this._locationProfile(),
        onStatusConfirm: (status) => {console.log(status);},
      });
      return;
    }

    if (event.id === ScreenLocationProfilePresentational.NAV_BUTTON_FOLLOW_LOCATION.id) {
      ApiClient.userLocationsFavoritesAdd(DaoLocation.gId(this._locationProfile()));
      DaoUser.addLocationToFavorites(this._authenticatedUserProfile(), this._locationProfile());
      this._initializeNavigatorButtons();
      return;
    }

  }


  componentWillMount() {

    this.props[CACHE_ID_USER_PROFILE].initialize();

    this.props[CACHE_MAP_ID_LOCATION_PROFILES].initializeItem(this.props.locationId)
      .then(({value}) => this._navigator().setTitle({title: DaoLocation.gName(value)}));

  }


  _navigator() {
    return this.props.navigator;
  }

  _authenticatedUserProfile() {
    return this.props[CACHE_ID_USER_PROFILE].data;
  }

  _locationProfile() {
    return this.props[CACHE_MAP_ID_LOCATION_PROFILES].get(this.props.locationId);
  }


  render() {
    return (
        <NullableObjects
            objects={[this._locationProfile(), this._authenticatedUserProfile()]}
            renderChild={([locationProfile, authenticatedUserProfile]) => (
                <LocationProfile
                    navigator={this._navigator()}
                    locationProfile={locationProfile}
                    authenticatedUserProfile={authenticatedUserProfile}/>
            )}/>
    );
  }

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const ScreenLocationProfile = poolConnect(
    // Presentational Component
    ScreenLocationProfilePresentational,

    // mapStateToProps
    (state) => ({}),

    // mapDispatchToProps
    (dispatch) => ({}),

    // Array of pools to subscribe to
    [CACHE_MAP_ID_LOCATION_PROFILES, CACHE_ID_USER_PROFILE]
);
export default ScreenLocationProfile;


ScreenLocationProfile.propTypes = {
  locationId: PropTypes.number.isRequired,
};