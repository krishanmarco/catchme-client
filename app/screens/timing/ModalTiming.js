/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {StyleSheet} from 'react-native';
import {Screen} from "../../comp/Misc";
import {poolConnect} from '../../redux/ReduxPool';
import WeekTimingsList from '../../comp-buisness/timing/TimingList';


// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class ModalTimingPresentational extends React.Component {

  _managerWeekTimings() {
    return this.props.managerWeekTimings;
  }

  render() {
    return (
        <Screen style={styles.root}>
          <WeekTimingsList
              ref={ModalTimingPresentational.refWeekTimingsList}
              managerWeekTimings={this._managerWeekTimings()}
              isEditable={false}
              size={200}/>
        </Screen>
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

// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  }
});