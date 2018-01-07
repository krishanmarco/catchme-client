/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
// @flow
import React from 'react';
import PropTypes from 'prop-types';

import {Icons, Colors} from '../../Config';

import {poolConnect} from '../../redux/ReduxPool';
import DaoUser from "../../lib/daos/DaoUser";

import {StyleSheet, Image, Text, FlatList, View, Dimensions} from 'react-native';

import {Row, Grid, Col} from "react-native-easy-grid";
import UserList from '../../comp-buisness/user/UserList';

import {RkText} from 'react-native-ui-kitten';
import {Icon} from 'react-native-elements';

import UserLocationsSectionedList from '../../comp-buisness/user/UserLocationsSectionedList';
import Router from "../../lib/helpers/Router";
import UserProfileInfoItems from '../../lib/user/UserProfileInfoItems';
import StaticSectionList from '../../comp/misc/listviews/StaticSectionList';
import {ListItemInfo, ScrollableIconTabView} from "../../comp/Misc";
import Maps from "../../lib/data/Maps";

// Redux ************************************************************************************************
// Redux ************************************************************************************************

const userProfileInitState = {
  headerDragEnabled: true,
  userInfoSections: [],           // Calculated onComponentWillMount
};

const ACTION_USER_PROFILE_SET_HEADER_DRAG_ENABLED = 'ACTION_USER_PROFILE_SET_HEADER_DRAG_ENABLED';
const ACTION_USER_PROFILE_SET_USER_INFO_SECTIONS = 'ACTION_USER_PROFILE_SET_USER_INFO_SECTIONS';

export function userProfileReducer(state = userProfileInitState, action) {
  switch (action.type) {

    case ACTION_USER_PROFILE_SET_HEADER_DRAG_ENABLED:
      return Object.assign({}, state, {
        headerDragEnabled: action.headerDragEnabled
      });

    case ACTION_USER_PROFILE_SET_USER_INFO_SECTIONS:
      return Object.assign({}, state, {
        userInfoSections: action.userInfoSections
      })

  }

  return state;
}


function userProfileSetHeaderDragEnabled(enabled) {
  return {
    type: ACTION_USER_PROFILE_SET_HEADER_DRAG_ENABLED,
    headerDragEnabled: enabled
  };
}

function userProfileSetUserInfoSections(sections) {
  return {
    type: ACTION_USER_PROFILE_SET_USER_INFO_SECTIONS,
    userInfoSections: sections
  };
}


// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class UserProfilePresentational extends React.Component {


  constructor(props, context) {
    super(props, context);
    this._onLocationPress = this._onLocationPress.bind(this);
    this._onUserPress = this._onUserPress.bind(this);
    this._renderTabUserInfoItem = this._renderTabUserInfoItem.bind(this);
    this._initializeState();
  }


  _initializeState() {

    // Calculate the user info section value only once
    const userInfoSections = new UserProfileInfoItems(this._userProfile())
        .includeSettingsAndHelpIf(this._isSameUser())
        .build();

    this.state = {
      userInfoSections: userInfoSections
    };
  }


  _navigator() {
    return this.props.navigator;
  }

  _userProfile() {
    return this.props.userProfile;
  }

  _authenticatedUserProfile() {
    return this.props.authenticatedUserProfile;
  }

  _onLocationPress(location) {
    Router.toLocationProfile(this._navigator(), location);
  }

  _onUserPress(user) {
    Router.toUserProfile(this._navigator(), user);
  }

  _isSameUser() {
    return DaoUser.gId(this._userProfile()) === DaoUser.gId(this._authenticatedUserProfile());
  }

  render() {
    const tabs = [];

    tabs.push(this._renderTab('0', this._renderTabHome()));
    tabs.push(this._renderTab('1', this._renderTabLocations()));
    tabs.push(this._renderTab('2', this._renderTabFriends()));

    if (this.state.userInfoSections.length > 0)
      tabs.push(this._renderTab('3', this._renderTabInfo()));

    return (
        <ScrollableIconTabView
          icons={[
            Icons.friendRequestAccept,
            Icons.friendRequestAccept,
            Icons.friendRequestAccept,
            Icons.friendRequestAccept
          ]}>
          {tabs}
        </ScrollableIconTabView>
    );
  }

  _renderTab(tabLabel, jsx) {
    return (
        <View
            key={tabLabel}
            tabLabel={tabLabel}
            style={{height: 440}}>
          {jsx}
        </View>
    );
  }

  _renderTabHome() {
    let userProfile = this._userProfile();

    return (
        <Grid style={[Styles.tabRootHome]}>
          <Row size={-1}>
            <Image
                style={{width: '100%', height: 200}}
                resizeMode='cover'
                source={{uri: DaoUser.gPictureUrl(userProfile)}} />
          </Row>

          <Row size={-1} style={[Styles.publicMessage]}>
            <RkText rkType='primary1 hint'>{DaoUser.gPublicMessage(userProfile)}</RkText>
          </Row>

          <Row size={-1} style={[Styles.badges]}>
            {[
              Maps.genderToIcon(DaoUser.gGender(this._userProfile())),
              Maps.reputationToIcon(DaoUser.gReputation(this._userProfile()))
            ].map((b, k) => (
                <Col key={k}>
                  <Icon style={{marginRight: 8}} size={50} {...b}/>
                </Col>
            ))}
          </Row>
        </Grid>
    );
  }

  _renderTabLocations() {
    return (
        <View style={[Styles.tabRootLocations]}>
          <UserLocationsSectionedList
              userProfile={this._userProfile()}
              onItemPress={this._onLocationPress}/>
        </View>
    );
  }

  _renderTabFriends() {
    let userProfile = this._userProfile();
    let authUserProfile = this._authenticatedUserProfile();

    return (
        <View style={[Styles.tabRootFriends]}>
          <UserList
              users={DaoUser.gConnectionsFriends(userProfile)}
              friendIds={DaoUser.gConnectionFriendIds(authUserProfile)}
              onItemPress={this._onUserPress}/>
        </View>
    );
  }

  _renderTabInfo() {
    return (
        <View style={[Styles.tabRootInfo]}>
          <StaticSectionList
              sections={this.state.userInfoSections}
              renderItem={this._renderTabUserInfoItem}/>
        </View>
    );
  }

  _renderTabUserInfoItem({item}) {
    return (
        <ListItemInfo
            onPress={() => UserProfileInfoItems.handleOnItemPress(item.id, this._navigator())}
            {...item}/>
    );
  }

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const UserProfile = poolConnect(
    // Presentational Component
    UserProfilePresentational,

    // mapStateToProps
    (state) => state.userProfileReducer,

    // mapDispatchToProps
    (dispatch) => ({
      setHeaderDragEnabled: (enabled) => dispatch(userProfileSetHeaderDragEnabled(enabled)),
      setUserInfoSections: (sections) => dispatch(userProfileSetUserInfoSections(sections)),
    }),

    // Array of pools to subscribe to
    []
);


export default UserProfile;


UserProfile.propTypes = {
  userProfile: PropTypes.object.isRequired,
  authenticatedUserProfile: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
};

// Style ************************************************************************************************
// Style ************************************************************************************************

const Styles = StyleSheet.create({
  tabRootHome: {
    flex: 1,
    alignItems: 'center'
  },
  tabRootLocations: {
    flex: 1,
    marginTop: 8
  },
  tabRootFriends: {
    flex: 1,
    marginTop: 8
  },
  tabRootInfo: {
    flex: 1,
    marginTop: 8
  },

  publicMessage: {
    marginTop: 12,
    paddingHorizontal: 16
  },
  badges: {
    marginTop: 24
  }
});