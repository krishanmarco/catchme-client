/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import LocationGeocoderTextEdit from '../../comp-buisness/location/LocationGeocoderTextEdit';
import React from 'react';
import Router from '../../lib/navigation/Router';
import {poolConnect} from '../../redux/ReduxPool';
import {Screen} from '../../comp/Misc';
import {ScrollView} from 'react-native';
import type {TLocation} from '../../lib/daos/DaoLocation';
import type {TNavigator} from '../../lib/types/Types';

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	onSelect: (TLocation) => void,
	navigator: TNavigator
};

// _ScreenAddressPicker *********************************************************************************
// _ScreenAddressPicker *********************************************************************************

class _ScreenAddressPicker extends React.Component<void, Props, void> {

	constructor(props, context) {
		super(props, context);
		this._onSelect = this._onSelect.bind(this);
	}

	_onSelect(location) {
		const {navigator, onSelect} = this.props;
		onSelect(location);
		Router.dismissModal(navigator, {animationType: 'slide-down'});
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

const ScreenAddressPicker = poolConnect(_ScreenAddressPicker,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[]
);
export default ScreenAddressPicker;

