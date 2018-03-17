/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoLocation from "../../../lib/daos/DaoLocation";

import DaoUser from "../../../lib/daos/DaoUser";

import React from 'react';
import Router from "../../../lib/helpers/Router";
import {StyleSheet, FlatList, View} from 'react-native';
import LocationList from '../../../comp-buisness/location/LocationList';
import {Icons} from '../../../Config';

import {ListItemInfo, ScreenInfo} from "../../../comp/Misc";
import {ListItemLocation} from '../../../comp-buisness/location/LocationListItems';
import type {TUser} from "../../../lib/daos/DaoUser";
import type {TNavigator} from "../../../lib/types/Types";


// Flow *************************************************************************************************
// Flow *************************************************************************************************

type Props = {
	navigator: TNavigator,
	userProfile: TUser
};


// Component ********************************************************************************************
// Component ********************************************************************************************

export default class SettingsUserAdministratingLocations extends React.Component<any, Props, any> {

	constructor(props, context) {
		super(props, context);
		this._onLocationPress = this._onLocationPress.bind(this);
		this._onLocationAdd = this._onLocationAdd.bind(this);
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
				imageContainerStyle={{marginTop: 64}}
				imageContainerScale={550}
				imageHeight={100}
				imageWidth={150}
				imageSource={require('../../../assets/images/splashBack.png')}
				textText='These are the locations you manage'/>
		);
	}

	_renderAdminLocationList() {
		const {userProfile} = this.props;
		const locations = DaoUser.gAdminLocations(userProfile);

		return (
			<FlatList
				data={locations}
				keyExtractor={DaoLocation.gId}
				ListHeaderComponent={
					<ListItemInfo
						title='Add a new Location'
						textRkType='header4'
						icon={Icons.locationAdminAdd}
						onPress={this._onLocationAdd}/>
				}
				renderItem={({item}) => (
					<ListItemLocation
						location={item}
						onPress={() => this._onLocationPress(item)}/>
				)}
			/>
		);
	}

}

