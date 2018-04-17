/* eslint-disable import/no-named-as-default */
/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import Svg from 'react-native-svg';
import {Colors} from '../../Config';
import {StyleSheet} from 'react-native';
import {VictoryLabel, VictoryPie} from 'victory-native';

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	timings: string,
	size: number,
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
		const {size, centerLabel} = this.props;
		const {data, colorScale} = this.state;
		return (
			<Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={styles.svgStyle}>
				<VictoryPie
					height={size}
					width={size}
					data={data}
					colorScale={colorScale}

					labelRadius={size * 0.14}
					innerRadius={size * 0.06}
					standalone={false}
					labelComponent={<VictoryLabel/>}
					eventKey={this._victoryPieEventKey}

					style={{labels: {fill: 'white', fontSize: size * 0.05}}}
					events={[{target: "data", eventHandlers: {onPress: this._onSlicePress}}]}/>
				<VictoryLabel
					textAnchor="middle"
					x={size / 2}
					y={size / 2}
					text={centerLabel}
					style={{fill: Colors.primary, fontSize: size * 0.06, fontWeight: 'bold'}}
				/>
			</Svg>
		);
	}
}

// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	svgStyle: {
		width: '100%',
		height: 'auto'
	}
});