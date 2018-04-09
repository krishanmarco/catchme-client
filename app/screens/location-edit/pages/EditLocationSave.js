/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoLocation from "../../../lib/daos/DaoLocation";
import React from 'react';
import {AvatarCircle, GradientButton} from "../../../comp/Misc";
import {poolConnect} from '../../../redux/ReduxPool';
import {RkStyleSheet, RkText} from 'react-native-ui-kitten';
import {View} from 'react-native';
import type {TLocation} from "../../../lib/daos/DaoLocation";
import type {TReduxPoolApiForms} from "../../../lib/types/ReduxPoolTypes";


// Redux ************************************************************************************************
// Redux ************************************************************************************************

const editLocationSaveInitState = {
	// Nothing for now
};


export function editLocationSaveReducer(state = editLocationSaveInitState, action) {
	switch (action.type) {
		// Nothing for now
	}

	return state;
}


// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	formApiEditLocationProfile: Object,
	onSaveComplete: Function,
	formApiEditLocationProfile: Object
};



// _EditLocationSave ************************************************************************************
// _EditLocationSave ************************************************************************************

class _EditLocationSave extends React.Component<any, Props, any> {

	constructor(props, context) {
		super(props, context);
		this._onLocationSave = this._onLocationSave.bind(this);
	}

	hasErrors() {
		return false;
	}

	_formApiEditLocationProfile(): TReduxPoolApiForms<TLocation, TLocation> {
		return this.props.formApiEditLocationProfile;
	}

	_formApiEditLocationProfileInput(): ?TLocation {
		return this._formApiEditLocationProfile().apiInput;
	}


	_onLocationSave() {
		// Post the form and notify the parent component
		this._formApiEditLocationProfile().post()
			.then(this.props.onSaveComplete);
	}


	render() {
		return (
			<View style={styles.root}>
				<RkText style={styles.headerText} rkType='header2 hero'>
					{DaoLocation.gName(this._formApiEditLocationProfileInput())}
				</RkText>
				<View style={styles.avatar}>
					<AvatarCircle
						rkType='huge'
						uri={DaoLocation.gPictureUrl(this._formApiEditLocationProfileInput())}/>
				</View>
				<RkText style={styles.contentText} rkType='primary3'>
					{DaoLocation.gAddress(this._formApiEditLocationProfileInput())}
				</RkText>
				<GradientButton
					loading={this._formApiEditLocationProfile().loading}
					rkType='large'
					style={styles.saveButton}
					onPress={this._onLocationSave}
					text='Save & Close'/>
			</View>
		);
	}

}



// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const EditLocationSave = poolConnect(_EditLocationSave,
	// mapStateToProps
	(state) => state.editLocationSaveReducer,

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[],

	{withRef: true}
);

export default EditLocationSave;



// Const ************************************************************************************************
// Const ************************************************************************************************

const styles = RkStyleSheet.create(theme => ({
	root: {
		flex: 1,
		alignItems: 'center',
		paddingHorizontal: 8,
	},
	headerText: {
		marginTop: 16
	},
	avatar: {
		marginTop: 40
	},
	contentText: {
		marginTop: 16
	},
	saveButton: {
		marginTop: 40,
		marginHorizontal: 16
	}
}));
