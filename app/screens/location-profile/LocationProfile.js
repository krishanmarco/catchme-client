/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';

import {Icons, Colors} from '../../Config';

import {poolConnect} from '../../redux/ReduxPool';
import DaoLocation from '../../lib/daos/DaoLocation';
import Context from '../../lib/Context';

import {StyleSheet, View, Image} from 'react-native';

// import TabBar from '../../comp/misc/TabBar';
import {ListDataPoints} from "../../comp/Misc";
import StaticSectionList from '../../comp/misc/listviews/StaticSectionList';

import {Row, Grid} from "react-native-easy-grid";
import UserList from '../../comp-buisness/user/UserList';

import {ListItemInfo, ScrollableIconTabView} from "../../comp/Misc";

import LocationMap from '../../comp-buisness/location/LocationMap';

import {RkText} from 'react-native-ui-kitten';
import DaoUser from "../../lib/daos/DaoUser";

import LocationChat from '../../comp-buisness/location/LocationChat';
import Router from '../../lib/helpers/Router';
import LocationProfileDataPoints from '../../lib/datapoints/LocationProfileDataPoints';
import LocationGallery from "../../comp-buisness/location/LocationGallery";
import type {TLocation} from "../../lib/daos/DaoLocation";
import type {TUser} from "../../lib/daos/DaoUser";
import type {TDataPoint, TSectionListDataPointSections} from "../../lib/types/Types";



// Redux ************************************************************************************************
// Redux ************************************************************************************************

const locationProfileInitState = {
  // Nothing for now
};

export function locationProfileReducer(state = locationProfileInitState, action) {
  switch (action.type) {
    // Nothing for now
  }

  return state;
}




// Flow *************************************************************************************************
// Flow *************************************************************************************************

type Props = {
  locationProfile: TLocation,
  authenticatedUserProfile: TUser,
  navigator: Object
};

type State = {
  locationInfoSections: Array<TSectionListDataPointSections>
};



// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class LocationProfilePresentational extends React.Component<any, Props, State> {

  constructor(props: Props, context) {
    super(props, context);
    this._onUserPress = this._onUserPress.bind(this);
    this._renderTabLocationInfoItem = this._renderTabLocationInfoItem.bind(this);
    this.state = this._calculateState(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this._calculateState(nextProps));
  }

  _calculateState(props: Props = this.props) {
    // Calculate the location info section value only once
    return {
      locationInfoSections: new LocationProfileDataPoints(this._locationProfile(props))
          .build()
    };
  }
  
  _navigator() {
    return this.props.navigator;
  }

  _locationProfile(props: Props = this.props) {
    return props.locationProfile;
  }

  _authenticatedUserProfile(props: Props = this.props) {
    return props.authenticatedUserProfile;
  }

  _onUserPress(user: TUser) {
    Router.toUserProfile(this._navigator(), user);
  }


  render() {
    const tabs = [];

    tabs.push(this._renderTab('0', this._renderTabHome()));
    tabs.push(this._renderTab('1', this._renderTabImages()));
    tabs.push(this._renderTab('2', this._renderTabFriendsNow()));
    tabs.push(this._renderTab('3', this._renderTabFriendsFuture()));

    if (Context.isFirebaseAuthenticated())
      tabs.push(this._renderTab('4', this._renderTabChat()));

    tabs.push(this._renderTab('5', this._renderTabInfo()));

    return (
        <ScrollableIconTabView
            icons={[
              Icons.locationProfile,
              Icons.locationImages,
              Icons.locationPersonNow,
              Icons.locationPersonFuture,
              Icons.locationChat,      // todo: what if the chat is not added?, thenn renderTabInfo would have this icon!
              Icons.locationInfo,
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
            style={{height: 510}}>
          {jsx}
        </View>
    );
  }

  _renderTabHome() {
    let locationProfile = this._locationProfile();

    return (
        <Grid style={Styles.tabRootHome}>
          <Row size={-1}>
            <Image
                style={{width: '100%', height: 200}}
                resizeMode='cover'
                source={{uri: DaoLocation.gPictureUrl(locationProfile)}} />
          </Row>

          <Row size={-1} style={Styles.publicMessage}>
            <RkText rkType='primary1 hint'>{DaoLocation.gDescription(locationProfile)}</RkText>
          </Row>

          <Row size={-1} style={Styles.badges}>
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

  _renderTabImages() {
    return (
        <View style={Styles.tabRootImages}>
          <LocationGallery
              navigator={this._navigator()}
              locationProfile={this._locationProfile()}/>
        </View>
    );
  }

  _renderTabFriendsNow() {
    let locationProfile = this._locationProfile();
    let authUserProfile = this._authenticatedUserProfile();

    return (
        <View style={Styles.tabRootFriendsNow}>
          <UserList
              users={DaoLocation.gFriendsNow(locationProfile)}
              requestIds={DaoUser.gConnectionRequestIds(authUserProfile)}
              onItemPress={this._onUserPress}/>
        </View>
    );
  }

  _renderTabFriendsFuture() {
    let locationProfile = this._locationProfile();
    let authUserProfile = this._authenticatedUserProfile();

    return (
        <View style={Styles.tabRootFriendsFuture}>
          <UserList
              users={DaoLocation.gFriendsFuture(locationProfile)}
              requestIds={DaoUser.gConnectionRequestIds(authUserProfile)}
              onItemPress={this._onUserPress}/>
        </View>
    );
  }

  _renderTabChat() {
    let locationProfile = this._locationProfile();
    let authUserProfile = this._authenticatedUserProfile();

    return (
        <View style={Styles.tabRootChat}>
          <LocationChat location={locationProfile} user={authUserProfile}/>
        </View>
    );
  }

  _renderTabInfo() {
    let locationProfile = this._locationProfile();

    return (
        <Grid style={Styles.tabRootInfo}>
          <Row size={-1}>
            <StaticSectionList
                sections={this.state.locationInfoSections}
                renderItem={this._renderTabLocationInfoItem}/>
          </Row>
          <Row size={100} style={{marginTop: 16}}>
            <LocationMap locations={[locationProfile]}/>
          </Row>
        </Grid>
    );
  }

  _renderTabLocationInfoItem({item}: {item: TDataPoint}) {
    return (
        <ListItemInfo
            onPress={() => LocationProfileDataPoints.handleOnItemPress(item.id, this._locationProfile(), this._navigator())}
            {...item}/>
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
    (dispatch) => ({}),

    // Array of pools to subscribe to
    []
);


export default LocationProfile;


// Config ***********************************************************************************************
// Config ***********************************************************************************************



const Styles = StyleSheet.create({
  tabRootHome: {
    flex: 1,
    alignItems: 'center'
  },
  tabRootImages: {
    flex: 1,
  },
  tabRootFriendsNow: {
    flex: 1,
    marginTop: 8
  },
  tabRootFriendsFuture: {
    flex: 1,
    marginTop: 8
  },
  tabRootChat: {
    flex: 1,
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