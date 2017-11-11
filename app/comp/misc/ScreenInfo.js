/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {View, TouchableNativeFeedback, Dimensions, Image} from 'react-native';

import {scaleModerate, scaleVertical} from '../../lib/utils/scale';
import {RkText} from 'react-native-ui-kitten';



const ScreenInfoImage = ({style, scale, image, height, width, onPress}) => {
  const contentHeight = scaleModerate(scale, 1);
  const cHeight = Dimensions.get('window').height - contentHeight;
  const cWidth = Dimensions.get('window').width;
  const cStyle = {height: cHeight, width: cWidth, alignItems: 'center'};
  return (
      <View style={[cStyle, style]}>
        <TouchableNativeFeedback onPress={onPress}>
          <Image
              style={[{resizeMode: 'cover', marginBottom: scaleVertical(16)}, {height, width}]}
              source={image}/>
        </TouchableNativeFeedback>
      </View>
  );
};

ScreenInfoImage.defaultProps = {
  scale: 550,
  height: 100,
  width: 150
};


const ScreenInfoText = ({text}) => (
    <View style={{alignItems: 'center', width: '100%'}}>
      <RkText rkType='secondary6'>{text}</RkText>
    </View>
);


const ScreenInfo = ({imageContainerStyle, image, scale, height, width, text, onPress}) => (
    <View>
      <ScreenInfoImage
          style={imageContainerStyle}
          onPress={onPress}
          scale={scale}
          height={height}
          width={width}
          image={image}/>
      <ScreenInfoText text={text}/>
    </View>
);

export default ScreenInfo;