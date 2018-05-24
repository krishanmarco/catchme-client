/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {RkText} from 'react-native-ui-kitten';
import {StyleSheet} from 'react-native';
import type {TDynamicStyleTextArray} from "../../lib/types/Types";

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	dynamicStyleTextArray?: TDynamicStyleTextArray
};

const defaultProps = {
	dynamicStyleTextArray: []
};

// DefaultLoader ****************************************************************************************
// DefaultLoader ****************************************************************************************

export default class DynamicStyleText extends React.PureComponent<void, Props, void> {
	static defaultProps = defaultProps;

	render() {
		const {dynamicStyleTextArray} = this.props;
		return (
			<RkText style={styles.dynamicStyleText}>
				{dynamicStyleTextArray.map((dsta, k) => (
					<RkText key={k} style={dsta[1]}>{dsta[0]}</RkText>
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
		flexDirection: 'row',
		alignItems: 'flex-start',
		flexWrap: 'wrap'
	}
});
