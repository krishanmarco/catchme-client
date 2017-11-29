/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
// @flow
import React from 'react';
import PropTypes from 'prop-types';

import {Icons, Colors} from '../../Config';

import {poolConnect} from '../../redux/ReduxPool';
import DaoLocation from '../../lib/daos/DaoLocation';
import DaoUser from "../../lib/daos/DaoUser";
import LocationTimings from '../../lib/helpers/ManagerWeekTimings';

import {StyleSheet, Image, Text, FlatList, View, Dimensions} from 'react-native';

import {Avatar} from '../../comp/misc/Avatars';
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

  render() {
    const tabs = [];

    tabs.push(this._renderTab('0', this._renderTabHome()));
    tabs.push(this._renderTab('1', this._renderTabLocations()));
    tabs.push(this._renderTab('2', this._renderTabFriends()));

    if (this.state.userInfoSections.length > 0)
      tabs.push(this._renderTab('3', this._renderTabInfo()));

    return (
        <ScrollableTabView
            initialPage={this.props.selectedTab}
            onChangeTab={({i, ref}) => this.props.onChangeTab(i)}

            scrollWithoutAnimation={true}
            prerenderingSiblingsNumber={Infinity}
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
            style={{height: 440}}>
          {jsx}
        </View>
    );
  }

  _renderTabBarScene(sceneKey: string) {
    sceneKey = parseInt(sceneKey);
    switch (sceneKey) {
      case 0:
        return this._renderTabHome();
      case 1:
        return this._renderTabLocations();
      case 2:
        return this._renderTabFriends();
      case 3:
        return this._renderTabInfo();
      default:
        return null;
    }
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