/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import Clock from './Clock';
import ManagerWeekTimings from "../../lib/helpers/ManagerWeekTimings";
import Maps from "../../lib/data/Maps";
import React from 'react';
import {Col, Grid, Row} from "react-native-easy-grid";
import {Colors, Const} from "../../Config";
import {RkText} from 'react-native-ui-kitten';
import {StyleSheet, View} from 'react-native';
import {t} from "../../lib/i18n/Translations";

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	day: number,
	managerWeekTimings: ManagerWeekTimings,
	onTimingsChanged: () => void,
	onEdit?: () => void,
	isEditable?: boolean
};

// TimingListItem ****************************************************************************************
// TimingListItem ****************************************************************************************

export default class TimingListItem extends React.Component<void, Props, void> {

	constructor(props, context) {
		super(props, context);
		this._getLabelAm = this._getLabelAm.bind(this);
		this._getLabelPm = this._getLabelPm.bind(this);
		this._setRefClockAm = this._setRefClockAm.bind(this);
		this._setRefClockPm = this._setRefClockPm.bind(this);
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

	_setRefClockAm(ref) {
		this.refClockAm = ref;
	}

	_setRefClockPm(ref) {
		this.refClockPm = ref;
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
		const {isEditable, onTimingsChanged} = this.props;
		const timingsInDay = this._timingsInDay();

		return (
			<Grid style={styles.timingContentRoot}>
				<Col size={50} style={styles.listItemWithActionsContent}>
					<Clock
						centerLabel={t('t_am')}
						isEditable={isEditable}
						getLabel={this._getLabelAm}
						ref={this._setRefClockAm}
						timings={timingsInDay.slice(0, 12)}
						onTimingsChanged={onTimingsChanged}/>
				</Col>
				<Col size={4}></Col>
				<Col size={50} style={styles.listItemWithActionsContent}>
					<Clock
						centerLabel={t('t_pm')}
						isEditable={isEditable}
						getLabel={this._getLabelPm}
						ref={this._setRefClockPm}
						timings={timingsInDay.slice(12, 24)}
						onTimingsChanged={onTimingsChanged}/>
				</Col>
			</Grid>
		);
	}

}

// Config *************************************************************************************************
// Config *************************************************************************************************

const styles = StyleSheet.create({
	timingContentRoot: {
		height: Const.clockSize * 0.70
	},
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