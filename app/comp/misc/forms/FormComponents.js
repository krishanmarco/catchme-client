/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {RkButton, RkText} from 'react-native-ui-kitten';
import {StyleSheet, View} from 'react-native';

type FormFooterLinkProps = {
	text: string,
	clickableText: string,
	onPress?: () => void
};

export const FormFooterLink = ({text, clickableText, onPress}: FormFooterLinkProps) => (
    <View style={styles.textRow}>
      <RkText rkType='primary3'>{text}</RkText>
      <RkButton rkType='clear'>
        <RkText rkType='header6' onPress={onPress}>{` ${clickableText}`}</RkText>
      </RkButton>
    </View>
);

const styles = StyleSheet.create({
  textRow: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 4
  }
});