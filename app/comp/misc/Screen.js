/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 18/01/18 © **/
import React from 'react';
import {View} from 'react-native';
import _ from 'lodash';

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
    const measuredHeight =  _.get(layout, 'nativeEvent.layout.height');
    if (this.state.height == Screen.ScreenInitialHeight) {
      console.log("Screen _onLayout: Updating for new height: " + measuredHeight);
      this.setState({height: measuredHeight});
    }
  }

  render() {
    return (
        <View
            style={{flex: 1}}
            onLayout={this._onLayout}>
          <View style={{height: this.state.height}}>
            {this.props.children}
          </View>
        </View>
    );
  }

}


