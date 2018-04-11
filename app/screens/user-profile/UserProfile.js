/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoUser from "../../lib/daos/DaoUser";
import Maps from "../../lib/data/Maps";
import React from 'react';
import Router from "../../lib/helpers/Router";
import StaticSectionList from '../../comp/misc/listviews/StaticSectionList';
import UserList from '../../comp-buisness/user/UserList';
import UserLocationsStatusList from '../../comp-buisness/user/UserLocationsStatusList';
import UserProfileInfoItems from '../../lib/datapoints/UserProfileDataPoints';
import {Col, Grid, Row} from "react-native-easy-grid";
import {Icon} from 'react-native-elements';
import {Icons} from '../../Config';
import {Image, StyleSheet, View} from 'react-native';
import {ListItemInfo, ScrollableIconTabView} from "../../comp/Misc";
import {poolConnect} from '../../redux/ReduxPool';
import {RkText} from 'react-native-ui-kitten';
import type {TDataPoint, TNavigator, TSectionListDataPointSections} from "../../lib/types/Types";
import type {TLocation} from "../../lib/daos/DaoLocation";
import type {TUser} from "../../lib/daos/DaoUser";
// todo refactor

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	userProfile: TUser,
	authenticatedUserProfile: TUser,
	navigator: TNavigator
};

type State = {
	userInfoSections: Array<TSectionListDataPointSections>
};

const userProfileTabIcons = {
	0: Icons.userProfile,
	1: Icons.userLocations,
	2: Icons.userFriends,
	3: Icons.userInfo
};


// _UserProfile *****************************************************************************************
// _UserProfile *****************************************************************************************

class _UserProfile extends React.Component<void, Props, State> {


	constructor(props: Props, context) {
		super(props, context);
		this._onLocationPress = this._onLocationPress.bind(this);
		this._onUserPress = this._onUserPress.bind(this);
		this._renderTabUserInfoItem = this._renderTabUserInfoItem.bind(this);
		this.state = this._calculateState(props);
	}

	componentWillReceiveProps(nextProps) {
		this.setState(this._calculateState(nextProps));
	}

	_calculateState(props: Props) {
		// Calculate the user info section value only once
		return {
			userInfoSections: new UserProfileInfoItems(this._userProfile(props))
				.includeSettingsAndHelpIf(this._isSameUser(props))
				.build()
		};
	}


	_navigator(): TNavigator {
		return this.props.navigator;
	}

	_userProfile(props: Props = this.props) {
		return props.userProfile;
	}

	_authenticatedUserProfile(props: Props = this.props) {
		return props.authenticatedUserProfile;
	}

	_onLocationPress(location: TLocation) {
		Router.toLocationProfile(this._navigator(), location);
	}

	_onUserPress(user: TUser) {
		Router.toUserProfile(this._navigator(), user);
	}

	_isSameUser(props: Props = this.props): boolean {
		return DaoUser.gId(this._userProfile(props)) === DaoUser.gId(this._authenticatedUserProfile(props));
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
				icons={userProfileTabIcons}>
				{tabs}
			</ScrollableIconTabView>
		);
	}

	_renderTab(tabLabel, jsx) {
		return (
			<View
				key={tabLabel}
				tabLabel={tabLabel}
				style={{flex: 1}}>
				{jsx}
			</View>
		);
	}

	_renderTabHome() {
		let userProfile = this._userProfile();

		return (
			<Grid style={[styles.tabHomeRoot]}>
				<Row size={-1}>
					<Image
						style={styles.avatar}
						resizeMode='cover'
						source={{uri: DaoUser.gPictureUrl(userProfile)}}/>
				</Row>

				<Row size={-1} style={[styles.publicMessage]}>
					<RkText rkType='primary1 hint'>{DaoUser.gPublicMessage(userProfile)}</RkText>
				</Row>

				<Row size={-1} style={[styles.badges]}>
					{[
						Maps.genderToIcon(DaoUser.gGender(this._userProfile())),
						Maps.reputationToIcon(DaoUser.gReputation(this._userProfile()))
					].map((b, k) => (
						<Col key={k}>
							<Icon style={styles.icon} size={50} {...b}/>
						</Col>
					))}
				</Row>
			</Grid>
		);
	}


	_renderTabLocations() {
		return (
			<View style={[styles.tabRootLocations]}>
				<UserLocationsStatusList
					allowEdit={this._isSameUser()}
					userProfile={this._userProfile()}
					onLocationPress={this._onLocationPress}/>
			</View>
		);
	}

	_renderTabFriends() {
		let userProfile = this._userProfile();
		let authUserProfile = this._authenticatedUserProfile();

		return (
			<View style={[styles.tabRootFriends]}>
				<UserList
					users={DaoUser.gConnectionsFriends(userProfile)}
					friendIds={DaoUser.gConnectionFriendIds(authUserProfile)}
					onItemPress={this._onUserPress}/>
			</View>
		);
	}

	_renderTabInfo() {
		return (
			<View style={[styles.tabRootInfo]}>
				<StaticSectionList
					sections={this.state.userInfoSections}
					renderItem={this._renderTabUserInfoItem}/>
			</View>
		);
	}

	_renderTabUserInfoItem({item: dataPoint}: { item: TDataPoint }) {
		return (
			<ListItemInfo
				onPress={() => UserProfileInfoItems.handleOnItemPress(dataPoint.id, this._userProfile(), this._navigator())}
				{...dataPoint}/>
		);
	}

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

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
	tabHomeRoot: {
		flex: 1,
		alignItems: 'center'
	},
	tabRootLocations: {
		flex: 1,
		paddingTop: 8
	},
	tabRootFriends: {
		flex: 1,
		paddingTop: 8
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
	},
	avatar: {
		width: '100%',
		height: 200
	},
	icon: {
		marginRight: 8
	}
});