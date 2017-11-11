/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';

import {Colors, Icons} from '../../Config';

import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {RkStyleSheet, RkText} from 'react-native-ui-kitten';
import {Icon} from 'react-native-elements';
import {Grid, Row, Col} from 'react-native-easy-grid';


export const ListItemInfo = ({title, subTitle, icon, onPress, itemRight, textRkType}) => (
    <TouchableOpacity style={Styles.root} onPress={onPress}>
      <Grid style={Styles.grid}>

        {icon && (
            <Col style={{marginRight: -16}} size={10}>
              <Icon size={30} {...icon} />
            </Col>
        )}

        <Col style={{marginLeft: 24}} size={100}>
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

ListItemInfo.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  icon: PropTypes.object,
  onPress: PropTypes.func,
  itemRight: PropTypes.node,
};


let Styles = RkStyleSheet.create(theme => ({
  root: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  grid: {
    alignItems: 'center'
  }
}));