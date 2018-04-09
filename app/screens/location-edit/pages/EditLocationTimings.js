/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ManagerWeekTimings from "../../../lib/helpers/ManagerWeekTimings";
import PropTypes from 'prop-types';
import React from 'react';

import WeekTimingsList from '../../../comp-buisness/timing/TimingList';

import {poolConnect} from '../../../redux/ReduxPool';
import {RkStyleSheet} from 'react-native-ui-kitten';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import type {TReduxPoolApiForms} from "../../../lib/types/ReduxPoolTypes";
import type {TLocation} from "../../../lib/daos/DaoLocation";
import DaoLocation from "../../../lib/daos/DaoLocation";
import ApiFormDef from "../../../lib/redux-pool/api-form/ApiFormDef";


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


// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	navigator: Navigator,
	locationProfile: Object,
	formApiEditLocationProfile: Object
};

type State = {
	// Nothing for now
}



// _EditLocationTimings *********************************************************************************
// _EditLocationTimings *********************************************************************************

class _EditLocationTimings extends React.Component<any, Props, State> {

	constructor(props, context) {
		super(props, context);
		this.state = {managerWeekTimings: ManagerWeekTimings.buildFromLocation(this._formApiEditLocationProfileInput())};
	}

	hasErrors() {
		const formErrors = this._formApiEditLocationProfile().errors;
		return ApiFormDef.hasErrors(formErrors, [DaoLocation.pTimings]);
	}

	_formApiEditLocationProfile(): TReduxPoolApiForms<TLocation, TLocation> {
		return this.props.formApiEditLocationProfile;
	}

	_formApiEditLocationProfileInput(): ?TLocation {
		return this._formApiEditLocationProfile().apiInput;
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
	(state) => state.editLocationTimingsReducer,

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[],

	{withRef: true}
);

export default EditLocationTimings;



// Const ************************************************************************************************
// Const ************************************************************************************************

const styles = RkStyleSheet.create(theme => ({
	view: {
		flex: 1,
		paddingHorizontal: 24
	},
	content: {
		paddingHorizontal: 4,
	},
}));


EditLocationTimings.propTypes = {
	formApiEditLocationProfile: PropTypes.object.isRequired
};