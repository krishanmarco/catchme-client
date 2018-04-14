/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ApiClient from '../../lib/data/ApiClient';
import DaoLocation from "../../lib/daos/DaoLocation";
import Gallery from '../../comp/misc/Gallery';
import ImageURISourceAuth from "../../lib/data/ImageURISourceAuth";
import React from 'react';
import Router from "../../lib/navigation/Router";
import {Colors, Icons} from '../../Config';
import {Icon} from 'react-native-elements';
import {RkText} from 'react-native-ui-kitten';
import {StyleSheet, View} from 'react-native';
import type {TImageURISourceAuth} from "../../lib/data/ImageURISourceAuth";
import type {TLocation} from "../../lib/daos/DaoLocation";
import type {TNavigator} from "../../lib/types/Types";


// Const ************************************************************************************************
// Const ************************************************************************************************

type Props = {
	navigator: TNavigator,
	locationProfile: TLocation
};

type State = {
	imageSources: Array<TImageURISourceAuth>
};


export default class LocationGallery extends React.Component<void, Props, State> {

	constructor(props, context) {
		super(props, context);
		this._onAddImagePress = this._onAddImagePress.bind(this);
		this._renderEmptyListComponent = this._renderEmptyListComponent.bind(this);
		this._onCaptureImage = this._onCaptureImage.bind(this);
		this.state = {imageSources: this._getImagesFromProps(props)};
	}

	componentWillReceiveProps(nextProps) {
		const {locationProfile} = nextProps;

		// Get the images that are currently in the previous (original form)
		let currentImages = DaoLocation.gImageUrls(locationProfile);

		// Get the images that are in the new props
		let nextImages = DaoLocation.gImageUrls(locationProfile);

		// Decide whether to update or not based on the arrays length
		// Note that the component will not update if an image changes
		// because the length of the two arrays remains the same
		// 100% rendering precision is not required for now
		if (currentImages.length !== nextImages.length)
			this.setState({imageSources: this._getImagesFromProps(nextProps)});
	}

	_getImagesFromProps(props) {
		const {locationProfile} = props;
		return DaoLocation.gImageUrls(locationProfile)
			.map(ImageURISourceAuth.fromUrl);
	}

	_onCaptureImage(data) {
		const {locationProfile} = this.props;

		ApiClient.mediaAddTypeIdItemId(0, DaoLocation.gId(locationProfile), data.file)
			.then(addedUrl => {
				const {imageSources} = this.state;

				// Update only location images
				const newImages = [ImageURISourceAuth.fromUrl(addedUrl)].concat(imageSources);
				this.setState({imageSources: newImages});

			});
	}

	_onAddImagePress() {
		const {navigator} = this.props;
		Router.toModalCamera(navigator, {onCaptureImage: this._onCaptureImage});
	}

	render() {
		const {imageSources} = this.state;
		return (
			<Gallery
				onAddImagePress={this._onAddImagePress}
				imageSources={imageSources}
				ListEmptyComponent={this._renderEmptyListComponent}/>
		);
	}

	_renderEmptyListComponent() {
		return (
			<View style={styles.emptyListRoot}>
				<RkText style={styles.emptyListHeader} rkType='primary'>
					No images here...
				</RkText>
				<Icon style={styles.emptyListIcon} size={50} {...Icons.sad} color={Colors.primary}/>

				<View style={styles.emptyListInfo}>
					<RkText rkType='primary'>Use the </RkText>
					<Icon style={styles.emptyListIcon} size={20} {...Icons.sad} color={Colors.primary}/>
					<RkText rkType='primary'> to add an image of your night</RkText>
				</View>
			</View>
		);
	}

}


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	emptyListRoot: {
		flex: 1,
		alignItems: 'center',
		marginTop: 16,
		padding: 4
	},
	emptyListHeader: {
		textAlign: 'center',
		marginTop: 4
	},
	emptyListInfo: {
		flexDirection: 'row',
		marginTop: 4
	},
	emptyListIcon: {
		marginTop: 4
	}
});