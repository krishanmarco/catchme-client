/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ManagerWeekTimings from "../../lib/helpers/ManagerWeekTimings";
import React from 'react';
import TimingListItem from './TimingListItem';
import {ScrollView} from 'react-native';

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	isEditable: Boolean,
	managerWeekTimings: ManagerWeekTimings,
};


// Const *************************************************************************************************
// Const *************************************************************************************************

export default class WeekTimingsList extends React.Component<void, Props, void> {

	constructor(props, context) {
		super(props, context);
		this._onTimingsChanged = this._onTimingsChanged.bind(this);
		this.refsTimingListItems = {};
	}

	getTimings() {
		const {managerWeekTimings} = this.props;

		const weekTimings = [];
		const nDays = managerWeekTimings.getBoolWeekTimings().length;

		for (let day = 0; day < nDays; day++)
			weekTimings.push(this.refsTimingListItems[day].getTimings());

		return weekTimings;
	}

	_onTimingsChanged() {
		const {managerWeekTimings} = this.props;
		managerWeekTimings.setBoolWeekTimings(this.getTimings());
	}


	render() {
		const {managerWeekTimings, isEditable} = this.props;
		return (
			<ScrollView
				showsVerticalScrollIndicator={false}>

				{managerWeekTimings.getBoolWeekTimings()
					.map((dayTimings, key) => (
						<TimingListItem
							key={key}
							ref={ref => this.refsTimingListItems[key] = ref}
							day={key}
							managerWeekTimings={managerWeekTimings}
							isEditable={isEditable}
							onTimingsChanged={this._onTimingsChanged}/>
					))}
			</ScrollView>
		);
	}
}
