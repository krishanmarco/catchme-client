/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';
import {AvatarCircle} from './Avatars';
import {Col, Row, Grid} from "react-native-easy-grid";


import {View} from 'react-native';
import {RkStyleSheet, RkText, RkButton} from 'react-native-ui-kitten';
import {Icon} from 'react-native-elements';



let styles = RkStyleSheet.create(theme => ({
  header: {
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  section: {
    flex: 1,
    alignItems: 'center'
  },
  space: {
    marginBottom: 3
  },
}));


const ListDataPoints = ({listDataPoints, style}) => (
    <Grid style={[styles.header, style]}>
      <Row>
      {listDataPoints.map((dp, key) => (
          <View key={key} style={styles.section}>
            <RkText rkType='header4' style={styles.space}>{dp.value}</RkText>
            <RkText rkType='secondary2 hintColor'>{dp.name}</RkText>
          </View>
      ))}
      </Row>
    </Grid>
);

export default ListDataPoints;