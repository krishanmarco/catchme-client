/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoUser from "../../../lib/daos/DaoUser";

import React from 'react';
import {boolToIntString, intStringToBool, stringReplace} from '../../../lib/HelperFunctions';

import {FORM_API_ID_EDIT_USER_PROFILE} from "../../../lib/redux-pool/api-form/def/ApiFormDefUserProfile";
import {poolConnect} from '../../../redux/ReduxPool';
import {RkSwitch} from '../../../comp/misc/forms/RkInputs';
import {ScreenInfo} from "../../../comp/Misc";
import {StyleSheet, View} from 'react-native';




// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	navigator: Navigator,
	authenticatedUserProfile: Object,
};


// _SettingsUserNotifications ***************************************************************************
// _SettingsUserNotifications ***************************************************************************

class _SettingsUserNotifications extends React.Component<void, Props, void> {

	constructor(props, context) {
		super(props, context);
		this._onDisableAllValueChange = this._onDisableAllValueChange.bind(this);
		this._onFriendshipRequestValueChange = this._onFriendshipRequestValueChange.bind(this);
		this._onFriendActionsValueChange = this._onFriendActionsValueChange.bind(this);
		this._onCatchmeSuggestionsValueChange = this._onCatchmeSuggestionsValueChange.bind(this);
	}

	componentWillMount() {
		// We now have access to a user profile
		// Initialize the redux pool form by setting all its values
		this._formApiEditUserProfile().change(this._userProfile());
	}

	componentWillUnmount() {
		// Post the updated form
		this._formApiEditUserProfile().post();
	}

	_formApiEditUserProfile() {
		return this.props[FORM_API_ID_EDIT_USER_PROFILE];
	}


	_userProfile() {
		return this.props.authenticatedUserProfile;
	}

	_saveSettingValue(newSettings) {
		// Change the value in the form handler
		this._formApiEditUserProfile().change({
			[DaoUser.pSettingNotifications]: newSettings
		});
	}


	_getNewSettingValue(settingStr, index, newBoolVal) {
		return stringReplace(settingStr, index, boolToIntString(newBoolVal));
	}

	_onDisableAllValueChange(value) {
		let settingStr = DaoUser.gSettingNotifications(this._userProfile());
		settingStr = this._getNewSettingValue(settingStr, 0, !value);
		settingStr = this._getNewSettingValue(settingStr, 1, !value);
		settingStr = this._getNewSettingValue(settingStr, 2, !value);
		this._saveSettingValue(settingStr);
	}

	_onFriendshipRequestValueChange(value) {
		this._saveSettingValue(this._getNewSettingValue(DaoUser.gSettingNotifications(this._userProfile()), 0, value));
	}

	_onFriendActionsValueChange(value) {
		this._saveSettingValue(this._getNewSettingValue(DaoUser.gSettingNotifications(this._userProfile()), 1, value));
	}

	_onCatchmeSuggestionsValueChange(value) {
		this._saveSettingValue(this._getNewSettingValue(DaoUser.gSettingNotifications(this._userProfile()), 2, value));
	}

	render() {
		return (
			<View>
				{this._renderScreenHeader()}
				{this._renderNotificationSwitches()}
			</View>
		);
	}

	_renderScreenHeader() {
		return (
			<ScreenInfo
				imageSource={require('../../../assets/images/userNotifications.png')}
				textText='Here you can tweak your notification settings'/>
		);
	}

	_renderNotificationSwitches() {
		const settingNotifications = DaoUser.gSettingNotifications(this._userProfile())
			.split('')
			.map(intStringToBool);

		return (
			<View style={{marginTop: 64}}>
				<RkSwitch
					title='Disable all'
					value={[
						settingNotifications[0],
						settingNotifications[1],
						settingNotifications[2]
					].every(i => !i)}
					onValueChange={this._onDisableAllValueChange}/>
				<RkSwitch
					title='Friendship request'
					value={settingNotifications[0]}
					onValueChange={this._onFriendshipRequestValueChange}/>
				<RkSwitch
					title='Friend actions'
					value={settingNotifications[1]}
					onValueChange={this._onFriendActionsValueChange}/>
				<RkSwitch
					title='Catchme suggestions'
					value={settingNotifications[2]}
					onValueChange={this._onCatchmeSuggestionsValueChange}/>
			</View>
		);
	}

}




// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const SettingsUserNotifications = poolConnect(_SettingsUserNotifications,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[FORM_API_ID_EDIT_USER_PROFILE]
);

export default SettingsUserNotifications;



// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	listItemWithActionsContent: {
		paddingHorizontal: 4,
	},
});