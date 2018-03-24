/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoLocation from "../../../lib/daos/DaoLocation";
import LocationMap from '../../../comp-buisness/location/LocationMap';
import PropTypes from 'prop-types';

import React from 'react';

import Router from "../../../lib/helpers/Router";
import {Dimensions, ScrollView, View} from 'react-native';
import {poolConnect} from '../../../redux/ReduxPool';
import {RkTextInputFromPool} from '../../../comp/misc/forms/RkInputs';

import {RkStyleSheet} from 'react-native-ui-kitten';
import {ScreenInfo} from "../../../comp/Misc";
import type {TReduxPoolApiForms} from "../../../lib/types/ReduxPoolTypes";
import type {TLocation} from "../../../lib/daos/DaoLocation";
import ApiFormDef from "../../../lib/redux-pool/api-forms/ApiFormDef";
import {Validate} from "../../../lib/helpers/Validator";

// Redux ************************************************************************************************
// Redux ************************************************************************************************

const editLocationAddressInitState = {
	// Nothing for now
};


export function editLocationAddressReducer(state = editLocationAddressInitState, action) {
	switch (action.type) {
		// Nothing for now
	}

	return state;
}


// Flow *************************************************************************************************
// Flow *************************************************************************************************

type Props = {
	navigator: Navigator,
	locationProfile: Object,
	formApiEditLocationProfile: Object
};



// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class EditLocationAddressPresentational extends React.Component<any, Props, any> {

	constructor(props, context) {
		super(props, context);
		this._onGoogleMapsSelectorPress = this._onGoogleMapsSelectorPress.bind(this);
	}

	hasErrors() {
		const formErrors = this._formApiEditLocationProfile().errors;
		return ApiFormDef.hasErrors(formErrors, [
			DaoLocation.pAddressCountry,
			DaoLocation.pAddressState,
			DaoLocation.pAddressCity,
			DaoLocation.pAddressPostcode,
			DaoLocation.pAddressAddress
		]);
	}

	_onGoogleMapsSelectorPress() {
		Router.toAddressPickerModal(
			this.props.navigator,
			{onSelect: location => this._formApiEditLocationProfile().change(location)}
		);
	}

	_formApiEditLocationProfile(): TReduxPoolApiForms<TLocation, TLocation> {
		return this.props.formApiEditLocationProfile;
	}

	_formApiEditLocationProfileInput(): ?TLocation {
		return this._formApiEditLocationProfile().apiInput;
	}

	render() {
		return (
			<ScrollView style={styles.scrollView}>
				<ScreenInfo
					imageSource={require('../../../assets/images/address.png')}
					textText='Press the image above to select a location'
					onPress={this._onGoogleMapsSelectorPress}/>
				<View style={styles.content}>
					{[
						{field: DaoLocation.pAddressCountry, label: 'Country'},
						{field: DaoLocation.pAddressState, label: 'State'},
						{field: DaoLocation.pAddressCity, label: 'City'},
						{field: DaoLocation.pAddressPostcode, label: 'Postcode'},
						{field: DaoLocation.pAddressAddress, label: 'Address'},
					].map((addressComponent, key) => (
						<RkTextInputFromPool
							key={key}
							rkType='row'
							pool={this._formApiEditLocationProfile()}
							editable={false}
							field={addressComponent.field}
							label={addressComponent.label}/>
					))}
				</View>
				<View style={{width: '100%', height: Dimensions.get('window').height - 190}}>
					{DaoLocation.hasLatLng(this._formApiEditLocationProfileInput()) && (
						<LocationMap
						showsMyLocationButton={true}
						scrollEnabled={false}
						locations={[this._formApiEditLocationProfileInput()]}/>
					)}
				</View>
			</ScrollView>
		);
	}

}



// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const EditLocationAddress = poolConnect(
	// Presentational Component
	EditLocationAddressPresentational,

	// mapStateToProps
	(state) => state.editLocationAddressReducer,

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[],

	{withRef: true}
);

export default EditLocationAddress;



// Styles ***********************************************************************************************
// Styles ***********************************************************************************************

const styles = RkStyleSheet.create(theme => ({
	scrollView: {
		flex: 1
	},
	content: {
		paddingHorizontal: 4,
		marginTop: 12
	},
}));


EditLocationAddress.propTypes = {
	formApiEditLocationProfile: PropTypes.object.isRequired
};