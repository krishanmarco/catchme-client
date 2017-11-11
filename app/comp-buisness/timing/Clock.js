/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {View} from 'react-native';
import {VictoryPie, VictoryLabel} from 'victory-native';
import Svg from 'react-native-svg';
import {Colors} from '../../Config';



// this.props.timings, this.props.isEditable this.props.getLabel(index) this.props.centerLabel
export default class Clock extends React.Component {

  constructor(props, context) {
    super(props, context);
    this._onSlicePress = this._onSlicePress.bind(this);
    this.state = this._mapPropsToState(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this._mapPropsToState(nextProps));
  }

  getTimings() {
    return this.state.timings;
  }

  _onSlicePress(event, data) {
    if (!this.props.isEditable)
      return;

    const clockIndex = data.slice.data.x;

    const timings = this.state.timings;
    timings[clockIndex] = !timings[clockIndex];
    this.setState(this._mapPropsToState({timings: timings, ...this.props}));
  }

  _mapPropsToState(props) {
    return {
      timings: props.timings,
      colorScale: props.timings.map(timeOn => timeOn ? Colors.primary : Colors.alertRed),
      data: new Array(12).fill().map((x, i) => ({x: i, y: 1, label: props.getLabel(i).toString()}))
    };
  }


  render() {
    return (
        <Svg width={246} height={246} viewBox='0 0 245 245' style={{width: '100%', height: 'auto'}}>
          <VictoryPie
              height={246}
              width={246}
              labelRadius={50}
              innerRadius={16}
              standalone={false}

              data={this.state.data}
              colorScale={this.state.colorScale}

              style={{labels: {fill: 'white', fontSize: 12}}}
              labelComponent={<VictoryLabel dy={-16}/>}

              eventKey={datum => datum.x}
              events={[{target: "data", eventHandlers: {onPress: this._onSlicePress}}]}/>
          <VictoryLabel
              textAnchor="middle"
              style={{fill: Colors.primary, fontWeight: 'bold'}}
              x={123}
              y={117}
              text={this.props.centerLabel}
          />
        </Svg>
    );
  }

};
