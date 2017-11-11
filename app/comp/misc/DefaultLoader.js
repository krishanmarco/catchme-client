/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';
import {Colors} from '../../Config';
import {View} from 'react-native';
import {Bubbles} from 'react-native-loader';

const styleContainer = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
};

const DefaultLoader = ({size, height, style}) => (
    <View style={[styleContainer, {height: height}, style]}>
      <Bubbles size={size} color={Colors.primary}/>
    </View>
);

DefaultLoader.defaultProps = {
  size: 16,
  height: '100%'
};

DefaultLoader.propType = {
  size: PropTypes.number,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object])
};

export default DefaultLoader;
