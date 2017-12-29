/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';
import {poolConnect} from '../../../redux/ReduxPool';

import {View, ScrollView, Text, StyleSheet} from 'react-native';

import {RkStyleSheet} from 'react-native-ui-kitten';
import WeekTimingsList from '../../../comp-buisness/timing/TimingList';
import ManagerWeekTimings from "../../../lib/helpers/ManagerWeekTimings";


// Redux ************************************************************************************************
// Redux ************************************************************************************************

const editLocationTimingsInitState = {
  // Nothing for now
};


export function editLocationTimingsReducer(state = editLocationTimingsInitState, action) {
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
  static refWeekTimingsList = 'refWeekTimingsList';

  constructor(props, context) {
    super(props, context);
    this.state = {managerWeekTimings: ManagerWeekTimings.buildFromLocation(this._formApiEditLocationProfileInput())};
  }

  _formApiEditLocationProfile() { return this.props.formApiEditLocationProfile; }
  _formApiEditLocationProfileInput() { return this._formApiEditLocationProfile().apiInput; }
  _managerWeekTimings() { return this.state.managerWeekTimings; }

  _onSaveTimings() {
    const weekBoolTimings = this.refs[EditLocationTimingsPresentational.refWeekTimingsList].getTimings();
    const weekStrTimings = ManagerWeekTimings.mapBoolTimingsToStr(weekBoolTimings);
  }


  render() {
    return (

        <View style={{flex: 1, paddingLeft: 24, paddingRight: 24}}>
          <WeekTimingsList
              ref={EditLocationTimingsPresentational.refWeekTimingsList}
              managerWeekTimings={this._managerWeekTimings()}
              isEditable={true}
              size={246}/>
        </View>
    );
  }

}



// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const EditLocationTimings = poolConnect(
    // Presentational Component
    EditLocationTimingsPresentational,

    // mapStateToProps
    (state) => state.editLocationTimingsReducer,

    // mapDispatchToProps
    (dispatch) => ({}),

    // Array of pools to subscribe to
    []
);

export default EditLocationTimings;



// Const ************************************************************************************************
// Const ************************************************************************************************

const Styles = RkStyleSheet.create(theme => ({
  content: {
    paddingHorizontal: 4,
  },
}));


EditLocationTimings.propTypes = {
  formApiEditLocationProfile: PropTypes.object.isRequired
};