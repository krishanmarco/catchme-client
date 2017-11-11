/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';

import {StyleSheet, View, SectionList} from 'react-native';
import {RkStyleSheet, RkText} from 'react-native-ui-kitten';

export default class StaticSectionList extends React.PureComponent {


  render() {

    return (
        <SectionList
            sections={this.props.sections}
            renderItem={this.props.renderItem}
            keyExtractor={(item, index) => index}
            renderSectionHeader={this._renderHeader}
        />
    );
  }


  _renderHeader({section}) {
    return (
        <View style={[styles.row, styles.heading]}>
          <RkText rkType='primary header6'>{section.title.toUpperCase()}</RkText>
        </View>
    );
  }

}


let styles = RkStyleSheet.create(theme => ({
  heading: {
    paddingBottom: 6
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 17.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: 'center'
  },
}));