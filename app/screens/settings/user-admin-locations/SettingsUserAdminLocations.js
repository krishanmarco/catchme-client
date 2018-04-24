/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoLocation from "../../../lib/daos/DaoLocation";
import DaoUser from "../../../lib/daos/DaoUser";
import React from 'react';
import Router from "../../../lib/navigation/Router";
import {FlatList, StyleSheet, View} from 'react-native';
import {Icons} from '../../../Config';
import {ListItemInfo, ScreenInfo} from "../../../comp/Misc";
import {ListItemLocation} from '../../../comp-buisness/location/LocationListItems';
import type {TLocation} from "../../../lib/daos/DaoLocation";
import type {TNavigator} from "../../../lib/types/Types";
import type {TUser} from "../../../lib/daos/DaoUser";
import {listItemInfo} from "../../../lib/theme/Styles";


// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	navigator: TNavigator,
	userProfile: TUser
};


// SettingsUserAdministratingLocations ******************************************************************
// SettingsUserAdministratingLocations ******************************************************************

export default class SettingsUserAdministratingLocations extends React.Component<void, Props, void> {

	constructor(props, context) {
		super(props, context);
		this._onLocationPress = this._onLocationPress.bind(this);
		this._onLocationAdd = this._onLocationAdd.bind(this);
		this._renderLocationItem = this._renderLocationItem.bind(this);
	}

	_onLocationPress(location) {
		const {navigator} = this.props;
		Router.toScreenEditLocation(
			navigator,
			{locationId: DaoLocation.gId(location)},
			DaoLocation.gName(location)
		);
	}

	_onLocationAdd() {
		const {navigator} = this.props;
		Router.toScreenNewLocation(navigator);
	}


	render() {
		return (
			<View>
				{this._renderScreenHeader()}
				{this._renderAdminLocationList()}
			</View>
		);
	}

	_renderScreenHeader() {
		return (
			<ScreenInfo
				imageSource={require('../../../assets/images/adminLocations.png')}
				textText='These are the locations you manage'/>
		);
	}

	_renderAdminLocationList() {
		const {userProfile} = this.props;

		return (
			<FlatList
				style={styles.locationList}
				data={DaoUser.gAdminLocations(userProfile)}
				keyExtractor={DaoLocation.gIdStr}
				ListHeaderComponent={this._renderLocationsHeader()}
				renderItem={this._renderLocationItem}
			/>
		);
	}

	_renderLocationsHeader() {
		return (
			<ListItemInfo
				style={listItemInfo.itemStyle}
				title='Add a new Location'
				textRkType='header4'
				icon={Icons.locationAdminAdd}
				onPress={this._onLocationAdd}/>
		);
	}

	_renderLocationItem({item}: { item: TLocation }) {
		return (
			<ListItemLocation
				location={item}
				onPress={() => this._onLocationPress(item)}/>
		);
	}

}


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	locationList: {
		height: 350,
		marginTop: 32
	}
});