/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';

import {
  poolConnect,
  FORM_API_ID_EDIT_USER_LOCATION_STATUS,
  CACHE_MAP_ID_LOCATION_PROFILES
} from '../../redux/ReduxPool';

import ApiClient from '../../lib/data/ApiClient';
import DaoLocation from "../../lib/daos/DaoLocation";
import DaoUserLocationStatus from "../../lib/daos/DaoUserLocationStatus";
import type {TUserLocationStatus} from "../../lib/daos/DaoUserLocationStatus";

import {Screen, NullableObjects} from "../../comp/Misc";
import ModalUserLocationStatus from './ModalUserLocationStatus';


// Flow *************************************************************************************************
// Flow *************************************************************************************************

type Props = {
  navigator: Object,
  locationId: number,
  onStatusConfirm?: (TUserLocationStatus) => {},
  initialStatus?: TUserLocationStatus
};

export type TModalUserLocationStatusProps = Props;

type State = {
  // Nothing for now
};


// ModalUserLocationStatus ******************************************************************************
// ModalUserLocationStatus ******************************************************************************

class ScreenModalUserLocationStatusPresentational extends React.Component<any, Props, State> {

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
    this._formApiEditUserLocationStatus()
        .change(this.props.initialStatus || DaoUserLocationStatus.createInitialStatus(this.props.locationId));
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

  _locationProfile() {
    return this._cacheMapLocationProfiles().get(this.props.locationId);
  }

  _onStatusConfirm() {
    const newStatus = this._formApiEditUserLocationStatusInput();

    // Update the user location status
    ApiClient.userStatusAdd(newStatus)
        .then(success => {
          // Notify the parent component that the status has changed
          if (this.props.onStatusConfirm)
            this.props.onStatusConfirm(newStatus);
        });
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
    [FORM_API_ID_EDIT_USER_LOCATION_STATUS, CACHE_MAP_ID_LOCATION_PROFILES]
);
export default ScreenModalUserLocationStatus;

