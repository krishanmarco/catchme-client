/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';

import {Colors} from '../../Config';

import {Icon, Avatar} from 'react-native-elements'
import {Col, Grid} from "react-native-easy-grid";

import {AvatarCircle} from "../Misc";


import {View, TouchableNativeFeedback} from 'react-native';
import {RkStyleSheet, RkText, RkButton} from 'react-native-ui-kitten';


// Config *************************************************************************************************
// Config *************************************************************************************************

let Styles = RkStyleSheet.create(theme => ({

  listItem: {
    paddingLeft: 12,
    paddingRight: 12,

    display: 'flex',
    alignItems: 'center',

    borderBottomWidth: 0,
    borderColor: theme.colors.border.base,
  },

  listItemHeaderContent: {
    paddingTop: 12,
    paddingBottom: 12,

    flexDirection: 'row',
    alignItems: 'center',
  },


  listItemContentText: {
    marginBottom: 3
  },

  listItemContent: {
    marginLeft: 12,
    flex: 1
  }
}));




// ListItemActionIcon *************************************************************************************
// ListItemActionIcon *************************************************************************************

export const ListItemActionIcon = ({nameType, color, size, onPress}) => (
    <RkButton rkType='clear' style={{height: '100%'}} onPress={onPress}>
      <Icon color={color} {...nameType} size={size} />
    </RkButton>
);

ListItemActionIcon.defaultProps = {
  size: 30,
  color: Colors.black,
  onPress: new Function()
};

ListItemActionIcon.propTypes = {

  nameType: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }).isRequired,

  size: PropTypes.number,
  color: PropTypes.string,
  onPress: PropTypes.func
};




// ListItemImage *****************************************************************************************
// ListItemImage *****************************************************************************************

const ListItemImage = ({src, onPress}) => (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Avatar medium source={{uri: src}} onPress={onPress}/>
    </View>
);

ListItemImage.defaultProps = {
  onPress: new Function()
};

ListItemImage.propTypes = {
  src: PropTypes.string.isRequired,
  onPress: PropTypes.func
};




// ListItemWithActions ************************************************************************************
// ListItemWithActions ************************************************************************************

const ListItemWithAction = ({header, header2, content, avatar, onPress, actions, image}) => (
    <TouchableNativeFeedback onPress={onPress}>

      <Grid style={Styles.listItem}>

        <Col size={100} style={{marginRight: 8}}>
          <View style={Styles.listItemHeaderContent}>
            {avatar && <AvatarCircle uri={avatar}/>}
            <View style={Styles.listItemContent}>
              <RkText style={Styles.listItemContentText}>
                <RkText>{header}</RkText>
                {header2 && <RkText>{header2}</RkText>}
              </RkText>
              {content && <RkText numberOfLines={1} rkType='secondary5 hintColor'>{content}</RkText>}
            </View>
          </View>
        </Col>

        {actions.map((action, key) => (
            <Col key={key} size={15} style={{marginRight: key === actions.length ? 0 : 8}}>
              <ListItemActionIcon {...action}/>
            </Col>
        ))}

        {image && (
            <Col size={20}>
              <ListItemImage {...image}/>
            </Col>
        )}

      </Grid>
    </TouchableNativeFeedback>
);

ListItemWithAction.defaultProps = {
  actions: [],
};

ListItemWithAction.propTypes = {
  header: PropTypes.node.isRequired,
  header2: PropTypes.node,
  content: PropTypes.node,
  avatar: PropTypes.string,
  onPress: PropTypes.func,

  actions: PropTypes.arrayOf(PropTypes.shape(ListItemActionIcon.propTypes)),
  image: PropTypes.shape(ListItemImage.propTypes)
};

export default ListItemWithAction;
