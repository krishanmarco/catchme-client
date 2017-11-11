/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';

import {View} from 'react-native';
import {RkButton, RkText, RkTextInput, RkAvoidKeyboard, RkStyleSheet} from 'react-native-ui-kitten';



export const FormFooterLink = ({text, clickableText, onPress}) => (
    <View style={Styles.textRow}>
      <RkText rkType='primary3'>{text}</RkText>
      <RkButton rkType='clear'>
        <RkText rkType='header6' onPress={onPress}>{` ${clickableText}`}</RkText>
      </RkButton>
    </View>
);


let Styles = RkStyleSheet.create(theme => ({
  textRow: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 4
  }
}));