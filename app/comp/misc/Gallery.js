/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';

import {Colors, Icons} from '../../Config';

import {
	View,
	FlatList,
	Dimensions,
	StyleSheet
} from 'react-native';

import {
	RkButton,
	RkModalImg,
	RkText
} from 'react-native-ui-kitten';

import {Icon} from 'react-native-elements';




export default class Gallery extends React.Component {
	static ADD_IMAGE_URI = 'ADD_IMAGE';


	constructor(props, context) {
		super(props, context);
		this._renderItem = this._renderItem.bind(this);

		this.state = {
			imageSize: (Dimensions.get('window').width - 12) / 4,
			itemsToRender: this._buildImageSources(props)
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({itemsToRender: this._buildImageSources(nextProps)});
	}

	_buildImageSources(props) {

		// If onAddImage is null return the original array
		// as [itemsToRender] because nothing needs to be added
		if (props.onAddImage == null)
			return props.imageSources;

		// Clone the input prop array, add the 'add image' item
		// to the start of the original sources and return
		return [{uri: Gallery.ADD_IMAGE_URI}].concat(props.imageSources.slice(0));
	}




	render() {
		return (
			<View style={styles.images}>
				<FlatList
					data={this.state.itemsToRender}
					keyExtractor={(item, index) => item.uri}

					renderItem={this._renderItem}
					initialNumToRender={12}

					horizontal={false}
					numColumns={4}

					ListEmptyComponent={this.props.ListEmptyComponent}
				/>
			</View>
		);
	}


	_renderItem({item, index}) {

		// If props.onAddImage not null when you reach the ADD_IMAGE_URI
		// use the addImageButton rather than the usual rendering
		if (item.uri === Gallery.ADD_IMAGE_URI)
			return this._renderAddImageButton();

		return this._renderImage(index);
	}

	_renderImage(index) {
		return (
			<RkModalImg
				style={{width: this.state.imageSize, height: this.state.imageSize}}
				source={this.props.imageSources}
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
		// The padding: 1 is needed to balance the other images
		return (
			<View style={{padding: 1}}>
				<RkButton
					style={{width: this.state.imageSize, height: this.state.imageSize, backgroundColor: Colors.greyFade}}
					rkType='clear contrast'
					onPress={this.props.onAddImage}>
					<Icon size={this.state.imageSize / 1.5} {...Icons.addImage} color={Colors.black}/>
				</RkButton>
			</View>
		);
	}

}


Gallery.defaultProps = {
	imageSources: []
};

Gallery.propTypes = {
	imageSources: PropTypes.array.isRequired,
	onAddImage: PropTypes.func,
};


const styles = StyleSheet.create({
	images: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
});