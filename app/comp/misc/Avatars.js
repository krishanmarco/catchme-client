/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import React from 'react';
import {Icon} from 'react-native-elements';
import {Image, StyleSheet, View} from 'react-native';
import {RkComponent} from 'react-native-ui-kitten';
import {Touchable} from "../Misc";
import type {TImageURISourceAuth} from "../../lib/data/ImageURISourceAuth";
import type {TIcon, TImageSource} from "../../lib/types/Types";
import DaoLocation from "../../lib/daos/DaoLocation";


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
		<Image
			style={[{height}, styles.avatarFullImage]}
			source={source}/>
		{!!badge && (
			<View style={styles.avatarFullOverlay}>
				<View style={styles.avatarFullBadge}>
					<Icon size={35} {...badge}/>
				</View>
			</View>
		)}
	</Touchable>
);

AvatarFull.defaultProps = {
	height: 180
};


// Config ***********************************************************************************************
// Config ***********************************************************************************************

const styles = StyleSheet.create({
	avatarFullImage: {
		position: 'relative',
		width: '100%',
		resizeMode: 'cover'
	},
	avatarFullOverlay: {
		position: 'absolute',
		height: '100%',
		width: '100%',
	},
	avatarFullBadge: {
		position: 'absolute',
		bottom: '0%',
		right: '0%',
		marginRight: 4,
		marginBottom: 4,
	}
});