/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ManagerWeekTimings from "../../lib/helpers/ManagerWeekTimings";
import React from 'react';
import TimingListItem from './TimingListItem';
import {ScrollView, StyleSheet, View} from 'react-native';


// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	isEditable: Boolean,
	size: number,
	managerWeekTimings: ManagerWeekTimings,
	onEdit: Function
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
		const {managerWeekTimings, size, isEditable} = this.props;
		return (
			<ScrollView
				style={styles.root}
				showsVerticalScrollIndicator={false}>

				{managerWeekTimings.getBoolWeekTimings()
					.map((dayTimings, key) => (
						<TimingListItem
							key={key}
							ref={ref => this.refsTimingListItems[key] = ref}
							day={key}
							size={size}
							managerWeekTimings={managerWeekTimings}
							isEditable={isEditable}
							onTimingsChanged={this._onTimingsChanged}/>
					))}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	// Nothing for now
});