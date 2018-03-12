/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';

import {View, StyleSheet, ScrollView} from 'react-native';
import TimingListItem from './TimingListItem';



export default class WeekTimingsList extends React.Component {
  static refTimingListItem = 'refTimingListItem';

  constructor(props, context) {
    super(props, context);
  }

  getTimings() {
    const weekTimings = [];
    const nDays = this._managerWeekTimings().getBoolWeekTimings().length;
    for (let day = 0; day < nDays; day++)
      weekTimings.push(this.refs[WeekTimingsList.refTimingListItem + day].getTimings())
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
            style={Styles.root}
            showsVerticalScrollIndicator={false}>

          {this._managerWeekTimings()
              .getBoolWeekTimings()
              .map((dayTimings, key) => (
                  <TimingListItem
                      key={key}
                      ref={WeekTimingsList.refTimingListItem + key}
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


const Styles = StyleSheet.create({
  // Nothing for now
});