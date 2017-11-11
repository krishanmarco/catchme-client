/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';
import {poolConnect} from '../../redux/ReduxPool';
import {ScrollView} from 'react-native';
import LocationGeocoderTextEdit from '../../comp-buisness/location/LocationGeocoderTextEdit';
import {Navigation} from 'react-native-navigation';

// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class ScreenAddressPickerPresentational extends React.Component {

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
        <ScrollView>
          <LocationGeocoderTextEdit
              onSelect={this._onSelect}/>
        </ScrollView>
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