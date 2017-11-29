/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';

import {Colors, Icons} from "../../Config";

import {StyleSheet, FlatList} from 'react-native';
import {Row, Grid, Col} from "react-native-easy-grid";
import {View} from 'react-native';
import {RkButton, RkText} from 'react-native-ui-kitten';
import {Icon} from 'react-native-elements';
import {VictoryPie, VictoryLabel, Slice} from 'victory-native';
import Clock from './Clock';


const DayMap = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', '?'];

export default class TimingListItem extends React.Component {
  static refClockAm = 'refClockAm';
  static refClockPm = 'refClockPm';

  constructor(props, context) {
    super(props, context);
  }

  getTimings() {
    const amTimings = this.refs[TimingListItem.refClockAm].getTimings();
    const pmTimings = this.refs[TimingListItem.refClockPm].getTimings();
    return amTimings.concat(pmTimings);
  }


  _managerWeekTimings() { return this.props.managerWeekTimings; }
  _dayIndex() { return this.props.day; }
  _isEditable() { return this.props.isEditable; }

  _timingsInDay() { return this._managerWeekTimings().boolTimingsInDay(this._dayIndex()); }

  render() {
    return (
        <Grid style={Styles.root}>
          <Row>{this._renderTimingHeader()}</Row>
          <Row>{this._renderTimingContent()}</Row>
        </Grid>
    );
  }

  _renderTimingHeader() {
    return (
        <View style={Styles.headerLine}>
          <RkText style={Styles.headerSpan} rkType='accentColor'>{DayMap[this.props.day]}</RkText>
        </View>
    );
  }

  _renderTimingContent() {
    const {size} = this.props;

    return (
        <Grid style={{height: size * 0.55}}>
          <Col size={50} style={[Styles.content]}>
            <Clock
                size={this.props.size}
                ref={TimingListItem.refClockAm}
                isEditable={this._isEditable()}
                getLabel={index => index + 1}
                centerLabel='am'
                timings={this._timingsInDay().slice(0, 12)}/>
          </Col>
          <Col size={4}></Col>
          <Col size={50} style={Styles.content}>
            <Clock
                size={this.props.size}
                ref={TimingListItem.refClockPm}
                isEditable={this._isEditable()}
                getLabel={index => index + 13}
                centerLabel='pm'
                timings={this._timingsInDay().slice(12, 24)}/>
          </Col>
        </Grid>
    );
  }

}

TimingListItem.defaultProps = {};

TimingListItem.propTypes = {
  day: PropTypes.number.isRequired,
  managerWeekTimings: PropTypes.object.isRequired,
  onEdit: PropTypes.func
};


const Styles = StyleSheet.create({
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