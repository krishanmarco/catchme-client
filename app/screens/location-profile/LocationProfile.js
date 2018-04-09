/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import Context from '../../lib/Context';

import DaoLocation from '../../lib/daos/DaoLocation';

import DaoUser from "../../lib/daos/DaoUser";
import LocationChat from '../../comp-buisness/location/LocationChat';
import LocationGallery from "../../comp-buisness/location/LocationGallery";

import LocationMap from '../../comp-buisness/location/LocationMap';

// import TabBar from '../../comp/misc/TabBar';
import LocationProfileDataPoints from '../../lib/datapoints/LocationProfileDataPoints';
import React from 'react';

import Router from '../../lib/helpers/Router';
import StaticSectionList from '../../comp/misc/listviews/StaticSectionList';

import UserList from '../../comp-buisness/user/UserList';

import {Colors, Icons} from '../../Config';

import {Grid, Row} from "react-native-easy-grid";
import {Image, StyleSheet, View} from 'react-native';

import {ListDataPoints, ListItemInfo, ScrollableIconTabView} from "../../comp/Misc";
import {poolConnect} from '../../redux/ReduxPool';
import {RkText} from 'react-native-ui-kitten';
import type {TDataPoint, TNavigator, TSectionListDataPointSections} from "../../lib/types/Types";
import type {TLocation} from "../../lib/daos/DaoLocation";
import type {TUser} from "../../lib/daos/DaoUser";



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




// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	locationProfile: TLocation,
	authenticatedUserProfile: TUser,
	navigator: TNavigator
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
		const {locationProfile} = props;
		// Calculate the location info section value only once
		return {
			locationInfoSections: new LocationProfileDataPoints(locationProfile).build()
		};
	}

	_onUserPress(user: TUser) {
		const {navigator} = this.props;
		Router.toUserProfile(navigator, user);
	}


	render() {
		const tabs = [];

		tabs.push(this._renderTab('0', this._renderTabHome()));
		tabs.push(this._renderTab('1', this._renderTabImages()));
		tabs.push(this._renderTab('2', this._renderTabFriendsNow()));
		tabs.push(this._renderTab('3', this._renderTabFriendsFuture()));

		if (Context.isFirebaseEnabled())
			tabs.push(this._renderTab('4', this._renderTabChat()));

		tabs.push(this._renderTab('5', this._renderTabInfo()));

		// todo fix, what if <LocationChat is not added because firebase is disabled renderTabInfo would have the chats icon
		return (
			<ScrollableIconTabView
				icons={[
					Icons.locationProfile,
					Icons.locationImages,
					Icons.locationPersonNow,
					Icons.locationPersonFuture,
					Icons.locationChat,
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
		const {locationProfile} = this.props;

		return (
			<Grid style={styles.tabRootHome}>
				<Row size={-1}>
					<Image
						style={{width: '100%', height: 200}}
						resizeMode='cover'
						source={{uri: DaoLocation.gPictureUrl(locationProfile)}}/>
				</Row>

				<Row size={-1} style={styles.publicMessage}>
					<RkText rkType='primary1 hint'>{DaoLocation.gDescription(locationProfile)}</RkText>
				</Row>

				<Row size={-1} style={styles.badges}>
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
		const {locationProfile, navigator} = this.props;
		return (
			<View style={styles.tabRootImages}>
				<LocationGallery
					navigator={navigator}
					locationProfile={locationProfile}/>
			</View>
		);
	}

	_renderTabFriendsNow() {
		const {locationProfile, authenticatedUserProfile} = this.props;

		return (
			<View style={styles.tabRootFriendsNow}>
				<UserList
					users={DaoLocation.gFriendsNow(locationProfile)}
					requestIds={DaoUser.gConnectionRequestIds(authenticatedUserProfile)}
					onItemPress={this._onUserPress}/>
			</View>
		);
	}

	_renderTabFriendsFuture() {
		const {locationProfile, authenticatedUserProfile} = this.props;

		return (
			<View style={styles.tabRootFriendsFuture}>
				<UserList
					users={DaoLocation.gFriendsFuture(locationProfile)}
					requestIds={DaoUser.gConnectionRequestIds(authenticatedUserProfile)}
					onItemPress={this._onUserPress}/>
			</View>
		);
	}

	_renderTabChat() {
		const {locationProfile, authenticatedUserProfile} = this.props;

		return (
			<View style={styles.tabRootChat}>
				<LocationChat location={locationProfile} user={authenticatedUserProfile}/>
			</View>
		);
	}

	_renderTabInfo() {
		const {locationProfile} = this.props;

		return (
			<Grid style={styles.tabRootInfo}>
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

	_renderTabLocationInfoItem({item}: { item: TDataPoint }) {
		const {locationProfile, navigator} = this.props;
		return (
			<ListItemInfo
				onPress={() => LocationProfileDataPoints.handleOnItemPress(item.id, locationProfile, navigator)}
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

const styles = StyleSheet.create({
	tabRootHome: {
		flex: 1,
		alignItems: 'center'
	},
	tabRootImages: {
		flex: 1,
	},
	tabRootFriendsNow: {
		flex: 1,
		paddingTop: 8
	},
	tabRootFriendsFuture: {
		flex: 1,
		paddingTop: 8
	},
	tabRootChat: {
		flex: 1,
	},
	tabRootInfo: {
		flex: 1,
		paddingTop: 8
	},

	publicMessage: {
		marginTop: 12,
		paddingHorizontal: 16
	},
	badges: {
		marginTop: 24
	}
});