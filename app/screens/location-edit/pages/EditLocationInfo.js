/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import ApiFormDef from "../../../lib/redux-pool/api-form/ApiFormDef";
import DaoLocation from "../../../lib/daos/DaoLocation";
import ImagePicker from '../../../lib/helpers/ImagePicker';
import React from 'react';
import {ApiFormState} from "../../../lib/redux-pool/api-form/ApiFormModel";
import {AvatarCircle} from "../../../comp/Misc";
import {Const, Icons} from '../../../Config';
import {poolConnect} from '../../../redux/ReduxPool';
import {RkTextInputFromPool} from '../../../comp/misc/forms/RkInputs';
import {ScrollView, StyleSheet, View} from 'react-native';
import type {TApiFormPool} from "../../../lib/redux-pool/api-form/ApiFormPool";

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
		return this.props.formApiEditLocationProfile;
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
			<ScrollView style={styles.scrollView}>
				<View style={styles.listItemWithActionsContent}>
					<View style={styles.avatarContainer}>
						<AvatarCircle
							badge={Icons.locationEditAvatar}
							rkType='large'
							uri={DaoLocation.gPictureUrl(this._formApiEditLocationProfile().apiInput)}
							onPress={this._onLocationPicturePress}/>
					</View>
					<RkTextInputFromPool
						pool={this._formApiEditLocationProfile()}
						field={DaoLocation.pName}
						editable={this._isNewLocation()}
						rkType='row'
						label='Name'
						icon={Icons.settingChangePassword}/>
					<RkTextInputFromPool
						pool={this._formApiEditLocationProfile()}
						field={DaoLocation.pEmail}
						rkType='row'
						label='Email'
						keyboardType='email-address'
						icon={Icons.settingChangePassword}/>
					<RkTextInputFromPool
						pool={this._formApiEditLocationProfile()}
						field={DaoLocation.pPhone}
						rkType='row'
						label='Phone'
						keyboardType='phone-pad'
						icon={Icons.settingChangePassword}/>
					<RkTextInputFromPool
						pool={this._formApiEditLocationProfile()}
						field={DaoLocation.pCapacity}
						rkType='row'
						label='Capacity'
						keyboardType='numeric'
						icon={Icons.settingChangePassword}/>
					<RkTextInputFromPool
						pool={this._formApiEditLocationProfile()}
						field={DaoLocation.pDescription}
						rkType='row'
						multiline
						numberOfLines={3}
						label='Description'
						returnKeyType='next'
						icon={Icons.settingChangePassword}/>
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


// Const ************************************************************************************************
// Const ************************************************************************************************

const styles = StyleSheet.create({
	scrollView: {
		flex: 1
	},
	avatarContainer: {
		alignItems: 'center'
	},
	listItemWithActionsContent: {
		paddingHorizontal: 4,
	},
});

