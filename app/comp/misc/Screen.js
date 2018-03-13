/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 18/01/18 © **/
import _ from 'lodash';
import Logger from "../../lib/Logger";
import React from 'react';
import {Colors} from "../../Config";
import {View} from 'react-native';

// Screen ***********************************************************************************************
// Screen ***********************************************************************************************

export default class Screen extends React.Component {
  static ScreenInitialHeight = 0;

  constructor(props, context) {
    super(props, context);
    this._onLayout = this._onLayout.bind(this);
    this.state = {height: 0};
  }

  _onLayout(layout) {
    // layout: {nativeEvent: { layout: {x, y, width, height}}}
    const measuredHeight = _.get(layout, 'nativeEvent.layout.height');
    if (this.state.height === Screen.ScreenInitialHeight) {
      Logger.v("Screen _onLayout: Updating for new height: " + measuredHeight);
      this.setState({height: measuredHeight});
    }
  }

  render() {
    const {children, style} = this.props;
    return (
        <View
            style={[{flex: 1, backgroundColor: Colors.background}, style]}
            onLayout={this._onLayout}>
          <View style={{height: this.state.height}}>
            {children}
          </View>
        </View>
    );
  }

}

