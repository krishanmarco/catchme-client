/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {Colors, Icons} from '../../Config';
import {Dimensions, FlatList, Image, StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {RkButton, RkModalImg} from 'react-native-ui-kitten';
import type {TImageURISourceAuth} from "../../lib/data/ImageURISourceAuth";
import type {TStyle} from "../../lib/types/Types";

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	ListEmptyComponent: Node,
	imageSources: TImageURISourceAuth
};

type State = {
	imageSize: number,
	imageSizeStyle: TStyle,
	itemsToRender: TImageURISourceAuth
};

const DefaultProps = {
	imageSources: []
};

// Gallery **********************************************************************************************
// Gallery **********************************************************************************************

export default class Gallery extends React.Component<void, Props, State> {
	static defaultProps = DefaultProps;

	constructor(props, context) {
		super(props, context);
		this._renderImage = this._renderImage.bind(this);
		this._keyExtractor = this._keyExtractor.bind(this);

		const imageSize = Dimensions.get('window').width / 4;
		this.state = {
			imageSize,
			imageSizeStyle: {width: imageSize, height: imageSize},
		};
	}

	_keyExtractor(item) {
		return item.uri;
	}

	render() {
		const {ListEmptyComponent, imageSources} = this.props;
		return (
			<View style={styles.images}>
				<FlatList
					data={imageSources}
					removeClippedSubviews={true}
					keyExtractor={this._keyExtractor}

					renderItem={this._renderImage}
					initialNumToRender={12}

					horizontal={false}
					numColumns={4}

					ListEmptyComponent={ListEmptyComponent}
				/>
			</View>
		);
	}

	_renderImage({item}) {
		const {imageSizeStyle} = this.state;
		return (
			<View style={imageSizeStyle}>
				<Image
					resizeMethod='resize'
					style={imageSizeStyle}
					source={item}
				/>
			</View>
		);
	}

}


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	images: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
});
