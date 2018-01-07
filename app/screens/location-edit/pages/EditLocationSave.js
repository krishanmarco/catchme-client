/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {poolConnect} from '../../../redux/ReduxPool';

import {View, ScrollView, Text, StyleSheet} from 'react-native';

import {RkStyleSheet, RkText} from 'react-native-ui-kitten';
import {GradientButton} from "../../../comp/Misc";
import {AvatarCircle} from "../../../comp/Misc";
import DaoLocation from "../../../lib/daos/DaoLocation";


// Redux ************************************************************************************************
// Redux ************************************************************************************************

const editLocationSaveInitState = {
  // Nothing for now
};


export function editLocationSaveReducer(state = editLocationSaveInitState, action) {
  switch (action.type) {
      // Nothing for now
  }

  return state;
}


// Flow *************************************************************************************************
// Flow *************************************************************************************************

type Props = {
  formApiEditLocationProfile: Object,
  onSaveComplete: Function
};



// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class EditLocationSavePresentational extends React.Component<any, Props, any> {

  constructor(props, context) {
    super(props, context);
    this._onLocationSave = this._onLocationSave.bind(this);
  }

  _formApiEditLocationProfile() { return this.props.formApiEditLocationProfile; }
  _formApiEditLocationProfileInput() { return this._formApiEditLocationProfile().apiInput; }


  _onLocationSave() {
    // Post the form and notify the parent component
    this._formApiEditLocationProfile().post()
        .then(this.props.onSaveComplete);
  }


  render() {
    return (
        <View style={Styles.root}>
          <RkText style={Styles.headerText} rkType='header2 hero'>
            {DaoLocation.gName(this._formApiEditLocationProfileInput())}
          </RkText>
          <View style={Styles.avatar}>
            <AvatarCircle
                rkType='huge'
                uri={DaoLocation.gPictureUrl(this._formApiEditLocationProfileInput())}/>
          </View>
          <RkText style={Styles.contentText} rkType='primary3'>
            {DaoLocation.gAddress(this._formApiEditLocationProfileInput())}
          </RkText>
          <GradientButton
              rkType='large'
              style={Styles.saveButton}
              onPress={this._onLocationSave}
              text='Save & Close'/>
        </View>
    );
  }

}



// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const EditLocationSave = poolConnect(
    // Presentational Component
    EditLocationSavePresentational,

    // mapStateToProps
    (state) => state.editLocationSaveReducer,

    // mapDispatchToProps
    (dispatch) => ({}),

    // Array of pools to subscribe to
    []
);

export default EditLocationSave;



// Const ************************************************************************************************
// Const ************************************************************************************************

const Styles = RkStyleSheet.create(theme => ({
  root: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  headerText: {
    marginTop: 16
  },
  avatar: {
    marginTop: 40
  },
  contentText: {
    marginTop: 16
  },
  saveButton: {
    marginTop: 40,
    marginHorizontal: 16
  }
}));
