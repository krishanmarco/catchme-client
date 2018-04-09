/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ApiFormDef from "../../lib/redux-pool/api-form/ApiFormDef";
import DaoLocation from "../../lib/daos/DaoLocation";

import EditLocationAddress from './pages/EditLocationAddress';

import EditLocationInfo from './pages/EditLocationInfo';

import EditLocationRecap from './pages/EditLocationSave';

import EditLocationTimings from './pages/EditLocationTimings';
import PropTypes from 'prop-types';
import React from 'react';
import {Colors, Icons} from '../../Config';
import {denormObj} from '../../lib/HelperFunctions';
import {FORM_API_ID_EDIT_LOCATION_PROFILE} from "../../lib/redux-pool/api-form/def/ApiFormDefLocationProfile";
import {poolConnect} from '../../redux/ReduxPool';
import {ScrollableIconTabView} from "../../comp/Misc";
import {TReduxPoolApiForms} from "../../lib/types/ReduxPoolTypes";
import {View} from 'react-native';
import type {TIcon, TNavigator} from "../../lib/types/Types";
import type {TLocation} from "../../lib/daos/DaoLocation";
import type {TUser} from "../../lib/daos/DaoUser";


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

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	navigator: TNavigator,
	locationProfile: TLocation,
	authenticatedUserProfile: TUser
};

// _EditLocation ****************************************************************************************
// _EditLocation ****************************************************************************************

class _EditLocation extends React.Component<any, Props, any> {
	static indexOfInfoTab = 0;
	static indexOfTimingsTab = 1;
	static indexOfAddressTab = 2;
	static indexOfRecapTab = 3;

	constructor(props, context) {
		super(props, context);
		this.refTabs = [];
		this._allowIndexChange = this._allowIndexChange.bind(this);
		this._onSaveComplete = this._onSaveComplete.bind(this);
		this._onPreTabChange = this._onPreTabChange.bind(this);
	}

	componentWillMount() {
		const {locationProfile} = this.props;

		// We now have access to a location profile
		// Initialize the redux pool form by setting all its values
		this._formApiEditLocationProfile().reset();
		this._formApiEditLocationProfile().change(locationProfile);
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
		if (nextIndex < currentIndex)
			return true;

		return !this.refTabs[currentIndex].getWrappedInstance().hasErrors();
	}

	_onPreTabChange(currentIndex, nextIndex) {
		if (currentIndex == EditLocation.indexOfTimingsTab) {
			this.refTabs[EditLocation.indexOfTimingsTab].getWrappedInstance().saveTimingsToLocation();
		}
	}

	_overrideIconColor(icon: TIcon, tabIndex: number) {
		const wrapperRef = this.refTabs[tabIndex];

		if (wrapperRef) {
			const ref = wrapperRef.getWrappedInstance();

			if (ref.hasErrors())
				return {...icon, color: Colors.alertRed};
		}

		return icon;
	}


	render() {
		return (
			<ScrollableIconTabView
				allowIndexChange={this._allowIndexChange}
				onPreTabChange={this._onPreTabChange}
				locked={true}
				activeColor={false}
				icons={[
					this._overrideIconColor(Icons.locationInfo, EditLocation.indexOfInfoTab),
					this._overrideIconColor(Icons.locationTimings, EditLocation.indexOfTimingsTab),
					this._overrideIconColor(Icons.locationMap, EditLocation.indexOfAddressTab),
					this._overrideIconColor(Icons.locationSave, EditLocation.indexOfRecapTab)
				]}>
				{[
					this._renderTabEditLocationInfo(),
					this._renderTabEditLocationTimings(),
					this._renderTabEditLocationAddress(),
					this._renderTabEditLocationRecap()
				].map((jsx, index) => this._renderTab(index.toString(), jsx))}
			</ScrollableIconTabView>
		);
	}

	_renderTab(tabLabel, jsx) {
		return (
			<View
				key={tabLabel}
				tabLabel={tabLabel}
				style={{height: 460}}>
				{jsx}
			</View>
		);
	}


	_renderTabEditLocationInfo() {
		return (
			<EditLocationInfo
				ref={ref => this.refTabs[EditLocation.indexOfInfoTab] = ref}
				formApiEditLocationProfile={this._formApiEditLocationProfile()}/>
		);
	}

	_renderTabEditLocationTimings() {
		return (
			<EditLocationTimings
				ref={ref => this.refTabs[EditLocation.indexOfTimingsTab] = ref}
				formApiEditLocationProfile={this._formApiEditLocationProfile()}/>
		);
	}

	_renderTabEditLocationAddress() {
		return (
			<EditLocationAddress
				ref={ref => this.refTabs[EditLocation.indexOfAddressTab] = ref}
				navigator={this.props.navigator}
				formApiEditLocationProfile={this._formApiEditLocationProfile()}/>
		);
	}

	_renderTabEditLocationRecap() {
		return (
			<EditLocationRecap
				ref={ref => this.refTabs[EditLocation.indexOfRecapTab] = ref}
				onSaveComplete={this._onSaveComplete}
				formApiEditLocationProfile={this._formApiEditLocationProfile()}/>
		);
	}

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const EditLocation = poolConnect(_EditLocation,
	// mapStateToProps
	(state) => state.locationProfileReducer,

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[FORM_API_ID_EDIT_LOCATION_PROFILE]
);


export default EditLocation;

