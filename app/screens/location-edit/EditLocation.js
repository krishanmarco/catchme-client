/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';

import {Icons} from '../../Config';

import {poolConnect, FORM_API_ID_EDIT_LOCATION_PROFILE} from '../../redux/ReduxPool';
import TabBar from '../../comp/misc/TabBar';

import {Row, Grid} from "react-native-easy-grid";

import EditLocationInfo from './pages/EditLocationInfo';
import EditLocationTimings from './pages/EditLocationTimings';
import EditLocationAddress from './pages/EditLocationAddress';
import EditLocationRecap from './pages/EditLocationSave';
import {denormObj} from '../../lib/HelperFunctions';
import DaoLocation from "../../lib/daos/DaoLocation";


// Redux ************************************************************************************************
// Redux ************************************************************************************************

const editLocationInitState = {
  // Nothing for now
};


export function editLocationReducer(state = editLocationInitState, action) {
  switch (action.type) {
    // Nothing for now
  }

  return state;
}

// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class EditLocationPresentational extends React.Component {

  constructor(props, context) {
    super(props, context);
    this._onTabChange = this._onTabChange.bind(this);
    this._allowIndexChange = this._allowIndexChange.bind(this);
    this._onSaveComplete = this._onSaveComplete.bind(this);
  }

  componentWillMount() {
    // We now have access to a location profile
    // Initialize the redux pool form by setting all its values
    this._formApiEditLocationProfile().change(denormObj({
      // EditLocationInfo
      [DaoLocation.pName]: DaoLocation.gName(this._locationProfile()),
      [DaoLocation.pPictureUrl]: DaoLocation.gPictureUrl(this._locationProfile()),
      [DaoLocation.pDescription]: DaoLocation.gDescription(this._locationProfile()),
      [DaoLocation.pEmail]: DaoLocation.gEmail(this._locationProfile()),
      [DaoLocation.pPhone]: DaoLocation.gPhone(this._locationProfile()),
      [DaoLocation.pCapacity]: DaoLocation.gCapacity(this._locationProfile()),

      // EditLocationTimings
      [DaoLocation.pTimings]: DaoLocation.gTimings(this._locationProfile()),

      // EditLocationAddress
      [DaoLocation.pAddressCountry]: DaoLocation.gCountry(this._locationProfile()),
      [DaoLocation.pAddressState]: DaoLocation.gState(this._locationProfile()),
      [DaoLocation.pAddressCity]: DaoLocation.gCity(this._locationProfile()),
      [DaoLocation.pAddressPostcode]: DaoLocation.gPostcode(this._locationProfile()),
      [DaoLocation.pAddressAddress]: DaoLocation.gAddress(this._locationProfile()),
      [DaoLocation.pAddressLatLng]: DaoLocation.gLatLng(this._locationProfile()),
    }));
  }

  _locationProfile() { return this.props.locationProfile; }
  _authenticatedUserProfile() { return this.props.authenticatedUserProfile; }
  _navigator() { return this.props.navigator; }
  _formApiEditLocationProfile() { return this.props[FORM_API_ID_EDIT_LOCATION_PROFILE]; }


  _onSaveComplete(apiResponse) {
    // The form has already been posted
    // Check for success and handle errors
    //    .then(locationResult => Router.goToLocationProfile() && Router.closeThisModal()) todo
  }

  _onTabChange(tabIndex) {
    console.log("SWITHCING TO TAB" + tabIndex);
  }

  _allowIndexChange(currentIndex, nextIndex) {
    // Todo only allow submit if the current tab is completed
    return true;
  }


  render() {
    return (
        <Grid>
          <Row>
            <TabBar allowIndexChange={this._allowIndexChange} onTabChange={this._onTabChange}>
              <TabBar.Tab key={0} icon={Icons.friendRequestAccept}>{this._renderTabLocationEditInfo()}</TabBar.Tab>
              <TabBar.Tab key={1} icon={Icons.friendRequestAccept}>{this._renderTabLocationEditTimings()}</TabBar.Tab>
              <TabBar.Tab key={2} icon={Icons.friendRequestAccept}>{this._renderTabLocationEditAddress()}</TabBar.Tab>
              <TabBar.Tab key={3} icon={Icons.friendRequestAccept}>{this._renderTabLocationEditRecap()}</TabBar.Tab>
            </TabBar>
          </Row>
        </Grid>
    );
  }


  _renderTabLocationEditInfo() {
    return (
        <EditLocationInfo
            formApiEditLocationProfile={this._formApiEditLocationProfile()}/>
    );
  }

  _renderTabLocationEditTimings() {
    return (
        <EditLocationTimings
            formApiEditLocationProfile={this._formApiEditLocationProfile()}/>
    );
  }

  _renderTabLocationEditAddress() {
    return (
        <EditLocationAddress
            navigator={this._navigator()}
            formApiEditLocationProfile={this._formApiEditLocationProfile()}/>
    );
  }

  _renderTabLocationEditRecap() {
    return (
        <EditLocationRecap
          onSaveComplete={this._onSaveComplete}
          formApiEditLocationProfile={this._formApiEditLocationProfile()}/>
    );
  }

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const EditLocation = poolConnect(
    // Presentational Component
    EditLocationPresentational,

    // mapStateToProps
    (state) => state.locationProfileReducer,

    // mapDispatchToProps
    (dispatch) => ({}),

    // Array of pools to subscribe to
    [FORM_API_ID_EDIT_LOCATION_PROFILE]
);


export default EditLocation;


EditLocation.propTypes = {
  locationProfile: PropTypes.object.isRequired,
  authenticatedUserProfile: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
};

// Style ************************************************************************************************
// Style ************************************************************************************************
