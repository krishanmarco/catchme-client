/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';

import {Icon, Avatar} from 'react-native-elements'

import {View, TouchableNativeFeedback, Image} from 'react-native';
import {RkStyleSheet, RkText, RkButton, RkCard} from 'react-native-ui-kitten';
import DaoFeed from "../../lib/daos/DaoFeed";
import FeedHandler from '../../lib/helpers/FeedHandler';
import DaoFeaturedAd from "../../lib/daos/DaoFeaturedAd";




export default class FeaturedAdsListItem extends React.Component {

  constructor(props, context) {
    super(props, context);
    this._handleAction = this._handleAction.bind(this);
    this._onItemPress = this._onItemPress.bind(this);
  }

  _featuredAd() {
    return this.props.featuredAd;
  }

  _navigator() {
    return this.props.navigator;
  }


  _onItemPress() {
    const clickAction = DaoFeed.gClickAction(this._featuredAd());

    if (clickAction && FeedHandler.actionIsValid(this._featuredAd(), clickAction))
      this._handleAction(clickAction);
  }


  _handleAction(action) {
    FeedHandler.handleFeedAction(action, this._featuredAd(), this._navigator())
  }


  render() {
    return (
        <TouchableNativeFeedback onPress={this._onItemPress}>
          <RkCard rkType='backImg'>
            <Image rkCardImg source={{uri: DaoFeaturedAd.gImage(this._featuredAd())}}/>
            <View rkCardImgOverlay rkCardContent style={Styles.overlay}>
              <RkText rkType='header2 inverseColor'>{DaoFeaturedAd.gTitle(this._featuredAd()).toUpperCase()}</RkText>
              <RkText rkType='secondary2 inverseColor'>{DaoFeaturedAd.gSubTitle(this._featuredAd())}</RkText>
              <View rkCardFooter style={Styles.footer}>
                {this._renderActionBar()}
              </View>
            </View>
          </RkCard>
        </TouchableNativeFeedback>
    );
  }


  _renderActionBar() {
    const actions = DaoFeaturedAd.gActions(this._featuredAd())
        .filter(action => FeedHandler.actionIsValid(this._featuredAd(), action));

    return (
        <View style={Styles.actionBarContainer}>
          {actions.map((action, key) => (
              <View key={key} style={Styles.actionBarSection}>
                <RkButton rkType='clear' onPress={() => this._handleAction(action)}>
                  <Icon color='#fff' size={30} {...FeedHandler.mapActionToIcon(action)}/>
                </RkButton>
              </View>
          ))}
        </View>
    );
  }

}





// Config *************************************************************************************************
// Config *************************************************************************************************

let Styles = RkStyleSheet.create(theme => ({

  listItem: {
    paddingHorizontal: 12,
    display: 'flex',
    alignItems: 'center',
    borderBottomWidth: 0,
    borderColor: theme.colors.border.base,
  },

  listItemHeaderContent: {
    paddingVertical: 12,
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
  },

  root: {
    backgroundColor: theme.colors.screen.base
  },
  overlay: {
    justifyContent: 'flex-end',
  },
  footer: {
    width: '100%'
  },

  actionBarContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  actionBarSection: {
    paddingHorizontal: 8,
    marginLeft: 12,
  },
}));