/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import ApiFormDef from '../../../lib/redux-pool/api-form/ApiFormDef';
import DaoLocation from '../../../lib/daos/DaoLocation';
import ImagePicker from '../../../lib/helpers/ImagePicker';
import React from 'react';
import {ApiFormState} from '../../../lib/redux-pool/api-form/ApiFormModel';
import {AvatarFull} from '../../../comp/Misc';
import {Const, Icons} from '../../../Config';
import {listItemInfo} from '../../../lib/theme/Styles';
import {poolConnect} from '../../../redux/ReduxPool';
import {RkTextInputFromPool} from '../../../comp/misc/forms/RkInputs';
import {ScrollView, StyleSheet, View} from 'react-native';
import {t} from '../../../lib/i18n/Translations';
import type {TApiFormPool} from '../../../lib/redux-pool/api-form/ApiFormPool';

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	navigator: Navigator,
	locationProfile: Object,
	formApiEditLocationProfile: ApiFormState
};


// _EditLocationInfo ************************************************************************************
// _EditLocationInfo ************************************************************************************

class _EditLocationInfo extends React.Component<void, Props, void> {

	constructor(props, context) {
		super(props, context);
		this._onLocationPicturePress = this._onLocationPicturePress.bind(this);
	}

	_formApiEditLocationProfile(): TApiFormPool {
		const {formApiEditLocationProfile} = this.props;
		return formApiEditLocationProfile;
	}

	_isNewLocation() {
		const newLocationid = Const.locationNewId;
		const id = _.get(this._formApiEditLocationProfile().apiInput, DaoLocation.pId, newLocationid);
		return newLocationid == id;
	}

	_onLocationPicturePress() {
		ImagePicker.pickImage()
			.then((response) => {
				this._formApiEditLocationProfile().change({
					[DaoLocation.pPictureUrl]: response.uri
				});

			}).catch((error) => {
			// User canceled or error
		});
	}

	hasErrors() {
		const formErrors = this._formApiEditLocationProfile().errors;
		return ApiFormDef.hasErrors(formErrors, [
			DaoLocation.pName,
			DaoLocation.pEmail,
			DaoLocation.pPhone,
			DaoLocation.pCapacity,
			DaoLocation.pDescription
		]);
	}


	render() {
		return (
			<ScrollView>
				<View style={styles.root}>

					<View style={styles.avatarRow}>
						<AvatarFull
							source={{uri: DaoLocation.gPictureUrl(this._formApiEditLocationProfile().apiInput)}}
							onPress={this._onLocationPicturePress}
							badge={Icons.locationEditAvatar}
							defaultUri={Const.locationDefaultAvatar}/>
					</View>

					<View style={[listItemInfo.section, styles.editLocationInfoFormRow]}>
						<RkTextInputFromPool
							pool={this._formApiEditLocationProfile()}
							field={DaoLocation.pName}
							editable={this._isNewLocation()}
							label={t('t_field_name')}
							icon={Icons.settingChangePassword}/>
						<RkTextInputFromPool
							pool={this._formApiEditLocationProfile()}
							field={DaoLocation.pEmail}
							label={t('t_field_email')}
							keyboardType='email-address'
							icon={Icons.settingChangePassword}/>
						<RkTextInputFromPool
							pool={this._formApiEditLocationProfile()}
							field={DaoLocation.pPhone}
							label={t('t_field_phone')}
							keyboardType='phone-pad'
							icon={Icons.settingChangePassword}/>
						<RkTextInputFromPool
							pool={this._formApiEditLocationProfile()}
							field={DaoLocation.pCapacity}
							label={t('t_field_capacity')}
							keyboardType='numeric'
							icon={Icons.settingChangePassword}/>
						<RkTextInputFromPool
							pool={this._formApiEditLocationProfile()}
							field={DaoLocation.pDescription}
							multiline
							numberOfLines={3}
							label={t('t_field_description')}
							returnKeyType='next'
							icon={Icons.settingChangePassword}/>
					</View>

				</View>
			</ScrollView>
		);
	}

}

const EditLocationInfo = poolConnect(_EditLocationInfo,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[],

	{withRef: true}
);
export default EditLocationInfo;



// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	root: {
		flex: 1
	},
	avatarRow: {
		flex: 0.28,
	},
	editLocationInfoFormRow: {
		flex: 0.72,
		marginTop: 16
	},
});

