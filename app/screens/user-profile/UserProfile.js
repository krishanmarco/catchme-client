/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
// @flow
import React from 'react';
import PropTypes from 'prop-types';

import {Icons, Colors} from '../../Config';

import {poolConnect} from '../../redux/ReduxPool';
import DaoLocation from '../../lib/daos/DaoLocation';
import DaoUser from "../../lib/daos/DaoUser";
import LocationTimings from '../../lib/helpers/ManagerWeekTimings';

import {Text, FlatList, View, Dimensions} from 'react-native';

import AvatarDescription from '../../comp/misc/AvatarDescription';
// import TabBar from '../../comp/misc/TabBar';
import ListDataPoints from '../../comp/misc/ListDataPoints';

import CollapsingHeaderWithScroll from '../../comp/misc/CollapsingHeaderWithScroll';

import {Row, Grid, Col} from "react-native-easy-grid";
import UserList from '../../comp-buisness/user/UserList';

import {RkText} from 'react-native-ui-kitten';
import {Icon} from 'react-native-elements';
import ImageURISourceAuth from "../../lib/data/ImageURISourceAuth";

import UserLocationsSectionedList from '../../comp-buisness/user/UserLocationsSectionedList';
import Router from "../../lib/helpers/Router";
import UserProfileInfoItems from '../../lib/user/UserProfileInfoItems';
import StaticSectionList from '../../comp/misc/listviews/StaticSectionList';
import {ListItemInfo} from '../../comp/misc/ListItemsInfos';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import DefaultTabBar from '../../comp/misc/tab-view/DefaultTabBar';
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
  static refCollapsingHeader = 'CollapsingHeaderWithScroll';


  constructor(props, context) {
    super(props, context);
    this._onTabSwitch = this._onTabSwitch.bind(this);
    this._onLocationPress = this._onLocationPress.bind(this);
    this._onUserPress = this._onUserPress.bind(this);
    this._renderTabBarScene = this._renderTabBarScene.bind(this);
    this._renderCustomTabBar = this._renderCustomTabBar.bind(this);
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


  _onTabSwitch(tabIndex) {
    /*
        if (tabIndex == 0 && !this.props.headerDragEnabled) {
          // The first tab has been selected and the previous headerDragEnabled
          // state is different than what is expected at tab 0

          // Snap the header to the bottom and enable interactions
          this.props.setHeaderDragEnabled(true);
          this.refs[UserProfile.refCollapsingHeader].snapToBottom();
          return;
        }

        if (tabIndex > 0 && this.props.headerDragEnabled) {
          // The second, third or fourth tab have been selected and the previous
          // headerDragEnabled is different than what is expected at tab > 0

          // Snap the header to the top and disable interactions
          this.props.setHeaderDragEnabled(false);
          this.refs[UserProfile.refCollapsingHeader].snapToTop();
        }
        */
  }

  /*
    render() {
      return (
          <CollapsingHeaderWithScroll
              ref={UserProfile.refCollapsingHeader}

              dragEnabled={this.props.headerDragEnabled}

              headerHeight={150}    // Dynamic calculation??
              contentHeight={555}   // Screen - NavigationBar - TabBarTop - TabBarBottom
              contentBackgroundColor={Colors.background}

              header={this._renderTabProfileHeader()}
              interactable={this._renderTabBar()}/>
      );
    }
    */


  render() {
    const tabs = [];

    tabs.push(this._renderTab('0', this._renderProfileHeader()));
    tabs.push(this._renderTab('1', this._renderTabUserLocations()));
    tabs.push(this._renderTab('2', this._renderTabUserFriends()));

    if (this.state.userInfoSections.length > 0)
      tabs.push(this._renderTab('3', this._renderTabUserInfo()));

    return (
        <ScrollableTabView
            scrollWithoutAnimation={true}
            renderTabBar={(props) => this._renderCustomTabBar(props)}>
          {tabs}
        </ScrollableTabView>
    );
  }

  _renderCustomTabBar(props) {
    return (
        <DefaultTabBar
            {...props}
            icons={[
              Icons.friendRequestAccept,
              Icons.friendRequestAccept,
              Icons.friendRequestAccept,
              Icons.friendRequestAccept,
            ]}/>
    );
  }

  _renderTab(tabLabel, jsx) {
    return (
        <View
            key={tabLabel}
            tabLabel={tabLabel}
            style={{paddingVertical: 8, height: 440}}>
          {jsx}
        </View>
    );
  }

  _renderTabBarScene(sceneKey: string) {
    sceneKey = parseInt(sceneKey);
    switch (sceneKey) {
      case 0:
        return this._renderProfileHeader();
      case 1:
        return this._renderTabUserLocations();
      case 2:
        return this._renderTabUserFriends();
      case 3:
        return this._renderTabUserInfo();
      default:
        return null;
    }
  }

  _renderProfileHeader() {
    let userProfile = this._userProfile();

    return (
        <AvatarDescription
            avatar={DaoUser.gPictureUrl(userProfile)}
            content={DaoUser.gPublicMessage(userProfile)}
            badges={[
              Maps.genderToIcon(DaoUser.gGender(this._userProfile())),
              Maps.reputationToIcon(DaoUser.gReputation(this._userProfile()))
            ]}/>
    );
  }

  _renderTabUserLocations() {
    return (
        <UserLocationsSectionedList
            userProfile={this._userProfile()}
            onItemPress={this._onLocationPress}/>
    );
  }

  _renderTabUserFriends() {
    let userProfile = this._userProfile();
    let authUserProfile = this._authenticatedUserProfile();

    return (
        <UserList
            users={DaoUser.gConnectionsFriends(userProfile)}
            friendIds={DaoUser.gConnectionFriendIds(authUserProfile)}
            onItemPress={this._onUserPress}/>
    );
  }

  _renderTabUserInfo() {
    return (
        <StaticSectionList
            sections={this.state.userInfoSections}
            renderItem={this._renderTabUserInfoItem}/>
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
