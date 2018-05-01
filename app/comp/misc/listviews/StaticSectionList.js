/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {ListItemHeader} from "../../Misc";
import {SectionList, StyleSheet, View} from 'react-native';
import type {TSectionListDataPointSections} from "../../../lib/types/Types";

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	sections: Array<TSectionListDataPointSections>,
	keyExtractor?: (TSectionListDataPointSections, number) => number,
	renderItem: () => Node
};


// StaticSectionList ************************************************************************************
// StaticSectionList ************************************************************************************

export default class StaticSectionList extends React.PureComponent<void, Props, void> {

	constructor(props, context) {
		super(props, context);
		this._keyExtractor = this._keyExtractor.bind(this);
	}

	_keyExtractor(item, index) {
		const {keyExtractor} = this.props;

		if (keyExtractor)
			return keyExtractor(item, index);

		return index.toString();
	}

	render() {
		const {sections, renderItem, ...staticSectionListProps} = this.props;
		return (
			<SectionList
				{...staticSectionListProps}
				style={styles.styles}
				sections={sections}
				renderItem={renderItem}
				keyExtractor={this._keyExtractor}
				renderSectionHeader={this._renderHeader}
			/>
		);
	}

	_renderHeader({section}) {
		return (<ListItemHeader name={section.title}/>);
	}

}


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	root: {
		marginTop: 8
	}
});