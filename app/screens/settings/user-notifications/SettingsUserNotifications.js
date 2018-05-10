/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoUser from "../../../lib/daos/DaoUser";
import React from 'react';
import {boolToIntString, intStringToBool, stringReplace} from '../../../lib/HelperFunctions';
import {FORM_API_ID_EDIT_USER_PROFILE} from "../../../lib/redux-pool/api-form/def/ApiFormDefUserProfile";
import {poolConnect} from '../../../redux/ReduxPool';
import {RkSwitch} from '../../../comp/misc/forms/RkInputs';
import {ScreenInfo} from "../../../comp/Misc";
import {StyleSheet, View} from 'react-native';
import {t} from "../../../lib/i18n/Translations";
import type {TApiFormPool} from "../../../lib/redux-pool/api-form/ApiFormPool";
import {listItemInfo} from "../../../lib/theme/Styles";

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	navigator: Navigator,
	authUserProfile: Object,
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
		const {authUserProfile} = this.props;
		this._formApiEditUserProfile().change(authUserProfile);
	}

	componentWillUnmount() {
		const {authUserProfile} = this.props;
		// Only post the new settings if they are
		// different than the initial ones
		const oldSettings = DaoUser.gSettingNotifications(authUserProfile);
		const newSettings = DaoUser.gSettingNotifications(this._formApiEditUserProfile().apiInput);
		if (oldSettings == newSettings)
			return;

		// Post the updated form
		this._formApiEditUserProfile().post();
	}

	_formApiEditUserProfile(): TApiFormPool {
		return this.props[FORM_API_ID_EDIT_USER_PROFILE];
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
		const userProfile = this._formApiEditUserProfile().apiInput;
		let settingStr = DaoUser.gSettingNotifications(userProfile);
		settingStr = this._getNewSettingValue(settingStr, 0, !value);
		settingStr = this._getNewSettingValue(settingStr, 1, !value);
		settingStr = this._getNewSettingValue(settingStr, 2, !value);
		this._saveSettingValue(settingStr);
	}

	_onFriendshipRequestValueChange(value) {
		const settings = DaoUser.gSettingNotifications(this._formApiEditUserProfile().apiInput);
		this._saveSettingValue(this._getNewSettingValue(settings, 0, value));
	}

	_onFriendActionsValueChange(value) {
		const settings = DaoUser.gSettingNotifications(this._formApiEditUserProfile().apiInput);
		this._saveSettingValue(this._getNewSettingValue(settings, 1, value));
	}

	_onCatchmeSuggestionsValueChange(value) {
		const settings = DaoUser.gSettingNotifications(this._formApiEditUserProfile().apiInput);
		this._saveSettingValue(this._getNewSettingValue(settings, 2, value));
	}

	render() {
		return (
			<View>
				{this._renderScreenHeader()}
				<View style={styles.notificationSwitches}>
					{this._renderNotificationSwitches()}
				</View>
			</View>
		);
	}

	_renderScreenHeader() {
		return (
			<ScreenInfo
				imageSource={require('../../../assets/images/primary-notifications.png')}
				textText={t('t_si_settings_notifications')}/>
		);
	}

	_renderNotificationSwitches() {
		const settingNotifications = DaoUser.gSettingNotifications(this._formApiEditUserProfile().apiInput)
			.split('')
			.map(intStringToBool);

		return (
			<View style={listItemInfo.section}>
				<RkSwitch
					title={t('t_disable_all')}
					value={[
						settingNotifications[0],
						settingNotifications[1],
						settingNotifications[2]
					].every(i => !i)}
					onValueChange={this._onDisableAllValueChange}/>
				<RkSwitch
					title={t('t_notifications_friendship_request')}
					value={settingNotifications[0]}
					onValueChange={this._onFriendshipRequestValueChange}/>
				<RkSwitch
					title={t('t_notifications_friend_actions')}
					value={settingNotifications[1]}
					onValueChange={this._onFriendActionsValueChange}/>
				<RkSwitch
					title={t('t_notifications_catchme_suggestions')}
					value={settingNotifications[2]}
					onValueChange={this._onCatchmeSuggestionsValueChange}/>
			</View>
		);
	}

}

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
	notificationSwitches: {
		marginTop: 64,
	},
});