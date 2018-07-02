/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ManagerWeekTimings from '../../lib/helpers/ManagerWeekTimings';
import React from 'react';
import WeekTimingsList from '../../comp-buisness/timing/WeekTimingsList';
import {poolConnect} from '../../redux/ReduxPool';
import {Screen} from '../../comp/Misc';
import {StyleSheet} from 'react-native';
import Router from "../../lib/navigation/Router";
import type {TNavigator} from "../../lib/types/Types";

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
  navigator: TNavigator,
  managerWeekTimings: ManagerWeekTimings
}

// _ScreenTimings *****************************************************************************************
// _ScreenTimings *****************************************************************************************

class _ScreenTimings extends React.Component<void, Props, void> {

  constructor(props, context) {
    super(props, context);
    this._onBackPressed = this._onBackPressed.bind(this);
  }

  _onBackPressed() {
    const {navigator} = this.props;
    Router.closeTimings(navigator);
  }

  render() {
    const {managerWeekTimings} = this.props;
    return (
      <Screen style={styles.root}>
        <WeekTimingsList
          ref={_ScreenTimings.refWeekTimingsList}
          managerWeekTimings={managerWeekTimings}
          isEditable={false}/>
      </Screen>
    );
  }

}

const ScreenTimings = poolConnect(_ScreenTimings,
  // mapStateToProps
  (state) => ({}),

  // mapDispatchToProps
  (dispatch) => ({}),

  // Array of pools to subscribe to
  []
);
export default ScreenTimings;


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 24,
  }
});
