/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {View} from 'react-native';
import {RkAvoidKeyboard, RkButton, RkStyleSheet, RkText, RkTextInput} from 'react-native-ui-kitten';

type FormFooterLinkProps = {
  text: string,
  clickableText: string,
  onPress?: () => {}
};

export const FormFooterLink = ({text, clickableText, onPress}: FormFooterLinkProps) => (
    <View style={styles.textRow}>
      <RkText rkType='primary3'>{text}</RkText>
      <RkButton rkType='clear'>
        <RkText rkType='header6' onPress={onPress}>{` ${clickableText}`}</RkText>
      </RkButton>
    </View>
);

const styles = RkStyleSheet.create(theme => ({
  textRow: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 4
  }
}));