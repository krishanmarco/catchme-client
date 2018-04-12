/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import Clock from './Clock';
import ManagerWeekTimings from "../../lib/helpers/ManagerWeekTimings";
import Maps from "../../lib/data/Maps";
import React from 'react';
import {Col, Grid, Row} from "react-native-easy-grid";
import {Colors} from "../../Config";
import {RkText} from 'react-native-ui-kitten';
import {StyleSheet, View} from 'react-native';

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	day: number,
	managerWeekTimings: ManagerWeekTimings,
	onTimingsChanged: () => void,
	size: number,
	onEdit?: () => void,
	isEditable?: boolean
};


export default class TimingListItem extends React.Component<void, Props, void> {

	constructor(props, context) {
		super(props, context);
		this._getLabelAm = this._getLabelAm.bind(this);
		this._getLabelPm = this._getLabelPm.bind(this);
	}

	getTimings() {
		const amTimings = this.refClockAm.getTimings();
		const pmTimings = this.refClockPm.getTimings();
		return amTimings.concat(pmTimings);
	}

	_timingsInDay() {
		const {managerWeekTimings, day} = this.props;
		return managerWeekTimings.boolTimingsInDay(day);
	}

	_getLabelAm(index: number) {
		return index + 1;
	}

	_getLabelPm(index: number) {
		return index + 13;
	}

	render() {
		return (
			<Grid style={styles.root}>
				<Row>{this._renderTimingHeader()}</Row>
				<Row>{this._renderTimingContent()}</Row>
			</Grid>
		);
	}

	_renderTimingHeader() {
		const {day} = this.props;

		return (
			<View style={styles.headerLine}>
				<RkText style={styles.headerSpan} rkType='accentColor'>
					{Maps.daysOfWeek()[day]}
				</RkText>
			</View>
		);
	}

	_renderTimingContent() {
		const {size, isEditable, onTimingsChanged} = this.props;
		const timingsInDay = this._timingsInDay();

		return (
			<Grid style={{height: size * 0.55}}>
				<Col size={50} style={styles.listItemWithActionsContent}>
					<Clock
						centerLabel='am'
						size={size}
						isEditable={isEditable}
						getLabel={this._getLabelAm}
						ref={ref => this.refClockAm = ref}
						timings={timingsInDay.slice(0, 12)}
						onTimingsChanged={onTimingsChanged}/>
				</Col>
				<Col size={4}></Col>
				<Col size={50} style={styles.listItemWithActionsContent}>
					<Clock
						centerLabel='pm'
						size={size}
						isEditable={isEditable}
						getLabel={this._getLabelPm}
						ref={ref => this.refClockPm = ref}
						timings={timingsInDay.slice(12, 24)}
						onTimingsChanged={onTimingsChanged}/>
				</Col>
			</Grid>
		);
	}

}


const styles = StyleSheet.create({
	root: {
		marginTop: 4,
	},
	listItemWithActionsContent: {
		marginTop: 4,
		alignItems: 'center',
		justifyContent: 'center'
	},
	headerSpan: {
		backgroundColor: Colors.background,
		paddingVertical: 0,
		paddingHorizontal: 8
	},
	headerLine: {
		width: '100%',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: 'black',
	}
});