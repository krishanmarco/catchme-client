/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import LocationGeocoderTextEdit from '../../comp-buisness/location/LocationGeocoderTextEdit';
import PropTypes from 'prop-types';
import React from 'react';
import {Navigation} from 'react-native-navigation';
import {poolConnect} from '../../redux/ReduxPool';
import {Screen} from "../../comp/Misc";
import {ScrollView} from 'react-native';
import type {TLocation} from "../../lib/daos/DaoLocation";

// Flow *************************************************************************************************
// Flow *************************************************************************************************

type Props = {
	onSelect: (TLocation) => {}
};

// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class ScreenAddressPickerPresentational extends React.Component<any, Props, any> {

	constructor(props, context) {
		super(props, context);
		this._onSelect = this._onSelect.bind(this);
	}

	_onSelect(location) {
		this.props.onSelect(location);
		Navigation.dismissModal({animationType: 'slide-down'});
	}

	render() {
		return (
			<Screen>
				<ScrollView>
					<LocationGeocoderTextEdit
						onSelect={this._onSelect}/>
				</ScrollView>
			</Screen>
		);
	}

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const ScreenAddressPicker = poolConnect(
	// Presentational Component
	ScreenAddressPickerPresentational,

	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[]
);
export default ScreenAddressPicker;


ScreenAddressPicker.propTypes = {
	onSelect: PropTypes.func.isRequired
};