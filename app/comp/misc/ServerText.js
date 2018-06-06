/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {RkText} from 'react-native-ui-kitten';
import {StyleSheet} from 'react-native';
import type {TServerTextArray} from '../../lib/types/Types';
import {t} from "../../lib/i18n/Translations";

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	dynamicStyleTextArray?: TServerTextArray
};

const defaultProps = {
	dynamicStyleTextArray: []
};

// DefaultLoader ****************************************************************************************
// DefaultLoader ****************************************************************************************
export default class ServerText extends React.PureComponent<void, Props, void> {
	static defaultProps = defaultProps;

	render() {
		const {dynamicStyleTextArray} = this.props;
		return (
			<RkText style={styles.dynamicStyleText}>
				{dynamicStyleTextArray.map((dsta, k) => (
					<RkText key={k} rkType='secondary5' style={dsta.s}>
						{!!dsta.i ? t(dsta.i) : dsta.t}
						{dsta[0]}
					</RkText>
				))}
			</RkText>
		);
	}

}

// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	dynamicStyleText: {
		flex: 1,
		flexWrap: 'wrap',
		textAlignVertical: 'center'
	}
});
