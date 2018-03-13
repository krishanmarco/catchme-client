/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';

import {ListItemHeader} from "../../Misc";
import {RkStyleSheet, RkText} from 'react-native-ui-kitten';
import {SectionList, StyleSheet, View} from 'react-native';
import type {TSectionListDataPointSections} from "../../../lib/types/Types";

// Flow *************************************************************************************************
// Flow *************************************************************************************************

type Props = {
  sections: Array<TSectionListDataPointSections>,
  keyExtractor?: (TSectionListDataPointSections, number) => number
};




// StaticSectionList ************************************************************************************
// StaticSectionList ************************************************************************************

export default class StaticSectionList extends React.PureComponent<any, Props, void> {

  constructor(props, context) {
    super(props, context);
    this._keyExtractor = this._keyExtractor.bind(this);
  }


  _keyExtractor(item, index) {
    if (this.props.keyExtractor)
      return this.props.keyExtractor(item, index);

    return index;
  }


  render() {

    return (
          <SectionList
              sections={this.props.sections}
              renderItem={this.props.renderItem}
              keyExtractor={this._keyExtractor}
              renderSectionHeader={this._renderHeader}
          />
    );
  }

  _renderHeader({section}) {
    return (<ListItemHeader name={section.title}/>);
  }

}




// Config **********************************************************************************************
// Config **********************************************************************************************

const styles = RkStyleSheet.create(theme => ({
  // Nothing for now
}));