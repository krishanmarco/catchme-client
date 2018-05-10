/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import React from 'react';
import {BadgeOverlay, Touchable} from "../Misc";
import {Image, StyleSheet, View} from 'react-native';
import type {TIcon, TImageSource} from "../../lib/types/Types";
import {Avatar} from 'react-native-elements';

// AvatarCircle *****************************************************************************************
// AvatarCircle *****************************************************************************************

type Props = {
	uri: string
};

export const AvatarCircle = ({uri, ...props}: Props) => (
	<Avatar
		source={{uri}}
		size='small'
		rounded/>
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
			backgroundJsx={!_.isEmpty(source.uri) && (
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