/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {RkStyleSheet, RkText} from 'react-native-ui-kitten';
import {Icon} from 'react-native-elements';
import {Col, Grid} from 'react-native-easy-grid';
import type {TDataPoint} from "../../lib/types/Types";


// Flow *************************************************************************************************
// Flow *************************************************************************************************

type Props = TDataPoint & {
  subTitle?: string,
  onPress?: Function,
  itemRight?: Node,
  textRkType?: string,
};

// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

export const ListItemInfo = ({title, subTitle, icon, onPress, itemRight, textRkType}: Props) => (
    <TouchableOpacity onPress={onPress} style={styles.root}>
      <Grid style={styles.grid}>

        {icon && (
            <Col size={10} style={styles.icon}>
              <Icon size={24} {...icon} />
            </Col>
        )}

        <Col size={100} style={styles.text}>
          <RkText rkType={textRkType}>{title}</RkText>
          {subTitle && <RkText rkType='secondary4 hintColor'>{subTitle}</RkText>}
        </Col>

        {itemRight && (
            <Col size={24}>{itemRight}</Col>
        )}

      </Grid>
    </TouchableOpacity>
);

ListItemInfo.defaultProps = {
  textRkType: 'secondary1'
};

export default ListItemInfo;


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