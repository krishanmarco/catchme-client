/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoLocation from "../../../lib/daos/DaoLocation";
import React from 'react';
import {ApiFormState} from "../../../lib/redux-pool/api-form/ApiFormModel";
import {AvatarFull, LoadingButton} from "../../../comp/Misc";
import {poolConnect} from '../../../redux/ReduxPool';
import {RkText} from 'react-native-ui-kitten';
import {StyleSheet, View} from 'react-native';
import type {TApiFormPool} from "../../../lib/redux-pool/api-form/ApiFormPool";

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	onSavePress: Function,
	formApiEditLocationProfile: ApiFormState
};


// _EditLocationSave ************************************************************************************
// _EditLocationSave ************************************************************************************

class _EditLocationSave extends React.Component<void, Props, void> {

	constructor(props, context) {
		super(props, context);
	}

	hasErrors() {
		return false;
	}

	_formApiEditLocationProfile(): TApiFormPool {
		const {formApiEditLocationProfile} = this.props;
		return formApiEditLocationProfile;
	}

	render() {
		const {onSavePress} = this.props;
		const locationProfile = this._formApiEditLocationProfile().apiInput;
		return (
			<View style={styles.root}>

				<View>
					<AvatarFull
						source={{uri: DaoLocation.gPictureUrl(locationProfile)}}/>
				</View>

				<View style={styles.contentRow}>

					<RkText rkType='header2 hero'>
						{DaoLocation.gName(locationProfile)}
					</RkText>

					<View style={styles.contentAddressRow}>
						<RkText rkType='header4'>
							{DaoLocation.gAddress(locationProfile)}
						</RkText>
					</View>

					<View style={styles.contentSaveButtonRow}>
						<LoadingButton
							loading={this._formApiEditLocationProfile().loading}
							rkType='large'
							onPress={onSavePress}
							text='Save & Close'/>
					</View>

				</View>

			</View>
		);
	}

}

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


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	root: {
		flex: 1,
		flexDirection: 'column'
	},
	contentRow: {
		flex: 1,
		paddingHorizontal: 16,
		marginTop: 16,
	},
	contentAddressRow: {
		flex: 1,
		marginTop: 16,
		justifyContent: 'center',
	},
	contentSaveButtonRow: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-end',
		marginBottom: 24
	}
});
