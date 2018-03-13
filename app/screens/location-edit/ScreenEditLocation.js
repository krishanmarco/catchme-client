/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';
import {CACHE_ID_USER_PROFILE, CACHE_MAP_ID_LOCATION_PROFILES, poolConnect} from '../../redux/ReduxPool';
import {NullableObjects, Screen} from '../../comp/Misc';
import EditLocation from './EditLocation';
import DaoLocation from "../../lib/daos/DaoLocation";

// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class ScreenEditLocationPresentational extends React.Component {

  constructor(props, context) {
    super(props, context);
  }


  componentWillMount() {
    this.props[CACHE_ID_USER_PROFILE].initialize();

    this.props[CACHE_MAP_ID_LOCATION_PROFILES].initializeItem(this.props.locationId)
        .then(({value}) => this.props.navigator.setTitle({title: DaoLocation.gName(value)}));

  }

  _locationProfile() {
    return this.props[CACHE_MAP_ID_LOCATION_PROFILES].get(this.props.locationId);
  }

  _authenticatedUserProfile() {
    return this.props[CACHE_ID_USER_PROFILE].data;
  }

  render() {
    return (
        <Screen>
          <NullableObjects
              objects={[this._locationProfile(), this._authenticatedUserProfile()]}
              renderChild={([locationProfile, authenticatedUserProfile]) => (
                  <EditLocation
                      navigator={this.props.navigator}
                      locationProfile={locationProfile}
                      authenticatedUserProfile={authenticatedUserProfile}/>
              )}/>
        </Screen>
    );
  }

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const ScreenEditLocation = poolConnect(
    // Presentational Component
    ScreenEditLocationPresentational,

    // mapStateToProps
    (state) => ({}),

    // mapDispatchToProps
    (dispatch) => ({}),

    // Array of pools to subscribe to
    [CACHE_MAP_ID_LOCATION_PROFILES, CACHE_ID_USER_PROFILE]
);
export default ScreenEditLocation;


ScreenEditLocation.propTypes = {
  locationId: PropTypes.number.isRequired
};