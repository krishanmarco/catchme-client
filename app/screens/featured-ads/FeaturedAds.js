/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';

import {Icons, Colors} from '../../Config';

import {poolConnect} from '../../redux/ReduxPool';
import DaoLocation from '../../lib/daos/DaoLocation';
import DaoUser from "../../lib/daos/DaoUser";
import LocationTimings from '../../lib/helpers/ManagerWeekTimings';

import {Text, FlatList, View} from 'react-native';

import AvatarDescription from '../../comp/misc/AvatarDescription';
import TabBar from '../../comp/misc/TabBar';
import ListDataPoints from '../../comp/misc/ListDataPoints';

import CollapsingHeaderWithScroll from '../../comp/misc/CollapsingHeaderWithScroll';

import {Row, Grid, Col} from "react-native-easy-grid";
import UserList from '../../comp-buisness/user/UserList';

import {RkText} from 'react-native-ui-kitten';
import {Icon} from 'react-native-elements';
import ImageURISourceAuth from "../../lib/data/ImageURISourceAuth";

import UserLocationsSectionedList from '../../comp-buisness/user/UserLocationsSectionedList';
import Router from "../../lib/helpers/Router";
import FeaturedAdsInfoItems from '../../lib/user/FeaturedAdsInfoItems';
import StaticSectionList from '../../comp/misc/listviews/StaticSectionList';
import {ListItemInfo} from '../../comp/misc/ListItemsInfos';
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

class FeaturedAdsPresentational extends React.Component {
  static refCollapsingHeader = 'CollapsingHeaderWithScroll';


  constructor(props, context) {
    super(props, context);
    this._onTabSwitch = this._onTabSwitch.bind(this);
    this._onLocationPress = this._onLocationPress.bind(this);
    this._onUserPress = this._onUserPress.bind(this);
    this._initializeState();
  }


  _initializeState() {

    // Calculate the user info section value only once
    const userInfoSections = new FeaturedAdsInfoItems(this._userProfile())
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
    return this.props.authenticatedFeaturedAds;
  }

  _onLocationPress(location) {
    Router.toLocationProfile(this._navigator(), location);
  }

  _onUserPress(user) {
    Router.toFeaturedAds(this._navigator(), user);
  }

  _isSameUser() {
    return DaoUser.gId(this._userProfile()) === DaoUser.gId(this._authenticatedUserProfile());
  }


  _onTabSwitch(tabIndex) {

    if (tabIndex == 0 && !this.props.headerDragEnabled) {
      // The first tab has been selected and the previous headerDragEnabled
      // state is different than what is expected at tab 0

      // Snap the header to the bottom and enable interactions
      this.props.setHeaderDragEnabled(true);
      this.refs[FeaturedAds.refCollapsingHeader].snapToBottom();
      return;
    }

    if (tabIndex > 0 && this.props.headerDragEnabled) {
      // The second, third or fourth tab have been selected and the previous
      // headerDragEnabled is different than what is expected at tab > 0

      // Snap the header to the top and disable interactions
      this.props.setHeaderDragEnabled(false);
      this.refs[FeaturedAds.refCollapsingHeader].snapToTop();
    }
  }


  render() {
    return (
        <CollapsingHeaderWithScroll
            ref={FeaturedAds.refCollapsingHeader}

            dragEnabled={this.props.headerDragEnabled}

            headerHeight={150}    // Dynamic calculation??
            contentHeight={555}   // Screen - NavigationBar - TabBarTop - TabBarBottom
            contentBackgroundColor={Colors.background}

            header={this._renderProfileHeader()}
            interactable={this._renderTabBar()}/>
    );
  }


  _renderTabBar() {
    const tabs = [];

    tabs.push(<TabBar.Tab key={0} icon={Icons.friendRequestAccept}>{this._renderTabUserLocations()}</TabBar.Tab>);
    tabs.push(<TabBar.Tab key={1} icon={Icons.friendRequestAccept}>{this._renderTabUserFriends()}</TabBar.Tab>);


    if (this.state.userInfoSections.length > 0)
      tabs.push(<TabBar.Tab key={2} icon={Icons.friendRequestAccept}>{this._renderTabUserInfo()}</TabBar.Tab>);

    return (
        <Grid>
          <Row>
            <TabBar onTabChange={this._onTabSwitch}>
              {tabs}
            </TabBar>
          </Row>
        </Grid>
    );
  }

  _renderProfileHeader() {
    let userProfile = this._userProfile();

    return (
        <Grid style={{marginTop: 16}}>
          <Row>
            <AvatarDescription
                avatar={DaoUser.gPictureUrl(userProfile)}
                content={DaoUser.gPublicMessage(userProfile)}
                badges={[
                  Maps.genderToIcon(DaoUser.gGender(userProfile)),
                  Maps.reputationToIcon(DaoUser.gReputation(userProfile))
                ]}/>
          </Row>
        </Grid>
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
            renderItem={({item}) => (
                <ListItemInfo
                    onPress={() => FeaturedAdsInfoItems.handleOnItemPress(item.id, this._navigator())}
                    {...item}/>
            )}/>
    );
  }

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const FeaturedAds = poolConnect(
    // Presentational Component
    FeaturedAdsPresentational,

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


export default FeaturedAds;


FeaturedAds.propTypes = {
  userProfile: PropTypes.object.isRequired,
  authenticatedFeaturedAds: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
};

// Style ************************************************************************************************
// Style ************************************************************************************************
