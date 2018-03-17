/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoLocation from "../../../lib/daos/DaoLocation";
import ImagePicker from '../../../lib/helpers/ImagePicker';
import PropTypes from 'prop-types';
import React from 'react';

import {AvatarCircle} from "../../../comp/Misc";

import {Icons} from '../../../Config';
import {poolConnect} from '../../../redux/ReduxPool';
import {RkTextInputFromPool} from '../../../comp/misc/forms/RkInputs';
import {RkStyleSheet} from 'react-native-ui-kitten';
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


// Flow *************************************************************************************************
// Flow *************************************************************************************************

type Props = {
	navigator: Navigator,
	locationProfile: Object,
	formApiEditLocationProfile: Object
};



// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class EditLocationInfoPresentational extends React.Component<any, Props, any> {

	constructor(props, context) {
		super(props, context);
		this._onLocationPicturePress = this._onLocationPicturePress.bind(this);
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
						multline
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

const EditLocationInfo = poolConnect(
	// Presentational Component
	EditLocationInfoPresentational,

	// mapStateToProps
	(state) => state.editLocationInfoReducer,

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[]
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