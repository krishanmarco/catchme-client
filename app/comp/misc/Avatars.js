/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import React from 'react';
import {Icon} from 'react-native-elements';
import {Image, TouchableOpacity, View} from 'react-native';
import {RkComponent} from 'react-native-ui-kitten';
import {Touchable} from "../Misc";


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
		const {style, uri, badge, onPress} = this.props;

		return (
			<View style={[container, style]}>
				<Touchable onPress={onPress}>
					{!_.isEmpty(uri) && <Image style={imgStyle.image} source={{uri}}/>}
					{!!badge && (
						<View style={imgStyle.badge}>
							<Icon {...badge} />
						</View>
					)}
				</Touchable>
			</View>
		);
	}
}



// AvatarCircle *****************************************************************************************
// AvatarCircle *****************************************************************************************

type Props = {
	uri: string,
	badge?: Object,
	rkType?: string
};

export const AvatarCircle = ({rkType, ...props}: Props) => (
	<Avatar {...props} rkType={`circle ${rkType}`}/>
);

