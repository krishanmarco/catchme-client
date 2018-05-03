/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ApiFormDef from "../../lib/redux-pool/api-form/ApiFormDef";
import DaoLocation from "../../lib/daos/DaoLocation";
import EditLocationAddress from './pages/EditLocationAddress';
import EditLocationInfo from './pages/EditLocationInfo';
import EditLocationRecap from './pages/EditLocationSave';
import EditLocationTimings from './pages/EditLocationTimings';
import React from 'react';
import {Colors, Icons} from '../../Config';
import {FORM_API_ID_EDIT_LOCATION_PROFILE} from "../../lib/redux-pool/api-form/def/ApiFormDefLocationProfile";
import {poolConnect} from '../../redux/ReduxPool';
import {ScrollableIconTabView} from "../../comp/Misc";
import {StyleSheet, View} from 'react-native';
import type {TApiFormPool} from "../../lib/redux-pool/api-form/ApiFormPool";
import type {TIcon, TNavigator} from "../../lib/types/Types";
import type {TLocation} from "../../lib/daos/DaoLocation";
import type {TUser} from "../../lib/daos/DaoUser";

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	navigator: TNavigator,
	locationProfile: TLocation,
	authUserProfile: TUser
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
		this._onSavePress = this._onSavePress.bind(this);
		this._onPreTabChange = this._onPreTabChange.bind(this);
		this._setRefInfoTab = this._setRefInfoTab.bind(this);
		this._setRefTimingsTab = this._setRefTimingsTab.bind(this);
		this._setRefAddressTab = this._setRefAddressTab.bind(this);
		this._setRefRecapTab = this._setRefRecapTab.bind(this);
	}

	componentWillMount() {
		const {locationProfile} = this.props;

		// We now have access to a location profile
		// Initialize the redux pool form by setting all its values
		this._formApiEditLocationProfile().reset();
		this._formApiEditLocationProfile().change(DaoLocation.apiClean(locationProfile));
	}

	_formApiEditLocationProfile(): TApiFormPool {
		return this.props[FORM_API_ID_EDIT_LOCATION_PROFILE];
	}


	_onSavePress() {
		const {navigator} = this.props;

		// If the form doesn't have any errors, go back
		this._formApiEditLocationProfile().post()
			.then(apiResponse => {
				// todo: handle errors
				navigator.pop();
			});
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

	_setRefInfoTab(ref) {
		this.refTabs[EditLocation.idxInfo] = ref;
	}

	_setRefTimingsTab(ref) {
		this.refTabs[EditLocation.idxTimings] = ref;
	}

	_setRefAddressTab(ref) {
		this.refTabs[EditLocation.idxAddress] = ref;
	}

	_setRefRecapTab(ref) {
		this.refTabs[EditLocation.idxRecap] = ref;
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
				style={styles.tabView}>
				{jsx}
			</View>
		);
	}


	_renderTabEditLocationInfo() {
		return (
			<EditLocationInfo
				ref={this._setRefInfoTab}
				formApiEditLocationProfile={this._formApiEditLocationProfile()}/>
		);
	}

	_renderTabEditLocationTimings() {
		return (
			<EditLocationTimings
				ref={this._setRefTimingsTab}
				formApiEditLocationProfile={this._formApiEditLocationProfile()}/>
		);
	}

	_renderTabEditLocationAddress() {
		const {navigator} = this.props;
		return (
			<EditLocationAddress
				ref={this._setRefAddressTab}
				navigator={navigator}
				formApiEditLocationProfile={this._formApiEditLocationProfile()}/>
		);
	}

	_renderTabEditLocationRecap() {
		return (
			<EditLocationRecap
				ref={this._setRefRecapTab}
				onSavePress={this._onSavePress}
				formApiEditLocationProfile={this._formApiEditLocationProfile()}/>
		);
	}

}

const EditLocation = poolConnect(_EditLocation,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[FORM_API_ID_EDIT_LOCATION_PROFILE]
);
export default EditLocation;


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	tabView: {
		flex: 1
	}
});
