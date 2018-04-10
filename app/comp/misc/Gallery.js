/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';

import {Colors, Icons} from '../../Config';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {RkButton, RkModalImg} from 'react-native-ui-kitten';

import type {TImageURISourceAuth} from "../../lib/data/ImageURISourceAuth";
import type {TStyle} from "../../lib/types/Types";

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	ListEmptyComponent: Node,
	onAddImagePress: () => void,
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

export default class Gallery extends React.Component<any, Props, State> {
	static ADD_IMAGE_URI = 'ADD_IMAGE';
	static defaultProps = DefaultProps;
	
	constructor(props, context) {
		super(props, context);
		this._renderItem = this._renderItem.bind(this);

		const imageSize = (Dimensions.get('window').width - 12) / 4;
		this.state = {
			imageSize: (Dimensions.get('window').width - 12) / 4,
			imageSizeStyle: {width: imageSize, height: imageSize},
			itemsToRender: this._buildImageSources(props)
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({itemsToRender: this._buildImageSources(nextProps)});
	}

	_buildImageSources(props) {

		// If onAddImagePress is null return the original array
		// as [itemsToRender] because nothing needs to be added
		if (props.onAddImagePress == null)
			return props.imageSources;

		// Clone the input prop array, add the 'add image' item
		// to the start of the original sources and return
		return [{uri: Gallery.ADD_IMAGE_URI}].concat(props.imageSources.slice(0));
	}


	render() {
		const {itemsToRender} = this.state;
		const {ListEmptyComponent} = this.props;
		return (
			<View style={styles.images}>
				<FlatList
					data={itemsToRender}
					keyExtractor={(item, index) => item.uri}

					renderItem={this._renderItem}
					initialNumToRender={12}

					horizontal={false}
					numColumns={4}

					ListEmptyComponent={ListEmptyComponent}
				/>
			</View>
		);
	}


	_renderItem({item, index}) {
		// If props.onAddImagePress not null when you reach the ADD_IMAGE_URI
		// use the addImageButton rather than the usual rendering
		if (item.uri === Gallery.ADD_IMAGE_URI)
			return this._renderAddImageButton();

		return this._renderImage(index);
	}

	_renderImage(index) {
		const {imageSizeStyle} = this.state;
		const {imageSources} = this.props;
		return (
			<RkModalImg
				style={imageSizeStyle}
				source={imageSources}
				index={index}
				renderHeader={(options) => (
					<View style={styles.header}>
						<RkButton rkType='clear contrast' onPress={options.closeImage}>
							<Icon {...Icons.back} size={35} color={Colors.black}/>
						</RkButton>
					</View>
				)}/>
		);
	}

	_renderAddImageButton() {
		const {imageSize, imageSizeStyle} = this.state;
		const {onAddImagePress} = this.props;
		return (
			<View style={styles.addImageButton}>
				<RkButton
					style={[imageSizeStyle, styles.addImageButtonButton]}
					rkType='clear contrast'
					onPress={onAddImagePress}>
					<Icon size={imageSize / 1.5} {...Icons.addImage} color={Colors.black}/>
				</RkButton>
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
	addImageButton: {
		// The padding: 1 is needed to balance the other images
		padding: 1
	},
	addImageButtonButton: {
		backgroundColor: Colors.greyFade
	}
});
