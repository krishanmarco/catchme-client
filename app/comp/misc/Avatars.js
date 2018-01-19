/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {Image, View} from 'react-native';
import {RkComponent} from 'react-native-ui-kitten';
import {Icon} from 'react-native-elements';


// Avatar *********************************************************************************
// Avatar *********************************************************************************

class Avatar extends RkComponent {
  componentName = 'Avatar';
  typeMapping = {
    listItemHeaderContent: {},
    image: {},
    badge: {}
  };

  render() {
    const {container, ...imgStyle} = this.defineStyles();
    const {image, badge} = imgStyle;

    return (
        <View style={[container, this.props.style]}>
          <View>
            <Image style={image} source={this.props.img}/>
            {this.props.badge && (
                <View style={badge}>
                  <Icon {...this.props.badge} />
                </View>
            )}
          </View>
        </View>
    )
  }
}



// AvatarCircle *****************************************************************************************
// AvatarCircle *****************************************************************************************

type Props = {
  uri: string,
  badge?: Object,
  rkType?: string
};

export const AvatarCircle = ({uri, badge, rkType}: Props) => (
    <Avatar rkType={`circle ${rkType}`} badge={badge} img={{uri: uri}}/>
);

