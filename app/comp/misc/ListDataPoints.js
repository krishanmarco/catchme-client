/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {Grid, Row} from "react-native-easy-grid";
import {RkStyleSheet, RkText} from 'react-native-ui-kitten';
import {View} from 'react-native';


export default ({listDataPoints = [], style}) => (
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


const styles = RkStyleSheet.create(theme => ({
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