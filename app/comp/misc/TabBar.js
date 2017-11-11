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

export default class TabBarView extends React.Component {

  // Empty react component
  static Tab = ({icon, children}) => null;


  constructor(props, context) {
    super(props, context);
    this._handleIndexChange = this._handleIndexChange.bind(this);

    // Initialize the state
    this.state = {
      index: 0,

      // Important, key has to be a string or you get an invalid Prop warning
      routes: this._getChildren(props).map((tab, key) => ({key: key.toString()}))
    };
  }


  _getChildren(props = this.props) {
    return Array.isArray(props.children)
        ? props.children
        : [props.children];
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

            renderScene={({route}) => this._getChildren()[parseInt(route.key)].props.children}
            renderHeader={!this.props.footer ? (props) => this._renderTabBar(props) : null}
            renderFooter={this.props.footer ? (props) => this._renderTabBar(props) : null}
            onIndexChange={this._handleIndexChange}/>
    );
  }



  _renderIcon(routeKey) {
    let icon = this._getChildren()[routeKey].props.icon;

    if (icon == null)
      return null;

    return (
        <Icon
            {...icon}
            size={this.state.index === routeKey ? 30 : 25}
            color={Colors.primary}/>
    )
  }

  _renderText(routeKey) {
    let text = this._getChildren()[routeKey].props.text;

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
            renderLabel={({route}) => this._renderText(parseInt(route.key))}
            renderIcon={({route}) => this._renderIcon(parseInt(route.key))}/>
    );
  }


}

TabBarView.defaultProps = {
  footer: false
};