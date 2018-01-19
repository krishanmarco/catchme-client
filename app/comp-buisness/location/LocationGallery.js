/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';

import ApiClient from '../../lib/data/ApiClient';

import {Icons, Colors} from '../../Config';

import {View} from 'react-native';
import Gallery from '../../comp/misc/Gallery';
import DaoLocation from "../../lib/daos/DaoLocation";
import ImageURISourceAuth from "../../lib/data/ImageURISourceAuth";
import {RkText} from 'react-native-ui-kitten';
import {Icon} from 'react-native-elements';
import Router from "../../lib/helpers/Router";
import type {TImageURISourceAuth} from "../../lib/data/ImageURISourceAuth";


type Props = {
  // todo
};

type State = {
  imageSources: Array<TImageURISourceAuth>
};


export default class LocationGallery extends React.Component<any, Props, State> {

  constructor(props, context) {
    super(props, context);
    this._onAddImagePress = this._onAddImagePress.bind(this);
    this._renderEmptyListComponent = this._renderEmptyListComponent.bind(this);
    this._onCaptureImage = this._onCaptureImage.bind(this);
    this.state = {imageSources: this._getImagesFromProps(props)};
  }

  componentWillReceiveProps(nextProps) {

    // Get the images that are currently in the previous (original form)
    let currentImages = DaoLocation.gImageUrls(this.props.locationProfile);

    // Get the images that are in the new props
    let nextImages = DaoLocation.gImageUrls(nextProps.locationProfile);

    // Decide whether to update or not based on the arrays length
    // Note that the component will not update if an image changes
    // because the length of the two arrays remains the same
    // 100% rendering precision is not required for now
    if (currentImages.length !== nextImages.length)
      this.setState({imageSources: this._getImagesFromProps(nextProps)});
  }

  _getImagesFromProps(props) {
    return DaoLocation.gImageUrls(props.locationProfile)
        .map(ImageURISourceAuth.fromUrl);
  }


  _onCaptureImage(data) {
    ApiClient.mediaAddTypeIdItemId(0, DaoLocation.gId(this.props.locationProfile), data.file)
        .then(addedUrl => {

          // Update only location images
          const newImages = [ImageURISourceAuth.fromUrl(addedUrl)].concat(this.state.imageSources);
          this.setState({imageSources: newImages});

        });
  }

  _onAddImagePress() {
    Router.toCameraModal(this.props.navigator, {
      onCaptureImage: this._onCaptureImage
    });
  }




  render() {
    return (
        <Gallery
            onAddImage={this._onAddImagePress}
            imageSources={this.state.imageSources}
            ListEmptyComponent={this._renderEmptyListComponent}/>
    );
  }



  _renderEmptyListComponent() {
    return (
        <View style={{flex: 1, alignItems: 'center', marginTop: 16, padding: 4}}>
          <RkText style={{textAlign: 'center', marginTop: 4}} rkType='primary'>
            No images here...
          </RkText>
          <Icon style={{marginTop: 4}} size={50} {...Icons.sad} color={Colors.primary}/>

          <View style={{flexDirection: 'row', marginTop: 4}}>
            <RkText rkType='primary'>Use the </RkText>
            <Icon style={{marginTop: 4}} size={20} {...Icons.sad} color={Colors.primary}/>
            <RkText rkType='primary'> to add an image of your night</RkText>
          </View>
        </View>
    );
  }

}


LocationGallery.defaultProps = {

};

LocationGallery.propTypes = {
  locationProfile: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired
};