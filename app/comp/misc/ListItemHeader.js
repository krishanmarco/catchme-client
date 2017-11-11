/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {RkStyleSheet, RkText} from 'react-native-ui-kitten';


type Props = {
  name: string,
  style: Object
};


export default ({name = ' ', style}: Props) => (
    <View style={[Styles.row, style]}>
      <RkText rkType='primary header5'>{name.toUpperCase()}</RkText>
    </View>
);


const Styles = RkStyleSheet.create(theme => ({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 17.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: 'center'
  },
}));