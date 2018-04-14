/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ManagerWeekTimings from "../../lib/helpers/ManagerWeekTimings";
import React from 'react';
import WeekTimingsList from '../../comp-buisness/timing/TimingList';
import {poolConnect} from '../../redux/ReduxPool';
import {Screen} from "../../comp/Misc";
import {StyleSheet} from 'react-native';

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	managerWeekTimings: ManagerWeekTimings
}

// _ScreenTimings *****************************************************************************************
// _ScreenTimings *****************************************************************************************

class _ScreenTimings extends React.Component<void, Props, void> {

	_managerWeekTimings() {
		return this.props.managerWeekTimings;
	}

	render() {
		return (
			<Screen style={styles.root}>
				<WeekTimingsList
					ref={_ScreenTimings.refWeekTimingsList}
					managerWeekTimings={this._managerWeekTimings()}
					isEditable={false}
					size={200}/>
			</Screen>
		);
	}

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

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
		paddingVertical: 8,
	}
});