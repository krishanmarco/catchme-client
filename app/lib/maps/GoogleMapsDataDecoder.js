/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import DaoLocation from '../daos/DaoLocation';
import {denormObj} from '../HelperFunctions';


export default class GoogleMapsDataDecoder {
  static DEFAULT_GOOGLE_PLACE_ID = -1;


  constructor(geocodeResult) {
    this.geocodeResult = geocodeResult;
  }

  geocodeResult: null;


  getGooglePlaceId() {
    return _.get(this.geocodeResult, 'id', GoogleMapsDataDecoder.DEFAULT_GOOGLE_PLACE_ID);
  }

  getAddressComponent(expectedTypes) {
    return _.get(this.geocodeResult, 'address_components', [])
        .find(ac => _.intersection(ac.types, expectedTypes).length > 0);
  }

  getAddressComponentShortValue(expectedTypes, defaultValue = null) {
    return _.get(this.getAddressComponent(expectedTypes), 'short_name', defaultValue);
  }

  getAddressComponentLongValue(expectedTypes, defaultValue = null) {
    return _.get(this.getAddressComponent(expectedTypes), 'long_name', defaultValue);
  }

  getCountry() {
    return this.getAddressComponentLongValue(['country']);
  }

  getState() {
    return this.getAddressComponentLongValue(['administrative_area_level_1']);
  }

  getCity() {
    return this.getAddressComponentLongValue(['administrative_area_level_2']);
  }

  getPostcode() {
    return this.getAddressComponentLongValue(['postal_code']);
  }

  getFormattedAddress() {
    return _.get(this.geocodeResult, 'formatted_address');
  }

  getLatLng() {
    return _.get(this.geocodeResult, 'geometry.location', {lat: 0, lng: 0});
  }



  toLocation() {
    return denormObj({
      [DaoLocation.pGooglePlaceId]: this.getGooglePlaceId(),
      [DaoLocation.pAddressCountry]: this.getCountry(),
      [DaoLocation.pAddressState]: this.getState(),
      [DaoLocation.pAddressCity]: this.getCity(),
      [DaoLocation.pAddressPostcode]: this.getPostcode(),
      [DaoLocation.pAddressAddress]: this.getFormattedAddress(),
      [DaoLocation.pAddressLatLng]: this.getLatLng(),
    });
  }

}