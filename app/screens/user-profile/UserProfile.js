/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoLocation from '../../lib/daos/DaoLocation';
import DaoUser from '../../lib/daos/DaoUser';
import LocationList from '../../comp-buisness/location/LocationList';
import Maps from '../../lib/data/Maps';
import NavbarHandlerUserProfile from '../../lib/navigation/NavbarHandlerUserProfile';
import React from 'react';
import Router from '../../lib/navigation/Router';
import StaticSectionList from '../../comp/misc/listviews/StaticSectionList';
import UserList from '../../comp-buisness/user/UserList';
import UserLocationsStatusList from '../../comp-buisness/user/UserLocationsStatusList';
import UserProfileInfoItems from '../../lib/datapoints/UserProfileDataPoints';
import {AvatarFull, FlatListEmpty, ListItemInfo, ScrollableIconTabView} from '../../comp/Misc';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {Const, Icons} from '../../Config';
import {Icon} from 'react-native-elements';
import {listItemInfo} from '../../lib/theme/Styles';
import {poolConnect} from '../../redux/ReduxPool';
import {RkText} from 'react-native-ui-kitten';
import {StyleSheet, View} from 'react-native';
import {t} from '../../lib/i18n/Translations';
import type {TDataPoint, TNavigator, TSectionListDataPointSections} from '../../lib/types/Types';
import type {TLocation} from '../../lib/daos/DaoLocation';
import type {TUser} from '../../lib/daos/DaoUser';

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	userProfile: TUser,
	authUserProfile: TUser,
	navigator: TNavigator,
	navbarHandler: NavbarHandlerUserProfile,
};

type State = {
	userInfoSections: Array<TSectionListDataPointSections>
};

const userProfileTabIcons = {
	0: Icons.userProfile,
	1: Icons.userLocationStatuses,
	2: Icons.userLocationFavorites,
	3: Icons.userFriends,
	4: Icons.userInfo
};

// _UserProfile *****************************************************************************************
// _UserProfile *****************************************************************************************

class _UserProfile extends React.Component<void, Props, State> {
	static idxProfile = 0;

	constructor(props: Props, context) {
		super(props, context);
		this._onLocationPress = this._onLocationPress.bind(this);
		this._onUserPress = this._onUserPress.bind(this);
		this._onLocationSearchPress = this._onLocationSearchPress.bind(this);
		this._onUserSearchPress = this._onUserSearchPress.bind(this);
		this._onTabChanged = this._onTabChanged.bind(this);
		this._renderTabUserInfoItem = this._renderTabUserInfoItem.bind(this);
		this._renderFavoriteListEmpty = this._renderFavoriteListEmpty.bind(this);
		this._renderFriendsListEmpty = this._renderFriendsListEmpty.bind(this);
		this.state = this._calculateState(props);
	}

	componentWillReceiveProps(nextProps) {
		this.setState(this._calculateState(nextProps));
	}

	_onTabChanged(changedToIndex) {
		const {navbarHandler} = this.props;

		switch (changedToIndex) {
			case _UserProfile.idxProfile:
				navbarHandler.showButtonAddOrAcceptConnection();
				break;
			default:
				navbarHandler.showNoButtons();
		}
	}

	_calculateState(props: Props) {
		const {userProfile} = props;

		// Calculate the user info section value only once
		return {
			userInfoSections: new UserProfileInfoItems(userProfile)
				.includeSettingsAndHelpIf(this._isSameUser(props))
				.build()
		};
	}

	_onLocationSearchPress() {
		const {navigator} = this.props;
		Router.toSearchTab(navigator);
	}

	_onUserSearchPress() {
		const {navigator} = this.props;
		Router.toSearchTab(navigator);
	}

	_onLocationPress(location: TLocation) {
		const {navigator} = this.props;
		Router.toModalLocationProfile(
			navigator,
			{locationId: DaoLocation.gId(location)},
			DaoLocation.gName(location)
		);
	}

	_onUserPress(user: TUser) {
		const {navigator} = this.props;
		Router.toModalUserProfile(
			navigator,
			{userId: DaoUser.gId(user)},
			DaoUser.gName(user)
		);
	}

	_isSameUser(props: Props = this.props): boolean {
		const {userProfile, authUserProfile} = props;
		return DaoUser.isSameUser(authUserProfile, userProfile);
	}

	render() {
		const {userInfoSections} = this.state;

		const tabs = [];

		tabs.push(this._renderTab('0', this._renderTabHome()));
		tabs.push(this._renderTab('1', this._renderTabLocationStatuses()));
		tabs.push(this._renderTab('2', this._renderTabFavoriteLocations()));
		tabs.push(this._renderTab('3', this._renderTabFriends()));

		if (userInfoSections.length > 0)
			tabs.push(this._renderTab('4', this._renderTabInfo()));

		return (
			<ScrollableIconTabView
				icons={userProfileTabIcons}
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
				style={styles.tabView}>
				{jsx}
			</View>
		);
	}

