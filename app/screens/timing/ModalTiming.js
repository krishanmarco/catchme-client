/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {poolConnect} from '../../redux/ReduxPool';
import WeekTimingsList from '../../comp-buisness/timing/TimingList';
import {View} from 'react-native';


// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class ModalTimingPresentational extends React.Component {

  _managerWeekTimings() {
    return this.props.managerWeekTimings;
  }

  render() {
    return (
        <View style={{flex: 1, paddingLeft: 24, paddingRight: 24}}>
          <WeekTimingsList
              ref={ModalTimingPresentational.refWeekTimingsList}
              managerWeekTimings={this._managerWeekTimings()}
              isEditable={false}
              size={200}/>
        </View>
    );
  }

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const ModalTiming = poolConnect(
    // Presentational Component
    ModalTimingPresentational,

    // mapStateToProps
    (state) => ({}),

    // mapDispatchToProps
    (dispatch) => ({}),

    // Array of pools to subscribe to
    []
);
export default ModalTiming;

ModalTiming.defaultProps = {};