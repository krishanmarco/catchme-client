/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';
import {AvatarCircle} from './Avatars';
import {Col, Row, Grid} from "react-native-easy-grid";


import {View, ScrollView} from 'react-native';
import {RkStyleSheet, RkText, RkButton} from 'react-native-ui-kitten';
import {Icon} from 'react-native-elements';




let styles = RkStyleSheet.create(theme => ({
  header: {
    paddingHorizontal: 12,
    marginBottom: 16,
  }
}));
// {marginTop: -32, justifyContent: 'center'}

const AvatarDescription = ({avatar, content, badges, maxHeight, style}) => (
    <Grid style={[styles.header, style]}>
      <Col size={50}>
        <AvatarCircle uri={avatar} rkType='big'/>
      </Col>

      <Col size={100} style={{marginTop: 4}}>
        <View>
          <RkText rkType='primary4'>{content} {content}</RkText>
          <Grid style={{marginTop: 4}}>
            <Row>
              {badges.map((b, k) => <Icon key={k} style={{marginRight: 8}} size={24} {...b}/>)}
            </Row>
          </Grid>
        </View>
      </Col>
    </Grid>
);

AvatarDescription.defaultProps = {
  badges: []
};

export default AvatarDescription;


