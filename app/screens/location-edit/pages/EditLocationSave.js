/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoLocation from "../../../lib/daos/DaoLocation";
import React from 'react';
import {ApiFormState} from "../../../lib/redux-pool/api-form/ApiFormModel";
import {AvatarCircle, GradientButton} from "../../../comp/Misc";
import {poolConnect} from '../../../redux/ReduxPool';
import {RkText} from 'react-native-ui-kitten';
import {StyleSheet, View} from 'react-native';
import type {TApiFormPool} from "../../../lib/redux-pool/api-form/ApiFormPool";

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	onSaveComplete: Function,
	formApiEditLocationProfile: ApiFormState
};


// _EditLocationSave ************************************************************************************
// _EditLocationSave ************************************************************************************

class _EditLocationSave extends React.Component<void, Props, void> {

	constructor(props, context) {
		super(props, context);
		this._onLocationSave = this._onLocationSave.bind(this);
	}

	hasErrors() {
		return false;
	}

	_formApiEditLocationProfile(): TApiFormPool {
		const {formApiEditLocationProfile} = this.props;
		return formApiEditLocationProfile;
	}

	_onLocationSave() {
		const {onSaveComplete} = this.props;

		// Post the form and notify the parent component
		this._formApiEditLocationProfile().post()
			.then(onSaveComplete);
	}

	render() {
		return (
			<View style={styles.root}>
				<RkText style={styles.headerText} rkType='header2 hero'>
					{DaoLocation.gName(this._formApiEditLocationProfile().apiInput)}
				</RkText>
				<View style={styles.avatar}>
					<AvatarCircle
						rkType='huge'
						uri={DaoLocation.gPictureUrl(this._formApiEditLocationProfile().apiInput)}/>
				</View>
				<RkText style={styles.listItemWithActionsContentText} rkType='primary3'>
					{DaoLocation.gAddress(this._formApiEditLocationProfile().apiInput)}
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
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[],

	{withRef: true}
);
export default EditLocationSave;


// Const ************************************************************************************************
// Const ************************************************************************************************

const styles = StyleSheet.create({
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
	listItemWithActionsContentText: {
		marginTop: 16
	},
	saveButton: {
		marginTop: 40,
		marginHorizontal: 16
	}
});
