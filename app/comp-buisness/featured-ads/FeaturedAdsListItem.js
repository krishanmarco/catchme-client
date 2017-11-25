/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';

import {Colors} from '../../Config';

import {Icon, Avatar} from 'react-native-elements'
import {Col, Grid} from "react-native-easy-grid";

import {AvatarCircle} from '../../comp/misc/Avatars';

import {View, TouchableNativeFeedback} from 'react-native';
import {RkStyleSheet, RkText, RkButton} from 'react-native-ui-kitten';
import DaoFeed from "../../lib/daos/DaoFeed";
import HTMLView from 'react-native-htmlview';
import {ListItemActionIcon} from '../../comp/misc/ListItemsWithActions';
import FeedHandler from '../../lib/helpers/FeedHandler';




export default class FeedListItem extends React.Component {

  constructor(props, context) {
    super(props, context);
    this._onItemPress = this._onItemPress.bind(this);
  }

  _feed() { return this.props.feed; }
  _navigator() { return this.props.navigator; }


  _onItemPress() {
    const clickAction = DaoFeed.gClickAction(this._feed());

    if (clickAction && FeedHandler.actionIsValid(this._feed(), clickAction))
      FeedHandler.handleFeedAction(clickAction, this._feed(), this._navigator());

  }


  render() {
    return (
        <TouchableNativeFeedback onPress={this._onItemPress}>
          <Grid style={Styles.listItem}>
            <Col size={100} style={{marginRight: 8}}>
              <View style={Styles.listItemHeaderContent}>
                {this._renderLeftAvatar()}
                <View style={Styles.listItemContent}>
                  <HTMLView
                      style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap'}}
                      value={DaoFeed.gContent(this._feed())}/>
                </View>
              </View>
            </Col>
            {this._renderActions()}
            {this._renderRightAvatar()}
          </Grid>
        </TouchableNativeFeedback>
    );
  }


  _renderLeftAvatar() {
    const leftAvatar = DaoFeed.gLeftAvatar(this._feed());
    return leftAvatar && <AvatarCircle uri={leftAvatar}/>
  }

  _renderRightAvatar() {
    const rightAvatar = DaoFeed.gRightAvatar(this._feed());
    return rightAvatar && (<Col size={20}><AvatarCircle uri={rightAvatar}/></Col>);
  }


  // todo: can be calculated from state
  _renderActions() {
    const actions = DaoFeed.gActions(this._feed())
        .filter(action => FeedHandler.actionIsValid(this._feed(), action));

    return actions.map((action, key) => {

      const marginRight = key === actions.length ? 0 : 8;
      const actionProps = {
        nameType: FeedHandler.mapActionToIcon(action),
        onPress: () => FeedHandler.handleFeedAction(action, this._feed(), this._navigator())
      };

      return (
          <Col key={key} size={15} style={{marginRight}}>
            <ListItemActionIcon {...actionProps}/>
          </Col>
      );

    });
  }


}





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
    justifyContent: 'center'
  },


  listItemContentText: {
    marginBottom: 3
  },

  listItemContent: {
    marginLeft: 12,
    flex: 1
  }
}));