/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoLocation from "../../../lib/daos/DaoLocation";

import DaoUser from "../../../lib/daos/DaoUser";

import LocationList from '../../../comp-buisness/location/LocationList';
import React from 'react';
import Router from "../../../lib/helpers/Router";
import {FlatList, StyleSheet, View} from 'react-native';
import {Icons} from '../../../Config';

import {ListItemInfo, ScreenInfo} from "../../../comp/Misc";
import {ListItemLocation} from '../../../comp-buisness/location/LocationListItems';
import type {TNavigator} from "../../../lib/types/Types";
import type {TUser} from "../../../lib/daos/DaoUser";
import type {TLocation} from "../../../lib/daos/DaoLocation";


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
		Router.toScreenEditLocation(this.props.navigator, DaoLocation.gId(location));
	}

	_onLocationAdd() {
		Router.toScreenNewLocation(this.props.navigator);
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
				keyExtractor={DaoLocation.gId}
				ListHeaderComponent={this._renderLocationsHeader()}
				renderItem={this._renderLocationItem}
			/>
		);
	}

	_renderLocationsHeader() {
		return (
			<ListItemInfo
				title='Add a new Location'
				textRkType='header4'
				icon={Icons.locationAdminAdd}
				onPress={this._onLocationAdd}/>
		);
	}

	_renderLocationItem({item: location}: {item: TLocation}) {
		return (
			<ListItemLocation
				location={location}
				onPress={() => this._onLocationPress(location)}/>
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