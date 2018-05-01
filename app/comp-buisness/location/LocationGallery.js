/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import ApiClient from '../../lib/data/ApiClient';
import DaoLocation from "../../lib/daos/DaoLocation";
import Gallery from '../../comp/misc/Gallery';
import ImageURISourceAuth from "../../lib/data/ImageURISourceAuth";
import React from 'react';
import {Colors, Icons} from '../../Config';
import {FlatListEmpty} from "../../comp/Misc";
import {Icon} from 'react-native-elements';
import {RkText} from 'react-native-ui-kitten';
import {StyleSheet, View} from 'react-native';
import type {TImageURISourceAuth} from "../../lib/data/ImageURISourceAuth";
import type {TLocation} from "../../lib/daos/DaoLocation";


// Const ************************************************************************************************
// Const ************************************************************************************************

type Props = {
	locationProfile: TLocation
};

type State = {
	imageSources: Array<TImageURISourceAuth>
};


export default class LocationGallery extends React.Component<void, Props, State> {

	constructor(props, context) {
		super(props, context);
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

		// uri: http://www.catchme.krishanmadan.website/api/media/get/0/31/1787.png
		return DaoLocation.gImageUrls(locationProfile)
			.map(ImageURISourceAuth.fromUrl);
			// .map(obj => ({...obj, /*uri: obj.uri + '.png'*/}));
	}

	render() {
		const {imageSources} = this.state;
		return (
			<Gallery
				imageSources={imageSources}
				ListEmptyComponent={(
					<FlatListEmpty
						image={require('../../assets/images/empty-images.png')}/>
				)}/>
		);
	}
	
}
