/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import React from 'react';
import {RkTextInput as _RkTextInput, RkStyleSheet, RkText} from 'react-native-ui-kitten';
import {ApiFormState} from "../../../lib/redux-pool/api-form/ApiFormModel";
import {Colors} from "../../../Config";
import {denormObj} from '../../../lib/HelperFunctions';
import {Picker, StyleSheet, Switch, View} from 'react-native';
import {Validate} from "../../../lib/helpers/Validator";
import type {TStyle} from "../../../lib/types/Types";


// RkTextInput ******************************************************************************************
// RkTextInput ******************************************************************************************

type RkTextInputProps = {
	rkType?: string,
	style?: Object,
	errorCode?: number | string,
	editable?: boolean,
	withBorder?: boolean
};


export const RkTextInput = ({rkType, style, errorCode, withBorder, ...props}: RkTextInputProps) => {

	const hasErrorCode = errorCode !== 0;
	const pointerEvents = props.editable ? 'auto' : 'none';

	const borderBottomWidth =	withBorder ? StyleSheet.hairlineWidth : 0;
	const borderColor = hasErrorCode ? Colors.alertRed : Colors.black;

	return (
		<View style={style} pointerEvents={pointerEvents}>

			<View style={[{borderColor, borderBottomWidth}, styles.row, styles.fullTextInput]}>
				<_RkTextInput {...props} rkType={`row ${rkType}`}/>
			</View>

			<RkText style={styles.error} rkType='danger secondary6'>
				{hasErrorCode ? Validate.mapErrorCodeToMessage(errorCode) : ''}
			</RkText>

		</View>
	);
};

RkTextInput.defaultProps = {
	withBorder: false,
	editable: true,
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

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
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
});