	_renderTabHome() {
		const {userProfile} = this.props;

		return (
			<Grid style={styles.tabHome}>
				<Row size={-1}>
					<View style={styles.avatar}>
						<AvatarFull
							source={{uri: DaoUser.gPictureUrl(userProfile)}}
							defaultUri={Const.userDefaultAvatar}/>
					</View>
				</Row>

				<Row size={-1} style={styles.publicMessage}>
					<RkText rkType='primary1 hint'>{DaoUser.gPublicMessage(userProfile)}</RkText>
				</Row>

				<Row size={-1} style={styles.badges}>
					{[
						Maps.genderToIcon(DaoUser.gGender(userProfile)),
						Maps.reputationToIcon(DaoUser.gReputation(userProfile))
					].map((b, k) => (
						<Col key={k}>
							<Icon size={50} {...b}/>
						</Col>
					))}
				</Row>
			</Grid>
		);
	}


	_renderTabLocationStatuses() {
		const {userProfile, navigator} = this.props;
		return (
			<View style={styles.tabLocationStatuses}>
				<UserLocationsStatusList
					navigator={navigator}
					userProfile={userProfile}
					onLocationPress={this._onLocationPress}
					allowEdit={this._isSameUser()}
					showFollow={true}
					showUnfollow={this._isSameUser()}/>
			</View>
		);
	}


	_renderTabFavoriteLocations() {
		const {userProfile} = this.props;
		return (
			<View style={styles.tabLocationFavorites}>
				<LocationList
					locations={DaoUser.gLocationsFavorites(userProfile)}
					showFollow={true}
					showUnfollow={true}
					onLocationPress={this._onLocationPress}
					renderOnListEmpty={this._renderFavoriteListEmpty}/>
			</View>
		);
	}

	_renderFavoriteListEmpty() {
		const props = {image: require('../../assets/images/empty-favorites.png')};

		if (this._isSameUser()) {
			props.text = t('t_empty_user_location_favorites');
			props.buttonText = t('t_empty_bt_user_location_favorites');
			props.onPress = this._onLocationSearchPress;
		} else {
			props.text = t('t_empty_user_other_location_favorites');
		}

		return <FlatListEmpty {...props}/>;
	}

	_renderTabFriends() {
		const {userProfile, authUserProfile} = this.props;

		return (
			<View style={styles.tabFriends}>
				<UserList
					users={DaoUser.gConnectionsFriends(userProfile)}
					friendIds={DaoUser.gConnectionFriendIds(authUserProfile)}
					showAdd={true}
					showRemove={this._isSameUser()}
					showPending={true}
					onUserPress={this._onUserPress}
					renderOnListEmpty={this._renderFriendsListEmpty}/>
			</View>
		);
	}

	_renderFriendsListEmpty() {
		const props = {image: require('../../assets/images/empty-friends.png')};

		if (this._isSameUser()) {
			props.text = t('t_empty_user_friends');
			props.buttonText = t('t_empty_bt_user_friends');
			props.onPress = this._onUserSearchPress;
		} else {
			props.text = t('t_empty_user_other_friends');
		}

		return <FlatListEmpty {...props}/>;
	}

	_renderTabInfo() {
		const {userInfoSections} = this.state;
		return (
			<View style={styles.tabInfo}>
				<StaticSectionList
					sections={userInfoSections}
					renderItem={this._renderTabUserInfoItem}/>
			</View>
		);
	}

	_renderTabUserInfoItem({item}: { item: TDataPoint }) {
		const {userProfile, navigator} = this.props;
		return (
			<ListItemInfo
				style={listItemInfo.section}
				onPress={() => UserProfileInfoItems.handleOnItemPress(item.id, userProfile, navigator)}
				{...item}/>
		);
	}

}

const UserProfile = poolConnect(_UserProfile,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[]
);
export default UserProfile;


// Config ************************************************************************************************
// Config ************************************************************************************************

const styles = StyleSheet.create({
	tabView: {
		flex: 1
	},
	tabHome: {
		flex: 1
	},
	tabLocationStatuses: {
		flex: 1
	},
	tabLocationFavorites: {
		flex: 1
	},
	tabFriends: {
		flex: 1
	},
	tabInfo: {
		flex: 1
	},
	avatar: {
		width: '100%',
		height: 200
	},
	publicMessage: {
		marginTop: 12,
		paddingHorizontal: 16
	},
	badges: {
		marginTop: 12
	}
});