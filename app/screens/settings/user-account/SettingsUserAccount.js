/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import DaoUser from "../../../lib/daos/DaoUser";
import ImagePicker from "../../../lib/helpers/ImagePicker";
import Maps from "../../../lib/data/Maps";
import React from 'react';
import Router from "../../../lib/navigation/Router";
import {AvatarCircle, ListItemHeader, ListItemInfo} from "../../../comp/Misc";
import {FORM_API_ID_EDIT_USER_PROFILE} from "../../../lib/redux-pool/api-form/def/ApiFormDefUserProfile";
import {Icons} from '../../../Config';
import {poolConnect} from '../../../redux/ReduxPool';
import {RkMultiChoice, RkTextInputFromPool} from '../../../comp/misc/forms/RkInputs';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {stringReplace} from "../../../lib/HelperFunctions";
import type {TApiFormPool} from "../../../lib/redux-pool/api-form/ApiFormPool";

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	navigator: Navigator,
	authUserProfile: Object,
	changePrivacy: Function
};


// _SettingsUserAccount *********************************************************************************
// _SettingsUserAccount *********************************************************************************

class _SettingsUserAccount extends React.Component<void, Props, void> {

	constructor(props, context) {
		super(props, context);
		this._onChangePasswordPress = this._onChangePasswordPress.bind(this);
		this._onLogoutPress = this._onLogoutPress.bind(this);
		this._onAddContactsPress = this._onAddContactsPress.bind(this);
		this._onUserPicturePress = this._onUserPicturePress.bind(this);
	}

	componentWillMount() {
		const {authUserProfile} = this.props;

		// We now have access to a user profile
		// Initialize the redux pool form by setting all its values

		this._formApiEditUserProfile().reset();
		this._formApiEditUserProfile().change(DaoUser.apiClean(authUserProfile));
	}

	componentWillUnmount() {
		this._formApiEditUserProfile().post();
	}

	_formApiEditUserProfile(): TApiFormPool {
		return this.props[FORM_API_ID_EDIT_USER_PROFILE];
	}

	_onChangePrivacyValue(index, value) {
		let privacyStr = DaoUser.gSettingPrivacy(this._formApiEditUserProfile().apiInput);
		this._formApiEditUserProfile().change({
			[DaoUser.pSettingPrivacy]: stringReplace(privacyStr, index, value.toString())
		});
	}

	_getPrivacyValue(posIndex) {
		return parseInt(_.get(
			this._formApiEditUserProfile().apiInput,
			`${DaoUser.pSettingPrivacy}[${posIndex}]`,
			Maps.privacyDefault().value.toString()
		), 10);
	}

	_onChangePasswordPress() {
		const {navigator} = this.props;
		Router.toModalSettingsChangePassword(navigator);
	}


	_onLogoutPress() {
		const {navigator} = this.props;
		Router.toScreenLogout(navigator);
	}

	_onAddContactsPress() {
		const {navigator} = this.props;
		Router.toScreenAddContacts(navigator);
	}

	_onUserPicturePress() {
		ImagePicker.pickImage()
			.then(response => {
				this._formApiEditUserProfile().change({
					[DaoUser.pPictureUrl]: response.uri
				});
			}).catch(error => {
			// User canceled
		});
	}

	render() {
		return (
			<ScrollView>
				{this._renderProfileSection()}
				{this._renderPrivacySection()}
				{this._renderSecuritySection()}
				{this._renderLogoutSection()}
			</ScrollView>
		);
	}

	_renderProfileSection() {
		return (
			<View>
				<ListItemHeader name='Profile'/>
				<View style={styles.section}>
					<View style={styles.profileSection}>
						<AvatarCircle
							badge={Icons.userEditAvatar}
							rkType='big'
							uri={DaoUser.gPictureUrl(this._formApiEditUserProfile().apiInput)}
							onPress={this._onUserPicturePress}/>
					</View>
					<RkTextInputFromPool
						pool={this._formApiEditUserProfile()}
						field={DaoUser.pEmail}
						label='Email'
						keyboardType='email-address'
						icon={Icons.settingChangePassword}/>
					<RkTextInputFromPool
						pool={this._formApiEditUserProfile()}
						field={DaoUser.pPhone}
						label='Phone'
						keyboardType='phone-pad'
						icon={Icons.settingChangePassword}/>
					<RkTextInputFromPool
						pool={this._formApiEditUserProfile()}
						field={DaoUser.pPublicMessage}
						multiline={true}
						numberOfLines={3}
						label='Status'
						returnKeyType='next'
						icon={Icons.settingChangePassword}/>
				</View>
			</View>
		);
	}


	_renderPrivacySection() {
		const privacyAll = Maps.privacyOptions();
		const privacySub = Maps.privacyOptions();
		privacySub.splice(1, 1);

		return (
			<View>
				<ListItemHeader name='Privacy'/>
				<View style={styles.section}>
					{[
						{title: 'My previous location', options: privacyAll},
						{title: 'My current location', options: privacySub},
						{title: 'My next location', options: privacyAll},
						{title: 'My email', options: privacyAll},
						{title: 'My phone number', options: privacyAll}
					].map((data, key) => (
						<RkMultiChoice
							key={key}
							{...data}
							selectedValue={this._getPrivacyValue(key)}
							onValueChange={value => this._onChangePrivacyValue(key, value)}/>
					))}
				</View>
			</View>
		);
	}

	_renderSecuritySection() {
		return (
			<View>
				<ListItemHeader name='Security'/>
				<View style={styles.section}>
					<ListItemInfo
						title='Change Password'
						icon={Icons.settingChangePassword}
						onPress={this._onChangePasswordPress}/>
				</View>
			</View>
		);
	}

	_renderLogoutSection() {
		return (
			<View>
				<ListItemHeader/>
				<View style={styles.section}>
					<ListItemInfo
						title='Add contacts'
						icon={Icons.settingChangePassword}
						onPress={this._onAddContactsPress}/>
					<ListItemInfo
						title='Logout'
						icon={Icons.settingLogout}
						onPress={this._onLogoutPress}/>
				</View>
			</View>
		);
	}

}

const SettingsUserAccount = poolConnect(_SettingsUserAccount,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[FORM_API_ID_EDIT_USER_PROFILE]
);
export default SettingsUserAccount;


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	section: {
		paddingHorizontal: 16,
	},
	profileSection: {
		alignItems: 'center'
	}
});