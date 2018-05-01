/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import GoogleMapsDataDecoder from "../../lib/maps/GoogleMapsDataDecoder";
import React from 'react';
import {Colors, Const} from '../../Config';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import type {TLocation} from "../../lib/daos/DaoLocation";

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	onSelect: (TLocation) => void
};

export default class LocationGeocoderTextEdit extends React.Component<void, Props, void> {

  // Available options can be found at:
  // https://developers.google.com/places/web-service/autocomplete
  static AutoCompleteQueryKey = {
    key: Const.googlePlacesKey,
    // language: 'it',
    // types: '(cities)' // default: 'geocode'
  };

  static AutoCompleteStyles = {
    textInputContainer: {width: '100%'},
    description: {fontWeight: 'bold'},
    predefinedPlacesDescription: {color: Colors.primary}
  };

  // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
  static AutoCompleteApi = 'GoogleReverseGeocoding';

  // Available options can be found at:
  // https://developers.google.com/maps/documentation/geocoding/intro
  static GoogleReverseGeocodingQueryOptions = {};

  // Filter the reverse geocoding results by types
  // Eg. ['locality', 'administrative_area_level_3'] to only display cities
  static GoogleReverseGeocodingFilterByTypes = [];

  // Available options can be found at:
  // https://developers.google.com/places/web-service/search
  static GooglePlacesSearchQueryOptions = {rankby: 'distance'};



  constructor(props, context) {
    super(props, context);
    this._onPress = this._onPress.bind(this);
  }


  _onPress(data, details) {
    const {onSelect} = this.props;
    // details are only provided when fetchDetails=true
    onSelect(new GoogleMapsDataDecoder(details).toLocation());
  }


  render() {
    return (
        <GooglePlacesAutocomplete
            placeholder='Search for your location'
            minLength={3}
            autoFocus={false}
            returnKeyType='search'
            listViewDisplayed='auto'
            renderDescription={row => row.description}

            fetchDetails={true}
            onPress={this._onPress}

            getDefaultValue={() => ''}

            nearbyPlacesAPI={LocationGeocoderTextEdit.AutoCompleteApi}
            query={LocationGeocoderTextEdit.AutoCompleteQueryKey}
            styles={LocationGeocoderTextEdit.AutoCompleteStyles}
            debounce={Const.googlePlacesDebounceTimeMs}

            currentLocation={false}

            GoogleReverseGeocodingQuery={LocationGeocoderTextEdit.GoogleReverseGeocodingQueryOptions}
            GooglePlacesSearchQuery={LocationGeocoderTextEdit.GooglePlacesSearchQueryOptions}

            filterReverseGeocodingByTypes={LocationGeocoderTextEdit.GoogleReverseGeocodingFilterByTypes}

            renderLeftButton={() => null}
            renderRightButton={() => null}
        />
    );
  }

}