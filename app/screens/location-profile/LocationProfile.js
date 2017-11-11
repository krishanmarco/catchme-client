/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';

import {Icons, Colors} from '../../Config';

import {poolConnect} from '../../redux/ReduxPool';
import DaoLocation from '../../lib/daos/DaoLocation';
import Context from '../../lib/Context';
import LocationTimings from '../../lib/helpers/ManagerWeekTimings';

import {Text, FlatList, View} from 'react-native';

import AvatarDescription from '../../comp/misc/AvatarDescription';
import TabBar from '../../comp/misc/TabBar';
import ListDataPoints from '../../comp/misc/ListDataPoints';

import CollapsingHeaderWithScroll from '../../comp/misc/CollapsingHeaderWithScroll';
import StaticSectionList from '../../comp/misc/listviews/StaticSectionList';

import {Row, Grid, Col} from "react-native-easy-grid";
import UserList from '../../comp-buisness/user/UserList';
import Gallery from '../../comp/misc/Gallery';

import {ListItemInfo} from '../../comp/misc/ListItemsInfos';

import LocationMap from '../../comp-buisness/location/LocationMap';

import {RkText} from 'react-native-ui-kitten';
import {Icon} from 'react-native-elements';
import ImageURISourceAuth from "../../lib/data/ImageURISourceAuth";
import DaoUser from "../../lib/daos/DaoUser";

import LocationChat from '../../comp-buisness/location/LocationChat';
import Router from '../../lib/helpers/Router';
import LocationGallery from "../../comp-buisness/location/LocationGallery";



// Redux ************************************************************************************************
// Redux ************************************************************************************************

const locationProfileInitState = {
  headerDragEnabled: true,
};

const ACTION_LOCATION_PROFILE_SET_HEADER_DRAG_ENABLED = 'ACTION_LOCATION_PROFILE_SET_HEADER_VISIBLE';

export function locationProfileReducer(state = locationProfileInitState, action) {
  switch (action.type) {

    case ACTION_LOCATION_PROFILE_SET_HEADER_DRAG_ENABLED:
      return Object.assign({}, state, {
        headerDragEnabled: action.headerDragEnabled
      })

  }

  return state;
}


function locationProfileSetHeaderDragEnabled(enabled) {
  return {
    type: ACTION_LOCATION_PROFILE_SET_HEADER_DRAG_ENABLED,
    headerDragEnabled: enabled
  };
}


// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class LocationProfilePresentational extends React.Component {
  static refCollapsingHeader = 'CollapsingHeaderWithScroll';
  static refCameraModalLocationImages = 'refCameraModalLocationImages';


  constructor(props, context) {
    super(props, context);
    this._onTabSwitch = this._onTabSwitch.bind(this);
  }

  _onUserPress(user) {
    Router.toUserProfile(this.props.navigator, user);
  }


  _locationProfile() { return this.props.locationProfile; }
  _authenticatedUserProfile() { return this.props.authenticatedUserProfile; }


  _getTabInfo() {
    let locationProfile = this._locationProfile();

    let locationInfo = [];

    if (DaoLocation.hasPhone(locationProfile))
      locationInfo.push({icon: Icons.phone, title: DaoLocation.gPhone(locationProfile)});

    if (DaoLocation.hasEmail(locationProfile))
      locationInfo.push({icon: Icons.email, title: DaoLocation.gEmail(locationProfile)});


    if (DaoLocation.hasTimings(locationProfile)) {
      let managerWeekTimings = LocationTimings.buildFromLocation(locationProfile);

      locationInfo.push({
        icon: Icons.locationOpenTimes,
        title: managerWeekTimings.toStringRangeStatusAndCurrentDay(),
        onPress: () => Router.toTimingModal(this.props.navigator, {managerWeekTimings})
      });
    }



    if (DaoLocation.hasAddressObj(locationProfile))
      locationInfo.push({icon: Icons.address, title: DaoLocation.gAddress(locationProfile)});

    return locationInfo;
  }


  _onTabSwitch(tabIndex) {

    if (tabIndex == 0 && !this.props.headerDragEnabled) {
      // The first tab has been selected and the previous headerDragEnabled
      // state is different than what is expected at tab 0

      // Snap the header to the bottom and enable interactions
      this.props.setHeaderDragEnabled(true);
      this.refs[LocationProfile.refCollapsingHeader].snapToBottom();
      return;
    }

    if (tabIndex > 0 && this.props.headerDragEnabled) {
      // The second, third or fourth tab have been selected and the previous
      // headerDragEnabled is different than what is expected at tab > 0

      // Snap the header to the top and disable interactions
      this.props.setHeaderDragEnabled(false);
      this.refs[LocationProfile.refCollapsingHeader].snapToTop();
    }

  }


  _onAddImagePress() {
    this.refs[LocationProfile.refCollapsingHeader].open();
  }


  render() {
    return (
        <CollapsingHeaderWithScroll
            ref={LocationProfile.refCollapsingHeader}

            dragEnabled={this.props.headerDragEnabled}

            headerHeight={220}    // Dynamic calculation??
            contentHeight={514}   // Screen - NavigationBar - TabBarTop - TabBarBottom
            contentBackgroundColor={Colors.background}

            header={this._renderProfileHeader()}
            interactable={this._renderTabBar()}/>
    );
  }


  _renderTabBar() {
    const tabs = [];

    tabs.push(<TabBar.Tab key={0} icon={Icons.friendRequestAccept}>{this._renderTabLocationImages()}</TabBar.Tab>);
    tabs.push(<TabBar.Tab key={1} icon={Icons.friendRequestAccept}>{this._renderTabFriendsNow()}</TabBar.Tab>);
    tabs.push(<TabBar.Tab key={2} icon={Icons.friendRequestAccept}>{this._renderTabFriendsFuture()}</TabBar.Tab>);

    if (Context.isFirebaseAuthenticated())
      tabs.push(<TabBar.Tab key={3} icon={Icons.friendRequestAccept}>{this._renderTabChat()}</TabBar.Tab>);

    tabs.push(<TabBar.Tab key={4} icon={Icons.friendRequestAccept}>{this._renderTabInfo()}</TabBar.Tab>);

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
    let locationProfile = this._locationProfile();

    return (
        <Grid style={{marginTop: 16}}>
          <Row size={100}>
            <AvatarDescription
                avatar={DaoLocation.gPictureUrl(locationProfile)}
                content={DaoLocation.gDescription(locationProfile)}/>
          </Row>
          <Row size={50}>
            <ListDataPoints listDataPoints={[
              {name: 'Capacity', value: DaoLocation.gCapacity(locationProfile)},
              {name: 'Male', value: DaoLocation.gMen(locationProfile)},
              {name: 'Female', value: DaoLocation.gWomen(locationProfile)},
              {name: 'Total', value: DaoLocation.gTotal(locationProfile)},
            ]}/>
          </Row>
        </Grid>
    );
  }

  _renderTabLocationImages() {
    return (
        <LocationGallery
            navigator={this.props.navigator}
            locationProfile={this._locationProfile()}/>
    );
  }

  _renderTabFriendsNow() {
    let locationProfile = this._locationProfile();
    let authUserProfile = this._authenticatedUserProfile();

    return (
        <UserList
            users={DaoLocation.gFriendsNow(locationProfile)}
            requestIds={DaoUser.gConnectionRequestIds(authUserProfile)}
            onItemPress={this._onUserPress}/>
    );
  }

  _renderTabFriendsFuture() {
    let locationProfile = this._locationProfile();
    let authUserProfile = this._authenticatedUserProfile();

    return (
        <UserList
            users={DaoLocation.gFriendsFuture(locationProfile)}
            requestIds={DaoUser.gConnectionRequestIds(authUserProfile)}
            onItemPress={this._onUserPress}/>
    );
  }

  _renderTabChat() {
    let locationProfile = this._locationProfile();
    let authUserProfile = this._authenticatedUserProfile();

    return (
        <LocationChat location={locationProfile} user={authUserProfile}/>
    );
  }

  _renderTabInfo() {
    let locationProfile = this._locationProfile();
    let authUserProfile = this._authenticatedUserProfile();

    return (
        <Grid style={{marginTop: 16}}>
          <Row size={-1}>
            <StaticSectionList
                sections={[{title: 'CATCH INFO', data: this._getTabInfo(locationProfile)}]}
                renderItem={({item}) => (<ListItemInfo {...item} />)}/>
          </Row>
          <Row size={100} style={{marginTop: 16}}>
            <LocationMap locations={[locationProfile]}/>
          </Row>
        </Grid>
    );
  }

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const LocationProfile = poolConnect(
    // Presentational Component
    LocationProfilePresentational,

    // mapStateToProps
    (state) => state.locationProfileReducer,

    // mapDispatchToProps
    (dispatch) => ({
      setHeaderDragEnabled: (enabled) => dispatch(locationProfileSetHeaderDragEnabled(enabled)),
    }),

    // Array of pools to subscribe to
    []
);


export default LocationProfile;


LocationProfile.propTypes = {
  locationProfile: PropTypes.object.isRequired,
  authenticatedUserProfile: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
};

// Style ************************************************************************************************
// Style ************************************************************************************************
