/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';
import {AvatarCircle} from './Avatars';
import {Col, Row, Grid} from "react-native-easy-grid";


import {View, ScrollView, StyleSheet} from 'react-native';
import {RkStyleSheet, RkText, RkButton} from 'react-native-ui-kitten';
import {Icon} from 'react-native-elements';




let styles = StyleSheet.create({
  header: {
    marginTop: 24,
    paddingHorizontal: 12,
    marginBottom: 16,
    alignItems: 'center'
  },
  publicMessage: {
    marginTop: 12,
    paddingHorizontal: 16
  },
  badges: {
    marginTop: 24
  }
});

const AvatarDescription = ({avatar, content, badges, maxHeight, style}) => (
    <ScrollView>
      <Grid style={[styles.header, style]}>
        <Row>
          <AvatarCircle uri={avatar} rkType='huge'/>
        </Row>

        <Row style={[styles.publicMessage]}>
          <RkText rkType='primary1 hint'>{content} {content}</RkText>
        </Row>

        <Row style={[styles.badges]}>
          {badges.map((b, k) => <Icon key={k} style={{marginRight: 8}} size={50} {...b}/>)}
        </Row>
      </Grid>
    </ScrollView>
);

AvatarDescription.defaultProps = {
  badges: []
};

export default AvatarDescription;


