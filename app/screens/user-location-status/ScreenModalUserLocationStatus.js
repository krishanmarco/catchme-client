/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ApiClient from '../../lib/data/ApiClient';

import DaoLocation from "../../lib/daos/DaoLocation";

import DaoUserLocationStatus from "../../lib/daos/DaoUserLocationStatus";
import ModalUserLocationStatus from './ModalUserLocationStatus';
import React from 'react';
import {
  CACHE_ID_USER_LOCATION_STATUS,
  CACHE_MAP_ID_LOCATION_PROFILES,
  FORM_API_ID_EDIT_USER_LOCATION_STATUS,
  poolConnect
} from '../../redux/ReduxPool';

import {NullableObjects, Screen} from "../../comp/Misc";
import type {TNavigator} from "../../lib/types/Types";
import type {TUserLocationStatus} from "../../lib/daos/DaoUserLocationStatus";


// Flow *************************************************************************************************
// Flow *************************************************************************************************

type Props = {
  navigator: TNavigator,
  locationId: number,
  initialStatus?: TUserLocationStatus,
  onStatusConfirm?: (TUserLocationStatus) => {},
  postOnConfirm?: boolean
};

export type TModalUserLocationStatusProps = Props;

type State = {
  // Nothing for now
};


// ModalUserLocationStatus ******************************************************************************
// ModalUserLocationStatus ******************************************************************************

class ScreenModalUserLocationStatusPresentational extends React.Component<any, Props, State> {

  static defaultProps = {
    postOnConfirm: true
  };

  constructor(props, context) {
    super(props, context);
    this._onStatusConfirm = this._onStatusConfirm.bind(this);
    this._onStatusChange = this._onStatusChange.bind(this);
  }

  componentWillMount() {
    // Initialize the modals title
    this._cacheMapLocationProfiles().initializeItem(this.props.locationId)
        .then(locationProfile => {
          // Once we have the locations profile, set the modal title
          this.props.navigator.setTitle({title: DaoLocation.gName(locationProfile)});
        });

    // Bind the initialStatus to the redux form status
    this._formApiEditUserLocationStatus().change(this._getInitialStatus());
  }

  _getInitialStatus() {

    // If initialStatus props are set use
    // those as the initial status
    if (this.props.initialStatus)
      return this.props.initialStatus;


    // Redux pool fallback from initialStatus
    const userLocationStatusList = this._cacheUserLocationStatusData();
    if (userLocationStatusList) {
      const uls = userLocationStatusList
          .find(uls => DaoUserLocationStatus.gLocationId(uls) == this.props.locationId);

      if (uls)
        return uls;
    }


    // Create new initialStatus fallback from redux pool
    return DaoUserLocationStatus.newInstance(this.props.locationId);
  }


  _formApiEditUserLocationStatus() {
    return this.props[FORM_API_ID_EDIT_USER_LOCATION_STATUS];
  }

  _formApiEditUserLocationStatusInput() {
    return this._formApiEditUserLocationStatus().apiInput;
  }

  _cacheMapLocationProfiles() {
    return this.props[CACHE_MAP_ID_LOCATION_PROFILES];
  }

  _cacheUserLocationStatusData(): ?TUserLocationStatus {
    return this.props[CACHE_ID_USER_LOCATION_STATUS].data;
  }

  _locationProfile() {
    return this._cacheMapLocationProfiles().get(this.props.locationId);
  }

  _onStatusConfirm() {
    const newStatus = this._formApiEditUserLocationStatusInput();

    if (this.props.postOnConfirm) {
      this._formApiEditUserLocationStatus().post()
          .then(success => {

            // Notify the parent component that the status has changed
            if (this.props.onStatusConfirm)
              this.props.onStatusConfirm(newStatus);
          });
    }

    this.props.navigator.dismissModal({animationType: 'slide-down'});
  }

  _onStatusChange(objectToMerge) {
    this._formApiEditUserLocationStatus().change(objectToMerge);
  }


  render() {
    return (
        <Screen>
          <NullableObjects
              objects={[this._locationProfile()]}
              renderChild={([locationProfile]) => (
                  <ModalUserLocationStatus
                    locationProfile={locationProfile}
                    userLocationStatus={this._formApiEditUserLocationStatusInput()}
                    onStatusConfirm={this._onStatusConfirm}
                    onStatusChange={this._onStatusChange}/>
              )}/>
        </Screen>
    );
  }


}


const ScreenModalUserLocationStatus = poolConnect(
    // Presentational Component
    ScreenModalUserLocationStatusPresentational,

    // mapStateToProps
    (state) => ({}),

    // mapDispatchToProps
    (dispatch) => ({}),

    // Array of pools to subscribe to
    [FORM_API_ID_EDIT_USER_LOCATION_STATUS, CACHE_MAP_ID_LOCATION_PROFILES, CACHE_ID_USER_LOCATION_STATUS]
);
export default ScreenModalUserLocationStatus;

