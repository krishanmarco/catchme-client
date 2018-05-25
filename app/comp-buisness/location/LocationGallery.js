/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoLocation from '../../lib/daos/DaoLocation';
import Gallery from '../../comp/misc/Gallery';
import ImageURISourceAuth from '../../lib/data/ImageURISourceAuth';
import React from 'react';
import {FlatListEmpty} from '../../comp/Misc';
import {t} from '../../lib/i18n/Translations';
import type {TImageURISourceAuth} from '../../lib/data/ImageURISourceAuth';
import type {TLocation} from '../../lib/daos/DaoLocation';


// Const ************************************************************************************************
// Const ************************************************************************************************

type Props = {
	locationProfile: TLocation,
	onAddImagePress: Function,
};

type State = {
	imageSources: Array<TImageURISourceAuth>
};


export default class LocationGallery extends React.Component<void, Props, State> {

	constructor(props, context) {
		super(props, context);
		this._renderEmptyList = this._renderEmptyList.bind(this);
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
	}

	render() {
		const {imageSources} = this.state;
		return (
			<Gallery
				imageSources={imageSources}
				ListEmptyComponent={this._renderEmptyList}/>
		);
	}

	_renderEmptyList() {
		const {onAddImagePress} = this.props;
		return (
			<FlatListEmpty
				text={t('t_empty_location_gallery')}
				buttonText={t('t_empty_bt_location_gallery')}
				onPress={onAddImagePress}
				image={require('../../assets/images/empty-images.png')}/>
		);
	}
	
}
