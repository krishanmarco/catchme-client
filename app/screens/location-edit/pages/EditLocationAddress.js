/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ApiFormDef from "../../../lib/redux-pool/api-form/ApiFormDef";
import DaoLocation from "../../../lib/daos/DaoLocation";
import LocationMap from '../../../comp-buisness/location/LocationMap';
import React from 'react';
import Router from "../../../lib/navigation/Router";
import {ApiFormState} from "../../../lib/redux-pool/api-form/ApiFormModel";
import {BadgeOverlay, ScreenInfo} from "../../../comp/Misc";
import {Icons} from "../../../Config";
import {poolConnect} from '../../../redux/ReduxPool';
import {RkTextInputFromPool} from '../../../comp/misc/forms/RkInputs';
import {ScrollView, StyleSheet, View} from 'react-native';
import {t} from "../../../lib/i18n/Translations";
import type {TApiFormPool} from "../../../lib/redux-pool/api-form/ApiFormPool";

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	navigator: Navigator,
	locationProfile: Object,
	formApiEditLocationProfile: ApiFormState
};



// _EditLocationAddress *********************************************************************************
// _EditLocationAddress *********************************************************************************

class _EditLocationAddress extends React.Component<void, Props, void> {

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
		const {navigator} = this.props;
		Router.toModalAddressPicker(
			navigator,
			{onSelect: location => this._formApiEditLocationProfile().change(location)}
		);
	}

	_formApiEditLocationProfile(): TApiFormPool {
		const {formApiEditLocationProfile} = this.props;
		return formApiEditLocationProfile;
	}

	render() {
		return (
			<ScrollView>
				<View style={styles.root}>

					{this._renderHeader()}

					<View style={styles.editLocationAddressFormRow}>
						{[
							{field: DaoLocation.pAddressCountry, label: t('t_country')},
							{field: DaoLocation.pAddressState, label: t('t_state')},
							{field: DaoLocation.pAddressCity, label: t('t_city')},
							{field: DaoLocation.pAddressPostcode, label: t('t_postcode')},
							{field: DaoLocation.pAddressAddress, label: t('t_address')},
						].map((addressComponent, key) => (
							<RkTextInputFromPool
								key={key}
								pool={this._formApiEditLocationProfile()}
								editable={false}
								field={addressComponent.field}
								label={addressComponent.label}/>
						))}
					</View>
				</View>
			</ScrollView>
		);
	}

	_renderHeader() {
		const hasLatLng = DaoLocation.hasLatLng(this._formApiEditLocationProfile().apiInput);

		let contentJsx = null;

		if (hasLatLng) {
			contentJsx = (
				<BadgeOverlay
					backgroundJsx={(
						<LocationMap
							showsMyLocationButton={true}
							scrollEnabled={false}
							locations={[this._formApiEditLocationProfile().apiInput]}/>
					)}
					badge={Icons.locationEditAddress}/>
			);

		} else {
			contentJsx = (
				<ScreenInfo
					imageSource={require('../../../assets/images/primary-address.png')}
					textText={t('t_si_edit_location_address')}
					onPress={this._onGoogleMapsSelectorPress}/>
			);
		}

		return (
			<View style={styles.screenInfoRow}>
				{contentJsx}
			</View>
		);
	}

}

const EditLocationAddress = poolConnect(_EditLocationAddress,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[],

	{withRef: true}
);
export default EditLocationAddress;


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	root: {
		flex: 1
	},
	screenInfoRow: {
		height: 180
	},
	editLocationAddressFormRow: {
		flex: 0.72,
		paddingHorizontal: 16,
		marginTop: 16
	},
	locationMap: {
		flex: 1,
		width: '100%'
	}
});

