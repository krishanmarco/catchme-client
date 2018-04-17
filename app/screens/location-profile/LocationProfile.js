/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import Context from '../../lib/Context';
import DaoLocation from '../../lib/daos/DaoLocation';
import DaoUser from "../../lib/daos/DaoUser";
import LocationChat from '../../comp-buisness/location/LocationChat';
import LocationGallery from "../../comp-buisness/location/LocationGallery";
import LocationMap from '../../comp-buisness/location/LocationMap';
import LocationProfileDataPoints from '../../lib/datapoints/LocationProfileDataPoints';
import NavbarHandlerLocationProfile from "../../lib/navigation/NavbarHandlerLocationProfile";
import React from 'react';
import Router from '../../lib/navigation/Router';
import StaticSectionList from '../../comp/misc/listviews/StaticSectionList';
import UserList from '../../comp-buisness/user/UserList';
import {Grid, Row} from "react-native-easy-grid";
import {Icons} from '../../Config';
import {Image, StyleSheet, View} from 'react-native';
import {ListDataPoints, ListItemInfo, ScrollableIconTabView} from "../../comp/Misc";
import {poolConnect} from '../../redux/ReduxPool';
import {RkText} from 'react-native-ui-kitten';
import type {TDataPoint, TNavigator, TSectionListDataPointSections} from "../../lib/types/Types";
import type {TLocation} from "../../lib/daos/DaoLocation";
import type {TUser} from "../../lib/daos/DaoUser";


// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	navigator: TNavigator,
	locationProfile: TLocation,
	authUserProfile: TUser,
	navbarHandler: NavbarHandlerLocationProfile,
	onGalleryImageAdded: Function,
};

type State = {
	locationInfoSections: Array<TSectionListDataPointSections>
};

const locationProfileTabIcons = {
	0: Icons.locationProfile,
	1: Icons.locationImages,
	2: Icons.locationPersonNow,
	3: Icons.locationPersonFuture,
	4: Icons.locationChat,
	5: Icons.locationInfo,
};


// _LocationProfile *************************************************************************************
// _LocationProfile *************************************************************************************

class _LocationProfile extends React.Component<void, Props, State> {
	static idxProfile = 0;
	static idxImages = 1;
	static idxPersonNow = 2;
	static idxPersonFuture = 3;

	constructor(props: Props, context) {
		super(props, context);
		this._onUserPress = this._onUserPress.bind(this);
		this._renderTabLocationInfoItem = this._renderTabLocationInfoItem.bind(this);
		this._onTabChanged = this._onTabChanged.bind(this);
		this.state = this._calculateState(props);
	}

	componentWillReceiveProps(nextProps) {
		this.setState(this._calculateState(nextProps));
	}

	_onTabChanged(changedToIndex) {
		const {navbarHandler, onGalleryImageAdded} = this.props;

		switch (changedToIndex) {
			case _LocationProfile.idxProfile:
				navbarHandler.showButtonFollow();
				break;
			case _LocationProfile.idxImages:
				navbarHandler.showButtonAddLocationImage(onGalleryImageAdded);
				break;
			case _LocationProfile.idxPersonNow:
			case _LocationProfile.idxPersonFuture:
				navbarHandler.showButtonAddStatus();
				break;
			default:
				navbarHandler.showNoButtons();
		}
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
		Router.toModalUserProfile(
			navigator,
			{userId: DaoUser.gId(user)},
			DaoUser.gName(user)
		);
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

		return (
			<ScrollableIconTabView
				icons={locationProfileTabIcons}
				onTabChanged={this._onTabChanged}>
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
			<Grid style={styles.tabHomeRoot}>
				<Row size={-1}>
					<Image
						style={styles.tabHomeAvatar}
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
		const {locationProfile} = this.props;
		return (
			<View style={styles.tabRootImages}>
				<LocationGallery
					locationProfile={locationProfile}/>
			</View>
		);
	}

	_renderTabFriendsNow() {
		const {locationProfile, authUserProfile} = this.props;

		return (
			<View style={styles.tabRootFriendsNow}>
				<UserList
					users={DaoLocation.gFriendsNow(locationProfile)}
					requestIds={DaoUser.gConnectionRequestIds(authUserProfile)}
					onItemPress={this._onUserPress}/>
			</View>
		);
	}

	_renderTabFriendsFuture() {
		const {locationProfile, authUserProfile} = this.props;

		return (
			<View style={styles.tabRootFriendsFuture}>
				<UserList
					users={DaoLocation.gFriendsFuture(locationProfile)}
					requestIds={DaoUser.gConnectionRequestIds(authUserProfile)}
					onItemPress={this._onUserPress}/>
			</View>
		);
	}

	_renderTabChat() {
		const {locationProfile, authUserProfile, navigator} = this.props;
		return (
			<View style={styles.tabRootChat}>
				<LocationChat
					navigator={navigator}
					location={locationProfile}
					user={authUserProfile}/>
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

const LocationProfile = poolConnect(_LocationProfile,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[]
);
export default LocationProfile;


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	tabHomeRoot: {
		flex: 1,
		alignItems: 'center'
	},
	tabHomeAvatar: {
		width: '100%',
		height: 200
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