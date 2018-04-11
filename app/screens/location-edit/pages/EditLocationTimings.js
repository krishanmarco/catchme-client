/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ApiFormDef from "../../../lib/redux-pool/api-form/ApiFormDef";
import DaoLocation from "../../../lib/daos/DaoLocation";
import ManagerWeekTimings from "../../../lib/helpers/ManagerWeekTimings";
import React from 'react';
import WeekTimingsList from '../../../comp-buisness/timing/TimingList';
import {ApiFormState} from "../../../lib/redux-pool/api-form/ApiFormModel";
import {poolConnect} from '../../../redux/ReduxPool';
import {StyleSheet, View} from 'react-native';
import type {TApiFormPool} from "../../../lib/redux-pool/api-form/ApiFormPool";

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	navigator: Navigator,
	locationProfile: Object,
	formApiEditLocationProfile: ApiFormState
};

type State = {
	managerWeekTimings: ApiFormState
}


// _EditLocationTimings *********************************************************************************
// _EditLocationTimings *********************************************************************************

class _EditLocationTimings extends React.Component<void, Props, State> {

	constructor(props, context) {
		super(props, context);
		this.state = {managerWeekTimings: ManagerWeekTimings.buildFromLocation(this._formApiEditLocationProfile().apiInput)};
	}

	hasErrors() {
		const formErrors = this._formApiEditLocationProfile().errors;
		return ApiFormDef.hasErrors(formErrors, [DaoLocation.pTimings]);
	}

	_formApiEditLocationProfile(): TApiFormPool {
		return this.props.formApiEditLocationProfile;
	}

	saveTimingsToLocation() {
		const weekBoolTimings = this.refWeekTimingsList.getTimings();
		const weekStrTimings = ManagerWeekTimings.mapBoolTimingsToStr(weekBoolTimings);

		// this._formApiEditLocationProfile().change({
		// 	[DaoLocation.pTimings]: weekStrTimings
		// });
	}


	render() {
		const {managerWeekTimings} = this.state;

		return (
			<View style={styles.view}>
				<WeekTimingsList
					ref={ref => this.refWeekTimingsList = ref}
					managerWeekTimings={managerWeekTimings}
					isEditable={true}
					size={200}/>
			</View>
		);
	}

}



// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const EditLocationTimings = poolConnect(_EditLocationTimings,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[],

	{withRef: true}
);

export default EditLocationTimings;



// Const ************************************************************************************************
// Const ************************************************************************************************

const styles = StyleSheet.create({
	view: {
		flex: 1,
		paddingHorizontal: 24
	},
	listItemWithActionsContent: {
		paddingHorizontal: 4,
	},
});
