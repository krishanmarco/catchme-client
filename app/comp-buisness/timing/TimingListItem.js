/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import Clock from './Clock';

import Maps from "../../lib/data/Maps";

import React from 'react';
import {Col, Grid, Row} from "react-native-easy-grid";
import {Colors, Icons} from "../../Config";
import {FlatList, StyleSheet} from 'react-native';
import {RkButton, RkText} from 'react-native-ui-kitten';
import {View} from 'react-native';

// Flow *************************************************************************************************
// Flow *************************************************************************************************

type Props = {
	day: number,
	managerWeekTimings: Object, // todo
	onEdit?: () => {},
	isEditable?: boolean
}


export default class TimingListItem extends React.Component<any, Props, any> {

	constructor(props, context) {
		super(props, context);
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
				<Col size={50} style={[styles.content]}>
					<Clock
						size={size}
						ref={ref => this.refClockAm = ref}
						isEditable={isEditable}
						getLabel={index => index + 1}
						centerLabel='am'
						timings={timingsInDay.slice(0, 12)}
						onTimingsChanged={onTimingsChanged}/>
				</Col>
				<Col size={4}></Col>
				<Col size={50} style={styles.content}>
					<Clock
						size={size}
						ref={ref => this.refClockPm = ref}
						isEditable={isEditable}
						getLabel={index => index + 13}
						centerLabel='pm'
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
	content: {
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