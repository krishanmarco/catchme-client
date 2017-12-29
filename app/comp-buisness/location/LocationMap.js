/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';

import DaoLocation from '../../lib/daos/DaoLocation';

import {Colors} from '../../Config';

import {StyleSheet, View, Text, Image} from 'react-native';

import MapsTheme from '../../lib/maps/GoogleMapsTheme';
import MapView from 'react-native-maps';


const Styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%'
  }
});


const InitialRegion = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02
};


export default class LocationMap extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {region: this._getInitialRegion(props)};
  }


  componentWillReceiveProps(nextProps) {
    this.setState({region: this._getInitialRegion(nextProps)});
  }


  _getInitialRegion(props) {
    if (props.locations.length <= 0)
      return InitialRegion;

    const firstLocationCoords = this._getCoordinates(props.locations[0]);
    return {...InitialRegion, ...firstLocationCoords};
  }


  _getCoordinates(location) {
    let latLng = DaoLocation.gLatLng(location);
    return {latitude: latLng.lat, longitude: latLng.lng};
  }


  render() {
    return (
        <MapView
            style={Styles.map}
            customMapStyle={MapsTheme}


            region={this.state.region}
            onRegionChange={region => this.setState({region})}

            showsUserLocation={this.props.showUserLocation}
            followsUserLocation={this.props.followsUserLocation}
            showsMyLocationButton={this.props.showsMyLocationButton}
            showsTraffic={this.props.showsTraffic}
            zoomEnabled={this.props.zoomEnabled}
            scrollEnabled={this.props.scrollEnabled}

            loadingEnabled={this.props.loadingEnabled}
            loadingIndicatorColor={Colors.primary}
        >

          {this.props.locations.map((location, key) => (

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

LocationMap.defaultProps = {
  locations: [],

  showUserLocation: true,
  followsUserLocation: false,
  showsMyLocationButton: true,
  showsTraffic: false,
  zoomEnabled: true,
  scrollEnabled: true,
  loadingEnabled: true
};