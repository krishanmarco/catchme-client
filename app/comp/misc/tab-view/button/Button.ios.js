// https://github.com/skv-headless/react-native-scrollable-tab-view/blob/master/Button.ios.js
const React = require('react');
const ReactNative = require('react-native');
const {
  TouchableOpacity,
  View,
} = ReactNative;

const Button = (props) => {
  return <TouchableOpacity {...props}>
    {props.children}
  </TouchableOpacity>;
};

module.exports = Button;
