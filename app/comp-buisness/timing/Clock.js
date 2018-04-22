/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
/* eslint-disable import/no-named-as-default */
import React from 'react';
import Svg from 'react-native-svg';
import {Colors, Const} from '../../Config';
import {StyleSheet} from 'react-native';
import {VictoryLabel, VictoryPie} from 'victory-native';

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	timings: string,
	isEditable: boolean,
	getLabel: (number) => string,
	centerLabel: string,
	onTimingsChanged: string => void
};

type State = {
	timings: string,
	colorScale: Array<string>,
	data: Array<{x: number, y: number, label: string}>
};


// Clock *************************************************************************************************
// Clock *************************************************************************************************

export default class Clock extends React.Component<void, Props, State> {

	constructor(props, context) {
		super(props, context);
		this._onSlicePress = this._onSlicePress.bind(this);
		this._victoryPieEventKey = this._victoryPieEventKey.bind(this);
		this.state = this._mapPropsToState(props);
		this.victoryPieEvents = [{target: "data", eventHandlers: {onPress: this._onSlicePress}}];
	}

	componentWillReceiveProps(nextProps) {
		this.setState(this._mapPropsToState(nextProps));
	}

	_mapPropsToState(props) {
		const {timings, getLabel} = props;

		return {
			timings,
			colorScale: timings.map(timeOn => timeOn ? Colors.primary : Colors.alertRed),
			data: new Array(12).fill().map((x, i) => ({x: i, y: 1, label: getLabel(i).toString()})),
		};
	}

	_onSlicePress(event, data) {
		const {isEditable, onTimingsChanged} = this.props;
		const {timings} = this.state;

		if (!isEditable)
			return;

		const clockIndex = data.slice.data.x;

		timings[clockIndex] = !timings[clockIndex];
		this.setState(this._mapPropsToState({timings, ...this.props}), onTimingsChanged);
	}

	_victoryPieEventKey(datum) {
		return datum.x;
	}

	getTimings() {
		const {timings} = this.state;
		return timings;
	}

	render() {
		const {centerLabel} = this.props;
		const {data, colorScale} = this.state;

		return (
			<Svg
				style={styles.svgStyle}
				width={ClockSize}
				height={ClockSize}
				viewBox={`0 0 ${ClockSize} ${ClockSize}`}>
				<VictoryPie
					height={ClockSize}
					width={ClockSize}
					data={data}
					colorScale={colorScale}

					labelRadius={labelRadius}
					innerRadius={labelInnerRadius}
					standalone={false}
					labelComponent={<VictoryLabel/>}
					eventKey={this._victoryPieEventKey}

					style={victoryPieStyle}
					events={this.victoryPieEvents}/>
				<VictoryLabel
					textAnchor="middle"
					x={ClockSize / 2}
					y={ClockSize / 2}
					text={centerLabel}
					style={victoryLabelStyle}
				/>
			</Svg>
		);
	}
}

// Config ***********************************************************************************************
// Config ***********************************************************************************************

const ClockSize = Const.clockSize;
const labelRadius = ClockSize * 0.16;
const labelInnerRadius = ClockSize * 0.07;

const victoryPieStyle = {
	labels: {
		fill: 'white',
		fontSize: ClockSize * 0.05
	}
};

const victoryLabelStyle = {
	fill: Colors.primary,
	fontSize: ClockSize * 0.07,
	fontWeight: 'bold'
};

// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	svgStyle: {
		width: '100%',
		height: 'auto'
	}
});