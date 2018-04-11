/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoLocation from '../../lib/daos/DaoLocation';
import MapsTheme from '../../lib/maps/GoogleMapsTheme';
import MapView from 'react-native-maps';
import React from 'react';
import {Colors, Const} from '../../Config';
import {StyleSheet} from 'react-native';
import type {TLocation} from "../../lib/daos/DaoLocation";


// Const *************************************************************************************************
// Const *************************************************************************************************

export type TLocationMapRegion = {
	latitude: number,
	longitude: number,
	latitudeDelta: number,
	longitudeDelta: number
};

type Props = {
	locations: Array<TLocation>
};

type State = {
	region: TLocationMapRegion
};

// LocationMap ******************************************************************************************
// LocationMap ******************************************************************************************

export default class LocationMap extends React.Component<void, Props, State> {

	constructor(props, context) {
		super(props, context);
		this.state = {region: this._getInitialRegion(props)};
	}


	componentWillReceiveProps(nextProps) {
		this.setState({region: this._getInitialRegion(nextProps)});
	}


	_getInitialRegion(props) {
		const initialRegion = Const.locationInitialRegion;

		if (props.locations.length <= 0)
			return initialRegion;

		const firstLocationCoords = this._getCoordinates(props.locations[0]);
		return {...initialRegion, ...firstLocationCoords};
	}


	_getCoordinates(location) {
		const latLng = DaoLocation.gLatLng(location);
		return {latitude: parseFloat(latLng.lat), longitude: parseFloat(latLng.lng)};
	}


	render() {
		const {locations, ...props} = this.props;
		return (
			<MapView
				style={styles.map}
				customMapStyle={MapsTheme}

				region={this.state.region}
				onRegionChange={region => this.setState({region})}
				loadingIndicatorColor={Colors.primary}
				{...props}
			>

				{locations.map((location, key) => (
					<MapView.Marker
						key={key}
						pinColor={Colors.primary}
						coordinate={this._getCoordinates(location)}
						title={DaoLocation.gName(location)}/>
				))}

			</MapView>
		);
	}

}



const styles = StyleSheet.create({
	map: {
		height: '100%',
		width: '100%'
	}
});