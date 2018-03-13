/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 07/01/18 © **/
import React from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import DefaultTabBar from './DefaultTabBar';
import {Colors} from "../../../Config";


type Props = {
  allowIndexChange?: Function,
  onTabChange?: Function,
  onTabChanged?: Function,
  icons: Array<Object>,
  children: Array<Node>
};

type State = {
  selectedTab: number
};

// ScrollableIconTabView ******************************************************************
// ScrollableIconTabView ******************************************************************

export default class ScrollableIconTabView extends React.Component<any, Props, State> {

  constructor(props, context) {
    super(props, context);
    this._onChangeTab = this._onChangeTab.bind(this);
    this._renderCustomTabBar = this._renderCustomTabBar.bind(this);
    this.state = {selectedTab: 0};
  }

  _onChangeTab({i, ref}) {
    const nextIndex = i;

    if (this.props.allowIndexChange)
      if (!this.props.allowIndexChange(this.state.selectedTab, nextIndex))
        return;

    if (this.props.onTabChange)
      this.props.onTabChange(nextIndex);

    // Important: Do not use setState because if you
    // trigger an update you will get indirect recursion
    this.state.selectedTab = nextIndex;

    if (this.props.onTabChanged)
      this.props.onTabChanged(nextIndex, ref);
  }


  render() {
    return (
        <ScrollableTabView
            initialPage={this.state.selectedTab}
            onChangeTab={this._onChangeTab}
            renderTabBar={this._renderCustomTabBar}

            scrollWithoutAnimation={true}
            prerenderingSiblingsNumber={2}>
          {this.props.children}
        </ScrollableTabView>
    );
  }

  _renderCustomTabBar(props) {
    return (
        <DefaultTabBar
            {...props}
            activeColor={Colors.primary}
            inactiveColor={Colors.black}
            icons={this.props.icons}/>
    );
  }

}

