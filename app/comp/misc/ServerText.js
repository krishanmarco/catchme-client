/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {RkText} from 'react-native-ui-kitten';
import {StyleSheet} from 'react-native';
import type {TServerTextArray} from '../../lib/types/Types';
import {strtr} from "../../lib/HelperFunctions";

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
// todo use strtr to replace the {} unlocalized constants in dsta[0]
export default class ServerText extends React.PureComponent<void, Props, void> {
	static defaultProps = defaultProps;

	render() {
		const {dynamicStyleTextArray} = this.props;
		return (
			<RkText style={styles.dynamicStyleText}>
				{dynamicStyleTextArray.map((dsta, k) => (
					<RkText key={k} rkType='secondary5' style={dsta[1]}>
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
