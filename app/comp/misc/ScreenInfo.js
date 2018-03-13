/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {Dimensions, Image, TouchableNativeFeedback, View} from 'react-native';

import {scaleModerate, scaleVertical} from '../../lib/utils/scale';
import {RkText} from 'react-native-ui-kitten';


// Flow *************************************************************************************************
// Flow *************************************************************************************************

type Props = {
  imageContainerStyle: Object,
  imageContainerScale: number,
  imageContainerOnPress: ?Function,
  imageHeight: number,
  imageWidth: number,
  imageSource: Object,
  textText: string
};


// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

export default class ScreenInfo extends React.Component<any, Props, any> {

  constructor(props, context) {
    super(props, context);
    this.state = this._mapPropsToState(props);
  }


  componentWillReceiveProps(nextProps) {
    this.setState(this._mapPropsToState(nextProps));
  }

  _mapPropsToState(props) {
    return {
      imageContainerStyle: this._mapPropsToImageContainerStyle(props),
      imageStyle: this._mapPropsToImageStyle(props)
    };
  }

  _mapPropsToImageContainerStyle(props) {
    const {imageContainerStyle, imageContainerScale} = props;
    const contentHeight = scaleModerate(imageContainerScale, 1);
    const cHeight = Dimensions.get('window').height - contentHeight;
    const cWidth = Dimensions.get('window').width;
    return {
      height: cHeight,
      width: cWidth,
      alignItems: 'center',
      ...imageContainerStyle
    };
  }

  _mapPropsToImageStyle(props) {
    const {imageHeight, imageWidth} = props;
    return {
      resizeMode: 'cover',
      marginBottom: scaleVertical(16),
      height: imageHeight,
      width: imageWidth
    };
  }


  render() {
    const {imageContainerOnPress, imageSource, textText} = this.props;
    return (
        <View>

          <View style={this.state.imageContainerStyle}>
            <TouchableNativeFeedback onPress={imageContainerOnPress}>
              <Image
                  style={this.state.imageStyle}
                  source={imageSource}/>
            </TouchableNativeFeedback>
          </View>

          <View style={{alignItems: 'center', width: '100%'}}>
            <RkText rkType='secondary6'>{textText}</RkText>
          </View>

        </View>
    );
  }

}


ScreenInfo.defaultProps = {
  imageContainerScale: 550,
  imageHeight: 100,
  imageWidth: 150
};
