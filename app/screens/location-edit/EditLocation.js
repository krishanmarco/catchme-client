/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import EditLocationAddress from './pages/EditLocationAddress';
import EditLocationInfo from './pages/EditLocationInfo';
import EditLocationRecap from './pages/EditLocationSave';
import EditLocationTimings from './pages/EditLocationTimings';
import React from 'react';
import {Colors, Icons} from '../../Config';
import {FORM_API_ID_EDIT_LOCATION_PROFILE} from "../../lib/redux-pool/api-form/def/ApiFormDefLocationProfile";
import {poolConnect} from '../../redux/ReduxPool';
import {ScrollableIconTabView} from "../../comp/Misc";
import {View} from 'react-native';
import type {TIcon, TNavigator} from "../../lib/types/Types";
import type {TLocation} from "../../lib/daos/DaoLocation";
import type {TUser} from "../../lib/daos/DaoUser";
import type {TApiFormPool} from "../../lib/redux-pool/api-form/ApiFormPool";

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	navigator: TNavigator,
	locationProfile: TLocation,
	authenticatedUserProfile: TUser
};

// _EditLocation ****************************************************************************************
// _EditLocation ****************************************************************************************

class _EditLocation extends React.Component<void, Props, void> {
	static idxInfo = 0;
	static idxTimings = 1;
	static idxAddress = 2;
	static idxRecap = 3;

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

	_formApiEditLocationProfile(): TApiFormPool {
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
		if (currentIndex == EditLocation.idxTimings) {
			this.refTabs[EditLocation.idxTimings].getWrappedInstance().saveTimingsToLocation();
		}
	}

	_getIcon(tabIndex: number, icon: TIcon) {
		const wrapperRef = this.refTabs[tabIndex];

		if (wrapperRef) {
			const ref = wrapperRef.getWrappedInstance();

			if (ref.hasErrors())
				return {...icon, color: Colors.alertRed};
		}

		return icon;
	}


	render() {
		const tabs = [];

		tabs.push(this._renderTab('0', this._renderTabEditLocationInfo()));
		tabs.push(this._renderTab('1', this._renderTabEditLocationTimings()));
		tabs.push(this._renderTab('2', this._renderTabEditLocationAddress()));
		tabs.push(this._renderTab('3', this._renderTabEditLocationRecap()));

		return (
			<ScrollableIconTabView
				allowIndexChange={this._allowIndexChange}
				onPreTabChange={this._onPreTabChange}
				locked={true}
				activeColor={false}
				icons={{
					0: this._getIcon(EditLocation.idxInfo, Icons.locationInfo),
					1: this._getIcon(EditLocation.idxTimings, Icons.locationTimings),
					2: this._getIcon(EditLocation.idxAddress, Icons.locationMap),
					3: this._getIcon(EditLocation.idxRecap, Icons.locationSave)
				}}>
				{tabs}
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
				ref={ref => this.refTabs[EditLocation.idxInfo] = ref}
				formApiEditLocationProfile={this._formApiEditLocationProfile()}/>
		);
	}

	_renderTabEditLocationTimings() {
		return (
			<EditLocationTimings
				ref={ref => this.refTabs[EditLocation.idxTimings] = ref}
				formApiEditLocationProfile={this._formApiEditLocationProfile()}/>
		);
	}

	_renderTabEditLocationAddress() {
		const {navigator} = this.props;
		return (
			<EditLocationAddress
				ref={ref => this.refTabs[EditLocation.idxAddress] = ref}
				navigator={navigator}
				formApiEditLocationProfile={this._formApiEditLocationProfile()}/>
		);
	}

	_renderTabEditLocationRecap() {
		return (
			<EditLocationRecap
				ref={ref => this.refTabs[EditLocation.idxRecap] = ref}
				onSaveComplete={this._onSaveComplete}
				formApiEditLocationProfile={this._formApiEditLocationProfile()}/>
		);
	}

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const EditLocation = poolConnect(_EditLocation,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[FORM_API_ID_EDIT_LOCATION_PROFILE]
);


export default EditLocation;

