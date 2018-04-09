/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import ApiFormDef from "../../../lib/redux-pool/api-form/ApiFormDef";
import DaoLocation from "../../../lib/daos/DaoLocation";
import EditLocation from "../EditLocation";
import ImagePicker from '../../../lib/helpers/ImagePicker';

import PropTypes from 'prop-types';

import React from 'react';
import {AvatarCircle} from "../../../comp/Misc";
import {Const, Icons} from '../../../Config';
import {poolConnect} from '../../../redux/ReduxPool';
import {RkStyleSheet} from 'react-native-ui-kitten';
import {RkTextInputFromPool} from '../../../comp/misc/forms/RkInputs';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import type {TLocation} from "../../../lib/daos/DaoLocation";
import type {TReduxPoolApiForms} from "../../../lib/types/ReduxPoolTypes";


// Redux ************************************************************************************************
// Redux ************************************************************************************************

const editLocationInfoInitState = {
	// Nothing for now
};


export function editLocationInfoReducer(state = editLocationInfoInitState, action) {
	switch (action.type) {
		// Nothing for now
	}

	return state;
}


// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	navigator: Navigator,
	locationProfile: Object,
	formApiEditLocationProfile: Object
};



// _EditLocationInfo ************************************************************************************
// _EditLocationInfo ************************************************************************************

class _EditLocationInfo extends React.Component<any, Props, any> {

	constructor(props, context) {
		super(props, context);
		this._onLocationPicturePress = this._onLocationPicturePress.bind(this);
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

	_isNewLocation() {
		const newLocationid = Const.DaoLocation.newLocationId;
		const id = _.get(this._formApiEditLocationProfileInput(), DaoLocation.pId, newLocationid);
		return newLocationid == id;
	}

	_formApiEditLocationProfile(): TReduxPoolApiForms<TLocation, TLocation> {
		return this.props.formApiEditLocationProfile;
	}

	_formApiEditLocationProfileInput(): ?TLocation {
		return this._formApiEditLocationProfile().apiInput;
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


	render() {
		return (
			<ScrollView style={styles.scrollView}>
				<View style={styles.content}>
					<View style={styles.avatarContainer}>
						<AvatarCircle
							badge={Icons.locationEditAvatar}
							rkType='large'
							uri={DaoLocation.gPictureUrl(this._formApiEditLocationProfileInput())}
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



// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const EditLocationInfo = poolConnect(_EditLocationInfo,
	// mapStateToProps
	(state) => state.editLocationInfoReducer,

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[],

	{withRef: true}
);

export default EditLocationInfo;



// Const ************************************************************************************************
// Const ************************************************************************************************

const styles = RkStyleSheet.create(theme => ({
	scrollView: {
		flex: 1
	},
	avatarContainer: {
		alignItems: 'center'
	},
	content: {
		paddingHorizontal: 4,
	},
}));


EditLocationInfo.propTypes = {
	formApiEditLocationProfile: PropTypes.object.isRequired
};