/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import React from 'react';
import {BadgeOverlay, Touchable} from "../Misc";
import {Icon} from 'react-native-elements';
import {Image, StyleSheet, View} from 'react-native';
import {RkComponent} from 'react-native-ui-kitten';
import type {TIcon, TImageSource} from "../../lib/types/Types";


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



// AvatarFull *******************************************************************************************
// AvatarFull *******************************************************************************************

type Props = {
	source: TImageSource,
	onPress?: Function,
	badge?: TIcon,
	height?: number
};

export const AvatarFull = ({source, onPress, height, badge}: Props) => (
	<Touchable onPress={onPress}>
		<BadgeOverlay
			backgroundJsx={(
				<Image
					style={[{height}, styles.avatarFullImage]}
					source={source}/>
			)}
			badge={badge}/>
	</Touchable>
);

AvatarFull.defaultProps = {
	height: 180
};


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	avatarFullImage: {
		width: '100%',
		resizeMode: 'cover'
	},
});