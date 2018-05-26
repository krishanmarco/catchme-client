/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoLocation from '../../../lib/daos/DaoLocation';
import DaoUser from '../../../lib/daos/DaoUser';
import React from 'react';
import Router from '../../../lib/navigation/Router';
import {FlatList, StyleSheet, View} from 'react-native';
import {FlatListEmpty, ListItemInfo, ScreenInfo} from '../../../comp/Misc';
import {Icons} from '../../../Config';
import {listItemInfo} from '../../../lib/theme/Styles';
import {ListItemLocation} from '../../../comp-buisness/location/LocationListItems';
import {t} from '../../../lib/i18n/Translations';
import type {TLocation} from '../../../lib/daos/DaoLocation';
import type {TNavigator} from '../../../lib/types/Types';
import type {TUser} from '../../../lib/daos/DaoUser';


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
		this._renderListEmpty = this._renderListEmpty.bind(this);
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
			<View style={styles.settingsUserAdminLocations}>
				<View style={styles.screenInfoCont}>{this._renderScreenHeader()}</View>
				<View style={styles.locationListCont}>{this._renderAdminLocationList()}</View>
			</View>
		);
	}

	_renderScreenHeader() {
		return (
			<ScreenInfo
				imageSource={require('../../../assets/images/primary-admin-locations.png')}
				textText={t('t_si_settings_admin_locations')}/>
		);
	}

	_renderAdminLocationList() {
		const {userProfile} = this.props;

		return (
			<FlatList
				style={styles.locationList}
				data={DaoUser.gAdminLocations(userProfile)}
				keyExtractor={DaoLocation.gIdStr}
				renderItem={this._renderLocationItem}
				ListHeaderComponent={this._renderLocationsHeader()}
				ListEmptyComponent={this._renderListEmpty}/>
		);
	}

	_renderListEmpty() {
		return (
			<FlatListEmpty
				text={t('t_empty_admin_locations')}
				buttonText={t('t_empty_bt_admin_locations')}
				onPress={this._onLocationAdd}
				image={require('../../../assets/images/empty-admin-locations.png')}/>
		);
	}

	_renderLocationsHeader() {
		return (
			<ListItemInfo
				style={listItemInfo.section}
				title={t('t_add_new_location')}
				textRkType='header4'
				icon={Icons.settingAdminAddLocation}
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
	settingsUserAdminLocations: {
		flex: 1
	},
	screenInfoCont: {
		flex: 0.25
	},
	locationListCont: {
		flex: 0.75,
		marginTop: 32,
	},
	locationList: {
		flex: 1
	}
});