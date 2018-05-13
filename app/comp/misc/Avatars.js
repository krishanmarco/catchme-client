/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {Avatar} from 'react-native-elements';
import {BadgeOverlay, Touchable} from "../Misc";
import {Image, StyleSheet, View} from 'react-native';
import {validSource} from "../../lib/HelperFunctions";
import type {TIcon, TImageSource} from "../../lib/types/Types";

// AvatarCircle *****************************************************************************************
// AvatarCircle *****************************************************************************************

type Props = {
	source: TImageSource,
	defaultUri?: string
};

export const AvatarCircle = ({source, defaultUri}: Props) => {

	const _source = validSource(source)
		? source
		: {uri: defaultUri};

	return (
		<Avatar
			source={_source}
			size='small'
			rounded/>
	);
};



// AvatarFull *******************************************************************************************
// AvatarFull *******************************************************************************************

type Props = {
	source: TImageSource,
	onPress?: Function,
	height?: number,
	badge?: TIcon,
	defaultUri?: string
};

export const AvatarFull = ({source, onPress, height, defaultUri, badge}: Props) => {

	const _source = validSource(source)
		? source
		: {uri: defaultUri};

	return (
		<Touchable onPress={onPress}>
			<BadgeOverlay
				backgroundJsx={validSource(_source) && (
					<Image
						style={[{height}, styles.avatarFullImage]}
						source={_source}/>
				)}
				badge={badge}/>
		</Touchable>
	);
};

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