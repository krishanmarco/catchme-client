/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import React from 'react';
import {RkTextInput as _RkTextInput, RkStyleSheet, RkText} from 'react-native-ui-kitten';
import {ApiFormState} from "../../../lib/redux-pool/api-form/ApiFormModel";
import {denormObj} from '../../../lib/HelperFunctions';
import {Picker, StyleSheet, Switch, View} from 'react-native';
import {Validate} from "../../../lib/helpers/Validator";
import type {TStyle} from "../../../lib/types/Types";
import {Colors} from "../../../Config";


// RkTextInput ******************************************************************************************
// RkTextInput ******************************************************************************************

type RkTextInputProps = {
	rkType?: string,
	style?: Object,
	errorCode?: number | string,
	editable?: boolean
};


export const RkTextInput = ({rkType, style, errorCode, ...props}: RkTextInputProps) => {

	const hasErrorCode = errorCode !== 0;
	const rowOverride = rkType === 'row' ? styles.fullTextInput : {};
	const pointerEvents = props.editable != null && !props.editable ? 'none' : 'auto';
	const borderColor = hasErrorCode ? Colors.alertRed : Colors.black;

	return (
		<View style={style} pointerEvents={pointerEvents}>

			<View style={[{borderColor}, styles.row, rowOverride]}>
				<_RkTextInput {...props} rkType={rkType}/>
			</View>

			<RkText style={styles.error} rkType='danger secondary6'>
				{hasErrorCode ? Validate.mapErrorCodeToMessage(errorCode) : ''}
			</RkText>

		</View>
	);
};


// RkSwitch *********************************************************************************************
// RkSwitch *********************************************************************************************

type RkSwitchProps = {
	title: Node | string,
	textProps?: Object,
	style: TStyle
};

export const RkSwitch = ({title, textProps, style, ...props}: RkSwitchProps) => (
	<View style={[style, styles.row]}>
		<RkText {...textProps} rkType='header6'>{title}</RkText>
		<Switch {...props} style={styles.switch}/>
	</View>
);


// RkSwitch *********************************************************************************************
// RkSwitch *********************************************************************************************

type TPickerItem = {
	value: string | number,
	label: string
};

type RkMultiChoiceProps = {
	title: Node | string,
	textProps?: Object,
	style: TStyle,
	options: Array<TPickerItem>
};

export const RkMultiChoice = ({title, textProps, style, options = [], ...props}: RkMultiChoiceProps) => (
	<View style={[style, styles.row]}>
		<RkText {...textProps} rkType='header6'>{title}</RkText>
		<Picker
			{...props}
			mode={Picker.MODE_DROPDOWN}
			style={styles.multiChoicePicker}>
			{options.map((item) => <Picker.Item key={item.value} {...item}/>)}
		</Picker>
	</View>
);


// RkTextInputFromPool **********************************************************************************
// RkTextInputFromPool **********************************************************************************

type RkTextInputFromPoolProps = {
	pool: ApiFormState,
	field: string,
};

export const RkTextInputFromPool = ({pool, field, ...props}: RkTextInputFromPoolProps) => {
	const value = String(_.get(pool, `apiInput.${field}`, ''));
	const errorCode = _.get(pool, `errors.${field}`, 0);

	return (
		<RkTextInput
			{...props}
			value={value}
			errorCode={errorCode}
			onChangeText={text => pool.change(denormObj({[field]: text}))}/>
	);
};


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = RkStyleSheet.create(theme => ({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomWidth: StyleSheet.hairlineWidth
	},
	error: {
		textAlign: 'right',
		marginHorizontal: 4,
		marginVertical: 2,
	},
	fullTextInput: {
		paddingVertical: 0,
		marginVertical: 0
	},
	multiChoicePicker: {
		width: 140
	}
}));

