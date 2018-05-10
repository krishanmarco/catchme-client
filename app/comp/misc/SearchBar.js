/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {Colors, Icons} from '../../Config';
import {Icon} from 'react-native-elements';
import {RkTextInput} from 'react-native-ui-kitten';
import {StyleSheet, View} from 'react-native';
import {t} from "../../lib/i18n/Translations";
import type {TStyle} from "../../lib/types/Types";
import {listItemInfo} from "../../lib/theme/Styles";

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	placeholder: ?string,
	onChange: Function,
	onSearchPressed: Function,
	style?: TStyle
};

const defaultProps = {
	placeholder: t('t_search'),
};


// SearchBar ********************************************************************************************
// SearchBar ********************************************************************************************

export default class SearchBar extends React.Component<void, Props, void> {
	static defaultProps = defaultProps;

	constructor(props, context) {
		super(props, context);
		this._onChange = this._onChange.bind(this);
	}

	_onChange(event) {
		const {onChange} = this.props;
		onChange(event.nativeEvent.text);
		event.stopPropagation();
	}

	render() {
		const {onSearchPressed, placeholder, style} = this.props;
		return (
			<View style={[styles.root, style]}>
				<View style={listItemInfo.section}>
					<RkTextInput
						style={styles.textInput}
						rkType='row rounded'
						autoCapitalize='none'
						autoCorrect={false}
						label={<Icon {...Icons.searchBar} />}
						onChange={this._onChange}
						onEndEditing={onSearchPressed}
						placeholder={placeholder}/>
				</View>
			</View>
		);
	}

}

// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	root: {
		backgroundColor: Colors.background,
		alignItems: 'center',
		marginBottom: 4,
	},
	textInput: {
		marginVertical: 0,
		paddingHorizontal: 8,
		paddingVertical: 2,
	}
});