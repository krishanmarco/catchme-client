/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';

import {ScrollView, StyleSheet, View} from 'react-native';
import TimingListItem from './TimingListItem';


// Flow *************************************************************************************************
// Flow *************************************************************************************************

type Props = {
	isEditable: Boolean,
	size: number
};

// Flow *************************************************************************************************
// Flow *************************************************************************************************

export default class WeekTimingsList extends React.Component<any, Props, any> {

	constructor(props, context) {
		super(props, context);
		this.refsTimingListItems = {};
	}

	getTimings() {
		const weekTimings = [];
		const nDays = this._managerWeekTimings().getBoolWeekTimings().length;
		for (let day = 0; day < nDays; day++)
			weekTimings.push(this.refsTimingListItems[day].getTimings());
		return weekTimings;
	}

	_isEditable() {
		return this.props.isEditable;
	}

	_managerWeekTimings() {
		return this.props.managerWeekTimings;
	}

	render() {
		return (
			<ScrollView
				style={styles.root}
				showsVerticalScrollIndicator={false}>

				{this._managerWeekTimings()
					.getBoolWeekTimings()
					.map((dayTimings, key) => (
						<TimingListItem
							key={key}
							ref={ref => this.refsTimingListItems[key] = ref}
							day={key}
							size={this.props.size}
							managerWeekTimings={this._managerWeekTimings()}
							isEditable={this._isEditable()}/>
					))}
			</ScrollView>
		);
	}


}

WeekTimingsList.defaultProps = {};

WeekTimingsList.propTypes = {
	managerWeekTimings: PropTypes.object.isRequired,
	onEdit: PropTypes.func
};


const styles = StyleSheet.create({
	// Nothing for now
});