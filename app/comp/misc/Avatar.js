import React from 'react';
import {
  Image,
  View
} from 'react-native';
import {
  RkComponent,
  RkText,
  RkTheme
} from 'react-native-ui-kitten';
import {Icon} from 'react-native-elements';

export class Avatar extends RkComponent {
  componentName = 'Avatar';
  typeMapping = {
    listItemHeaderContent: {},
    image: {},
    badge: {}
  };

  constructor(props) {
    super(props);
  }

  renderImg(styles) {
    let {image, badge} = styles;
    return (
      <View>
        <Image style={image} source={this.props.img}/>
        {this.props.badge && (
            <View style={badge}>
              <Icon {...this.props.badge} />
            </View>
        )}
      </View>
    )
  }

  render() {
    let {container, ...other} = this.defineStyles();
    return (
      <View style={[container, this.props.style]}>
        {this.renderImg(other)}
      </View>
    )
  }
}
