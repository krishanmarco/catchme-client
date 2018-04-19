/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {Col, Grid} from 'react-native-easy-grid';
import {Icon} from 'react-native-elements';
import {RkStyleSheet, RkText} from 'react-native-ui-kitten';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Touchable} from "../Misc";
import type {TDataPoint} from "../../lib/types/Types";


// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = TDataPoint & {
  subTitle?: string,
  onPress?: Function,
  itemRight?: Node,
  textRkType?: string,
};

// ListItemInfo *****************************************************************************************
// ListItemInfo *****************************************************************************************

export const ListItemInfo = ({title, subTitle, icon, onPress, itemRight, textRkType}: Props) => (
    <Touchable onPress={onPress} style={styles.root}>
      <Grid style={styles.grid}>

        {!!icon && (
            <Col size={10} style={styles.icon}>
              <Icon size={24} {...icon} />
            </Col>
        )}

        <Col size={100} style={styles.text}>
          <RkText rkType={textRkType}>{title}</RkText>
          {!!subTitle && <RkText rkType='secondary4 hintColor'>{subTitle}</RkText>}
        </Col>

        {!!itemRight && (
            <Col size={24}>{itemRight}</Col>
        )}

      </Grid>
    </Touchable>
);

ListItemInfo.defaultProps = {
  textRkType: 'secondary1'
};

export default ListItemInfo;


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = RkStyleSheet.create(theme => ({
  root: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  grid: {
    alignItems: 'center'
  },
  icon: {
    marginRight: -12
  },
  text: {
    marginLeft: 24
  },
}));