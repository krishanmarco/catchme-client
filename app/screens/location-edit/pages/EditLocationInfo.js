/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';
import {poolConnect} from '../../../redux/ReduxPool';
import {Icons, Const} from '../../../Config';

import {View, ScrollView, Text, StyleSheet} from 'react-native';

import {RkStyleSheet} from 'react-native-ui-kitten';
import {RkTextInputFromPool, RkMultiChoice} from '../../../comp/misc/forms/RkInputs';
import {AvatarCircle} from "../../../comp/Misc";
import DaoLocation from "../../../lib/daos/DaoLocation";


// Redux ************************************************************************************************
// Redux ************************************************************************************************

const editLocationInfoInitState = {
  // Nothing for now
};


export function editLocationInfoReducer(state = editLocationInfoInitState, action) {
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
};



// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class EditLocationInfoPresentational extends React.Component<any, Props, any> {

  constructor(props, context) {
    super(props, context);
    this._onLocationPicturePress = this._onLocationPicturePress.bind(this);
  }

  _formApiEditLocationProfile() { return this.props.formApiEditLocationProfile; }
  _formApiEditLocationProfileInput() { return this._formApiEditLocationProfile().apiInput; }

  _onLocationPicturePress() {
    // todo: open picker and upload then update
  }


  render() {
    return (
        <ScrollView style={{flex: 1}}>
          <View style={styles.content}>
            <View style={{alignItems: 'center'}}>
              <AvatarCircle
                  badge={Icons.settingChangePassword}
                  rkType='large'
                  uri={DaoLocation.gPictureUrl(this._formApiEditLocationProfileInput())}
                  onPress={this._onLocationPicturePress}/>
            </View>
            <RkTextInputFromPool
                pool={this._formApiEditLocationProfile()}
                field={DaoLocation.pName}
                rkType='row'
                label='Name'
                icon={Icons.settingChangePassword}/>
            <RkTextInputFromPool
                pool={this._formApiEditLocationProfile()}
                field={DaoLocation.pEmail}
                rkType='row'
                label='Email'
                keyboardType='email-address'
                icon={Icons.settingChangePassword}/>
            <RkTextInputFromPool
                pool={this._formApiEditLocationProfile()}
                field={DaoLocation.pPhone}
                rkType='row'
                label='Phone'
                keyboardType='phone-pad'
                icon={Icons.settingChangePassword}/>
            <RkTextInputFromPool
                pool={this._formApiEditLocationProfile()}
                field={DaoLocation.pCapacity}
                rkType='row'
                label='Capacity'
                keyboardType='numeric'
                icon={Icons.settingChangePassword}/>
            <RkTextInputFromPool
                pool={this._formApiEditLocationProfile()}
                field={DaoLocation.pDescription}
                rkType='row'
                multline
                numberOfLines={3}
                label='Description'
                returnKeyType='next'
                icon={Icons.settingChangePassword}/>
          </View>
        </ScrollView>
    );
  }

}



// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const EditLocationInfo = poolConnect(
    // Presentational Component
    EditLocationInfoPresentational,

    // mapStateToProps
    (state) => state.editLocationInfoReducer,

    // mapDispatchToProps
    (dispatch) => ({}),

    // Array of pools to subscribe to
    []
);

export default EditLocationInfo;



// Const ************************************************************************************************
// Const ************************************************************************************************

const styles = RkStyleSheet.create(theme => ({
  content: {
    paddingHorizontal: 4,
  },
}));


EditLocationInfo.propTypes = {
  formApiEditLocationProfile: PropTypes.object.isRequired
};