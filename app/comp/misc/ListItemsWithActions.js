/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';

import {Colors, Icons} from '../../Config';

import {Icon, Avatar} from 'react-native-elements'
import {Col, Grid} from "react-native-easy-grid";

import {AvatarCircle} from "../Misc";

import {StyleSheet, View, TouchableNativeFeedback} from 'react-native';
import {RkStyleSheet, RkText, RkButton} from 'react-native-ui-kitten';

import type {TIcon} from "../../lib/types/Types";




// ListItemActionIcon *************************************************************************************
// ListItemActionIcon *************************************************************************************

type ListItemActionIconProps = {
  icon: TIcon,
  color?: string,
  size?: number,
  onPress?: () => void
};

export const ListItemActionIcon = ({icon, size, onPress}: ListItemActionIconProps) => (
    <RkButton rkType='clear' style={listItemActionIconStyles.root} onPress={onPress}>
      <Icon {...icon} size={size}/>
    </RkButton>
);

ListItemActionIcon.defaultProps = {
  icon: Icons.defaultIcon,
  size: 30,
  onPress: new Function()
};


const listItemActionIconStyles = StyleSheet.create({
  root: {
    height: '100%'
  }
});




// ListItemImage *****************************************************************************************
// ListItemImage *****************************************************************************************

type ListItemImageProps = {
  src: string,
  onPress?: () => void
};

const ListItemImage = ({src, onPress}: ListItemImageProps) => (
    <View style={listItemImageStyles.root}>
      <Avatar medium source={{uri: src}} onPress={onPress}/>
    </View>
);

ListItemImage.defaultProps = {
  onPress: new Function()
};

const listItemImageStyles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});




// ListItemWithActions ************************************************************************************
// ListItemWithActions ************************************************************************************

type ListItemWithActionProps = {
  header: Node,
  subHeader?: Node,
  content?: Node,
  avatarUri?: string,
  onPress?: () => void,
  actions?: Array<ListItemActionIconProps>,
  image?: ListItemImageProps
};

const ListItemWithActions = ({header, subHeader, content, avatarUri, onPress, actions, image}: ListItemWithActionProps) => (
    <TouchableNativeFeedback onPress={onPress}>

      <Grid style={listItemWithActionStyles.root}>

        <Col size={100} style={{marginRight: 8}}>
          <View style={listItemWithActionStyles.headerContent}>
            {avatarUri && <AvatarCircle uri={avatarUri}/>}
            <View style={listItemWithActionStyles.content}>
              <RkText style={listItemWithActionStyles.contentText}>
                <RkText>{header}</RkText>
                {subHeader && <RkText>{subHeader}</RkText>}
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

ListItemWithActions.defaultProps = {
  actions: [],
};

const listItemWithActionStyles = RkStyleSheet.create(theme => ({

  root: {
    paddingLeft: 12,
    paddingRight: 12,

    display: 'flex',
    alignItems: 'center',

    borderBottomWidth: 0,
    borderColor: theme.colors.border.base,
  },

  headerContent: {
    paddingTop: 12,
    paddingBottom: 12,

    flexDirection: 'row',
    alignItems: 'center',
  },

  content: {
    marginLeft: 12,
    flex: 1
  },

  contentText: {
    marginBottom: 3
  }

}));

export default ListItemWithActions;
