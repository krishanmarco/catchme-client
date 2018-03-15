/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoLocation from "../../lib/daos/DaoLocation";
import EditLocationAddress from './pages/EditLocationAddress';

import EditLocationInfo from './pages/EditLocationInfo';

import EditLocationRecap from './pages/EditLocationSave';

import EditLocationTimings from './pages/EditLocationTimings';

import PropTypes from 'prop-types';
import React from 'react';
import {denormObj} from '../../lib/HelperFunctions';
import {FORM_API_ID_EDIT_LOCATION_PROFILE, poolConnect} from '../../redux/ReduxPool';
import {Icons} from '../../Config';
import {ScrollableIconTabView} from "../../comp/Misc";
import {View} from 'react-native';
import type {TLocation} from "../../lib/daos/DaoLocation";
import type {TUser} from "../../lib/daos/DaoUser";
import type {TNavigator} from "../../lib/types/Types";
import {TReduxPoolApiForms} from "../../lib/types/ReduxPoolTypes";


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

// Flow *************************************************************************************************
// Flow *************************************************************************************************

type Props = {
	navigator: TNavigator,
	locationProfile: TLocation,
	authenticatedUserProfile: TUser
};

// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class EditLocationPresentational extends React.Component<any, Props, any> {

	constructor(props, context) {
		super(props, context);
		this._allowIndexChange = this._allowIndexChange.bind(this);
		this._onSaveComplete = this._onSaveComplete.bind(this);
	}

	componentWillMount() {
		const {locationProfile} = this.props.locationProfile;
		// We now have access to a location profile
		// Initialize the redux pool form by setting all its values
		this._formApiEditLocationProfile().change(denormObj({
			// EditLocationInfo
			[DaoLocation.pName]: DaoLocation.gName(locationProfile),
			[DaoLocation.pPictureUrl]: DaoLocation.gPictureUrl(locationProfile),
			[DaoLocation.pDescription]: DaoLocation.gDescription(locationProfile),
			[DaoLocation.pEmail]: DaoLocation.gEmail(locationProfile),
			[DaoLocation.pPhone]: DaoLocation.gPhone(locationProfile),
			[DaoLocation.pCapacity]: DaoLocation.gCapacity(locationProfile),

			// EditLocationTimings
			[DaoLocation.pTimings]: DaoLocation.gTimings(locationProfile),

			// EditLocationAddress
			[DaoLocation.pAddressCountry]: DaoLocation.gCountry(locationProfile),
			[DaoLocation.pAddressState]: DaoLocation.gState(locationProfile),
			[DaoLocation.pAddressCity]: DaoLocation.gCity(locationProfile),
			[DaoLocation.pAddressPostcode]: DaoLocation.gPostcode(locationProfile),
			[DaoLocation.pAddressAddress]: DaoLocation.gAddress(locationProfile),
			[DaoLocation.pAddressLatLng]: DaoLocation.gLatLng(locationProfile),
		}));
	}

	_formApiEditLocationProfile(): TReduxPoolApiForms<TLocation, TLocation> {
		return this.props[FORM_API_ID_EDIT_LOCATION_PROFILE];
	}


	_onSaveComplete(apiResponse) {
		// The form has already been posted
		// Check for success and handle errors
		//    .then(locationResult => Router.goToLocationProfile() && Router.closeThisModal()) todo
	}


	_allowIndexChange(currentIndex, nextIndex) {
		// Todo only allow submit if the current tab is completed
		return true;
	}


	render() {
		return (
			<ScrollableIconTabView
				allowIndexChange={this._allowIndexChange}
				icons={[
					Icons.friendRequestAccept,
					Icons.friendRequestAccept,
					Icons.friendRequestAccept,
					Icons.friendRequestAccept
				]}>
				{[
					this._renderTabLocationEditInfo(),
					this._renderTabLocationEditTimings(),
					this._renderTabLocationEditAddress(),
					this._renderTabLocationEditRecap()
				].map((jsx, index) => this._renderTab(index.toString(), jsx))}
			</ScrollableIconTabView>
		);
	}

	_renderTab(tabLabel, jsx) {
		return (
			<View
				key={tabLabel}
				tabLabel={tabLabel}
				style={{height: 440}}>
				{jsx}
			</View>
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
				navigator={this.props.navigator}
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

