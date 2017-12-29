/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';

import {Dimensions, View, Text, StyleSheet} from 'react-native';
import {RkText} from 'react-native-ui-kitten';
import {TabViewAnimated, TabViewPagerPan, TabBar, SceneMap} from 'react-native-tab-view';

import {Colors} from '../../Config';
import {Icon} from 'react-native-elements';


// Config *************************************************************************************************
// Config *************************************************************************************************

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
    //paddingVertical: 5,
  },
  tabBar: {
    backgroundColor: Colors.white,
    elevation: 0,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: {height: 0},
  }
});


// TabBar *************************************************************************************************
// TabBar *************************************************************************************************

export default class TabBarView extends React.PureComponent {

  constructor(props, context) {
    super(props, context);
    this._handleIndexChange = this._handleIndexChange.bind(this);

    // Initialize the state
    this.state = {
      index: 0,
      routes: props.tabs
    };
  }


  _handleIndexChange(index) {

    if (this.props.allowIndexChange)
      if (!this.props.allowIndexChange(this.state.index, index))
        return false;

    if (this.props.onTabChange)
      this.props.onTabChange(index);

    // Update the state of this component
    this.setState({index: index});
  }


  render() {
    return (
        <TabViewAnimated
            style={[Styles.container, this.props.style]}
            initialLayout={{height: 0, width: Dimensions.get('window').width}}

            navigationState={this.state}

            renderScene={({route}) => this.props.renderScene(route.key)}
            renderHeader={!this.props.footer ? (props) => this._renderTabBar(props) : null}
            renderFooter={this.props.footer ? (props) => this._renderTabBar(props) : null}
            onIndexChange={this._handleIndexChange}
            useNativeDriver
        />
    );
  }


  _renderIcon(routeKey: string) {
    let icon = this.state.routes.find(r => r.key == routeKey).icon;

    if (icon == null)
      return null;

    return (
        <Icon
            {...icon}
            size={this.state.index === routeKey ? 30 : 25}
            color={Colors.primary}/>
    )
  }

  _renderText(routeKey: string) {
    let text = this.state.routes.find(r => r.key == routeKey).text;

    if (text == null)
      return null;

    return (
        <RkText>{text}</RkText>
    );
  }

  _renderTabBar(props) {
    return (
        <TabBar
            {...props}
            style={Styles.tabBar}
            tabStyle={{backgroundColor: Colors.white}}
            indicatorStyle={{height: 1, backgroundColor: Colors.primary}}
            renderLabel={({route}) => this._renderText(route.key)}
            renderIcon={({route}) => this._renderIcon(route.key)}/>
    );
  }


}

TabBarView.defaultProps = {
  footer: false
};