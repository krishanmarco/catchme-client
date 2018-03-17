/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {Icon} from 'react-native-elements';
import {TouchableOpacity, Image, View} from 'react-native';
import {RkComponent} from 'react-native-ui-kitten';


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
				<TouchableOpacity onPress={onPress}>
					<Image style={imgStyle.image} source={{uri}}/>
					{badge && (
						<View style={imgStyle.badge}>
							<Icon {...badge} />
						</View>
					)}
				</TouchableOpacity>
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
	<Avatar rkType={`circle ${rkType}`} {...props}/>
);

