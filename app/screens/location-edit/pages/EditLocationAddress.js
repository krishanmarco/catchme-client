/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {poolConnect} from '../../../redux/ReduxPool';
import {Icons, Const} from '../../../Config';
import {denormObj} from '../../../lib/HelperFunctions';

import {View, ScrollView, Dimensions, Keyboard, Text, StyleSheet} from 'react-native';

import {RkStyleSheet} from 'react-native-ui-kitten';
import {RkTextInputFromPool, RkMultiChoice} from '../../../comp/misc/forms/RkInputs';
import {AvatarCircle} from "../../../comp/misc/Avatars";
import DaoLocation from "../../../lib/daos/DaoLocation";
import LocationMap from '../../../comp-buisness/location/LocationMap';

import {ListItemInfo} from '../../../comp/misc/ListItemsInfos';
import Router from "../../../lib/helpers/Router";
import ScreenInfo from '../../../comp/misc/ScreenInfo';

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


// FlowProps ********************************************************************************************
// FlowProps ********************************************************************************************

type Props = {
  navigator: Navigator,
  locationProfile: Object,
};

type State = {
  // Nothing for now
}



// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class EditLocationTimingsPresentational extends React.Component<any, Props, State> {

  constructor(props, context) {
    super(props, context);
    this._onGoogleMapsSelectorPress = this._onGoogleMapsSelectorPress.bind(this);
  }

  _onGoogleMapsSelectorPress() {
    Router.toAddressPickerModal(
        this._navigator(),
        {onSelect: location => this._formApiEditLocationProfile().change(location)}
    );
  }

  _navigator() { return this.props.navigator; }
  _formApiEditLocationProfile() { return this.props.formApiEditLocationProfile; }
  _formApiEditLocationProfileInput() { return this._formApiEditLocationProfile().apiInput; }

  render() {
    return (
        <ScrollView style={{flex: 1}}>
          <ScreenInfo
              imageContainerStyle={{marginTop: 8}}
              onPress={this._onGoogleMapsSelectorPress}
              scale={575}
              height={80}
              width={80}
              image={require('../../../assets/images/splashBack.png')}
              text='Press the image above to select a location'/>
          <View style={Styles.content}>
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
            <LocationMap
                showsMyLocationButton={true}
                scrollEnabled={false}
                locations={[this._formApiEditLocationProfileInput()]}/>
          </View>
        </ScrollView>
    );
  }

}



// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const EditLocationTimings = poolConnect(
    // Presentational Component
    EditLocationTimingsPresentational,

    // mapStateToProps
    (state) => state.editLocationAddressReducer,

    // mapDispatchToProps
    (dispatch) => ({}),

    // Array of pools to subscribe to
    []
);

export default EditLocationTimings;



// Styles ***********************************************************************************************
// Styles ***********************************************************************************************

const Styles = RkStyleSheet.create(theme => ({
  content: {
    paddingHorizontal: 4,
    marginTop: 12
  },
}));


EditLocationTimings.propTypes = {
  formApiEditLocationProfile: PropTypes.object.isRequired
};