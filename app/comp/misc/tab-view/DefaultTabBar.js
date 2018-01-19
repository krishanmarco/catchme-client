// https://github.com/skv-headless/react-native-scrollable-tab-view/blob/master/DefaultTabBar.js
const React = require('react');
const {ViewPropTypes} = ReactNative = require('react-native');
const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');
const {
  StyleSheet,
  Text,
  View,
  Animated,
} = ReactNative;
const Button = require('./button/Button');

import {Icon} from 'react-native-elements';
import {Colors} from "../../../Config";




const DefaultTabBar = createReactClass({
  propTypes: {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    backgroundColor: PropTypes.string,
    activeColor: PropTypes.string,
    inactiveColor: PropTypes.string,
    textStyle: Text.propTypes.style,
    tabStyle: ViewPropTypes.style,
    renderTab: PropTypes.func,
    underlineStyle: ViewPropTypes.style,
  },

  getDefaultProps() {
    return {
      activeColor: 'navy',
      inactiveColor: 'black',
      backgroundColor: null,
    };
  },

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 2,
      backgroundColor: Colors.primary,
      bottom: 0,
    };

    const translateX = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, containerWidth / numberOfTabs],
    });
    return (
        <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor,}, this.props.style,]}>
          {this.props.tabs.map((name, page) => {
            const isTabActive = this.props.activeTab === page;
            const renderTab = this.props.renderTab || this.renderTab;
            return renderTab(name, page, isTabActive, this.props.goToPage);
          })}
          <Animated.View
              style={[
                tabUnderlineStyle,
                {
                  transform: [
                    {translateX},
                  ]
                },
                this.props.underlineStyle,
              ]}
          />
        </View>
    );
  },

  renderTabOption(name, page) {
  },

  renderTab(name, page, isTabActive, onPressHandler) {
    const icon = this.props.icons[parseInt(name)];

    return (
        <Button
            style={{flex: 1}}
            key={name}
            accessible={true}
            accessibilityLabel={name}
            accessibilityTraits='button'
            onPress={() => onPressHandler(page)}>
          <View style={[styles.tab, this.props.tabStyle]}>
            <Icon
                {...icon}
                color={this._getTextColor(icon, isTabActive)}
                size={24}/>
          </View>
        </Button>
    );
  },


  _getTextColor(icon, isTabActive) {
    const {activeColor, inactiveColor} = this.props;

    if (isTabActive) {
      if (activeColor)
        return activeColor;

      if (icon.color)
        return icon.color;

      return Colors.primary;
    }

    if (inactiveColor)
      return inactiveColor;

    if (icon.color)
      return icon.color;

    return Colors.black;
  }


});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
    paddingTop: 5,
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc',
  },
});

export default DefaultTabBar;